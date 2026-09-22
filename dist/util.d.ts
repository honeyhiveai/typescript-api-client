import { type ClientOptions, type Middleware } from 'openapi-fetch';
import { type ApiClients } from './generated/client.js';
/**
 * Test-only escape hatch to reset the per-process deprecation-dedup set so
 * each test can assert warning behavior in isolation. Not exported from
 * `index.ts` — only the test suite should reach for this.
 */
export declare function _testOnlyResetWarnedDeprecations(): void;
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
        package: 'cp-frontend' | '@honeyhive/cli';
        version: string;
    };
    headers?: Record<string, string>;
}
/**
 * Resolves the client's credentials and returns the openapi-fetch clients that
 * carry them, one per security scheme the spec defines. Every generated method
 * indexes the result by its operation's scheme, so the choice of credential
 * lives here and nowhere in generated code.
 */
export declare function createApiClient(options: ClientConfig): ApiClients;
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
type FetchResult<T = unknown, E = unknown> = {
    data: T;
    error?: undefined;
    response: Response;
} | {
    data?: undefined;
    error: E;
    response: Response;
};
/**
 * HoneyHiveError is a base class for all errors thrown by the HoneyHive API
 * client.
 *
 * This error is never thrown directly, but is useful for determining if an
 * error is from the HoneyHive API client with `err instanceof HoneyHiveError`
 */
export declare class HoneyHiveError extends Error {
}
/**
 * An error that is thrown when the API call was not successful
 *
 * @property status - The HTTP status code of the response
 * @property response - The Response object from the fetch call. Call
 * `await err.response.text()` to see details of the error.
 */
export declare class ApiError extends HoneyHiveError {
    readonly status: number;
    readonly response: Response;
    readonly error: unknown;
    constructor(status: number, error: unknown, response: Response);
    /**
     * Returns the parsed error response body with its known type, or `undefined`
     * if the body doesn't match the expected shape.
     *
     * The HoneyHive API returns `{ statusCode, message, success, errorCode }` as
     * JSON for all error responses. However, failures that happen before a request
     * reaches the API (e.g. an HTML 502 from a load balancer, or a generic 404) can
     * arrive in an unrecognized shape, in which case we return undefined.
     */
    parseError(): ErrorResponse | undefined;
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
export declare class NetworkError extends HoneyHiveError {
    readonly error: unknown;
    constructor(error: unknown);
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
export declare function unwrap<T, E>(promise: Promise<FetchResult<T | undefined, E>>): Promise<T>;
export {};
//# sourceMappingURL=util.d.ts.map