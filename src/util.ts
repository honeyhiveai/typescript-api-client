import axios from 'axios';
import createClient, { type ClientOptions, type Middleware } from 'openapi-fetch';

import { checkIngestionApiKey, maskApiKey } from './apiKeys.js';
import { type ApiClients } from './generated/client.js';
import { type paths } from './generated/types.js';
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
 * caller (currently `HH_PROJECT_API_KEY`, `HH_API_KEY`, `HH_INGESTION_API_KEY`,
 * `HH_API_URL`, `HH_DATA_PLANE_URL`, `HH_VERBOSE`) sees the empty-string-as-unset
 * behavior. When adding a new env var via `getEnv('HH_FOO', 'default')`, be
 * aware that `HH_FOO=""` will resolve to `'default'`, not `''`. Existing callers
 * were audited and have no regression — they either treat empty-string as falsy
 * already (`HH_API_KEY`, `HH_VERBOSE`) or use the value as a URL where
 * empty-string would have been the bug this normalization fixes.
 *
 * This function is also isomorphic. If run from a non-Node.js environment,
 * it will return the default value.
 */
function getEnv(key: string, defaultValue?: string): string | undefined {
  if (typeof process !== 'undefined' && process.env) {
    const v = process.env[key];
    return v === undefined || v === '' ? defaultValue : v;
  }
  return defaultValue;
}

/**
 * Tracks which deprecation warnings have already fired in this process, keyed
 * by a stable identifier (e.g. `'serverUrl'`, `'HH_API_URL'`) so the same
 * warning isn't emitted N times when the SDK constructs N clients. The CP
 * frontend instantiates a new client per render via `useDataPlaneClient`; without
 * per-process dedup the devtools console would fill with duplicates.
 */
const warnedDeprecations = new Set<string>();

/**
 * Test-only escape hatch to reset the per-process deprecation-dedup set so
 * each test can assert warning behavior in isolation. Not exported from
 * `index.ts` — only the test suite should reach for this.
 */
export function _testOnlyResetWarnedDeprecations(): void {
  warnedDeprecations.clear();
}

/**
 * Emits a deprecation warning to stderr for a deprecated configuration input
 * (option, environment variable, or CLI flag that the SDK exposes). Fires at
 * most once per process per `key` — see `warnedDeprecations`. Intentionally
 * not gated on `verbose` so customers see it during normal development and
 * migrate off the old name.
 *
 * **Chassis must stay in sync with the generated per-operation deprecation
 * warning**, which calls `console.warn` with the shape
 * `[@honeyhive/api-client] <thing> is deprecated and will be removed in the
 * next major version.` The `message` passed in here typically appends a
 * `Use '<replacement>' instead.` clause because the replacement is known at
 * this call site. The generated warning omits that clause because the OpenAPI
 * spec does not yet model replacements. If the chassis changes, update both
 * sides. The Use clause only appears in a hand-written warning.
 *
 * The CLI deprecation warnings follow a different convention
 * (`Warning: <kind> "..." is deprecated …`, no package prefix).
 */
function warnDeprecated(key: string, message: string): void {
  if (warnedDeprecations.has(key)) return;
  warnedDeprecations.add(key);
  console.warn(`[@honeyhive/api-client] ${message}`);
}

/**
 * Configuration options for the HoneyHive API client. They extend the options
 * from openapi-fetch, but replace 'baseUrl' with 'dataPlaneUrl' so the name is
 * unambiguous now that the SDK can also talk to the HoneyHive control plane.
 */
export interface ClientConfig extends Omit<ClientOptions, 'baseUrl' | 'headers'> {
  projectApiKey?: string;
  /**
   * @deprecated Use `projectApiKey` instead. The old name will be removed in
   * the next major version. Setting this option still works but logs a
   * deprecation warning to stderr on client construction.
   */
  apiKey?: string;
  /**
   * An ingestion API key (`hh_ingst_…`), the credential for sending traces
   * and events: creating sessions and writing events. Defaults to the
   * `HH_INGESTION_API_KEY` environment variable. A process that only sends
   * traces and events holds this key alone; every other operation then
   * behaves as it does on a client with no project API key configured.
   *
   * A value that is set but is not an ingestion key throws at construction.
   * For compatibility, a client with a project API key and no ingestion key
   * sends the project key on the ingestion operations too.
   */
  ingestionApiKey?: string;
  dataPlaneUrl?: string;
  /**
   * @deprecated Use `dataPlaneUrl` instead. The old name will be removed in
   * the next major version. Setting this option still works but logs a
   * deprecation warning to stderr on client construction.
   */
  serverUrl?: string;
  middleware?: Middleware[];

