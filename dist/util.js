import axios from 'axios';
import createClient from 'openapi-fetch';
import { SDK_VERSION } from './generated/version.js';
const DEFAULT_DATA_PLANE_URL = 'https://api.dp1.us.honeyhive.ai';
/**
 * Gets an environment variable value, or returns the default value if the
 * environment variable is not set or is the empty string.
 *
 * Empty string is treated the same as unset because `FOO= node script.js`
 * (and `unset FOO; export FOO=`) are common shell patterns for "no value
 * here", and downstream code (`??` chains, URL fallbacks) would otherwise
 * propagate the empty string as if it were a real value.
 *
 * **This is cross-cutting behavior, not specific to URL resolution.** Every
 * caller (currently `HH_API_KEY`, `HH_API_URL`, `HH_DATA_PLANE_URL`,
 * `HH_VERBOSE`) sees the empty-string-as-unset behavior. When adding a new
 * env var via `getEnv('HH_FOO', 'default')`, be aware that `HH_FOO=""`
 * will resolve to `'default'`, not `''`. Existing callers were audited
 * and have no regression — they either treat empty-string as falsy
 * already (`HH_API_KEY`, `HH_VERBOSE`) or use the value as a URL where
 * empty-string would have been the bug this normalization fixes.
 *
 * This function is also isomorphic. If run from a non-Node.js environment,
 * it will return the default value.
 */
function getEnv(key, defaultValue) {
    if (typeof process !== 'undefined' && process.env) {
        const v = process.env[key];
        return v === undefined || v === '' ? defaultValue : v;
    }
    return defaultValue;
}
/**
 * Recognized API key prefixes, longest-first so that prefix detection picks
 * the most specific match (e.g. `hh_org_` before `hh_`). Mirrors the server's
 * canonical mask in `@hive-kube/server-api-key-service` — the SDK keeps its
 * own copy to avoid depending on a server package.
 */
const API_KEY_PREFIXES = ['hh_org_', 'hh_ws_', 'hh_cp_', 'hh_dp_', 'hh_'];
/**
 * Returns a display-safe rendering of an API key for verbose logging.
 *
 * For recognized HoneyHive keys, renders `<prefix>****<last 4 chars>` (e.g.
 * `hh_org_****o5p6`). For anything else, returns 8 fixed-width asterisks so
 * the output never reveals length or content of an unrecognized secret.
 */
function maskApiKey(apiKey) {
    const prefix = API_KEY_PREFIXES.find((p) => apiKey.startsWith(p));
    if (!prefix) {
        return '********';
    }
    return `${prefix}****${apiKey.slice(-4)}`;
}
/**
 * Tracks which deprecation warnings have already fired in this process, keyed
 * by a stable identifier (e.g. `'serverUrl'`, `'HH_API_URL'`) so the same
 * warning isn't emitted N times when the SDK constructs N clients. The CP
 * frontend instantiates a new client per render via `useApiClient`; without
 * per-process dedup the devtools console would fill with duplicates.
 */
const warnedDeprecations = new Set();
/**
 * Test-only escape hatch to reset the per-process deprecation-dedup set so
 * each test can assert warning behavior in isolation. Not exported from
 * `index.ts` — only the test suite should reach for this.
 */
export function _testOnlyResetWarnedDeprecations() {
    warnedDeprecations.clear();
}
/**
 * Emits a deprecation warning to stderr for a deprecated configuration input
 * (option, environment variable, or CLI flag that the SDK exposes). Fires at
 * most once per process per `key` — see `warnedDeprecations`. Intentionally
 * not gated on `verbose` so customers see it during normal development and
 * migrate off the old name.
 *
 * **Chassis must stay in sync with the SDK generator's per-operation
 * deprecation warning** (`console.warn` with the shape
 * `[@honeyhive/api-client] <thing> is deprecated and will be removed in the
 * next major version.`, see
 * `typescript/packages/server-sdk-generator/src/spec.ts` — search for
 * `deprecationWarning` / `is deprecated and will be removed`). The
 * `message` passed in here typically appends a `Use '<replacement>'
 * instead.` clause because the replacement is known at this call site;
 * the generator omits that clause because the OpenAPI spec doesn't yet
 * model replacements. If the chassis changes, update both sides (the Use
 * clause only appears in hand-written warnings).
 *
 * The CLI's deprecation warnings follow a different convention
 * (`Warning: <kind> "..." is deprecated …`, no package prefix) and are
 * owned by `typescript/packages/server-sdk-generator/src/cli.ts` /
 * `typescript/public/honeyhive-cli/src/utils.ts`.
 */
