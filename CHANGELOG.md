## [Unreleased]

## [1.0.0-rc.3] - 2026-05-05

### Breaking Changes
- Default `sampling_percentage` on `CreateMetricRequest`, `RunMetricRequestMetric`, and `LegacyRunMetricRequestMetric` lowered from `100` to `10`. New metrics created without an explicit `sampling_percentage` will now sample 10% of events instead of 100%. Pass `sampling_percentage: 100` explicitly to preserve the previous behavior.

### Added
- `client.sessions.create()` for `POST /v1/sessions`, with new `CreateSessionOptions`, `CreateSessionRequest`, and `CreateSessionResponse` type exports. Supports idempotent session creation by `session_id`.

## [1.0.0-rc.2] - 2026-05-05

### Breaking Changes
- `client.datasets.delete()` parameter shape changed from `{ query: { dataset_id } }` to `{ path: { dataset_id } }` to target the new AIP-135 `DELETE /v1/datasets/{dataset_id}` route. Update call sites accordingly.
- `client.metrics.delete()` now takes a path parameter instead of a query parameter (new `DeleteMetricPath` type, removed `DeleteMetricQuery`).
- `client.events.search()` `limit` maximum lowered from 7500 to 1000; requests above 1000 are rejected.
- `client.events.search()` `ignore_order` is now accepted only for backward compatibility and treated as a no-op. Results always order by `start_time` descending.
- `getEventsSchema` removed and split into `client.experiments.getRunsSchema()` (across all runs) and `client.experiments.getRunSchema()` (per-run, requires a run id). Update callers that previously passed an optional id.
- Removed without replacement in this RC: `startSession`, `addSessionTraces`, `createModelEvent`, `createModelEventBatch`, `getExperimentResult`, and the configurations CRUD (`getConfigurations`, `createConfiguration`, `updateConfiguration`, `deleteConfiguration`). The associated `*Options`, `*Request`, `*Response`, `*Path`, and `*Query` type exports are no longer available.

### Added
- `client.events.create()` for `POST /v1/events`.
- `client.events.update()` for `PUT /v1/events/{event_id}` (new `UpdateEventPath`).
- `client.events.createBatch()` for `POST /v1/events/batch`.
- `client.experiments.getRunsSchema()` and `client.experiments.getRunSchema()` for the new schema endpoints.
- `client.experiments.compareRuns()` and `client.experiments.compareRunEvents()` for the migrated comparison endpoints (new `GetExperimentCompareEventsPath`).
- `client.metrics.update()` and `client.metrics.run()`; `client.metrics.delete()` re-added on the new path-based route.
- New `DeleteDatasetPath` type for the canonical path-based delete.

### Changed
- Bumped `axios` from 1.15.0 to 1.15.2.

## [1.0.0-rc.1] - 2026-04-30

### Added
- Initial release