  /**
   * When true, logs the resolved API URL, the masked API keys, and the SDK
   * package + version via `console.error` on client construction (stderr in
   * Node, devtools in the browser). Useful for confirming which environment,
   * credentials, and SDK build the client is configured with. Defaults to
   * true when the `HH_VERBOSE` environment variable is set to `'true'`
   * (case-insensitive).
   */
  verbose?: boolean;

  /**
   * @internal HoneyHive use only. Overrides the default SDK provenance headers
   * with custom values (e.g. for the CLI or frontend).
   */
  _internal_provenance?: {
    // Constrain the type to known values to further discourage
    // customers from setting something arbitrary
    package: 'cp-frontend' | '@honeyhive/cli';
    version: string;
  };

  // Technically speaking headers can be more complicated than this (e.g.
  // arrays), but to keep the implementation simple we constrain headers to how
  // most people use them anyways
  headers?: Record<string, string>;
}

/**
 * Custom query serializer that delegates to axios.
 *
 * openapi-fetch defaults to "explode" style (`key=a&key=b`), which the HoneyHive
 * API reads as a plain string rather than a one-element array. Axios uses bracket
 * notation (`key[]=a&key[]=b`) and handles nested objects and arrays
 * recursively, which the API parses correctly.
 */
function querySerializer(queryParams: Record<string, unknown>): string {
  const uri = axios.getUri({ url: '', params: queryParams });
  return uri.startsWith('?') ? uri.slice(1) : uri;
}

type OpenapiFetchClient = ReturnType<typeof createClient<paths>>;

/**
 * Resolves the client's credentials and returns the openapi-fetch clients that
 * carry them, one per security scheme the spec defines. Every generated method
 * indexes the result by its operation's scheme, so the choice of credential
 * lives here and nowhere in generated code.
 */
