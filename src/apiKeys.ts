/**
 * What the SDK knows about the shape of HoneyHive API keys: the typed keys'
 * format, checked at client construction, and the masks the verbose log
 * renders each kind of key with. Nothing here resolves or sends a key.
 */

import { MalformedApiKeyError } from './errors.js';

/**
 * A kind of hashed API key, whose values have the shape
 * `<prefix><key id>_<key secret>`. Every hashed kind shares the id and secret
 * segments and differs only in its prefix.
 */
interface HashedKeyKind {
  readonly keyKind: MalformedApiKeyError['keyKind'];
  readonly prefix: string;
  /** How an error names the kind, including its article. */
  readonly label: string;
}

const INGESTION_API_KEY: HashedKeyKind = {
  keyKind: 'ingestion',
  prefix: 'hh_ingst_',
  label: 'an ingestion API key',
};

const DATA_PLANE_API_KEY: HashedKeyKind = {
  keyKind: 'dataPlane',
  prefix: 'hh_fgdp_',
  label: 'a fine-grained data plane API key',
};

const HASHED_KEY_KINDS: readonly HashedKeyKind[] = [INGESTION_API_KEY, DATA_PLANE_API_KEY];

/**
 * The shape of the key id segment of a hashed key: exactly 24 alphanumeric
 * characters, with `_` and `-` excluded so that an id can never read as two
 * segments. Used by the mask, which shows the id and none of the secret.
 */
const KEY_ID_PATTERN = /^[A-Za-z0-9]{24}$/;

/**
 * Everything after the prefix of a complete hashed key: a 24-character id and
 * a 64-character secret over the URL-safe alphabet. Both lengths are fixed
 * properties of the key format, so a value of any other shape is a truncated
 * or corrupted key, never a newer variant.
 */
const KEY_ID_AND_SECRET_PATTERN = /^[A-Za-z0-9]{24}_[A-Za-z0-9_-]{64}$/;

/**
 * Returns `value` if it is a well-formed key of `kind`, and throws a
 * {@link MalformedApiKeyError} otherwise, naming `source` (the option or
 * environment variable the value came from) and what the value looks like
 * instead. The message never echoes the value itself.
 *
 * This runs at client construction whether or not the client goes on to send
 * anything with the key: a present, malformed typed credential is a deployment
 * error, and failing here names it, where a 401 from whichever request used it
 * first would not.
 */
function checkHashedApiKey(kind: HashedKeyKind, value: string, source: string): string {
  const candidate = value.trim();
  if (
    candidate.startsWith(kind.prefix) &&
    KEY_ID_AND_SECRET_PATTERN.test(candidate.slice(kind.prefix.length))
  ) {
    return candidate;
  }
  let problem = 'the value provided is not a HoneyHive API key.';
  if (candidate.startsWith(kind.prefix)) {
    problem = 'the value provided begins with it but is not a complete key.';
  } else if (candidate.startsWith('hh_')) {
    problem = 'the value provided looks like a different kind of HoneyHive API key.';
  }
  throw new MalformedApiKeyError(
    kind.keyKind,
    source,
    `must be ${kind.label}, a value beginning with '${kind.prefix}'; ${problem}`,
  );
}

/**
 * Returns `value` if it is a well-formed ingestion API key (`hh_ingst_…`), and
 * throws otherwise; see {@link checkHashedApiKey}.
 */
export function checkIngestionApiKey(value: string, source: string): string {
  return checkHashedApiKey(INGESTION_API_KEY, value, source);
}

/**
 * Returns `value` if it is a well-formed fine-grained data plane API key
 * (`hh_fgdp_…`), and throws otherwise; see {@link checkHashedApiKey}.
 */
export function checkDataPlaneApiKey(value: string, source: string): string {
  return checkHashedApiKey(DATA_PLANE_API_KEY, value, source);
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
 * isn't HoneyHive-shaped at all is redacted wholesale. Hashed keys are not in
 * this table: they take the id-based mask instead.
 */
const API_KEY_PREFIXES = ['hh_ro_', 'hh_'].sort((a, b) => b.length - a.length);

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
export function maskApiKey(apiKey: string): string {
  const hashedKind = HASHED_KEY_KINDS.find((kind) => apiKey.startsWith(kind.prefix));
  if (hashedKind) {
    const rest = apiKey.slice(hashedKind.prefix.length);
    const separator = rest.indexOf('_');
    // An empty id never matches the pattern, so a value with no separator at
    // all takes the redacted path without a second branch.
    const keyId = separator === -1 ? '' : rest.slice(0, separator);
    return KEY_ID_PATTERN.test(keyId) ? `${hashedKind.prefix}${keyId}_******` : '********';
  }
  const prefix = API_KEY_PREFIXES.find((p) => apiKey.startsWith(p));
  if (!prefix) {
    return '********';
  }
  return `${prefix}****${apiKey.slice(-4)}`;
}
