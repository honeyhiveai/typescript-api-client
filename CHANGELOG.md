## [Unreleased]

## [2.0.0-rc.7] - 2026-04-29

### Changed
- `client.events.export()` is now `client.events.search()`. The underlying endpoint moved from `POST /v1/events/export` to `POST /v1/events/search`. The associated `ExportEventsOptions`/`ExportEventsRequest`/`ExportEventsResponse` types are renamed to `SearchEventsOptions`/`SearchEventsRequest`/`SearchEventsResponse`.
- `client.experiments.getRunsSchema()` moved to `client.events.getEventsSchema()`. The endpoint moved from `GET /v1/runs/schema` to `GET /v1/events/schema`. The `GetExperimentRunsSchemaOptions`/`GetExperimentRunsSchemaQuery`/`GetExperimentRunsSchemaResponse` exports are replaced by `GetEventsSchemaOptions`/`GetEventsSchemaQuery`/`GetEventsSchemaResponse`.
- `client.datasets.update()` now takes the dataset ID in the URL path. Call it as `client.datasets.update({ path: { dataset_id }, body: { ... } })` instead of putting `dataset_id` in the body. The endpoint moved from `PUT /v1/datasets` to `PUT /v1/datasets/{dataset_id}`, and a new `UpdateDatasetPath` type is exported.
- Generated request, response, and component schema type names are now hand-picked customer-facing names instead of algorithmically generated names, and previously inline object schemas are now promoted to named types. If your code imports specific generated type names directly, some import names may need updating; runtime behavior is unchanged.

### Added
- New `client.queues` namespace for managing annotation queues, with `list`, `create`, `get`, `update`, and `delete` methods, plus the corresponding `GetQueuesOptions`/`CreateQueueOptions`/`GetQueueOptions`/`UpdateQueueOptions`/`DeleteQueueOptions`, request, and response types.
- Generated client methods now include endpoint examples in their JSDoc, so IDE tooltips and TypeDoc output show concrete usage samples.

## [2.0.0-rc.6] - 2026-04-17

Internal improvements only.

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
