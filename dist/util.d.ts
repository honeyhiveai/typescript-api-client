import createClient, { type ClientOptions, type Middleware } from 'openapi-fetch';
/**
 * Configuration options for the HoneyHive API client. They extend the options
 * from openapi-fetch, but replace 'baseUrl' with 'serverUrl' for consistency
 * with our other SDKs.
 */
export interface ClientConfig extends Omit<ClientOptions, 'baseUrl'> {
    apiKey?: string;
    serverUrl?: string;
    middleware?: Middleware[];
}
export declare function createApiClient<Paths extends {}>(options: ClientConfig): ReturnType<typeof createClient<Paths>>;
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
     * The server's errorResponseHandler middleware always returns `{ statusCode,
     * message, success, errorCode }` as JSON for all error responses. However,
     * non-application errors (e.g. a load balancer HTML 502, or Express's default
     * 404) can bypass that middleware and pass us an unknown shape, in which case
     * we return undefined.
     */
    parseError(): ErrorResponse | undefined;
}
/**
 * The standard error response shape returned by the server's error handler
 * for all non-2xx responses.
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