/**
 * The base error class and the errors the SDK throws about its own
 * configuration. They sit apart from the request chassis so the key checks can
 * throw them without importing it.
 */
/**
 * HoneyHiveError is a base class for all errors thrown by the HoneyHive API
 * client.
 *
 * This error is never thrown directly, but is useful for determining if an
 * error is from the HoneyHive API client with `err instanceof HoneyHiveError`
 */
export declare class HoneyHiveError extends Error {
}
/** A kind of API key a data plane operation can require. */
export type ApiKeyKind = 'project' | 'ingestion' | 'dataPlane';
/**
 * Thrown by an operation when no key it can use is configured, before any
 * request is sent. An ingestion operation uses the project API key when no
 * ingestion key is configured, so it names the ingestion key only when neither
 * is. An operation that takes the data plane key accepts no other key, so it
 * names the data plane key whenever that key is absent. No operation throws it
 * on a client given an `Authorization` header or middleware, which are assumed
 * to authenticate the request.
 *
 * @property keyKind - The kind of key the operation requires.
 */
export declare class MissingApiKeyError extends HoneyHiveError {
    readonly keyKind: ApiKeyKind;
    constructor(keyKind: ApiKeyKind);
}
/**
 * Thrown at construction when a typed key (ingestion or data plane) is set to
 * a value that is not a key of that kind. The message names where the value
 * came from and what it looks like instead, and never echoes the value.
 *
 * @property keyKind - The kind of key the value was supplied as.
 * @property source - The option or environment variable the value came from.
 */
export declare class MalformedApiKeyError extends HoneyHiveError {
    #private;
    readonly keyKind: Exclude<ApiKeyKind, 'project'>;
    readonly source: string;
    constructor(keyKind: Exclude<ApiKeyKind, 'project'>, source: string, requirement: string);
    /**
     * The same message with `source` named as where the value came from, for a
     * caller that supplied the value under a different name.
     */
    messageFor(source: string): string;
}
//# sourceMappingURL=errors.d.ts.map