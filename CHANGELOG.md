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
