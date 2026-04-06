import axios from 'axios';
import createClient, { type ClientOptions, type Middleware } from 'openapi-fetch';

/**
 * Gets an environment variable value, or returns the default value if the
 * environment variable is not set.
 *
 * This function is also isomorphic. If run from a non-Node.js environment,
 * it will return the default value.
 */
function getEnv(key: string, defaultValue?: string): string | undefined {
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key] ?? defaultValue;
  }
  return defaultValue;
}

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

/**
 * Custom query serializer that delegates to axios for exact parity with the
 * old axios-based client.
 *
 * openapi-fetch defaults to "explode" style (`key=a&key=b`), but Express parses
 * a single repeated param as a plain string instead of a one-element array.
 * Axios uses bracket notation (`key[]=a&key[]=b`) and handles nested
 * objects/arrays recursively, which Express parses correctly.
 */
function querySerializer(queryParams: Record<string, unknown>): string {
  const uri = axios.getUri({ url: '', params: queryParams });
  return uri.startsWith('?') ? uri.slice(1) : uri;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type -- needs to match openapi-fetch's own createClient<Paths extends {}> signature
export function createApiClient<Paths extends {}>(
  options: ClientConfig,
): ReturnType<typeof createClient<Paths>> {
  const { apiKey, serverUrl, middleware, ...clientOptions } = options;
  const resolvedApiKey = apiKey ?? getEnv('HH_API_KEY');
  // When middleware is provided, it is assumed to handle authentication itself.
  if (!resolvedApiKey && !middleware?.length) {
    throw new Error(
      'Missing API key: provide apiKey in options or set the HH_API_KEY environment variable',
    );
  }

  const headers: Record<string, string> = {};
  if (resolvedApiKey) {
    headers.Authorization = `Bearer ${resolvedApiKey}`;
  }

  const client = createClient<Paths>({
    ...clientOptions,
    querySerializer,
    baseUrl: serverUrl ?? getEnv('HH_API_URL', 'https://api.honeyhive.ai'),
    headers: {
      ...headers,
      // User-supplied headers override Authorization to allow custom auth schemes.
      // Cast is safe: ClientConfig.headers is typed as HeadersOptions (which includes
      // Headers and [string,string][]), but callers always pass plain objects in practice.
      ...(clientOptions.headers as Record<string, string>),
    },
  });

  if (middleware?.length) {
    client.use(...middleware);
  }

  return client;
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
    super(`API error ${status}`, { cause: error });
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
  parseError(): ErrorResponse | undefined {
    const e = this.error;
    if (
      typeof e === 'object' &&
      e !== null &&
      'message' in e &&
      typeof e.message === 'string' &&
      'statusCode' in e &&
      typeof e.statusCode === 'number' &&
      'success' in e &&
      // TODO: remove the `true` fallback once we've rolled out enough of the
      // backend to guarantee that all errors have errorCode
      'errorCode' in e
        ? typeof e.errorCode === 'string'
        : true
    ) {
      return e as ErrorResponse;
    }
    return undefined;
  }
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