function warnDeprecated(key, message) {
    if (warnedDeprecations.has(key))
        return;
    warnedDeprecations.add(key);
    console.warn(`[@honeyhive/api-client] ${message}`);
}
/**
 * Custom query serializer that delegates to axios for exact parity with the
 * old axios-based client.
 *
 * openapi-fetch defaults to "explode" style (`key=a&key=b`), but Express parses
 * a single repeated param as a plain string instead of a one-element array.
 * Axios uses bracket notation (`key[]=a&key[]=b`) and handles nested
 * objects/arrays recursively, which Express parses correctly.
 */
function querySerializer(queryParams) {
    const uri = axios.getUri({ url: '', params: queryParams });
    return uri.startsWith('?') ? uri.slice(1) : uri;
}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type -- needs to match openapi-fetch's own createClient<Paths extends {}> signature
export function createApiClient(options) {
    const { apiKey, dataPlaneUrl, serverUrl, middleware, verbose, _internal_provenance, ...clientOptions } = options;
    const resolvedApiKey = apiKey ?? getEnv('HH_API_KEY');
    // Fire deprecation warnings for any old-named input that the caller
    // actually supplied. Warnings fire even when the new name also wins
    // resolution — we want callers to remove the old name from their code, not
    // just be told that the new name took precedence. `warnDeprecated` dedupes
    // per process by key so multi-client callers (e.g. the CP frontend's
    // per-render `useApiClient`) don't spam the console.
    if (serverUrl !== undefined) {
        warnDeprecated('serverUrl', "The 'serverUrl' option is deprecated and will be removed in the next major version. Use 'dataPlaneUrl' instead.");
    }
    const envHhApiUrl = getEnv('HH_API_URL');
    if (envHhApiUrl !== undefined) {
        warnDeprecated('HH_API_URL', "The 'HH_API_URL' environment variable is deprecated and will be removed in the next major version. Use 'HH_DATA_PLANE_URL' instead.");
    }
    // Resolution order: new option > old option > new env var > old env var >
    // default. For options, any non-undefined value wins (so explicit
    // undefined falls back). For env vars, both unset and empty-string fall
    // back, because `getEnv` normalizes empty-string to undefined — see
    // `getEnv` for the rationale.
    const resolvedDataPlaneUrl = dataPlaneUrl ??
        serverUrl ??
        getEnv('HH_DATA_PLANE_URL') ??
        envHhApiUrl ??
        DEFAULT_DATA_PLANE_URL;
    const resolvedVerbose = verbose ?? getEnv('HH_VERBOSE')?.toLowerCase() === 'true';
    const provenance = _internal_provenance ?? {
        package: '@honeyhive/api-client',
        version: SDK_VERSION,
    };
    // Log before the missing-key check so verbose users can see what *did*
    // resolve when construction is about to fail.
    if (resolvedVerbose) {
        console.error(`Data plane URL: ${resolvedDataPlaneUrl}`);
        console.error(`API Key: ${resolvedApiKey ? maskApiKey(resolvedApiKey) : '(none)'}`);
        console.error(`Package: ${provenance.package} v${provenance.version}`);
    }
    // When middleware is provided, it is assumed to handle authentication itself.
    if (!resolvedApiKey && !middleware?.length) {
        throw new Error('Missing API key: provide apiKey in options or set the HH_API_KEY environment variable');
    }
    const headers = {
        'hh-client-package': provenance.package,
        'hh-client-version': provenance.version,
        'hh-client-language': 'typescript',
    };
    if (resolvedApiKey) {
        headers.Authorization = `Bearer ${resolvedApiKey}`;
    }
    const client = createClient({
        ...clientOptions,
        querySerializer,
        baseUrl: resolvedDataPlaneUrl,
        headers: {
            ...headers,
            ...clientOptions.headers,
        },
    });
    if (middleware?.length) {
        client.use(...middleware);
    }
    return client;
}
/**
 * HoneyHiveError is a base class for all errors thrown by the HoneyHive API
 * client.
 *
 * This error is never thrown directly, but is useful for determining if an
 * error is from the HoneyHive API client with `err instanceof HoneyHiveError`
 */
