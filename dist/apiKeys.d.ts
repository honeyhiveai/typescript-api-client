/**
 * What the SDK knows about the shape of HoneyHive API keys: the typed keys'
 * format, checked at client construction, and the masks the verbose log
 * renders each kind of key with. Nothing here resolves or sends a key.
 */
/**
 * Returns `value` if it is a well-formed ingestion API key (`hh_ingst_…`), and
 * throws otherwise; see {@link checkHashedApiKey}.
 */
export declare function checkIngestionApiKey(value: string, source: string): string;
/**
 * Returns `value` if it is a well-formed fine-grained data plane API key
 * (`hh_fgdp_…`), and throws otherwise; see {@link checkHashedApiKey}.
 */
export declare function checkDataPlaneApiKey(value: string, source: string): string;
/**
 * Returns a display-safe rendering of an API key for verbose logging.
 *
 * For a hashed key (an ingestion key or a fine-grained data plane key),
 * renders `<prefix><key id>_******`, the key's id and none of its secret. This
 * is character-for-character the masked form HoneyHive displays for that key,
 * so a verbose log line can be matched directly against a key in your account.
 * A value with a hashed prefix but a mangled id segment is redacted wholesale,
 * because the characters after the prefix could then be secret material rather
 * than an id.
 *
 * For recognized coarse-grained HoneyHive keys, renders `<prefix>****<last 4
 * chars>` (e.g. `hh_ro_****o5p6`). For anything else, returns 8 fixed-width
 * asterisks so the output never reveals length or content of an unrecognized
 * secret.
 */
export declare function maskApiKey(apiKey: string): string;
//# sourceMappingURL=apiKeys.d.ts.map