# TypeScript API SDK Changelog

## [1.2.0] - 2026-05-21

### What's New
- Added a `dataPlaneUrl` client option and `HH_DATA_PLANE_URL` environment variable for configuring the data plane URL. These replace the previous `serverUrl` option and `HH_API_URL` environment variable.
- The verbose logging output now labels the resolved URL as `Data plane URL:` (previously `API URL:`).

### Fixes & Improvements
- Environment variables set to the empty string (e.g. `HH_API_KEY=`, `HH_DATA_PLANE_URL=`) are now treated as unset and fall back to defaults, rather than being propagated as a literal empty string.

### Compatibility & Deprecations
- The `serverUrl` client option and `HH_API_URL` environment variable are deprecated and will be removed in the next major version. They continue to work but log a one-time deprecation warning to stderr on client construction. Migrate to `dataPlaneUrl` / `HH_DATA_PLANE_URL`.

## [1.1.1] - 2026-05-19

### Fixes & Improvements
- Fixed a bug where `error.message` on thrown API errors was not populated, causing error logs and CLI output to omit the underlying failure detail.

## [1.1.0] - 2026-05-15

### What's New
- New `client.charts` namespace with `create`, `list`, `get`, `update`, and `delete` methods for managing charts via `/v1/charts` and `/v1/charts/{chart_id}`.
- New `client.experiments.getSummary()` method for `GET /v1/runs/{run_id}/summary`, returning pass/fail results, metric aggregations, per-datapoint results, and the experiment run object.
- New `client.sessions.createEventBatch()` method for `POST /v1/sessions/{session_id}/events/batch`, accepting a batch of events scoped to a single session (the `session_id` from the path overrides any value in the event body).
- New exported request/response types: `CreateChartRequest`/`Response`, `GetChartRequest`/`Response`, `GetChartsResponse`, `UpdateChartRequest`/`Response`, `DeleteChartRequest`/`Response`, `GetExperimentSummaryRequest`/`Response`, and `CreateSessionEventBatchRequest`/`Response`.

### Compatibility & Deprecations
- Bumped `axios` from `1.15.2` to `1.16.0`.

## [1.0.1] - 2026-05-11

Internal improvements only.

## [1.0.0] - 2026-05-11

Initial launch.
