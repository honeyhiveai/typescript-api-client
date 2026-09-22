/**
 * What the SDK knows about the shape of HoneyHive API keys: the ingestion
 * key's format, checked at client construction, and the masks the verbose log
 * renders each kind of key with. Nothing here resolves or sends a key.
 */
/**
 * Returns `value` if it is a well-formed ingestion API key, and throws
 * otherwise, naming `source` (the option or environment variable the value
 * came from) and what the value looks like instead. The message never echoes
 * the value itself.
 *
 * This runs at client construction whether or not the client goes on to send
 * anything with the key: a present, malformed typed credential is a deployment
 * error, and failing here names it, where a 401 from whichever request used it
 * first would not.
 */
export declare function checkIngestionApiKey(value: string, source: string): string;
/**
 * Returns a display-safe rendering of an API key for verbose logging.
 *
 * For an ingestion key, renders `hh_ingst_<key id>_******`, the key's id and
 * none of its secret. This is character-for-character the masked form
 * HoneyHive displays for that key, so a verbose log line can be matched
 * directly against a key in your account. A value with the prefix but a
 * mangled id segment is redacted wholesale, because the characters after the
 * prefix could then be secret material rather than an id.
 *
 * For recognized coarse-grained HoneyHive keys, renders `<prefix>****<last 4
 * chars>` (e.g. `hh_ro_****o5p6`). For anything else, returns 8 fixed-width
 * asterisks so the output never reveals length or content of an unrecognized
 * secret.
 */
export declare function maskApiKey(apiKey: string): string;
//# sourceMappingURL=apiKeys.d.ts.map