export function createApiClient(options: ClientConfig): ApiClients {
  const {
    projectApiKey,
    apiKey,
    ingestionApiKey,
    dataPlaneUrl,
    serverUrl,
    middleware,
    verbose,
    _internal_provenance,
    ...clientOptions
  } = options;

  // Fire deprecation warnings for any old-named input that the caller
  // actually supplied. Warnings fire even when the new name also wins
  // resolution — we want callers to remove the old name from their code, not
  // just be told that the new name took precedence. `warnDeprecated` dedupes
  // per process by key so multi-client callers (e.g. the CP frontend's
  // per-render `useDataPlaneClient`) don't spam the console.
  if (apiKey !== undefined) {
    warnDeprecated(
      'apiKey',
      "The 'apiKey' option is deprecated and will be removed in the next major version. Use 'projectApiKey' instead.",
    );
  }
  if (serverUrl !== undefined) {
    warnDeprecated(
      'serverUrl',
      "The 'serverUrl' option is deprecated and will be removed in the next major version. Use 'dataPlaneUrl' instead.",
    );
  }
  const envHhApiUrl = getEnv('HH_API_URL');
  if (envHhApiUrl !== undefined) {
    warnDeprecated(
      'HH_API_URL',
      "The 'HH_API_URL' environment variable is deprecated and will be removed in the next major version. Use 'HH_DATA_PLANE_URL' instead.",
    );
  }
  const envHhApiKey = getEnv('HH_API_KEY');
  if (envHhApiKey !== undefined) {
    warnDeprecated(
      'HH_API_KEY',
      "The 'HH_API_KEY' environment variable is deprecated and will be removed in the next major version. Use 'HH_PROJECT_API_KEY' instead.",
    );
  }

  // Resolution order: new option > old option > new env var > old env var.
  // There is no default. Mirrors the URL chain below, minus the default.
  const resolvedApiKey = projectApiKey ?? apiKey ?? getEnv('HH_PROJECT_API_KEY') ?? envHhApiKey;

  // Option > env var, no default. An empty option counts as unset, like an
  // empty env var. The source travels with the value so the shape check below
  // can name where a bad value came from.
  const [rawIngestionApiKey, ingestionApiKeySource] =
    ingestionApiKey !== undefined && ingestionApiKey !== ''
      ? [ingestionApiKey, 'ingestionApiKey']
      : [getEnv('HH_INGESTION_API_KEY'), 'HH_INGESTION_API_KEY'];

  // Resolution order: new option > old option > new env var > old env var >
  // default. For options, any non-undefined value wins (so explicit
  // undefined falls back). For env vars, both unset and empty-string fall
  // back, because `getEnv` normalizes empty-string to undefined — see
  // `getEnv` for the rationale.
  const resolvedDataPlaneUrl =
    dataPlaneUrl ??
    serverUrl ??
    getEnv('HH_DATA_PLANE_URL') ??
    envHhApiUrl ??
    DEFAULT_DATA_PLANE_URL;

  const resolvedVerbose = verbose ?? getEnv('HH_VERBOSE')?.toLowerCase() === 'true';
  const provenance = _internal_provenance ?? {
    package: '@honeyhive/api-client',
    version: SDK_VERSION,
  };

  // Log before either check that can throw (a malformed ingestion key, a
  // missing key) so verbose users can see what *did* resolve when construction
  // is about to fail. The mask redacts a malformed ingestion key wholesale.
  if (resolvedVerbose) {
    console.error(`Data plane URL: ${resolvedDataPlaneUrl}`);
    console.error(`Project API key: ${resolvedApiKey ? maskApiKey(resolvedApiKey) : '(none)'}`);
    console.error(
      `Ingestion API key: ${rawIngestionApiKey ? maskApiKey(rawIngestionApiKey) : '(none)'}`,
    );
    console.error(`Package: ${provenance.package} v${provenance.version}`);
  }

  // A present ingestion key is checked for shape here, at construction,
  // whether or not this client goes on to send an ingestion request.
  const resolvedIngestionApiKey =
    rawIngestionApiKey === undefined
      ? undefined
      : checkIngestionApiKey(rawIngestionApiKey, ingestionApiKeySource);

  // Either key is a credential: a process that only sends traces and events
  // can hold an ingestion key alone. When middleware is provided, it is
  // assumed to handle authentication itself.
  if (!resolvedApiKey && !resolvedIngestionApiKey && !middleware?.length) {
    throw new Error(
      'Missing API key: provide projectApiKey or ingestionApiKey in options, or set the HH_PROJECT_API_KEY or HH_INGESTION_API_KEY environment variable',
    );
  }

  const { headers: userHeaders = {}, ...restClientOptions } = clientOptions;
  const build = (token: string | undefined): OpenapiFetchClient => {
    // An empty key sends no header, and a caller-supplied Authorization header
    // wins over the resolved key.
    const headers: Record<string, string> = {
      'hh-client-package': provenance.package,
      'hh-client-version': provenance.version,
      'hh-client-language': 'typescript',
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    const client = createClient<paths>({
      ...restClientOptions,
      querySerializer,
      baseUrl: resolvedDataPlaneUrl,
      headers: { ...headers, ...userHeaders },
    });
    if (middleware?.length) {
      client.use(...middleware);
    }
    return client;
  };

  // The project client is the client this SDK has always built, and it knows
  // nothing about the ingestion key: an operation that takes the project key
  // behaves exactly as it did before the ingestion key existed, whether or not
  // one is configured.
  const project = build(resolvedApiKey);
  // An operation that accepts the ingestion key gets it when one is
  // configured, and the project client otherwise: the ingestion endpoints
  // accept a coarse-grained project key even though the spec no longer says
  // so, and this line is the one place that knowledge lives. Delete it when
  // coarse-grained keys are retired.
  const ingestion =
    resolvedIngestionApiKey === undefined ? project : build(resolvedIngestionApiKey);

  // Keyed by the schemes the spec defines, so a scheme added to or removed
  // from the spec fails to compile here until this table says which client
  // serves it. The table never narrows what an operation accepts to what the
  // spec declares: the spec deliberately understates what the ingestion
  // endpoints take while coarse-grained keys exist, and the fallback above is
  // what keeps a project-key-only client working on them.
  const clients: ApiClients = {
    BearerAuth: project,
    IngestionApiKey: ingestion,
  };
  return clients;
}

/**
 * Per-request fetch-level options that are orthogonal to the API request
 * payload. These are passed through to the underlying `fetch()` call via
 * openapi-fetch's init spread.
 *
 * Intentionally kept separate from `*Request` types so API-domain interfaces
 * stay serializable and free of DOM/transport concerns.
 */
export interface FetchOptions {
  /**
   * An `AbortSignal` to cancel the in-flight HTTP request. When the signal
   * fires, the underlying `fetch()` rejects with an `AbortError` wrapped in
   * a `NetworkError`.
   *
   * @example
   * ```ts
   * const controller = new AbortController();
   * setTimeout(() => controller.abort(), 5000);
   * const result = await client.events.search(request, { signal: controller.signal });
   * ```
   */
  signal?: AbortSignal;
}

/** Structural match for both branches of openapi-fetch's FetchResponse union. */
type FetchResult<T = unknown, E = unknown> =
  | { data: T; error?: undefined; response: Response }
  | { data?: undefined; error: E; response: Response };

/**
 * HoneyHiveError is a base class for all errors thrown by the HoneyHive API
 * client.
 *
 * This error is never thrown directly, but is useful for determining if an
 * error is from the HoneyHive API client with `err instanceof HoneyHiveError`
 */
export class HoneyHiveError extends Error {}

/**
 * Type guard that returns the payload as ErrorResponse if it matches the
 * canonical shape, or undefined otherwise.
 */
function asErrorResponse(e: unknown): ErrorResponse | undefined {
  if (
    typeof e === 'object' &&
    e !== null &&
    'message' in e &&
    typeof e.message === 'string' &&
    'statusCode' in e &&
    typeof e.statusCode === 'number' &&
    'success' in e &&
    typeof e.success === 'boolean' &&
    // `errorCode` is optional here because not every error response carries it
    // yet; it will become required in a future major version.
    ('errorCode' in e ? typeof e.errorCode === 'string' : true)
  ) {
    return e as ErrorResponse;
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
  public readonly status: number;
  public readonly response: Response;
  public readonly error: unknown;

  constructor(status: number, error: unknown, response: Response) {
    const parsed = asErrorResponse(error);
    const message =
      parsed !== undefined ? `API error ${status}: ${parsed.message}` : `API error ${status}`;
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
   * The HoneyHive API returns `{ statusCode, message, success, errorCode }` as
   * JSON for all error responses. However, failures that happen before a request
   * reaches the API (e.g. an HTML 502 from a load balancer, or a generic 404) can
   * arrive in an unrecognized shape, in which case we return undefined.
   */
  public parseError(): ErrorResponse | undefined {
    return asErrorResponse(this.error);
  }
}

/**
 * The standard error response shape the HoneyHive API returns for all non-2xx
 * responses.
 */
export interface ErrorResponse {
  statusCode: number;
  message: string;
  success: boolean;
  errorCode: string;
}

/**
 * An error that is thrown when the API call fails at the network level
 * (e.g. DNS failures, timeouts, connection refused)
 */
export class NetworkError extends HoneyHiveError {
  readonly error: unknown;

  constructor(error: unknown) {
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
function isSuccess<T, E>(
  result: FetchResult<T | undefined, E>,
): result is { data: T; error?: undefined; response: Response } {
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
export async function unwrap<T, E>(promise: Promise<FetchResult<T | undefined, E>>): Promise<T> {
  let result: FetchResult<T | undefined, E>;
  try {
    result = await promise;
  } catch (error) {
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
