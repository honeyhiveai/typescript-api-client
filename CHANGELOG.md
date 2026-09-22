# TypeScript API SDK Changelog

## [1.5.0] - 2026-09-22

### What's New
- New `ingestionApiKey` client option and `HH_INGESTION_API_KEY` environment variable for supplying an ingestion API key (a value beginning with `hh_ingst_`). The client sends it on the operations that send traces and events: `client.sessions.create()`, `client.sessions.createEventBatch()`, `client.events.create()`, `client.events.update()`, and `client.events.createBatch()`. The client sends the project API key on everything else.
- An ingestion API key is now a credential on its own. A process that only sends traces and events can construct a client with the ingestion key and no project API key. Every other operation on such a client behaves as it does with no project API key configured.
- An `ingestionApiKey` or `HH_INGESTION_API_KEY` value that is not a well-formed ingestion key throws when the client is constructed. The error names the option or variable the value came from and never echoes the value.
- Verbose logging now prints an `Ingestion API key:` line next to the project key. The line shows `hh_ingst_`, the key id, and none of the secret. This is the form HoneyHive displays, so you can match the line against the key in your account. A credential that is not configured logs as `(none)`.

### Fixes & Improvements
- `client.metrics.run()` now derives the workspace whose provider credentials run the metric from the caller's authenticated scope rather than from the request body. Previously a `workspace_id` in the request event was forwarded as-is. That let an authenticated caller run an ad-hoc LLM metric against another tenant's configured provider credentials.
- A metric run that needs ground truth the event does not carry is now skipped instead of failed. `client.metrics.run()` returns `200` with `success: false`, a null `result`, and an `explanation`. It previously threw a `400` with `ground_truth_missing`. Adding ground truth to the event re-enqueues it, and the metric computes on that pass.
- The error thrown when no credential is configured now reads `Missing API key` and names the four current sources: `projectApiKey`, `ingestionApiKey`, `HH_PROJECT_API_KEY`, and `HH_INGESTION_API_KEY`.

### Compatibility & Deprecations
- A client configured with a project API key and no ingestion key still sends the project key on the ingestion operations.
- `HH_INGESTION_API_KEY` is read at client construction for the first time in this release. A process that already sets it to a non-empty value that is not a well-formed ingestion key now fails to construct a client. Unset the variable, or set it to your ingestion key, before upgrading.
- `needs_ground_truth` is deprecated and ignored on every metric request and response type, including `CreateMetricRequest`, `UpdateMetricRequest`, `MetricItem`, `MetricVersionContent`, and the metric passed to `client.metrics.run()`. The API now infers the need for ground truth from the metric definition. The property remains in the type definitions so existing code keeps compiling, and reads still return the stored value.
- `workspace_id` on the event passed to `client.metrics.run()` is deprecated and ignored. It remains accepted, so existing code keeps compiling. Remove it and rely on the key's scope.
- Bumped `axios` from `1.19.0` to `1.20.0`.

## [1.4.1] - 2026-08-14

### Fixes & Improvements
- `client.metrics.run()` now distinguishes failure classes: `400` when the request is invalid or is missing inputs the metric needs (e.g. ground truth the event doesn't carry), `422` when evaluation itself failed (`execution_error`, `compilation_error`, `template_render_error`, `llm_response_parse_error`, …), and `500` for internal errors. `ApiError.parseError()` returns the `errorCode` along with the evaluator's detailed failure text in `message`.
- Empty or whitespace-only `name` values passed to `client.experiments.createRun()` and `client.experiments.updateRun()` are now rejected with a `400`, and accepted names are trimmed before storage. Such names previously created runs with a blank display name.

### Compatibility & Deprecations
- Composite metrics are no longer supported. `child_metrics` is marked deprecated on every metric request and response type and is now ignored by the API, and creating or updating a metric with `type: 'COMPOSITE'` returns a `400`. Both remain in the type definitions so existing code keeps compiling; replace composite metrics with standalone metrics.
- Bumped `axios` from `1.18.0` to `1.19.0`.

## [1.4.0] - 2026-06-26

### What's New
- New `client.events.get({ event_id })` method for `GET /v1/events/{event_id}`, fetching a single event by ID.
- All SDK methods now accept an optional `options?: FetchOptions` second argument for cancelling in-flight requests via `AbortController`. New exported `FetchOptions` type (`{ signal?: AbortSignal }`). Example: `await client.events.search(request, { signal: controller.signal })`.
- New `projectApiKey` client option and `HH_PROJECT_API_KEY` environment variable for supplying the project-scoped API key. These replace the previous `apiKey` option and `HH_API_KEY` environment variable.
- Experiment run objects now include a `dataset_name` field alongside `dataset_id`.

### Fixes & Improvements
- The `outputs` field on update-event requests is now typed as an object or `null` (previously `unknown`). Passing a non-object value (array, string, or scalar) previously corrupted the stored event and broke downstream consumers such as the Python SDK; such values are now rejected. Passing `null` preserves the existing outputs.

### Compatibility & Deprecations
- The `apiKey` client option and `HH_API_KEY` environment variable are deprecated and will be removed in the next major version. They continue to work but log a one-time deprecation warning to stderr on client construction. Migrate to `projectApiKey` / `HH_PROJECT_API_KEY`.
- Bumped `axios` from `1.16.0` to `1.18.0`.

## [1.3.0] - 2026-05-29

### What's New
- New `client.metricVersions` namespace with `list`, `create`, and `deploy` methods for managing snapshot versions of a metric's definition via `/v1/metrics/{metric_id}/versions` and `/v1/metrics/{metric_id}/versions/{version_name}/deploy`.
- New exported request/response types: `GetMetricVersionsRequest`/`Response`, `CreateMetricVersionRequest`/`Response`, and `DeployMetricVersionRequest`/`Response`.

## [1.2.1] - 2026-05-22

Internal improvements only.

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
