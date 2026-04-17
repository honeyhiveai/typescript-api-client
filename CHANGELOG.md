## [Unreleased]

## [2.0.0-rc.5] - 2026-04-17

Internal improvements only.

## [2.0.0-rc.4] - 2026-04-16

Internal improvements only.

## [2.0.0-rc.3] - 2026-04-16

### Changed
- Simplified all client method names to shorter aliases that match the Python SDK (e.g., `sessions.startSession()` → `sessions.start()`, `events.createEvent()` → `events.create()`, `metrics.getMetrics()` → `metrics.list()`). This applies across all resource namespaces: sessions, events, metrics, datapoints, datasets, experiments, and configurations.
- `GET /v1/metrics` and `GET /v1/configurations` list responses are now wrapped in named objects (`{ metrics: [...] }` and `{ configurations: [...] }`) instead of returning bare arrays.
- Removed `getEvents` endpoint from the client.
- Removed duplicate CP-proxy endpoints for sessions and events that were not part of the public API.
- Removed re-export of the `Middleware` type. Import it directly from `openapi-fetch` instead.

### Fixed
- Corrected type definitions across events, sessions, metrics, and datapoints endpoints — added missing fields, fixed field optionality, and replaced loosely-typed schemas with concrete types.
- Deprecated unused properties on datapoints request types.

## [2.0.0-rc.2] - 2026-04-09

### Changed
- Cleaned up command names. Note: this is a breaking change compared to rc1.
- Fixed docs URL

## [2.0.0-rc.1] - 2026-04-06

### Added
- Initial release
