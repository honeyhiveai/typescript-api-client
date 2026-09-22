/**
 * What the SDK knows about the shape of HoneyHive API keys: the ingestion
 * key's format, checked at client construction, and the masks the verbose log
 * renders each kind of key with. Nothing here resolves or sends a key.
 */
/**
 * The prefix of an ingestion API key, whose values have the shape
 * `hh_ingst_<key id>_<key secret>`.
 */
const INGESTION_API_KEY_PREFIX = 'hh_ingst_';
/**
 * The shape of the key id segment of an ingestion key: exactly 24 alphanumeric
 * characters, with `_` and `-` excluded so that an id can never read as two
 * segments. Used by the mask, which shows the id and none of the secret.
 */
const INGESTION_KEY_ID_PATTERN = /^[A-Za-z0-9]{24}$/;
/**
 * A complete ingestion key: the prefix, a 24-character id, and a 64-character
 * secret over the URL-safe alphabet. Both lengths are fixed properties of the
 * key format, so a value of any other shape is a truncated or corrupted key,
 * never a newer variant.
 */
const INGESTION_API_KEY_PATTERN = /^hh_ingst_[A-Za-z0-9]{24}_[A-Za-z0-9_-]{64}$/;
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
export function checkIngestionApiKey(value, source) {
    const candidate = value.trim();
    if (INGESTION_API_KEY_PATTERN.test(candidate)) {
        return candidate;
    }
    const expectation = `${source} must be an ingestion API key, a value beginning with '${INGESTION_API_KEY_PREFIX}'`;
    if (candidate.startsWith(INGESTION_API_KEY_PREFIX)) {
        throw new Error(`${expectation}; the value provided begins with it but is not a complete key.`);
    }
    if (candidate.startsWith('hh_')) {
        throw new Error(`${expectation}; the value provided looks like a different kind of HoneyHive API key.`);
    }
    throw new Error(`${expectation}; the value provided is not a HoneyHive API key.`);
}
/**
 * Recognized coarse-grained API key prefixes, sorted longest-first so that
 * prefix detection picks the most specific match (`hh_ro_` before `hh_`) no
 * matter the order an entry is added in. Used only to render a masked key for
 * verbose logging; the SDK does not validate a project key's type.
 *
 * Only the prefixes that can authenticate a data plane request today are listed:
 * a full project key and a read-only project key. Other HoneyHive prefixes exist
 * in the codebase (`hh_org_`, `hh_ws_`, `hh_cp_`), but none of them can reach
 * this SDK, by opposite mechanisms. An org key can be minted, and no endpoint
 * accepts it. A workspace key would be accepted (the data plane lists
 * `WORKSPACE_API_KEY` in `allowedApiKeyActorTypes`), but cannot be minted: both
 * api-key routes gate on scope, so the WORKSPACE branch of the mint path is
 * unreachable. Naming either would advertise a credential type nobody can hold.
 *
 * Add an entry when a prefix can both be minted and authenticate a data plane
 * request. Until then, a value carrying one renders under the generic `hh_`
 * prefix, since every HoneyHive prefix begins with `hh_`. Only a value that
 * isn't HoneyHive-shaped at all is redacted wholesale. Ingestion keys are not
 * in this table: they are hashed keys and take the id-based mask instead.
 */
const API_KEY_PREFIXES = ['hh_ro_', 'hh_'].sort((a, b) => b.length - a.length);
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
export function maskApiKey(apiKey) {
    if (apiKey.startsWith(INGESTION_API_KEY_PREFIX)) {
        const rest = apiKey.slice(INGESTION_API_KEY_PREFIX.length);
        const separator = rest.indexOf('_');
        // An empty id never matches the pattern, so a value with no separator at
        // all takes the redacted path without a second branch.
        const keyId = separator === -1 ? '' : rest.slice(0, separator);
        return INGESTION_KEY_ID_PATTERN.test(keyId)
            ? `${INGESTION_API_KEY_PREFIX}${keyId}_******`
            : '********';
    }
    const prefix = API_KEY_PREFIXES.find((p) => apiKey.startsWith(p));
    if (!prefix) {
        return '********';
    }
    return `${prefix}****${apiKey.slice(-4)}`;
}
//# sourceMappingURL=apiKeys.js.map