export class HoneyHiveError extends Error {
}
/**
 * Type guard that returns the payload as ErrorResponse if it matches the
 * canonical shape, or undefined otherwise.
 */
function asErrorResponse(e) {
    if (typeof e === 'object' &&
        e !== null &&
        'message' in e &&
        typeof e.message === 'string' &&
        'statusCode' in e &&
        typeof e.statusCode === 'number' &&
        'success' in e &&
        typeof e.success === 'boolean' &&
        // TODO: remove the `true` fallback once we've rolled out enough of the
        // backend to guarantee that all errors have errorCode
        ('errorCode' in e ? typeof e.errorCode === 'string' : true)) {
        return e;
    }
    return undefined;
}
/**
 * An error that is thrown when the API call was not successful
 *
 * @property status - The HTTP status code of the response
 * @property response - The Response object from the fetch call. Call
 * `await err.response.text()` to see details of the error.
 */
export class ApiError extends HoneyHiveError {
    status;
    response;
    error;
    constructor(status, error, response) {
        const parsed = asErrorResponse(error);
        const message = parsed !== undefined ? `API error ${status}: ${parsed.message}` : `API error ${status}`;
        super(message, { cause: error });
        this.name = 'ApiError';
        this.status = status;
        this.response = response;
        this.error = error;
    }
    /**
     * Returns the parsed error response body with its known type, or `undefined`
     * if the body doesn't match the expected shape.
     *
     * The server's errorResponseHandler middleware always returns `{ statusCode,
     * message, success, errorCode }` as JSON for all error responses. However,
     * non-application errors (e.g. a load balancer HTML 502, or Express's default
     * 404) can bypass that middleware and pass us an unknown shape, in which case
     * we return undefined.
     */
    parseError() {
        return asErrorResponse(this.error);
    }
}
/**
 * An error that is thrown when the API call fails at the network level
 * (e.g. DNS failures, timeouts, connection refused)
 */
export class NetworkError extends HoneyHiveError {
    error;
    constructor(error) {
        super(error instanceof Error ? error.message : String(error), { cause: error });
        this.name = 'NetworkError';
        this.error = error;
    }
}
/**
 * Narrows a FetchResult to its success branch while also stripping the
 * `undefined` that openapi-fetch adds to `data` across both union members.
 *
 * By declaring `result is { data: T; … }` (without `| undefined`), TypeScript
 * narrows `data` from `T | undefined` to `T` after the guard — no cast needed.
 */
function isSuccess(result) {
    return result.error === undefined;
}
/**
 * Unwraps a fetch result, throwing an ApiError if the result contains an error.
 * This enables a more ergonomic way of consuming the results of API calls.
 *
 * The generic accepts `FetchResult<T | undefined, E>` so that `T` itself is
 * inferred without `undefined`. openapi-fetch's union types `data` as
 * `ResponseType | undefined` across both branches; by absorbing the
 * `undefined` in the parameter, the return type is a clean `Promise<T>`.
 */
export async function unwrap(promise) {
    let result;
    try {
        result = await promise;
    }
    catch (error) {
        if (error instanceof HoneyHiveError) {
            throw error;
        }
        throw new NetworkError(error);
    }
    if (!isSuccess(result)) {
        throw new ApiError(result.response.status, result.error, result.response);
    }
    return result.data;
}
//# sourceMappingURL=util.js.map