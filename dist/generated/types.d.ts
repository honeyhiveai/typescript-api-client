export interface paths {
    '/session/start': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Start a new session (deprecated)
         * @deprecated
         * @description Deprecated. Use `POST /v1/sessions` instead. The legacy route wraps the session object under a `session` key; the v1 route accepts a bare session object.
         */
        post: operations['startSessionLegacy'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/session/{session_id}/traces': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Add traces to a session (deprecated)
         * @deprecated
         * @description Deprecated. Use `POST /v1/sessions/{session_id}/events/batch` instead. This route accepts trace events under either `logs` (deprecated) or `events`. Exactly one of the two MUST be present in a request: neither → 400, both → 400.
         */
        post: operations['addSessionTracesLegacy'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/sessions': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Start a new session
         * @description Start a new session. The request body is a bare session object (no
         *     `session` wrapper). The server creates a session event and returns
         *     it.
         *
         *     **No required properties.** Every field has a server-side fallback.
         *
         *     **Auto-generated properties** (provided by the server when omitted):
         *
         *     - `session_id` (string, UUID): Server generates a UUIDv4 if omitted
         *       or if the supplied value is not a valid UUID.
         *
         *     **Optional properties with defaults:**
         *
         *     - `event_name` (string): Falls back to `session_name` when not
         *       provided; defaults to `"unknown"` if both are absent.
         *     - `source` (string): Defaults to `"unknown"`.
         *
         *     **Optional properties:**
         *
         *     - `session_name` (string): Display name for the session.
         *     - `start_time` (number): Session start time as Unix milliseconds.
         *       The session normalizer uses `getInt64()` which only accepts numeric
         *       types; if a string is passed, the server silently falls back to the
         *       current time.
         *     - `end_time` (number): Session end time as Unix milliseconds (same
         *       numeric-only caveat as `start_time`).
         *     - `duration` (number): Session duration in milliseconds.
         *     - `config` (object): Configuration associated with the session.
         *     - `inputs` (object): Input data for the session.
         *     - `outputs` (object): Output data from the session.
         *     - `metadata` (object): Arbitrary metadata.
         *     - `user_properties` (object): User properties.
         *     - `children_ids` (array of strings): IDs of child events.
         *
         *     Idempotent on `session_id`: posting twice with the same `session_id`
         *     merges metadata/user_properties into the existing session and returns
         *     the existing event.
         */
        post: operations['createSession'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/sessions/{session_id}/events/batch': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Add a batch of events to a session
         * @description Add a batch of events to an existing session. Each event in the batch
         *     is stored with `session_id` set from the URL path, overriding any
         *     `session_id` in the event body.
         *
         *     Each event must include `event_type` (one of `chain`, `model`, `tool`,
         *     `session`) and `inputs`. Unknown top-level fields and unknown per-event
         *     fields are rejected. Events are processed sequentially. For
         *     higher-throughput ingestion across sessions, use
         *     `POST /v1/events/batch` instead.
         */
        post: operations['createSessionEventBatch'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/events': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * Update an event (deprecated)
         * @deprecated
         * @description Deprecated. Use `PUT /v1/events/{event_id}` instead.
         */
        put: operations['updateEventLegacy'];
        /**
         * Create a new event (deprecated)
         * @deprecated
         * @description Deprecated. Use `POST /v1/events` instead. The legacy route wraps the event object under an `event` key; the v1 route accepts a bare event object.
         */
        post: operations['createEventLegacy'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/events': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Create a new event
         * @description Create a new event (span) within a session trace. The request body is a
         *     bare event object (no `event` wrapper).
         *
         *
         *     **Required properties:**
         *
         *     - `event_type` (string): Must be one of: `chain`, `model`, `tool`, `session`.
         *     - `inputs` (object): Input data for the event.
         *
         *     **Auto-generated properties** (provided by the server when omitted):
         *
         *     - `event_id` (string, UUID): Unique identifier for the event.
         *     - `session_id` (string, UUID): Session/trace identifier.
         *     - `parent_id` (string, UUID): Parent event ID. Defaults to `session_id`.
         *
         *     **Optional properties with defaults:**
         *
         *     - `event_name` (string): Name of the event. Defaults to `"unknown"`.
         *     - `source` (string): Source of the event (e.g. `sdk-python`). Defaults to `"unknown"`.
         *
         *     **Optional properties:**
         *
         *     - `config` (object): Configuration data (e.g. model parameters, prompt templates).
         *     - `outputs` (object): Output data from the event.
         *     - `error` (string or null): Error message if the event failed.
         *     - `children_ids` (array of strings): IDs of child events.
         *     - `duration` (number): Duration of the event in milliseconds.
         *     - `start_time` (number): Unix timestamp in milliseconds for event start.
         *     - `end_time` (number): Unix timestamp in milliseconds for event end.
         *     - `metadata` (object): Additional metadata (e.g. token counts, cost).
         *     - `metrics` (object): Custom metrics.
         *     - `feedback` (object): Feedback data (e.g. ratings, ground truth).
         *     - `user_properties` (object): User properties associated with the event.
         */
        post: operations['createEvent'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/events/{event_id}': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get an event by ID (deprecated)
         * @deprecated
         * @description Deprecated. Use `GET /v1/projects/{project_id}/events/{event_id}` with a data plane API key instead. Retrieves a single event by its unique identifier. The event is fetched directly from S3/MinIO storage.
         */
        get: operations['getEventLegacy'];
        /**
         * Update an event
         * @description Update fields on an existing event. Only the provided fields are
         *     modified; omitted fields are left unchanged. Extra fields not listed
         *     below are accepted by the server but silently ignored.
         */
        put: operations['updateEvent'];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/projects/{project_id}/events/{event_id}': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get an event by ID
         * @description Retrieve a single event by its unique identifier. The event is fetched
         *     directly from S3/MinIO storage.
         */
        get: operations['getEvent'];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/events/export': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Export events based on filters (deprecated)
         * @deprecated
         * @description Deprecated. Use `POST /v1/events/search` instead.
         */
        post: operations['exportEventsLegacy'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/events/search': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Retrieve events based on filters (deprecated)
         * @deprecated
         * @description Deprecated. Use `POST /v1/projects/{project_id}/events/search` with a data plane API key instead. Searches events via POST with filtering and pagination. This is the primary method for retrieving events from HoneyHive.
         */
        post: operations['searchEventsLegacy'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/projects/{project_id}/events/search': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Retrieve events based on filters
         * @description Search events via POST with filtering and pagination. This is the primary method for retrieving events from HoneyHive.
         */
        post: operations['searchEvents'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/events/batch': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Create a batch of events
         * @description Create multiple events in a single request. When `single_session` is
         *     true, all events share the same session created from `session_properties`.
         *
         *
         *     **Required properties:**
         *
         *     - `events` (array of event objects): Each event must include
         *       `event_type` (one of `chain`, `model`, `tool`, `session`) and `inputs`.
         *
         *     **Optional properties:**
         *
         *     - `single_session` (boolean): If true, all events share a single session
         *       created from `session_properties`. Defaults to false.
         *     - `session_properties` (object): Session metadata used when
         *       `single_session` is true. May include `session_name`, `start_time`,
         *       `metadata`.
         *
         *     Unknown top-level fields and per-event fields are rejected at the SDK
         *     boundary; the legacy aliases `is_single_session`, `session`, and
         *     per-event `project` are no longer accepted.
         */
        post: operations['createEventBatch'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/events/model': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Create a new model event (deprecated)
         * @deprecated
         * @description Deprecated. Use `POST /v1/events` with `event_type="model"` instead. The `ModelEvent` schema carries 14 field-level deprecations covering the model-specific fields the generic event route now expresses (`model`, `messages`, `response`, `provider`, `usage`, `cost`, `hyperparameters`, `template`, `template_inputs`, `tools`, `tool_choice`, `response_format`, `duration`, `error`), plus `project` inherited from `LegacyEvent`. The legacy route continues to serve traffic and remaps these fields into `inputs.*` / `outputs.*` before storage.
         */
        post: operations['createModelEventLegacy'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/events/batch': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Create a batch of events (deprecated)
         * @deprecated
         * @description Deprecated. Use `POST /v1/events/batch` instead. The legacy route accepts the deprecated `is_single_session` and `session` aliases and lets per-event objects carry the deprecated `project` field; the v1 route rejects all three at the SDK boundary.
         */
        post: operations['createEventBatchLegacy'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/events/model/batch': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Create a batch of model events (deprecated)
         * @deprecated
         * @description Deprecated. Use `POST /v1/events/batch` with `event_type="model"` on each event instead. Migration notes: the top-level array `model_events` becomes `events`; each element must explicitly set `event_type: "model"` (the legacy route sets this server-side); the deprecated top-level aliases `is_single_session` and `session` are not accepted by the v1 route (`PostEventBatchRequest` is `.strict()`); use `single_session` and `session_properties` instead. The legacy route continues to serve traffic and remaps the model-specific fields on each event (`model`, `messages`, `response`, `provider`, `usage`, `cost`, `hyperparameters`, `template`, `template_inputs`, `tools`, `tool_choice`, `response_format`, `duration`, `error`) into `inputs.*` / `outputs.*` before storage.
         */
        post: operations['createModelEventBatchLegacy'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/charts': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List charts (deprecated)
         * @deprecated
         * @description Deprecated. Use `GET /v1/projects/{project_id}/charts` with a data plane API key instead. Retrieves all charts in the current scope.
         */
        get: operations['getChartsLegacy'];
        put?: never;
        /**
         * Create a new chart (deprecated)
         * @deprecated
         * @description Deprecated. Use `POST /v1/projects/{project_id}/charts` with a data plane API key instead.
         */
        post: operations['createChartLegacy'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/charts/{chart_id}': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get a chart (deprecated)
         * @deprecated
         * @description Deprecated. Use `GET /v1/projects/{project_id}/charts/{chart_id}` with a data plane API key instead. Retrieves a single chart by id.
         */
        get: operations['getChartLegacy'];
        /**
         * Update a chart (deprecated)
         * @deprecated
         * @description Deprecated. Use `PATCH /v1/projects/{project_id}/charts/{chart_id}` with a data plane API key instead. Updates a chart's editable fields. Only fields included in the request body are modified.
         */
        put: operations['updateChartLegacy'];
        post?: never;
        /**
         * Delete a chart (deprecated)
         * @deprecated
         * @description Deprecated. Use `DELETE /v1/projects/{project_id}/charts/{chart_id}` with a data plane API key instead.
         */
        delete: operations['deleteChartLegacy'];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/projects/{project_id}/charts': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List charts
         * @description Retrieve all charts in a project.
         */
        get: operations['getCharts'];
        put?: never;
        /**
         * Create a new chart
         * @description Create a chart in a project.
         */
        post: operations['createChart'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/projects/{project_id}/charts/query': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Run a chart query
         * @description Aggregate the project's events into one chart result. `query.kind` selects the result shape: time series, categorical, scalar, histogram, or table. Every query must include an `event_type is <type>` or `event_type is not <type>` filter; an `event_type is session` filter queries sessions instead of events. The `scatter` kind and a categorical `split_by` / `split_ranking` are accepted by the schema but not served yet, and answer 501.
         */
        post: operations['queryChart'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/projects/{project_id}/charts/{chart_id}': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get a chart
         * @description Retrieve a single chart by id.
         */
        get: operations['getChart'];
        put?: never;
        post?: never;
        /**
         * Delete a chart
         * @description Delete a chart from a project, removing it from the project's dashboards.
         */
        delete: operations['deleteChart'];
        options?: never;
        head?: never;
        /**
         * Update a chart
         * @description Update a chart's editable fields. Only fields included in the request body are modified.
         */
        patch: operations['updateChart'];
        trace?: never;
    };
    '/v1/projects/{project_id}/fine_grained_api_keys': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Create a data plane API key
         * @description Create a fine-grained data plane API key rooted at a project. The caller's key must carry `project.fine_grained_api_key_dp.post` for the project. Only an organization-rooted key created in the organization's **Settings → API Keys**, on the **Data Plane** tab, can carry it, and a key created through this operation never can, so a provisioned key cannot create keys. The permissions requested are limited to the organization's data plane key policy, and `expires_at` to the system's maximum lifetime. The project must already exist on this data plane: a project created on the control plane reaches it asynchronously, and the operation answers 404 until it does. `key_value` is returned once and cannot be retrieved again.
         */
        post: operations['createDataPlaneApiKey'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/projects/{project_id}/ingestion_api_keys': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Create an ingestion API key
         * @description Create an ingestion API key for a project, the credential an application sends traces with. The caller's key must carry `project.ingestion_api_key.post` for the project. Only an organization-rooted data plane key created in the organization's **Settings → API Keys**, on the **Data Plane** tab, can carry it. An ingestion key has no permissions of its own and cannot create keys. The project must already exist on this data plane: a project created on the control plane reaches it asynchronously, and the operation answers 404 until it does. `key_value` is returned once and cannot be retrieved again.
         */
        post: operations['createIngestionApiKey'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/metrics': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List all metrics */
        get: operations['getMetrics'];
        /**
         * Update an existing metric (deprecated)
         * @deprecated
         * @description Deprecated. Use `PUT /v1/metrics/{metric_id}` instead.
         */
        put: operations['updateMetricLegacy'];
        /** Create a new metric */
        post: operations['createMetric'];
        /**
         * Delete a metric (deprecated)
         * @deprecated
         * @description Deprecated. Use `DELETE /v1/metrics/{metric_id}` instead.
         */
        delete: operations['deleteMetricLegacy'];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/metrics/{metric_id}': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * Update an existing metric
         * @description Update a metric's editable fields. Only fields included in the request body are modified.
         */
        put: operations['updateMetric'];
        post?: never;
        /** Delete a metric */
        delete: operations['deleteMetric'];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/metrics/{metric_id}/versions': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List versions for a metric
         * @description Retrieve all snapshot versions of the metric's definition, ordered oldest-first. Returns the full version history unpaginated.
         */
        get: operations['getMetricVersions'];
        put?: never;
        /**
         * Create a new metric version
         * @description Snapshot the supplied metric definition as a new version. By default the version is created as a draft (`deployed: false`); set `deploy_immediately: true` to also make it the live version in the same transaction.
         */
        post: operations['createMetricVersion'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/metrics/{metric_id}/versions/{version_name}/deploy': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Deploy a specific metric version
         * @description Mark the named version as the live version for the metric, unmarking any previously deployed version.
         */
        post: operations['deployMetricVersion'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/metrics/run': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Run a metric evaluation
         * @description Execute a metric on a specific event
         */
        post: operations['runMetric'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/metrics/run_metric': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Run a metric evaluation (deprecated)
         * @deprecated
         * @description Deprecated. Use `POST /v1/metrics/run` instead.
         */
        post: operations['runMetricLegacy'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/datapoints': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Retrieve a list of datapoints (deprecated)
         * @deprecated
         * @description Deprecated. Use `GET /v1/projects/{project_id}/datapoints` with a data plane API key instead. Retrieves datapoints, optionally filtered by a list of datapoint IDs or dataset name.
         */
        get: operations['getDatapointsLegacy'];
        put?: never;
        /**
         * Create a new datapoint (deprecated)
         * @deprecated
         * @description Deprecated. Use `POST /v1/projects/{project_id}/datapoints` with a data plane API key instead. Creates a single datapoint with inputs, history, ground truth, and metadata.
         */
        post: operations['createDatapointLegacy'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/datapoints/batch': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Create multiple datapoints in batch (deprecated)
         * @deprecated
         * @description Deprecated. Use `POST /v1/projects/{project_id}/datapoints/batch` with a data plane API key instead. Creates multiple datapoints from events using field mappings and optional filters.
         */
        post: operations['batchCreateDatapointsLegacy'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/datapoints/{datapoint_id}': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Retrieve a specific datapoint (deprecated)
         * @deprecated
         * @description Deprecated. Use `GET /v1/projects/{project_id}/datapoints/{datapoint_id}` with a data plane API key instead. Gets a single datapoint by its unique identifier.
         */
        get: operations['getDatapointLegacy'];
        /**
         * Update a specific datapoint (deprecated)
         * @deprecated
         * @description Deprecated. Use `PATCH /v1/projects/{project_id}/datapoints/{datapoint_id}` with a data plane API key instead. Updates fields on an existing datapoint. Only the provided fields are modified.
         */
        put: operations['updateDatapointLegacy'];
        post?: never;
        /**
         * Delete a specific datapoint (deprecated)
         * @deprecated
         * @description Deprecated. Use `DELETE /v1/projects/{project_id}/datapoints/{datapoint_id}` with a data plane API key instead. Permanently deletes a datapoint by its unique identifier.
         */
        delete: operations['deleteDatapointLegacy'];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/projects/{project_id}/datapoints': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Retrieve a list of datapoints
         * @description Retrieve datapoints, optionally filtered by a list of datapoint IDs or dataset name.
         */
        get: operations['getDatapoints'];
        put?: never;
        /**
         * Create a new datapoint
         * @description Create a single datapoint with inputs, history, ground truth, and metadata. The `linked_datasets` array accepts at most one dataset ID. Requests with more than one entry return 400. A request with a non-empty `linked_datasets` also requires the `project.dataset.post` permission.
         */
        post: operations['createDatapoint'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/projects/{project_id}/datapoints/batch': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Create multiple datapoints in batch
         * @description Create multiple datapoints from events using field mappings and optional filters. A data plane API key needs both `project.datapoint.post` and `project.event.get` for the project, and also `project.dataset.post` when the body names a `dataset_id`.
         */
        post: operations['batchCreateDatapoints'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/projects/{project_id}/datapoints/{datapoint_id}': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Retrieve a specific datapoint
         * @description Get a single datapoint by its unique identifier.
         */
        get: operations['getDatapoint'];
        put?: never;
        post?: never;
        /**
         * Delete a specific datapoint
         * @description Permanently delete a datapoint by its unique identifier, and remove it from every dataset that holds it. Answers 404 when the project holds no such datapoint. Requires only the `project.datapoint.delete` permission.
         */
        delete: operations['deleteDatapoint'];
        options?: never;
        head?: never;
        /**
         * Update a specific datapoint
         * @description Update fields on an existing datapoint. Only the provided fields are modified. A request that includes `linked_datasets` also requires the `project.dataset.post` and `project.dataset.delete` permissions.
         */
        patch: operations['updateDatapoint'];
        trace?: never;
    };
    '/v1/datasets': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get datasets (deprecated)
         * @deprecated
         * @description Deprecated. Use `GET /v1/projects/{project_id}/datasets` with a data plane API key instead. Retrieves datasets, optionally filtered by dataset ID or name.
         */
        get: operations['getDatasetsLegacy'];
        /**
         * Update a dataset by body ID (deprecated)
         * @deprecated
         * @description Deprecated. Use `PATCH /v1/projects/{project_id}/datasets/{dataset_id}` with a data plane API key instead.
         */
        put: operations['updateDatasetBodyIdLegacy'];
        /**
         * Create a dataset (deprecated)
         * @deprecated
         * @description Deprecated. Use `POST /v1/projects/{project_id}/datasets` with a data plane API key instead. Creates a new dataset with an optional name, description, and initial set of datapoint IDs.
         */
        post: operations['createDatasetLegacy'];
        /**
         * Delete a dataset by query ID (deprecated)
         * @deprecated
         * @description Deprecated. Use `DELETE /v1/projects/{project_id}/datasets/{dataset_id}` with a data plane API key instead.
         */
        delete: operations['deleteDatasetQueryIdLegacy'];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/datasets/{dataset_id}': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * Update a dataset (deprecated)
         * @deprecated
         * @description Deprecated. Use `PATCH /v1/projects/{project_id}/datasets/{dataset_id}` with a data plane API key instead. Updates a dataset's name, description, or list of datapoint IDs.
         */
        put: operations['updateDatasetLegacy'];
        post?: never;
        /**
         * Delete a dataset (deprecated)
         * @deprecated
         * @description Deprecated. Use `DELETE /v1/projects/{project_id}/datasets/{dataset_id}` with a data plane API key instead. Permanently deletes a dataset by its unique identifier.
         */
        delete: operations['deleteDatasetLegacy'];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/datasets/{dataset_id}/datapoints': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Add datapoints to a dataset (deprecated)
         * @deprecated
         * @description Deprecated. Use `POST /v1/projects/{project_id}/datasets/{dataset_id}/datapoints` with a data plane API key instead. Adds new datapoints to an existing dataset. Provide raw data objects and a field mapping that specifies which fields map to inputs, ground truth, and history.
         */
        post: operations['addDatapointsLegacy'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/datasets/{dataset_id}/datapoints/{datapoint_id}': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /**
         * Remove a datapoint from a dataset (deprecated)
         * @deprecated
         * @description Deprecated. Use `DELETE /v1/projects/{project_id}/datasets/{dataset_id}/datapoints/{datapoint_id}` with a data plane API key instead. Removes a specific datapoint from a dataset. The datapoint itself is not deleted, only dereferenced from the dataset.
         */
        delete: operations['removeDatapointLegacy'];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/datasets/{dataset_id}/{datapoint_id}': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /**
         * Remove a datapoint from a dataset by short path (deprecated)
         * @deprecated
         * @description Deprecated. Use `DELETE /v1/projects/{project_id}/datasets/{dataset_id}/datapoints/{datapoint_id}` with a data plane API key instead.
         */
        delete: operations['removeDatapointShortPathLegacy'];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/projects/{project_id}/datasets': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get datasets
         * @description Retrieve datasets, optionally filtered by dataset ID or name.
         */
        get: operations['getDatasets'];
        put?: never;
        /**
         * Create a dataset
         * @description Create a new dataset with an optional name, description, and initial set of datapoint IDs.
         */
        post: operations['createDataset'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/projects/{project_id}/datasets/{dataset_id}': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /**
         * Delete a dataset
         * @description Permanently delete a dataset by its unique identifier.
         */
        delete: operations['deleteDataset'];
        options?: never;
        head?: never;
        /**
         * Update a dataset
         * @description Update a dataset's name, description, or list of datapoint IDs.
         */
        patch: operations['updateDataset'];
        trace?: never;
    };
    '/v1/projects/{project_id}/datasets/{dataset_id}/datapoints': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Add datapoints to a dataset
         * @description Add new datapoints to an existing dataset. Provide raw data objects and a field mapping that specifies which fields map to inputs, ground truth, and history.
         */
        post: operations['addDatapoints'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/projects/{project_id}/datasets/{dataset_id}/datapoints/{datapoint_id}': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /**
         * Remove a datapoint from a dataset
         * @description Remove a specific datapoint from a dataset. The datapoint itself is not deleted, only dereferenced from the dataset.
         */
        delete: operations['removeDatapoint'];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/events/schema': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get events schema (deprecated)
         * @deprecated
         * @description Deprecated. Use `GET /v1/runs/{run_id}/schema` (single-run) or `GET /v1/runs/schema` (project-wide) instead.
         */
        get: operations['getEventsSchemaLegacy'];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/runs': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get a list of evaluation runs (deprecated)
         * @deprecated
         * @description Deprecated. Use `GET /v1/projects/{project_id}/runs` with a data plane API key instead. Lists experiment runs with optional filtering by dataset, status, name, date range, and specific run IDs. Results are paginated and sortable.
         */
        get: operations['getRunsLegacy'];
        put?: never;
        /**
         * Create a new evaluation run (deprecated)
         * @deprecated
         * @description Deprecated. Use `POST /v1/projects/{project_id}/runs` with a data plane API key instead. Creates a new experiment run to track an evaluation against a dataset.
         */
        post: operations['createRunLegacy'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/runs/schema': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get events schema across all experiment runs in a project (deprecated)
         * @deprecated
         * @description Deprecated. Use `GET /v1/projects/{project_id}/runs/schema` with a data plane API key instead. Retrieves the aggregated events schema (fields, datasets, mappings) across all experiment runs in the project.
         */
        get: operations['getRunsSchemaLegacy'];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/runs/{run_id}': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get details of an evaluation run (deprecated)
         * @deprecated
         * @description Deprecated. Use `GET /v1/projects/{project_id}/runs/{run_id}` with a data plane API key instead. Retrieves the full details of a single experiment run by its run ID.
         */
        get: operations['getRunLegacy'];
        /**
         * Update an evaluation run (deprecated)
         * @deprecated
         * @description Deprecated. Use `PATCH /v1/projects/{project_id}/runs/{run_id}` with a data plane API key instead. Updates fields on an existing experiment run such as name, status, metadata, or results.
         */
        put: operations['updateRunLegacy'];
        post?: never;
        /**
         * Delete an evaluation run (deprecated)
         * @deprecated
         * @description Deprecated. Use `DELETE /v1/projects/{project_id}/runs/{run_id}` with a data plane API key instead. Permanently deletes an experiment run by its run ID.
         */
        delete: operations['deleteRunLegacy'];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/runs/{run_id}/schema': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get events schema for a single experiment run (deprecated)
         * @deprecated
         * @description Deprecated. Use `GET /v1/projects/{project_id}/runs/{run_id}/schema` with a data plane API key instead. Retrieves the events schema (fields, datasets, mappings) for a single experiment run.
         */
        get: operations['getRunSchemaLegacy'];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/runs/{run_id}/metrics': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get event metrics for an experiment run (deprecated)
         * @deprecated
         * @description Deprecated. Use `GET /v1/projects/{project_id}/runs/{run_id}/metrics` with a data plane API key instead. Retrieves event metrics from ClickHouse for a specific experiment run
         */
        get: operations['getExperimentRunMetricsLegacy'];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/runs/{run_id}/summary': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Retrieve experiment summary (deprecated)
         * @deprecated
         * @description Deprecated. Use `GET /v1/projects/{project_id}/runs/{run_id}/summary` with a data plane API key instead. Computes evaluation summary for an experiment run: pass/fail results, metric aggregations, per-datapoint results, event details, and the experiment run object.
         */
        get: operations['getExperimentSummaryLegacy'];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/runs/{run_id}/result': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Retrieve experiment result (deprecated)
         * @deprecated
         * @description Deprecated. Use `GET /v1/runs/{run_id}/summary` instead.
         */
        get: operations['getExperimentResultLegacy'];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/runs/{new_run_id}/compare/{old_run_id}': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Retrieve experiment comparison (deprecated)
         * @deprecated
         * @description Deprecated. Use `GET /v1/projects/{project_id}/runs/{new_run_id}/compare/{old_run_id}` with a data plane API key instead. Compares metrics and results between two experiment runs.
         */
        get: operations['getExperimentComparisonLegacy'];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/projects/{project_id}/runs/{new_run_id}/compare/{old_run_id}': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Retrieve experiment comparison
         * @description Compare metrics and results between two experiment runs in the project.
         */
        get: operations['getExperimentComparison'];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/runs/{new_run_id}/compare-with/{old_run_id}': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Retrieve experiment comparison via compare-with (deprecated)
         * @deprecated
         * @description Deprecated. Use `GET /v1/projects/{project_id}/runs/{new_run_id}/compare/{old_run_id}` with a data plane API key instead.
         */
        get: operations['getExperimentComparisonCompareWithLegacy'];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/runs/{new_run_id}/compare/{old_run_id}/events': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Compare events between two experiment runs (deprecated)
         * @deprecated
         * @description Deprecated. Use `GET /v1/projects/{project_id}/runs/{new_run_id}/compare/{old_run_id}/events` with a data plane API key instead. Retrieves and compares events between two experiment runs for detailed analysis
         */
        get: operations['getExperimentCompareEventsLegacy'];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/runs/compare/events': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Compare events between two experiment runs by query IDs (deprecated)
         * @deprecated
         * @description Deprecated. Use `GET /v1/projects/{project_id}/runs/{new_run_id}/compare/{old_run_id}/events` with a data plane API key instead.
         */
        get: operations['getExperimentCompareEventsQueryIdLegacy'];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/projects/{project_id}/runs': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get a list of evaluation runs
         * @description List experiment runs with optional filtering by dataset, status, name, date range, and specific run IDs. Results are paginated and sortable.
         */
        get: operations['getRuns'];
        put?: never;
        /**
         * Create a new evaluation run
         * @description Create a new experiment run to track an evaluation against a dataset.
         */
        post: operations['createRun'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/projects/{project_id}/runs/schema': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get events schema across all experiment runs in a project
         * @description Retrieve the aggregated events schema (fields, datasets, mappings) across all experiment runs in the project.
         */
        get: operations['getRunsSchema'];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/projects/{project_id}/runs/{run_id}': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get details of an evaluation run
         * @description Retrieve the full details of a single experiment run by its run ID.
         */
        get: operations['getRun'];
        put?: never;
        post?: never;
        /**
         * Delete an evaluation run
         * @description Permanently delete an experiment run by its run ID.
         */
        delete: operations['deleteRun'];
        options?: never;
        head?: never;
        /**
         * Update an evaluation run
         * @description Update fields on an existing experiment run such as name, status, metadata, or results.
         */
        patch: operations['updateRun'];
        trace?: never;
    };
    '/v1/projects/{project_id}/runs/{run_id}/schema': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get events schema for a single experiment run
         * @description Retrieve the events schema (fields, datasets, mappings) for a single experiment run.
         */
        get: operations['getRunSchema'];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/projects/{project_id}/runs/{run_id}/summary': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Retrieve experiment summary
         * @description Compute evaluation summary for an experiment run: pass/fail results, metric aggregations, per-datapoint results, event details, and the experiment run object.
         */
        get: operations['getExperimentSummary'];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/projects/{project_id}/runs/{run_id}/metrics': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get event metrics for an experiment run
         * @description Retrieve event metrics from ClickHouse for a specific experiment run
         */
        get: operations['getExperimentRunMetrics'];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/projects/{project_id}/runs/{new_run_id}/compare/{old_run_id}/events': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Compare events between two experiment runs
         * @description Retrieve and compare events between two experiment runs for detailed analysis
         */
        get: operations['getExperimentCompareEvents'];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/queues': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List annotation queues (deprecated)
         * @deprecated
         * @description Deprecated. Use `GET /v1/projects/{project_id}/queues` with a data plane API key instead. Lists annotation queues for the current project scope, optionally filtered by enabled status.
         */
        get: operations['getQueuesLegacy'];
        put?: never;
        /**
         * Create an annotation queue (deprecated)
         * @deprecated
         * @description Deprecated. Use `POST /v1/projects/{project_id}/queues` with a data plane API key instead. Creates a new annotation queue with a name, optional description, filters, and an initial set of event IDs to add.
         */
        post: operations['createQueueLegacy'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/projects/{project_id}/queues': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List annotation queues
         * @description List the annotation queues in the project that `project_id` names, optionally filtered by enabled status.
         */
        get: operations['getQueues'];
        put?: never;
        /**
         * Create an annotation queue
         * @description Create a new annotation queue with a name, optional description, filters, and an initial set of event IDs to add.
         */
        post: operations['createQueue'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/queues/{queue_id}': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get an annotation queue (deprecated)
         * @deprecated
         * @description Deprecated. Use `GET /v1/projects/{project_id}/queues/{queue_id}` with a data plane API key instead. Retrieves a single annotation queue by its unique identifier.
         */
        get: operations['getQueueLegacy'];
        /**
         * Update an annotation queue (deprecated)
         * @deprecated
         * @description Deprecated. Use `PATCH /v1/projects/{project_id}/queues/{queue_id}` with a data plane API key instead. Updates fields on an existing annotation queue. Supports updating name, description, filters, enabled status, and adding/removing events.
         */
        put: operations['updateQueueLegacy'];
        post?: never;
        /**
         * Delete an annotation queue (deprecated)
         * @deprecated
         * @description Deprecated. Use `DELETE /v1/projects/{project_id}/queues/{queue_id}` with a data plane API key instead. Soft-deletes an annotation queue by its unique identifier.
         */
        delete: operations['deleteQueueLegacy'];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/projects/{project_id}/queues/{queue_id}': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get an annotation queue
         * @description Retrieve a single annotation queue by its unique identifier.
         */
        get: operations['getQueue'];
        put?: never;
        post?: never;
        /**
         * Delete an annotation queue
         * @description Soft-delete an annotation queue by its unique identifier.
         */
        delete: operations['deleteQueue'];
        options?: never;
        head?: never;
        /**
         * Update an annotation queue
         * @description Update fields on an existing annotation queue. Supports updating name, description, filters, enabled status, and adding/removing events.
         */
        patch: operations['updateQueue'];
        trace?: never;
    };
    '/v1/configurations': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Retrieve a list of configurations
         * @deprecated
         * @description List configurations with optional filtering by name, environment, and tags.
         */
        get: operations['getConfigurations'];
        put?: never;
        /**
         * Create a new configuration
         * @deprecated
         * @description Create a new LLM or pipeline configuration with provider, parameters, and environment settings.
         */
        post: operations['createConfiguration'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/configurations/{configId}': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * Update an existing configuration
         * @deprecated
         * @description Update an existing configuration's name, provider, parameters, environment, or tags.
         */
        put: operations['updateConfiguration'];
        post?: never;
        /**
         * Delete a configuration
         * @deprecated
         * @description Permanently delete a configuration by its unique identifier.
         */
        delete: operations['deleteConfiguration'];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        SingleFilter: {
            field: string;
            /** @enum {string} */
            operator: 'exists' | 'not exists' | 'is' | 'is not' | 'contains' | 'not contains' | 'greater than' | 'less than' | 'after' | 'before';
            value: string | number | boolean | null;
            /** @enum {string} */
            type: 'string' | 'number' | 'boolean' | 'datetime';
        };
        Pagination: {
            page: number;
            limit: number;
            total: number;
            total_unfiltered: number;
            total_pages: number;
            has_next: boolean;
            has_prev: boolean;
        };
        CreateDataPlaneApiKeyRequest: {
            /** @description A name for the key, shown in the key list. */
            name: string;
            /** @description What the key is for. */
            description?: string;
            /** @description The permissions the key carries, such as `project.chart.get`. Each must be one the key's root scope can carry and one the organization's data plane key policy allows; the key creation screen under the project's Settings → API Keys lists them. */
            permissions: string[];
            /**
             * Format: date-time
             * @description When the key expires, as an ISO 8601 timestamp. It must be in the future and within the maximum key lifetime; a later value is refused with the limit named.
             */
            expires_at: string;
        };
        CreateDataPlaneApiKeyResponse: {
            /** @enum {boolean} */
            success: true;
            data: components['schemas']['CreateDataPlaneApiKeyResponseData'];
        };
        CreateIngestionApiKeyRequest: {
            /** @description A name for the key, shown in the key list. */
            name: string;
            /** @description What the key is for. */
            description?: string;
        };
        CreateIngestionApiKeyResponse: {
            /** @enum {boolean} */
            success: true;
            data: components['schemas']['CreateIngestionApiKeyResponseData'];
        };
        /** @description Request body for POST /v1/charts/query */
        ChartQueryRequest: {
            date_range: components['schemas']['ChartQueryDateRange'];
            /** @description Implicit AND; default none */
            filters?: components['schemas']['EventSearchFilter'][];
            product_filters?: components['schemas']['ChartQueryProductFilters'];
            query: components['schemas']['ChartQuery'];
        };
        ChartQueryDateRange: {
            /**
             * Format: date-time
             * @description RFC 3339 start of the range (inclusive); Z or explicit offset
             */
            start_time: string;
            /**
             * Format: date-time
             * @description RFC 3339 end of the range (exclusive); Z or explicit offset
             */
            end_time: string;
            /** @description IANA timezone name; defaults to UTC. Affects bucket alignment only. */
            timezone?: string;
        };
        EventSearchFilter: {
            field: string;
            /** @enum {string} */
            operator: 'exists' | 'not exists' | 'is' | 'is not' | 'contains' | 'not contains' | 'greater than' | 'less than' | 'after' | 'before';
            value: string | number | boolean | null;
            /** @enum {string} */
            type?: 'string' | 'number' | 'boolean' | 'datetime';
        };
        ChartQueryProductFilters: {
            /** @description Restrict to one experiment run */
            experiment_run_id?: string;
            /** @description Restrict to events belonging to any experiment run */
            only_experiments?: boolean;
        };
        ChartQuery: components['schemas']['ChartQueryTimeSeries'] | components['schemas']['ChartQueryCategorical'] | components['schemas']['ChartQueryScalar'] | components['schemas']['ChartQueryHistogram'] | components['schemas']['ChartQueryTable'] | components['schemas']['ChartQueryScatter'];
        ChartQueryTimeSeries: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            kind: 'time_series';
            bucket?: components['schemas']['ChartQueryBucket'];
            /** @description Groupable field; one series per value */
            split_by?: string;
            /** @description Display-ordered measures, same unit; exactly one when split_by is set */
            measures: components['schemas']['ChartQueryMeasure'][];
            split_ranking?: components['schemas']['ChartQueryRanking'];
        };
        ChartQueryBucket: {
            /**
             * @description Bucket width; default auto
             * @enum {string}
             */
            interval?: 'auto' | '1m' | '5m' | '1h' | '1d' | '1w' | '1M';
            /** @description Ceiling on bucket count when interval is auto; widens the resolved interval, never narrows it. Default 200, max 1000 */
            max_points?: number;
        };
        ChartQueryMeasure: {
            /** @description Response handle for this measure; defaults to the metric name */
            id?: string;
            /** @description Field name or intrinsic metric id */
            metric: string;
            aggregation?: components['schemas']['ChartQueryAggregation'];
        };
        /**
         * @description Omit for a registry default; must be omitted for intrinsic metrics
         * @enum {string}
         */
        ChartQueryAggregation: 'count' | 'avg' | 'sum' | 'min' | 'max' | 'median' | 'p50' | 'p75' | 'p90' | 'p95' | 'p99' | 'percentage_true' | 'percentage_false' | 'percentage_null';
        /** @description Caps the split_by dimension */
        ChartQueryRanking: {
            /** @description Cap on ranked items; default 10, at most 50 */
            limit?: number;
            /**
             * @description Rank order; default desc
             * @enum {string}
             */
            direction?: 'asc' | 'desc';
            /** @description Roll everything below the cap into an "Other" item; additive measures only */
            include_other?: boolean;
        };
        ChartQueryCategorical: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            kind: 'categorical';
            /** @description Groupable field forming the axis */
            group_by: string;
            /** @description Groupable field forming stacks/groups */
            split_by?: string;
            /** @description Display-ordered measures, same unit; exactly one when split_by is set */
            measures: components['schemas']['ChartQueryMeasure'][];
            /** @description Caps the group_by dimension */
            ranking?: components['schemas']['ChartQueryRanking'];
            /** @description Caps the split_by dimension; default limit 10 even when omitted */
            split_ranking?: components['schemas']['ChartQueryRanking'];
        };
        ChartQueryScalar: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            kind: 'scalar';
            measure: components['schemas']['ChartQueryMeasure'];
            comparison?: components['schemas']['ChartQueryScalarComparison'];
            sparkline?: components['schemas']['ChartQueryScalarSparkline'];
        };
        ChartQueryHistogram: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            kind: 'histogram';
            /** @description Numeric field name; no aggregation */
            metric: string;
            bins?: components['schemas']['ChartQueryHistogramBins'];
            /** @description Percentile lines to compute on the same scan; default none */
            markers?: ('p50' | 'p75' | 'p90' | 'p95' | 'p99')[];
        };
        ChartQueryTable: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            kind: 'table';
            /** @description Groupable fields forming row identity */
            group_by: string[];
            /** @description Columns, in display order; units may differ */
            measures: components['schemas']['ChartQueryMeasure'][];
            order_by?: components['schemas']['ChartQueryTableOrderBy'];
            /** @description Default 50, at most 100 */
            limit?: number;
        };
        ChartQueryScatter: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            kind: 'scatter';
            /** @description One groupable field forming point identity */
            group_by: string;
            x: components['schemas']['ChartQueryMeasure'];
            y: components['schemas']['ChartQueryMeasure'];
            /** @description Default 100, clamped to 500 */
            limit?: number;
        };
        /** @description Response body for POST /v1/charts/query */
        ChartQueryResponse: {
            success: boolean;
            data: components['schemas']['ChartResult'];
        };
        ChartResult: components['schemas']['ChartResultTimeSeries'] | components['schemas']['ChartResultCategorical'] | components['schemas']['ChartResultScalar'] | components['schemas']['ChartResultHistogram'] | components['schemas']['ChartResultTable'] | components['schemas']['ChartResultScatter'];
        ChartResultTimeSeries: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            kind: 'time_series';
            meta: components['schemas']['ChartResultTimeSeriesMeta'];
            measures: components['schemas']['ChartResultMeasure'][];
            data: components['schemas']['ChartResultTimeSeriesData'];
        };
        ChartResultWarning: {
            /** @description Stable machine key; well-known values in CHART_RESULT_WARNING_CODES */
            code: string;
            /** @description Human-readable; UI affordances key off `code`, never this */
            message: string;
            /** @description Context the server already had, e.g. { field: "metadata.cost" } or a count */
            details?: {
                [key: string]: string | number;
            };
        };
        ChartResultMeasure: {
            id: string;
            label: string;
            /** @enum {string} */
            unit: 'ms' | 'usd' | 'tokens' | 'events' | 'sessions' | '%' | 'number';
            /** @enum {string} */
            format: 'number' | 'duration_ms' | 'currency_usd' | 'percent';
        };
        ChartResultSeries: {
            /** @description Stable within a response; safe as a React key */
            key: string;
            /** @description Display string; "(empty)" for a stored empty string */
            label: string;
            /** @description Machine-readable identity, e.g. { "config.model": "gpt-4o" } */
            dimensions: {
                [key: string]: string;
            };
            /** @description Positional, aligned to the kind’s axis array */
            values: (number | null)[];
        };
        ChartResultCategorical: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            kind: 'categorical';
            meta: components['schemas']['ChartResultCategoricalMeta'];
            /** @enum {string} */
            unit: 'ms' | 'usd' | 'tokens' | 'events' | 'sessions' | '%' | 'number';
            /** @enum {string} */
            format: 'number' | 'duration_ms' | 'currency_usd' | 'percent';
            data: components['schemas']['ChartResultCategoricalData'];
        };
        ChartResultCategory: {
            /** @description Stable within a response; safe as a React key */
            key: string;
            /** @description Display string; "(empty)" for a stored empty string */
            label: string;
            /** @description Machine-readable identity, e.g. { "config.model": "gpt-4o" } */
            dimensions: {
                [key: string]: string;
            };
            /**
             * @description Present only on the "Other" rollup
             * @enum {boolean}
             */
            is_other?: true;
        };
        ChartResultScalar: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            kind: 'scalar';
            meta: components['schemas']['ChartResultScalarMeta'];
            measures: components['schemas']['ChartResultMeasure'][];
            data: components['schemas']['ChartResultScalarData'];
        };
        ChartResultHistogram: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            kind: 'histogram';
            meta: components['schemas']['ChartResultHistogramMeta'];
            /** @enum {string} */
            unit: 'ms' | 'usd' | 'tokens' | 'events' | 'sessions' | '%' | 'number';
            /** @enum {string} */
            format: 'number' | 'duration_ms' | 'currency_usd' | 'percent';
            data: components['schemas']['ChartResultHistogramData'];
        };
        ChartResultTable: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            kind: 'table';
            meta: components['schemas']['ChartResultTableMeta'];
            measures: components['schemas']['ChartResultMeasure'][];
            data: components['schemas']['ChartResultTableData'];
        };
        ChartResultScatter: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            kind: 'scatter';
            meta: components['schemas']['ChartResultScatterMeta'];
            measures: components['schemas']['ChartResultMeasure'][];
            data: components['schemas']['ChartResultScatterData'];
        };
        CreateChartRequest: {
            /** @description Display name for the chart */
            name: string;
            /** @description Description of what the chart shows */
            description?: string;
            /** @description Name of the metric to visualize */
            metric: string;
            /** @description Aggregation function to apply (e.g. sum, avg, median, min, max) */
            func?: string;
            /** @description Field to group results by */
            groupBy?: string | null;
            /**
             * @description Time bucket granularity for aggregation
             * @default day
             * @enum {string}
             */
            bucketing?: 'minute' | 'five_minute' | 'hour' | 'day' | 'week' | 'month' | 'auto';
            /** @description Time range to query */
            dateRange?: components['schemas']['RelativeDateRange'] | components['schemas']['AbsoluteDateRange'];
            /** @description Filters to apply to the chart data */
            query?: components['schemas']['QueryFilter'][];
            /** @description ID of the user who owns this chart */
            owner_id?: string;
        };
        RelativeDateRange: {
            relative: string;
        };
        AbsoluteDateRange: {
            $gte: string | number;
            $lte: string | number;
        };
        QueryFilter: {
            /** @description Name of the field to filter on */
            field: string;
            /** @description Value to compare against */
            value: string | null;
            /** @description Data type of the field (e.g. string, number) */
            type: string;
            /** @description Comparison operator (e.g. is, is not, contains, greater than, less than) */
            operator: string;
        };
        CreateChartResponse: {
            success: boolean;
            data: components['schemas']['CreateChartResponseData'];
        };
        DeleteChartResponse: {
            success: boolean;
            message: string;
        };
        GetChartResponse: {
            success: boolean;
            data: components['schemas']['GetChartResponseData'];
        };
        GetChartsResponse: {
            success: boolean;
            data: components['schemas']['GetChartsResponseDataItem'][];
        };
        UpdateChartRequest: {
            /** @description Display name for the chart */
            name?: string;
            /** @description Description of what the chart shows */
            description?: string;
            /** @description Name of the metric to visualize */
            metric?: string;
            /** @description Aggregation function to apply (e.g. sum, avg, median, min, max) */
            func?: string;
            /** @description Field to group results by */
            groupBy?: string | null;
            /**
             * @description Time bucket granularity for aggregation
             * @enum {string}
             */
            bucketing?: 'minute' | 'five_minute' | 'hour' | 'day' | 'week' | 'month' | 'auto';
            /** @description Time range to query */
            dateRange?: components['schemas']['RelativeDateRange'] | components['schemas']['AbsoluteDateRange'];
            /** @description Filters to apply to the chart data */
            query?: components['schemas']['QueryFilter'][];
            /** @description ID of the user who owns this chart */
            owner_id?: string;
        };
        UpdateChartResponse: {
            success: boolean;
            data: components['schemas']['UpdateChartResponseData'];
        };
        SelectedFunction: {
            id: string;
            name: string;
            description?: string;
            parameters?: {
                [key: string]: unknown;
            };
        };
        ResponseFormat: {
            /** @enum {string} */
            type: 'text' | 'json_object';
        };
        TemplateItem: {
            role: string;
            content: string;
        };
        ConfigurationParameters: {
            /** @enum {string} */
            call_type: 'chat' | 'completion';
            model: string;
            hyperparameters?: {
                [key: string]: unknown;
            };
            responseFormat?: components['schemas']['ResponseFormat'];
            selectedFunctions?: components['schemas']['SelectedFunction'][];
            /** @enum {string} */
            functionCallParams?: 'none' | 'auto' | 'force';
            forceFunction?: {
                [key: string]: unknown;
            };
            template?: components['schemas']['TemplateItem'][] | string;
        };
        ConfigurationItem: {
            id: string;
            name: string;
            /** @enum {string} */
            type: 'LLM' | 'pipeline';
            provider: string;
            parameters: components['schemas']['ConfigurationParameters'];
            env: ('dev' | 'staging' | 'prod')[];
            tags: string[];
            user_properties?: {
                [key: string]: unknown;
            } | null;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at?: string | null;
        };
        /** @description Request body for POST /configurations */
        CreateConfigurationRequest: {
            name: string;
            /**
             * @default LLM
             * @enum {string}
             */
            type?: 'LLM' | 'pipeline';
            provider: string;
            parameters: components['schemas']['ConfigurationParameters'];
            env?: ('dev' | 'staging' | 'prod')[];
            tags?: string[];
            user_properties?: {
                [key: string]: unknown;
            } | null;
        };
        /** @description Request body for PUT /configurations */
        UpdateConfigurationRequest: {
            name: string;
            /**
             * @default LLM
             * @enum {string}
             */
            type?: 'LLM' | 'pipeline';
            provider?: string;
            parameters?: components['schemas']['ConfigurationParameters'];
            env?: ('dev' | 'staging' | 'prod')[];
            tags?: string[];
            user_properties?: {
                [key: string]: unknown;
            } | null;
        };
        /** @description Query parameters for GET /configurations */
        GetConfigurationsQuery: {
            /** @description Filter configurations by name */
            name?: string;
            /** @description Filter configurations by environment */
            env?: string;
            /** @description Filter configurations by tags */
            tags?: string;
        };
        /** @description Response for POST /configurations */
        CreateConfigurationResponse: {
            acknowledged: boolean;
            insertedId: string;
        };
        /** @description Response for PUT /configurations */
        UpdateConfigurationResponse: {
            acknowledged: boolean;
            modifiedCount: number;
            upsertedId: string | null;
            upsertedCount: number;
            matchedCount: number;
        };
        /** @description Response for DELETE /configurations */
        DeleteConfigurationResponse: {
            acknowledged: boolean;
            deletedCount: number;
        };
        /** @description Response for GET /configurations */
        GetConfigurationsResponse: {
            configurations: components['schemas']['ConfigurationItem'][];
        };
        DatapointMapping: {
            /** @default [] */
            inputs?: string[];
            /** @default [] */
            history?: string[];
            /** @default [] */
            ground_truth?: string[];
        };
        BatchDateRange: {
            $gte?: string;
            $lte?: string;
        };
        CheckState: {
            [key: string]: boolean;
        };
        Datapoint: {
            id: string;
            inputs: {
                [key: string]: unknown;
            };
            history: {
                [key: string]: unknown;
            }[];
            ground_truth: {
                [key: string]: unknown;
            } | null;
            metadata: {
                [key: string]: unknown;
            } | null;
            linked_event: string | null;
            created_at: string;
            updated_at?: string;
            linked_datasets?: string[];
        };
        /** @description Query parameters for GET /datapoints */
        GetDatapointsQuery: {
            /** @description List of datapoint IDs to fetch */
            datapoint_ids?: string[];
            /** @description Dataset name to filter by */
            dataset_name?: string;
        };
        /** @description Path parameters for GET /datapoints/{datapoint_id} */
        GetDatapointParams: {
            /** @description Unique identifier of the datapoint */
            datapoint_id: string;
        };
        /** @description Request body for POST /datapoints */
        CreateDatapointRequest: {
            /** @default {} */
            inputs?: {
                [key: string]: unknown;
            };
            /** @default [] */
            history?: {
                [key: string]: unknown;
            }[];
            ground_truth?: {
                [key: string]: unknown;
            };
            metadata?: {
                [key: string]: unknown;
            };
            linked_event?: string;
            /** @default [] */
            linked_datasets?: string[];
        };
        /** @description Request body for PUT /datapoints/{datapoint_id} */
        UpdateDatapointRequest: {
            inputs?: {
                [key: string]: unknown;
            };
            history?: {
                [key: string]: unknown;
            }[];
            ground_truth?: {
                [key: string]: unknown;
            };
            metadata?: {
                [key: string]: unknown;
            };
            /**
             * @deprecated
             * @description Deprecated: Ignored on updates. Set linked_event when creating a datapoint.
             */
            linked_event?: string;
            linked_datasets?: string[];
        };
        /** @description Path parameters for PUT /datapoints/{datapoint_id} */
        UpdateDatapointParams: {
            datapoint_id: string;
        };
        /** @description Path parameters for DELETE /datapoints/{datapoint_id} */
        DeleteDatapointParams: {
            datapoint_id: string;
        };
        /** @description Request body for POST /datapoints/batch */
        BatchCreateDatapointsRequest: {
            /** @deprecated */
            events?: string[];
            /** @deprecated */
            mapping?: components['schemas']['DatapointMapping'];
            filters?: {
                [key: string]: unknown;
            } | {
                [key: string]: unknown;
            }[];
            dateRange?: components['schemas']['BatchDateRange'];
            checkState?: components['schemas']['CheckState'];
            selectAll?: boolean;
            dataset_id?: string;
        };
        /** @description Response for GET /datapoints */
        GetDatapointsResponse: {
            datapoints: components['schemas']['Datapoint'][];
        };
        /** @description Response for GET /datapoints/{datapoint_id} */
        GetDatapointResponse: {
            datapoint: components['schemas']['Datapoint'][];
        };
        /** @description Response for POST /datapoints */
        CreateDatapointResponse: {
            inserted: boolean;
            result: components['schemas']['CreateDatapointResponseResult'];
        };
        /** @description Response for PUT /datapoints/{datapoint_id} */
        UpdateDatapointResponse: {
            updated: boolean;
            result: components['schemas']['UpdateDatapointResponseResult'];
        };
        /** @description Response for DELETE /datapoints/{datapoint_id} */
        DeleteDatapointResponse: {
            deleted: boolean;
        };
        /** @description Response for POST /datapoints/batch */
        BatchCreateDatapointsResponse: {
            inserted: boolean;
            insertedIds: string[];
        };
        Dataset: {
            id: string;
            name: string;
            description?: string | null;
            datapoints: string[];
            created_at?: string;
            updated_at?: string;
        };
        /** @description Request body for POST /datasets */
        CreateDatasetRequest: {
            /**
             * @description Name of the dataset
             * @default Untitled Dataset
             */
            name?: string;
            /** @description Description of the dataset */
            description?: string;
            /**
             * @description Initial datapoint IDs to include
             * @default []
             */
            datapoints?: string[];
        };
        /** @description Request body for PUT /datasets/{dataset_id} */
        UpdateDatasetRequest: {
            /** @description New dataset name */
            name?: string;
            /** @description New dataset description */
            description?: string;
            /** @description Updated list of datapoint IDs */
            datapoints?: string[];
        };
        /**
         * @deprecated
         * @description Request body for PUT /datasets (deprecated — use PUT /datasets/{dataset_id})
         */
        LegacyUpdateDatasetRequest: {
            /** @description Unique identifier of the dataset to update */
            dataset_id: string;
            /** @description New dataset name */
            name?: string;
            /** @description New dataset description */
            description?: string;
            /** @description Updated list of datapoint IDs */
            datapoints?: string[];
        };
        /** @description Path parameters for DELETE /datasets/{dataset_id} */
        DeleteDatasetParams: {
            /** @description Unique identifier of the dataset to delete */
            dataset_id: string;
        };
        /**
         * @deprecated
         * @description Query parameters for the deprecated DELETE /datasets. Use DELETE /projects/{project_id}/datasets/{dataset_id} instead.
         */
        LegacyDeleteDatasetQuery: {
            /** @description Unique identifier of the dataset to delete */
            dataset_id: string;
        };
        /** @description Request body for POST /datasets/{dataset_id}/datapoints */
        AddDatapointsToDatasetRequest: {
            /** @description Array of datapoint data objects to add */
            data: {
                [key: string]: unknown;
            }[];
            /** @description Field mapping for inputs, ground truth, and history */
            mapping: components['schemas']['DatapointMapping'];
        };
        /**
         * @deprecated
         * @description Path parameters for DELETE /datasets/{dataset_id}/{datapoint_id} (deprecated — use DELETE /datasets/{dataset_id}/datapoints/{datapoint_id})
         */
        LegacyRemoveDatapointFromDatasetParams: {
            /** @description Unique identifier of the dataset */
            dataset_id: string;
            /** @description Unique identifier of the datapoint to remove */
            datapoint_id: string;
        };
        /** @description Response for POST /datasets */
        CreateDatasetResponse: {
            inserted: boolean;
            result: components['schemas']['InsertResult'];
        };
        InsertResult: {
            insertedId: string;
        };
        /** @description Response for PUT /datasets */
        UpdateDatasetResponse: {
            result: components['schemas']['Dataset'];
        };
        /** @description Response for GET /datasets */
        GetDatasetsResponse: {
            datasets: components['schemas']['Dataset'][];
        };
        /** @description Response for DELETE /datasets */
        DeleteDatasetResponse: {
            result: components['schemas']['DeleteResult'];
        };
        DeleteResult: {
            id: string;
        };
        /** @description Response for POST /datasets/{dataset_id}/datapoints */
        AddDatapointsResponse: {
            inserted: boolean;
            datapoint_ids: string[];
        };
        /** @description Response for DELETE /datasets/{dataset_id}/datapoints/{datapoint_id} */
        RemoveDatapointResponse: {
            dereferenced: boolean;
            message: string;
        };
        FiltersArray: components['schemas']['SingleFilter'][];
        EventSearchFiltersArray: components['schemas']['EventSearchFilter'][];
        /** @description Minimal event object used by evaluation and session endpoints; permissive (passthrough) */
        Event: {
            event_id: string;
            project_id: string;
            tenant: string;
            event_name?: string;
            event_type?: string;
            metrics?: {
                [key: string]: unknown;
            };
            metadata?: {
                [key: string]: unknown;
            };
            feedback?: components['schemas']['EventFeedback'];
        } & {
            [key: string]: unknown;
        };
        /** @description Full event object for legacy event creation endpoints */
        LegacyEvent: {
            /**
             * @deprecated
             * @description Project name (ignored by server — project is determined from API key scope)
             */
            project?: string;
            /** @description Project ID */
            project_id?: string;
            /** @description Source of the event (e.g., sdk-python) */
            source?: string;
            /** @description Name of the event */
            event_name?: string;
            /**
             * @description Type of event (model, tool, chain, or session)
             * @enum {string}
             */
            event_type?: 'model' | 'tool' | 'chain' | 'session';
            /** @description Unique event identifier */
            event_id?: string;
            /** @description Session this event belongs to */
            session_id?: string;
            /** @description Parent event ID in the trace hierarchy */
            parent_id?: string;
            /** @description Child event IDs in the trace hierarchy */
            children_ids?: string[];
            /** @description Configuration used for this event */
            config?: {
                [key: string]: unknown;
            };
            /** @description Input data for the event */
            inputs?: {
                [key: string]: unknown;
            };
            /** @description Output data from the event */
            outputs?: {
                [key: string]: unknown;
            };
            /** @description Error message if the event failed */
            error?: string | null;
            /** @description Event start time as Unix milliseconds */
            start_time?: number;
            /** @description Event end time as Unix milliseconds */
            end_time?: number;
            /** @description Event duration in milliseconds */
            duration?: number;
            /** @description Arbitrary metadata for the event */
            metadata?: {
                [key: string]: unknown;
            };
            /** @description Feedback data associated with the event */
            feedback?: {
                [key: string]: unknown;
            };
            /** @description Metric values computed for the event */
            metrics?: {
                [key: string]: unknown;
            };
            /** @description User properties associated with the event */
            user_properties?: {
                [key: string]: unknown;
            };
        } & {
            [key: string]: unknown;
        };
        /** @description Model event object with model-specific fields and legacy aliases */
        ModelEvent: {
            /**
             * @deprecated
             * @description Project name (ignored by server — project is determined from API key scope)
             */
            project?: string;
            /** @description Project ID */
            project_id?: string;
            /** @description Source of the event (e.g., sdk-python) */
            source?: string;
            /** @description Name of the event */
            event_name?: string;
            /**
             * @description Type of event (model, tool, chain, or session)
             * @enum {string}
             */
            event_type?: 'model' | 'tool' | 'chain' | 'session';
            /** @description Unique event identifier */
            event_id?: string;
            /** @description Session this event belongs to */
            session_id?: string;
            /** @description Parent event ID in the trace hierarchy */
            parent_id?: string;
            /** @description Child event IDs in the trace hierarchy */
            children_ids?: string[];
            /** @description Configuration used for this event */
            config?: {
                [key: string]: unknown;
            };
            /** @description Input data for the event */
            inputs?: {
                [key: string]: unknown;
            };
            /** @description Output data from the event */
            outputs?: {
                [key: string]: unknown;
            };
            /**
             * @deprecated
             * @description Legacy alias — remapped to inputs.error for model events
             */
            error?: string | null;
            /** @description Event start time as Unix milliseconds */
            start_time?: number;
            /** @description Event end time as Unix milliseconds */
            end_time?: number;
            /**
             * @deprecated
             * @description Legacy alias — remapped to inputs.duration for model events
             */
            duration?: number;
            /** @description Arbitrary metadata for the event */
            metadata?: {
                [key: string]: unknown;
            };
            /** @description Feedback data associated with the event */
            feedback?: {
                [key: string]: unknown;
            };
            /** @description Metric values computed for the event */
            metrics?: {
                [key: string]: unknown;
            };
            /** @description User properties associated with the event */
            user_properties?: {
                [key: string]: unknown;
            };
            /** @description Model identifier (either this or event_name required) */
            model_name?: string;
            /** @description Model version string */
            model_version?: string;
            /**
             * @deprecated
             * @description Legacy alias for model_name
             */
            model?: string;
            /**
             * @deprecated
             * @description Legacy alias — remapped to inputs.messages
             */
            messages?: unknown[];
            /**
             * @deprecated
             * @description Legacy alias — remapped to outputs.response
             */
            response?: unknown;
            /**
             * @deprecated
             * @description Legacy alias — remapped to inputs.provider
             */
            provider?: string;
            /**
             * @deprecated
             * @description Legacy alias — remapped to inputs.usage
             */
            usage?: {
                [key: string]: unknown;
            };
            /**
             * @deprecated
             * @description Legacy alias — remapped to inputs.cost
             */
            cost?: unknown;
            /**
             * @deprecated
             * @description Legacy alias — remapped to inputs.hyperparameters
             */
            hyperparameters?: {
                [key: string]: unknown;
            };
            /**
             * @deprecated
             * @description Legacy alias — remapped to inputs.template
             */
            template?: unknown;
            /**
             * @deprecated
             * @description Legacy alias — remapped to inputs.template_inputs
             */
            template_inputs?: unknown;
            /**
             * @deprecated
             * @description Legacy alias — remapped to inputs.tools
             */
            tools?: unknown;
            /**
             * @deprecated
             * @description Legacy alias — remapped to inputs.tool_choice
             */
            tool_choice?: unknown;
            /**
             * @deprecated
             * @description Legacy alias — remapped to inputs.response_format
             */
            response_format?: unknown;
        } & {
            [key: string]: unknown;
        };
        /** @description Session properties for batch event creation */
        SessionProperties: {
            session_name?: string;
            /** @description Session start time as Unix milliseconds */
            start_time?: number;
            user_properties?: {
                [key: string]: unknown;
            };
            metadata?: {
                [key: string]: unknown;
            };
        } & {
            [key: string]: unknown;
        };
        /** @description Request body for PUT /v1/events/{event_id} */
        UpdateEventRequest: {
            /** @description Metadata fields to merge into the event */
            metadata?: {
                [key: string]: unknown;
            };
            /** @description Feedback fields to merge into the event */
            feedback?: {
                [key: string]: unknown;
            };
            /** @description Metric values to merge into the event */
            metrics?: {
                [key: string]: unknown;
            };
            /** @description Output object to replace on the event. Must be an object or null; null preserves the existing outputs. Non-object values (strings, arrays, scalars) are rejected. */
            outputs?: {
                [key: string]: unknown;
            } | null;
            /** @description Configuration fields to merge into the event */
            config?: {
                [key: string]: unknown;
            };
            /** @description User properties to merge into the event */
            user_properties?: {
                [key: string]: unknown;
            };
            /** @description Event duration in milliseconds */
            duration?: number;
            /** @description Unix timestamp in milliseconds for event end */
            end_time?: number;
            /** @description IDs of child events to set (must be non-empty; an empty array is ignored) */
            children_ids?: string[];
        };
        /**
         * @deprecated
         * @description Request to update an existing event (deprecated — use PUT /v1/events/{event_id})
         */
        LegacyUpdateEventRequest: {
            /** @description Event ID to update */
            event_id: string;
            /** @description Metadata fields to merge into the event */
            metadata?: {
                [key: string]: unknown;
            };
            /** @description Feedback fields to merge into the event */
            feedback?: {
                [key: string]: unknown;
            };
            /** @description Metric values to merge into the event */
            metrics?: {
                [key: string]: unknown;
            };
            /** @description Output object to replace on the event. Must be an object or null; null preserves the existing outputs. Non-object values (strings, arrays, scalars) are rejected. */
            outputs?: {
                [key: string]: unknown;
            } | null;
            /** @description Configuration fields to merge into the event */
            config?: {
                [key: string]: unknown;
            };
            /** @description User properties to merge into the event */
            user_properties?: {
                [key: string]: unknown;
            };
            /** @description Event duration in milliseconds */
            duration?: number;
            /** @description Unix timestamp in milliseconds for event end */
            end_time?: number;
            /** @description IDs of child events to set (must be non-empty; an empty array is ignored) */
            children_ids?: string[];
        };
        /** @description Request body for POST /v1/events (bare event object) */
        PostEventRequest: {
            /** @description Project ID */
            project_id?: string;
            /** @description Source of the event (e.g., sdk-python) */
            source?: string;
            /** @description Name of the event */
            event_name?: string;
            /**
             * @description Type of event (model, tool, chain, or session)
             * @enum {string}
             */
            event_type: 'model' | 'tool' | 'chain' | 'session';
            /** @description Unique event identifier */
            event_id?: string;
            /** @description Session this event belongs to */
            session_id?: string;
            /** @description Parent event ID in the trace hierarchy */
            parent_id?: string;
            /** @description Child event IDs in the trace hierarchy */
            children_ids?: string[];
            /** @description Configuration used for this event */
            config?: {
                [key: string]: unknown;
            };
            /** @description Input data for the event */
            inputs: {
                [key: string]: unknown;
            };
            /** @description Output data from the event */
            outputs?: {
                [key: string]: unknown;
            };
            /** @description Error message if the event failed */
            error?: string | null;
            /** @description Event start time as Unix milliseconds */
            start_time?: number;
            /** @description Event end time as Unix milliseconds */
            end_time?: number;
            /** @description Event duration in milliseconds */
            duration?: number;
            /** @description Arbitrary metadata for the event */
            metadata?: {
                [key: string]: unknown;
            };
            /** @description Feedback data associated with the event */
            feedback?: {
                [key: string]: unknown;
            };
            /** @description Metric values computed for the event */
            metrics?: {
                [key: string]: unknown;
            };
            /** @description User properties associated with the event */
            user_properties?: {
                [key: string]: unknown;
            };
        };
        /**
         * @deprecated
         * @description Request body for POST /events (deprecated — use POST /v1/events)
         */
        LegacyPostEventRequest: {
            event: components['schemas']['LegacyPostEventRequestEvent'];
        };
        /** @description Request body for POST /v1/events/search */
        SearchEventsRequest: {
            /** @description Array of filter criteria to apply */
            filters?: components['schemas']['EventSearchFiltersArray'];
            dateRange?: components['schemas']['SearchEventsRequestDateRange'];
            /** @description Limit number of results (default 1000, max 1000) */
            limit?: number;
            /** @description Page number of results (default 1) */
            page?: number;
            /** @description Deprecated: accepted but ignored. Results are always ordered by start_time descending. */
            ignore_order?: boolean;
            /** @description Filter by evaluation/experiment run ID */
            evaluation_id?: string;
        };
        /** @description Request body for POST /v1/events/export */
        LegacyExportEventsRequest: {
            /** @description Array of filter criteria to apply */
            filters?: components['schemas']['FiltersArray'];
            dateRange?: components['schemas']['LegacyExportEventsRequestDateRange'];
            /** @description Fields to include in the response */
            projections?: string[];
            /** @description Limit number of results (default 1000, max 7500) */
            limit?: number;
            /** @description Page number of results (default 1) */
            page?: number;
            /** @description If true, skip result ordering for faster queries */
            ignore_order?: boolean;
            /** @description Filter by evaluation/experiment run ID */
            evaluation_id?: string;
        };
        /** @description Request body for POST /events/model */
        PostModelEventRequest: {
            model_event: components['schemas']['ModelEvent'];
        };
        /** @description Request body for POST /v1/events/batch */
        PostEventBatchRequest: {
            /** @description Array of events to create */
            events: components['schemas']['PostEventRequest'][];
            /** @description If true, all events share the same session */
            single_session?: boolean;
            session_properties?: components['schemas']['SessionProperties'];
        };
        /**
         * @deprecated
         * @description Request body for POST /events/batch (deprecated — use POST /v1/events/batch)
         */
        LegacyPostEventBatchRequest: {
            /** @description Array of events to create */
            events: components['schemas']['LegacyEvent'][];
            /** @description If true, all events share the same session */
            single_session?: boolean;
            /**
             * @deprecated
             * @description Legacy field name for single_session (backward compatibility)
             */
            is_single_session?: boolean;
            /**
             * @deprecated
             * @description Alias for session_properties (backward compatibility)
             */
            session?: components['schemas']['SessionProperties'];
            session_properties?: components['schemas']['SessionProperties'];
        };
        /** @description Request body for POST /events/model/batch */
        PostModelEventBatchRequest: {
            /** @description Array of model events to create */
            model_events: components['schemas']['ModelEvent'][];
            /** @description If true, all events share the same session */
            single_session?: boolean;
            /**
             * @deprecated
             * @description Legacy field name for single_session (backward compatibility)
             */
            is_single_session?: boolean;
            /**
             * @deprecated
             * @description Alias for session_properties (backward compatibility)
             */
            session?: components['schemas']['SessionProperties'];
            session_properties?: components['schemas']['SessionProperties'];
        };
        /** @description Query parameters for GET /events */
        GetEventsQuery: {
            /** @description Date range filter */
            dateRange?: components['schemas']['RelativeDateRange'] | components['schemas']['AbsoluteDateRange'];
            /** @description Event filters to apply */
            filters?: components['schemas']['FiltersArray'];
            /** @description Fields to include in the response */
            projections?: string[];
            /** @description If true, skip result ordering for faster queries */
            ignore_order?: boolean;
            /** @description Maximum number of results to return */
            limit?: number;
            /** @description Page number for pagination */
            page?: number;
            /** @description Filter by evaluation/experiment run ID */
            evaluation_id?: string;
        };
        /** @description Response after creating an event */
        PostEventResponse: {
            success: boolean;
            event_id: string;
        };
        /** @description Response for GET /events */
        GetEventsResponse: {
            events: unknown[];
            totalEvents: number;
        };
        /** @description Response for GET /events/:event_id — single event payload */
        GetEventResponse: {
            event: components['schemas']['GetEventResponseEvent'];
        };
        /** @description Response for POST /v1/events/search and POST /v1/events/export */
        ExportEventsResponse: {
            events: components['schemas']['LegacyEvent'][];
            count: number;
        };
        /** @description Response for POST /events/batch */
        PostEventBatchResponse: {
            event_ids: string[];
            session_id?: string;
            success: boolean;
        };
        PassingRange: {
            min?: number;
            max?: number;
        };
        MetricDatapoints: {
            /** @description Datapoint/session IDs that passed this metric */
            passed: string[];
            /** @description Datapoint/session IDs that failed this metric */
            failed: string[];
        };
        MetricDetail: {
            metric_name: string;
            /**
             * @description Type of metric evaluator
             * @enum {string}
             */
            metric_type?: 'COMPOSITE' | 'PYTHON' | 'LLM' | 'HUMAN' | 'CLIENT_SIDE';
            /** @description Name of the event this metric was computed on */
            event_name?: string;
            /** @description Type of event (model, tool, chain, session) */
            event_type?: string;
            /** @description Aggregated metric value */
            aggregate?: number;
            /** @description Individual metric values across datapoints */
            values?: number[];
            passing_range?: components['schemas']['PassingRange'];
            datapoints?: components['schemas']['MetricDatapoints'];
        };
        DatapointResult: {
            datapoint_id?: string | null;
            session_id: string;
            passed: boolean;
            metrics?: unknown[];
        };
        EventDetail: {
            event_name: string;
            event_type: string;
        };
        ExperimentSchemaField: {
            name: string;
            event_type: string;
        };
        ExperimentSchemaMappingEntry: {
            field_name: string;
            event_type: string;
        };
        MetricsAggregation: {
            aggregation_function?: string;
            details?: components['schemas']['MetricDetail'][];
        };
        ExperimentRunObject: {
            id: string;
            run_id: string;
            name?: string | null;
            description?: string | null;
            status?: string | null;
            metadata: {
                [key: string]: unknown;
            };
            results: {
                [key: string]: unknown;
            };
            metrics?: {
                [key: string]: number;
            };
            event_ids: string[];
            configuration: {
                [key: string]: unknown;
            };
            is_active: boolean;
            created_at: string;
            updated_at?: string | null;
            scope_type: string;
            scope_id: string;
            dataset_id?: string | null;
            dataset_name?: string | null;
        };
        EventComparisonDetail: {
            event_name: string;
            event_type: string;
            /** @enum {string} */
            presence: 'old' | 'new' | 'both';
        };
        MetricComparison: {
            metric_name: string;
            metric_type?: string;
            old_aggregate?: number;
            new_aggregate?: number;
            difference?: number;
            percentage_change?: number;
        };
        EventMetricData: {
            event_name: string;
            event_type: string;
            session_id: string;
            metadata: components['schemas']['EventMetricDataMetadata'];
            /** @description Metric name → value, merged from numeric, float, and boolean ClickHouse columns */
            metrics: {
                [key: string]: number | boolean;
            };
        };
        ComparableEvent: {
            datapoint_id: string;
            /** @description Full event record from the first run */
            event_1: {
                [key: string]: unknown;
            };
            /** @description Full event record from the second run */
            event_2: {
                [key: string]: unknown;
            };
        };
        /** @description Request body for POST /runs */
        PostExperimentRunRequest: {
            /** @description Optional client-generated UUID. A value that is not a valid UUID is replaced by a generated one; the response's run_id is authoritative. */
            run_id?: string;
            /** @description Experiment run display name */
            name?: string;
            description?: string;
            /**
             * @default pending
             * @enum {string}
             */
            status?: 'pending' | 'completed' | 'failed' | 'cancelled' | 'running';
            metadata?: {
                [key: string]: unknown;
            };
            results?: {
                [key: string]: unknown;
            };
            dataset_id?: string | null;
            /** @default [] */
            event_ids?: string[];
            configuration?: {
                [key: string]: unknown;
            };
            /** @default [] */
            evaluators?: unknown[];
            /** @default [] */
            session_ids?: string[];
            /** @default [] */
            datapoint_ids?: string[];
            passing_ranges?: {
                [key: string]: components['schemas']['PassingRange'];
            };
        };
        /** @description Request body for PUT /runs/{run_id} */
        PutExperimentRunRequest: {
            /** @description Experiment run display name */
            name?: string;
            description?: string;
            /** @enum {string} */
            status?: 'pending' | 'completed' | 'failed' | 'cancelled' | 'running';
            metadata?: {
                [key: string]: unknown;
            };
            results?: {
                [key: string]: unknown;
            };
            event_ids?: string[];
            configuration?: {
                [key: string]: unknown;
            };
            evaluators?: unknown[];
            session_ids?: string[];
            datapoint_ids?: string[];
            passing_ranges?: {
                [key: string]: components['schemas']['PassingRange'];
            };
        };
        /** @description Query parameters for GET /runs */
        GetExperimentRunsQuery: {
            /** @description Filter by dataset ID */
            dataset_id?: string;
            /**
             * @description Page number for pagination
             * @default 1
             */
            page?: number;
            /**
             * @description Number of results per page (max 100)
             * @default 20
             */
            limit?: number;
            /** @description Filter by specific run IDs */
            run_ids?: string[];
            /** @description Filter by run name */
            name?: string;
            /**
             * @description Filter by run status
             * @enum {string}
             */
            status?: 'pending' | 'completed' | 'failed' | 'cancelled' | 'running';
            /** @description Filter by date range */
            dateRange?: string | components['schemas']['AbsoluteDateRange'];
            /**
             * @description Field to sort results by
             * @default created_at
             * @enum {string}
             */
            sort_by?: 'created_at' | 'updated_at' | 'name' | 'status';
            /**
             * @description Sort order
             * @default desc
             * @enum {string}
             */
            sort_order?: 'asc' | 'desc';
        };
        /** @description Path parameters for GET /runs/{run_id} */
        GetExperimentRunParams: {
            run_id: string;
        };
        /** @description Query parameters for GET /runs/{run_id}/metrics */
        GetExperimentRunMetricsQuery: {
            /** @description Date range filter as JSON string */
            dateRange?: string;
            /** @description Filters to apply to metrics */
            filters?: string | unknown[];
        };
        /**
         * @deprecated
         * @description Query parameters for GET /runs/{run_id}/result (deprecated — use GET /runs/{run_id}/summary)
         */
        LegacyGetExperimentRunResultQuery: {
            /**
             * @description Aggregation function to apply (default: average)
             * @default average
             */
            aggregate_function?: string;
            /** @description Filters to apply to results */
            filters?: string | unknown[];
        };
        /**
         * @deprecated
         * @description Path parameters for GET /runs/{new_run_id}/compare-with/{old_run_id} (deprecated — use GET /runs/{new_run_id}/compare/{old_run_id})
         */
        LegacyGetExperimentRunCompareParams: {
            /** @description The new run ID to compare */
            new_run_id: string;
            /** @description The old run ID to compare against */
            old_run_id: string;
        };
        /**
         * @deprecated
         * @description Query parameters for GET /runs/{new_run_id}/compare-with/{old_run_id} (deprecated — use GET /runs/{new_run_id}/compare/{old_run_id})
         */
        LegacyGetExperimentRunCompareQuery: {
            /**
             * @description Aggregation function to apply (default: average)
             * @default average
             */
            aggregate_function?: string;
            /** @description Filters to apply to comparison */
            filters?: string | unknown[];
        };
        /**
         * @deprecated
         * @description Query parameters for GET /runs/compare/events (deprecated — use GET /runs/{new_run_id}/compare/{old_run_id}/events)
         */
        LegacyGetExperimentRunCompareEventsQuery: {
            /** @description First run ID to compare */
            run_id_1: string;
            /** @description Second run ID to compare */
            run_id_2: string;
            /** @description Filter by event name */
            event_name?: string;
            /** @description Filter by event type */
            event_type?: string;
            /** @description Additional filter criteria */
            filter?: string | {
                [key: string]: unknown;
            };
            /**
             * @description Maximum number of results (max 1000)
             * @default 1000
             */
            limit?: number;
            /**
             * @description Page number for pagination
             * @default 1
             */
            page?: number;
        };
        /** @description Path parameters for DELETE /runs/{run_id} */
        DeleteExperimentRunParams: {
            run_id: string;
        };
        /**
         * @deprecated
         * @description Query parameters for GET /events/schema (deprecated — use GET /runs/{run_id}/schema or GET /runs/schema)
         */
        LegacyGetEventsSchemaQuery: {
            /** @description Date range to filter schema by */
            dateRange?: string | components['schemas']['AbsoluteDateRange'];
            /** @description Filter by evaluation/run ID */
            evaluation_id?: string;
        };
        /** @description Response for POST /runs */
        PostExperimentRunResponse: {
            evaluation: components['schemas']['ExperimentRunObject'];
            run_id: string;
        };
        /** @description Response for PUT /runs/{run_id} */
        PutExperimentRunResponse: {
            evaluation: components['schemas']['ExperimentRunObject'];
            warning?: string;
        };
        /** @description Response for GET /runs */
        GetExperimentRunsResponse: {
            evaluations: components['schemas']['ExperimentRunObject'][];
            pagination: components['schemas']['Pagination'];
            metrics: string[];
        };
        /** @description Response for GET /runs/{run_id} */
        GetExperimentRunResponse: {
            evaluation: components['schemas']['ExperimentRunObject'];
        };
        /** @description Evaluation summary for an experiment run: pass/fail results, metric aggregations, per-datapoint results, event details, and the experiment run object. */
        GetExperimentRunResultResponse: {
            status: string;
            success: boolean;
            error?: string;
            passed: string[];
            failed: string[];
            metrics: components['schemas']['MetricsAggregation'];
            datapoints: components['schemas']['DatapointResult'][];
            event_details: components['schemas']['EventDetail'][];
            run_object: components['schemas']['ExperimentRunObject'];
        };
        /** @description Comparison between two experiment runs including metrics, common datapoints, and event details */
        GetExperimentRunCompareResponse: {
            metrics: components['schemas']['MetricComparison'][];
            commonDatapoints: string[];
            event_details: components['schemas']['EventComparisonDetail'][];
            old_run: components['schemas']['ExperimentRunObject'];
            new_run: components['schemas']['ExperimentRunObject'];
        };
        /** @description Response for GET /runs/{run_id}/metrics */
        GetExperimentRunMetricsResponse: {
            events: components['schemas']['EventMetricData'][];
            /** @description Total number of events matching the query */
            totalEvents: number;
        };
        /** @description Response for GET /events/schema, GET /runs/{run_id}/schema, and GET /runs/schema */
        GetEventsSchemaResponse: {
            fields: components['schemas']['ExperimentSchemaField'][];
            datasets: string[];
            mappings: {
                [key: string]: components['schemas']['ExperimentSchemaMappingEntry'][];
            };
        };
        /** @description Response for GET /runs/{new_run_id}/compare/{old_run_id}/events */
        GetExperimentCompareEventsResponse: {
            events: components['schemas']['ComparableEvent'][];
            /** @description Total number of events matching the comparison query */
            totalEvents: number;
        };
        /** @description Response for DELETE /runs/{run_id} */
        DeleteExperimentRunResponse: {
            id: string;
            deleted: boolean;
        };
        MetricItem: {
            name: string;
            /** @enum {string} */
            type: 'PYTHON' | 'LLM' | 'HUMAN' | 'COMPOSITE';
            criteria: string;
            description: string | null;
            /** @enum {string} */
            return_type: 'float' | 'boolean' | 'string' | 'categorical';
            enabled_in_prod: boolean;
            sampling_percentage: number;
            model_provider?: string | null;
            model_name?: string | null;
            scale?: number | null;
            threshold?: {
                min?: number;
                max?: number;
                pass_when?: boolean | number;
                passing_categories?: string[];
            } | null;
            categories?: components['schemas']['MetricItemCategoriesItem'][] | null;
            /**
             * @deprecated
             * @description Deprecated and ignored. Ground-truth use is inferred from the evaluator definition.
             */
            needs_ground_truth: boolean;
            /**
             * @deprecated
             * @description Deprecated and ignored. Composite metrics are no longer supported.
             */
            child_metrics?: components['schemas']['MetricItemChildMetricsItem'][] | null;
            filters: components['schemas']['MetricItemFilters'];
            id: string;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string | null;
        };
        /** @description Request body for POST /metrics */
        CreateMetricRequest: {
            name: string;
            /** @enum {string} */
            type: 'PYTHON' | 'LLM' | 'HUMAN' | 'COMPOSITE';
            criteria: string;
            /** @default  */
            description?: string;
            /**
             * @default float
             * @enum {string}
             */
            return_type?: 'float' | 'boolean' | 'string' | 'categorical';
            /** @default false */
            enabled_in_prod?: boolean;
            /** @default 10 */
            sampling_percentage?: number;
            model_provider?: string | null;
            model_name?: string | null;
            scale?: number | null;
            threshold?: {
                min?: number;
                max?: number;
                pass_when?: boolean | number;
                passing_categories?: string[];
            } | null;
            categories?: components['schemas']['CreateMetricRequestCategoriesItem'][] | null;
            /**
             * @deprecated
             * @description Deprecated and ignored. Ground-truth use is inferred from the evaluator definition.
             */
            needs_ground_truth?: boolean;
            /**
             * @deprecated
             * @description Deprecated and ignored. Composite metrics are no longer supported.
             */
            child_metrics?: components['schemas']['CreateMetricRequestChildMetricsItem'][] | null;
            filters?: components['schemas']['CreateMetricRequestFilters'];
        };
        /** @description Request body for PUT /metrics/{metric_id} */
        UpdateMetricRequest: {
            name?: string;
            /** @enum {string} */
            type?: 'PYTHON' | 'LLM' | 'HUMAN' | 'COMPOSITE';
            criteria?: string;
            description?: string | null;
            /** @enum {string} */
            return_type?: 'float' | 'boolean' | 'string' | 'categorical';
            enabled_in_prod?: boolean;
            sampling_percentage?: number;
            model_provider?: string | null;
            model_name?: string | null;
            scale?: number | null;
            threshold?: components['schemas']['UpdateMetricRequestThreshold'];
            categories?: components['schemas']['UpdateMetricRequestCategoriesItem'][];
            /**
             * @deprecated
             * @description Deprecated and ignored. Ground-truth use is inferred from the evaluator definition.
             */
            needs_ground_truth?: boolean;
            /**
             * @deprecated
             * @description Deprecated and ignored. Composite metrics are no longer supported.
             */
            child_metrics?: components['schemas']['UpdateMetricRequestChildMetricsItem'][] | null;
            filters?: components['schemas']['UpdateMetricRequestFilters'];
        };
        /**
         * @deprecated
         * @description Request body for PUT /metrics (deprecated — use PUT /metrics/{metric_id})
         */
        LegacyUpdateMetricRequest: {
            name?: string;
            /** @enum {string} */
            type?: 'PYTHON' | 'LLM' | 'HUMAN' | 'COMPOSITE';
            criteria?: string;
            description?: string | null;
            /** @enum {string} */
            return_type?: 'float' | 'boolean' | 'string' | 'categorical';
            enabled_in_prod?: boolean;
            sampling_percentage?: number;
            model_provider?: string | null;
            model_name?: string | null;
            scale?: number | null;
            threshold?: {
                min?: number;
                max?: number;
                pass_when?: boolean | number;
                passing_categories?: string[];
            } | null;
            categories?: components['schemas']['LegacyUpdateMetricRequestCategoriesItem'][] | null;
            /**
             * @deprecated
             * @description Deprecated and ignored. Ground-truth use is inferred from the evaluator definition.
             */
            needs_ground_truth?: boolean;
            /**
             * @deprecated
             * @description Deprecated and ignored. Composite metrics are no longer supported.
             */
            child_metrics?: components['schemas']['LegacyUpdateMetricRequestChildMetricsItem'][] | null;
            filters?: components['schemas']['LegacyUpdateMetricRequestFilters'];
            id: string;
        };
        /** @description Query parameters for GET /metrics */
        GetMetricsQuery: {
            /** @description Filter metrics by type */
            type?: string;
            /** @description Filter by metric ID */
            id?: string;
        };
        /** @description Request body for POST /metrics/run */
        RunMetricRequest: {
            metric: components['schemas']['RunMetricRequestMetric'];
            event: components['schemas']['RunMetricRequestEvent'];
        };
        /**
         * @deprecated
         * @description Request body for POST /metrics/run_metric (deprecated — use POST /metrics/run)
         */
        LegacyRunMetricRequest: {
            metric: components['schemas']['LegacyRunMetricRequestMetric'];
            event: components['schemas']['LegacyRunMetricRequestEvent'];
        };
        /** @description Response for GET /metrics */
        GetMetricsResponse: {
            metrics: components['schemas']['MetricItem'][];
        };
        /** @description Response for POST /metrics */
        CreateMetricResponse: {
            inserted: boolean;
            metric_id: string;
        };
        /** @description Response for PUT /metrics */
        UpdateMetricResponse: {
            updated: boolean;
        };
        /** @description Response for DELETE /metrics/{metric_id} */
        DeleteMetricResponse: {
            deleted: boolean;
        };
        /** @description Response for POST /metrics/run */
        RunMetricResponse: {
            success: boolean;
            loading: boolean;
            result: boolean | number | string | null;
            explanation: string | null;
        };
        /** @description Versioned snapshot of a metric definition. */
        MetricVersionContent: {
            name: string;
            /** @enum {string} */
            type: 'PYTHON' | 'LLM' | 'HUMAN' | 'COMPOSITE';
            criteria: string;
            description: string | null;
            /** @enum {string} */
            return_type: 'float' | 'boolean' | 'string' | 'categorical';
            enabled_in_prod: boolean;
            sampling_percentage: number;
            model_provider?: string | null;
            model_name?: string | null;
            scale?: number | null;
            threshold?: {
                min?: number;
                max?: number;
                pass_when?: boolean | number;
                passing_categories?: string[];
            } | null;
            categories?: components['schemas']['MetricVersionContentCategoriesItem'][] | null;
            /**
             * @deprecated
             * @description Deprecated and ignored. Ground-truth use is inferred from the evaluator definition.
             */
            needs_ground_truth: boolean;
            /**
             * @deprecated
             * @description Deprecated and ignored. Composite metrics are no longer supported.
             */
            child_metrics?: components['schemas']['MetricVersionContentChildMetricsItem'][] | null;
            filters: components['schemas']['MetricVersionContentFilters'];
        };
        /**
         * @description Metric definition snapshot accepted by POST /v1/metrics/{metric_id}/versions.
         *     Five fields are optional and fall back to server-side defaults when omitted:
         *     - `description` → `""`
         *     - `return_type` → `"float"`
         *     - `enabled_in_prod` → `true` for HUMAN metrics, `false` otherwise
         *     - `sampling_percentage` → `10`
         *     - `filters` → `{ "filterArray": [] }`
         */
        MetricVersionContentRequest: {
            name: string;
            /** @enum {string} */
            type: 'PYTHON' | 'LLM' | 'HUMAN' | 'COMPOSITE';
            criteria: string;
            /**
             * @description Free-form description of the metric. Defaults to an empty string.
             * @default
             */
            description?: string;
            /**
             * @description Return type of the metric. Defaults to `float`.
             * @default float
             * @enum {string}
             */
            return_type?: 'float' | 'boolean' | 'string' | 'categorical';
            /**
             * @description Whether this version should run against production traffic. Defaults to `false` for non-HUMAN metrics and `true` for HUMAN metrics.
             * @default false
             */
            enabled_in_prod?: boolean;
            /**
             * @description Percentage of events the metric should run against, 0–100. Defaults to `10`.
             * @default 10
             */
            sampling_percentage?: number;
            model_provider?: string | null;
            model_name?: string | null;
            scale?: number | null;
            threshold?: {
                min?: number;
                max?: number;
                pass_when?: boolean | number;
                passing_categories?: string[];
            } | null;
            categories?: components['schemas']['MetricVersionContentRequestCategoriesItem'][] | null;
            /**
             * @deprecated
             * @description Deprecated and ignored. Ground-truth use is inferred from the evaluator definition.
             */
            needs_ground_truth?: boolean;
            /**
             * @deprecated
             * @description Deprecated and ignored. Composite metrics are no longer supported.
             */
            child_metrics?: components['schemas']['MetricVersionContentRequestChildMetricsItem'][] | null;
            filters?: components['schemas']['MetricVersionContentRequestFilters'];
        };
        /** @description A versioned snapshot of a metric definition. */
        MetricVersion: {
            name: string;
            full_sha: string;
            message: string;
            /** Format: date-time */
            date: string;
            deployed: boolean;
            content: components['schemas']['MetricVersionContent'];
        };
        /** @description Request body for POST /v1/metrics/{metric_id}/versions */
        CreateMetricVersionRequest: {
            message: string;
            content: components['schemas']['MetricVersionContentRequest'];
            deploy_immediately?: boolean;
        };
        /** @description Response for GET /v1/metrics/{metric_id}/versions */
        GetMetricVersionsResponse: {
            /** @enum {boolean} */
            success: true;
            data: components['schemas']['MetricVersion'][];
        };
        /** @description Response for POST /v1/metrics/{metric_id}/versions */
        CreateMetricVersionResponse: {
            /** @enum {boolean} */
            success: true;
            data: components['schemas']['MetricVersion'];
        };
        /** @description Response for POST /v1/metrics/{metric_id}/versions/{version_name}/deploy */
        DeployMetricVersionResponse: {
            /** @enum {boolean} */
            success: true;
            data: components['schemas']['MetricVersion'];
        };
        CreateAnnotationQueueRequest: {
            name: string;
            /** @default  */
            description?: string;
            filters?: components['schemas']['CreateAnnotationQueueRequestFilters'];
            /** @default true */
            enabled?: boolean;
            /** @default [] */
            event_ids?: string[];
        };
        UpdateAnnotationQueueRequest: {
            name?: string;
            description?: string;
            filters?: components['schemas']['UpdateAnnotationQueueRequestFilters'];
            enabled?: boolean;
            /**
             * @deprecated
             * @description Deprecated: the queue id comes from the path, which overrides any value sent here.
             */
            id?: string;
            add_event_ids?: string[];
            remove_event_ids?: string[];
        };
        CreateAnnotationQueueResponse: {
            queue: components['schemas']['CreateAnnotationQueueResponseQueue'];
            message: string;
        };
        UpdateAnnotationQueueResponse: {
            queue: components['schemas']['UpdateAnnotationQueueResponseQueue'];
            message: string;
        };
        GetAnnotationQueuesResponse: {
            queues: components['schemas']['GetAnnotationQueuesResponseQueuesItem'][];
        };
        GetAnnotationQueueByIdResponse: {
            name: string;
            description: string;
            filters: components['schemas']['GetAnnotationQueueByIdResponseFilters'];
            enabled: boolean;
            id: string;
            scope_id: string;
            /** @enum {string} */
            scope_type: 'system' | 'controlplane' | 'dataplane' | 'org' | 'workspace' | 'project';
            is_active: boolean;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string | null;
        };
        DeleteAnnotationQueueResponse: {
            message: string;
        };
        /** @description Minimal event object used by evaluation and session endpoints; permissive (passthrough) */
        PostSessionRequest: {
            event_id: string;
            project_id: string;
            tenant: string;
            event_name?: string;
            event_type?: string;
            metrics?: {
                [key: string]: unknown;
            };
            metadata?: {
                [key: string]: unknown;
            };
            feedback?: components['schemas']['PostSessionRequestFeedback'];
        } & {
            [key: string]: unknown;
        };
        /**
         * @deprecated
         * @description Request body for POST /session/start (deprecated — use POST /v1/sessions)
         */
        LegacyStartSessionRequest: {
            session: components['schemas']['LegacyStartSessionRequestSession'];
        };
        /** @description Request body for POST /v1/sessions (bare session object) */
        StartSessionRequest: {
            /** @description Client-provided session ID (server generates one if omitted) */
            session_id?: string;
            /** @description Display name for the session */
            session_name?: string;
            /** @description Fallback name if session_name is not provided */
            event_name?: string;
            /** @description Source of the session (e.g., sdk-python) */
            source?: string;
            /** @description Session start time as Unix milliseconds */
            start_time?: number;
            /** @description Session end time as Unix milliseconds */
            end_time?: number;
            /** @description Session duration in milliseconds */
            duration?: number;
            /** @description Configuration associated with the session */
            config?: {
                [key: string]: unknown;
            };
            /** @description Input data for the session */
            inputs?: {
                [key: string]: unknown;
            };
            /** @description Output data from the session */
            outputs?: {
                [key: string]: unknown;
            };
            /** @description Arbitrary metadata for the session */
            metadata?: {
                [key: string]: unknown;
            };
            /** @description User properties associated with the session */
            user_properties?: {
                [key: string]: unknown;
            };
            /** @description IDs of child events in this session */
            children_ids?: string[];
        };
        /**
         * @deprecated
         * @description Request body for POST /session/{session_id}/traces (deprecated — use POST /v1/sessions/{session_id}/events/batch). Exactly one of `logs` (deprecated) or `events` must be present.
         */
        AddSessionTracesRequest: {
            /**
             * @deprecated
             * @description Deprecated: use `events` instead. Traces to add as raw event objects.
             */
            logs?: components['schemas']['LegacyEvent'][];
            /** @description Traces to add as raw event objects. Replaces `logs`. */
            events?: components['schemas']['LegacyEvent'][];
        };
        /** @description Request body for POST /v1/sessions/{session_id}/events/batch */
        SessionEventBatchRequest: {
            /** @description Events to add to the session */
            events: components['schemas']['PostEventRequest'][];
        };
        /** @description Full session event object returned after starting a new session */
        PostSessionStartResponse: {
            event_id: string;
            session_id: string;
            parent_id?: string | null;
            children_ids?: string[];
            event_type?: string | null;
            event_name?: string | null;
            config?: unknown;
            inputs?: unknown;
            outputs?: unknown;
            error?: string | null;
            source?: string | null;
            duration?: number | null;
            user_properties?: unknown;
            metrics?: unknown;
            feedback?: unknown;
            metadata?: unknown;
            org_id: string;
            workspace_id: string;
            project_id: string;
            start_time?: number | null;
            end_time?: number | null;
        } & {
            [key: string]: unknown;
        };
        /** @description Response from adding traces to a session */
        SessionTracesResponse: {
            success: boolean;
        };
        /** @description Placeholder schema. The response shape for this endpoint is not yet fully specified; refer to the endpoint documentation for the fields it returns. */
        TODOSchema: {
            /** @description Placeholder - Zod schema not yet implemented */
            message: string;
        };
        CreateDataPlaneApiKeyResponseData: {
            key_value: string;
            key_id: string;
            permissions: string[];
            /** @enum {string} */
            root_scope_type: 'project';
            root_scope_id: string;
            /** Format: date-time */
            expires_at: string;
        };
        CreateIngestionApiKeyResponseData: {
            key_value: string;
            key_id: string;
            name: string;
            description: string | null;
            /** @enum {string} */
            root_scope_type: 'project';
            root_scope_id: string;
        };
        /** @description Delta baseline; default none */
        ChartQueryScalarComparison: {
            /** @enum {string} */
            mode: 'previous_period' | 'none';
        };
        /** @description Omit for no sparkline — it is a second query, so it is opt-in */
        ChartQueryScalarSparkline: {
            /** @enum {string} */
            interval?: 'auto';
            /** @description Default 50; sparklines are small */
            max_points?: number;
        };
        ChartQueryHistogramBins: {
            /** @enum {string} */
            mode: 'count';
            /** @description Default 20, at most 200 */
            count?: number;
            /** @description Lower edge; discovered from the data when omitted */
            min?: number;
            /** @description Upper edge; the p99 of the data when omitted, so one outlier cannot flatten the chart */
            max?: number;
        };
        /** @description Default: first measure, descending */
        ChartQueryTableOrderBy: {
            /** @description A measure id or a group field; a measure wins if a name is both */
            field: string;
            /** @enum {string} */
            direction?: 'asc' | 'desc';
        };
        /** @description What the server resolved; the UI cannot label the x-axis without it */
        ChartResultTimeSeriesMetaEffectiveBucket: {
            interval: string;
            /** @enum {string} */
            fill: 'zero' | 'null';
        };
        ChartResultTimeSeriesMetaRanking: {
            limit: number;
            total_series: number;
        };
        ChartResultTimeSeriesMeta: {
            /** @description Rows in scope after filters and dedup; powers empty-state vs error-state UI */
            matched_event_count: number;
            warnings: components['schemas']['ChartResultWarning'][];
            effective_bucket: components['schemas']['ChartResultTimeSeriesMetaEffectiveBucket'];
            ranking?: components['schemas']['ChartResultTimeSeriesMetaRanking'];
        };
        ChartResultTimeSeriesData: {
            /** @description Full axis, no gaps; UTC instants of timezone-local bucket starts */
            buckets: string[];
            series: components['schemas']['ChartResultSeries'][];
        };
        ChartResultCategoricalMeta: {
            warnings: components['schemas']['ChartResultWarning'][];
        };
        ChartResultCategoricalData: {
            categories: components['schemas']['ChartResultCategory'][];
            series: components['schemas']['ChartResultSeries'][];
        };
        ChartResultScalarMeta: {
            /** @description Rows in scope after filters and dedup; powers empty-state vs error-state UI */
            matched_event_count: number;
            warnings: components['schemas']['ChartResultWarning'][];
        };
        ChartResultScalarDataComparisonSparkline: {
            interval: string;
            buckets: string[];
            values: (number | null)[];
        };
        ChartResultScalarDataComparison: {
            value: number | null;
            /** @description Server-derived; the UI labels the delta with this rather than re-deriving it */
            date_range: components['schemas']['ChartQueryDateRange'];
            sparkline?: components['schemas']['ChartResultScalarDataComparisonSparkline'];
        };
        ChartResultScalarDataSparkline: {
            interval: string;
            buckets: string[];
            values: (number | null)[];
        };
        ChartResultScalarData: {
            value: number | null;
            comparison?: components['schemas']['ChartResultScalarDataComparison'];
            sparkline?: components['schemas']['ChartResultScalarDataSparkline'];
        };
        ChartResultHistogramMeta: {
            /** @description Rows in scope after filters and dedup; powers empty-state vs error-state UI */
            matched_event_count: number;
            warnings: components['schemas']['ChartResultWarning'][];
        };
        ChartResultHistogramDataBinsItem: {
            start: number;
            end: number | null;
            count: number;
        };
        ChartResultHistogramData: {
            bins: components['schemas']['ChartResultHistogramDataBinsItem'][];
            markers: {
                [key: string]: number | null;
            };
        };
        ChartResultTableMetaRanking: {
            limit: number;
            total_categories: number;
        };
        ChartResultTableMeta: {
            /** @description Rows in scope after filters and dedup; powers empty-state vs error-state UI */
            matched_event_count: number;
            warnings: components['schemas']['ChartResultWarning'][];
            ranking: components['schemas']['ChartResultTableMetaRanking'];
        };
        ChartResultTableDataRowsItem: {
            /** @description Stable within a response; safe as a React key */
            key: string;
            /** @description Display string; "(empty)" for a stored empty string */
            label: string;
            /** @description Machine-readable identity, e.g. { "config.model": "gpt-4o" } */
            dimensions: {
                [key: string]: string;
            };
            values: {
                [key: string]: number | null;
            };
        };
        ChartResultTableData: {
            rows: components['schemas']['ChartResultTableDataRowsItem'][];
        };
        ChartResultScatterMeta: {
            /** @description Rows in scope after filters and dedup; powers empty-state vs error-state UI */
            matched_event_count: number;
            warnings: components['schemas']['ChartResultWarning'][];
            /** @description True when the group count exceeded the limit */
            truncated: boolean;
        };
        ChartResultScatterDataPointsItem: {
            /** @description Stable within a response; safe as a React key */
            key: string;
            /** @description Display string; "(empty)" for a stored empty string */
            label: string;
            /** @description Machine-readable identity, e.g. { "config.model": "gpt-4o" } */
            dimensions: {
                [key: string]: string;
            };
            x: number;
            y: number;
            weight: number;
        };
        ChartResultScatterData: {
            points: components['schemas']['ChartResultScatterDataPointsItem'][];
        };
        CreateChartResponseData: {
            id: string;
            name: string;
            description: string | null;
            metric: string;
            func: string | null;
            groupBy: string | null;
            bucketing: string;
            dateRange: {
                [key: string]: unknown;
            } | null;
            query: components['schemas']['QueryFilter'][] | null;
            owner_id: string | null;
            owner_profile?: {
                [key: string]: unknown;
            } | null;
            is_active: boolean;
            created_at: string;
            updated_at: string | null;
        };
        GetChartResponseData: {
            id: string;
            name: string;
            description: string | null;
            metric: string;
            func: string | null;
            groupBy: string | null;
            bucketing: string;
            dateRange: {
                [key: string]: unknown;
            } | null;
            query: components['schemas']['QueryFilter'][] | null;
            owner_id: string | null;
            owner_profile?: {
                [key: string]: unknown;
            } | null;
            is_active: boolean;
            created_at: string;
            updated_at: string | null;
        };
        GetChartsResponseDataItem: {
            id: string;
            name: string;
            description: string | null;
            metric: string;
            func: string | null;
            groupBy: string | null;
            bucketing: string;
            dateRange: {
                [key: string]: unknown;
            } | null;
            query: components['schemas']['QueryFilter'][] | null;
            owner_id: string | null;
            owner_profile?: {
                [key: string]: unknown;
            } | null;
            is_active: boolean;
            created_at: string;
            updated_at: string | null;
        };
        UpdateChartResponseData: {
            id: string;
            name: string;
            description: string | null;
            metric: string;
            func: string | null;
            groupBy: string | null;
            bucketing: string;
            dateRange: {
                [key: string]: unknown;
            } | null;
            query: components['schemas']['QueryFilter'][] | null;
            owner_id: string | null;
            owner_profile?: {
                [key: string]: unknown;
            } | null;
            is_active: boolean;
            created_at: string;
            updated_at: string | null;
        };
        CreateDatapointResponseResult: {
            insertedIds: string[];
        };
        UpdateDatapointResponseResult: {
            modifiedCount: number;
        };
        EventFeedback: {
            ground_truth?: unknown;
        };
        /** @description Full event object for legacy event creation endpoints */
        LegacyPostEventRequestEvent: {
            /**
             * @deprecated
             * @description Project name (ignored by server — project is determined from API key scope)
             */
            project?: string;
            /** @description Project ID */
            project_id?: string;
            /** @description Source of the event (e.g., sdk-python) */
            source?: string;
            /** @description Name of the event */
            event_name?: string;
            /** @enum {string} */
            event_type: 'model' | 'tool' | 'chain' | 'session';
            /** @description Unique event identifier */
            event_id?: string;
            /** @description Session this event belongs to */
            session_id?: string;
            /** @description Parent event ID in the trace hierarchy */
            parent_id?: string;
            /** @description Child event IDs in the trace hierarchy */
            children_ids?: string[];
            /** @description Configuration used for this event */
            config?: {
                [key: string]: unknown;
            };
            inputs: {
                [key: string]: unknown;
            };
            /** @description Output data from the event */
            outputs?: {
                [key: string]: unknown;
            };
            /** @description Error message if the event failed */
            error?: string | null;
            /** @description Event start time as Unix milliseconds */
            start_time?: number;
            /** @description Event end time as Unix milliseconds */
            end_time?: number;
            /** @description Event duration in milliseconds */
            duration?: number;
            /** @description Arbitrary metadata for the event */
            metadata?: {
                [key: string]: unknown;
            };
            /** @description Feedback data associated with the event */
            feedback?: {
                [key: string]: unknown;
            };
            /** @description Metric values computed for the event */
            metrics?: {
                [key: string]: unknown;
            };
            /** @description User properties associated with the event */
            user_properties?: {
                [key: string]: unknown;
            };
        } & {
            [key: string]: unknown;
        };
        SearchEventsRequestDateRange: {
            /**
             * Format: date-time
             * @description ISO 8601 timestamp for start of date range (inclusive)
             */
            start_time: string;
            /**
             * Format: date-time
             * @description ISO 8601 timestamp for end of date range (inclusive)
             */
            end_time: string;
        };
        LegacyExportEventsRequestDateRange: {
            /** @description ISO String for start of date range */
            $gte: string;
            /** @description ISO String for end of date range */
            $lte: string;
        };
        /** @description Full event object for legacy event creation endpoints */
        GetEventResponseEvent: {
            /**
             * @deprecated
             * @description Project name (ignored by server — project is determined from API key scope)
             */
            project?: string;
            /** @description Project ID */
            project_id?: string;
            /** @description Source of the event (e.g., sdk-python) */
            source?: string;
            /** @description Name of the event */
            event_name?: string;
            /**
             * @description Type of event (model, tool, chain, or session)
             * @enum {string}
             */
            event_type?: 'model' | 'tool' | 'chain' | 'session';
            event_id: string;
            /** @description Session this event belongs to */
            session_id?: string;
            /** @description Parent event ID in the trace hierarchy */
            parent_id?: string;
            /** @description Child event IDs in the trace hierarchy */
            children_ids?: string[];
            /** @description Configuration used for this event */
            config?: {
                [key: string]: unknown;
            };
            /** @description Input data for the event */
            inputs?: {
                [key: string]: unknown;
            };
            /** @description Output data from the event */
            outputs?: {
                [key: string]: unknown;
            };
            /** @description Error message if the event failed */
            error?: string | null;
            /** @description Event start time as Unix milliseconds */
            start_time?: number;
            /** @description Event end time as Unix milliseconds */
            end_time?: number;
            /** @description Event duration in milliseconds */
            duration?: number;
            /** @description Arbitrary metadata for the event */
            metadata?: {
                [key: string]: unknown;
            };
            /** @description Feedback data associated with the event */
            feedback?: {
                [key: string]: unknown;
            };
            /** @description Metric values computed for the event */
            metrics?: {
                [key: string]: unknown;
            };
            /** @description User properties associated with the event */
            user_properties?: {
                [key: string]: unknown;
            };
        } & {
            [key: string]: unknown;
        };
        EventMetricDataMetadata: {
            datapoint_id?: string;
        };
        MetricItemCategoriesItem: {
            category: string;
            score: number | null;
        };
        MetricItemChildMetricsItem: {
            id?: string;
            name: string;
            weight: number;
            scale?: number | null;
        };
        MetricItemFilters: {
            filterArray: components['schemas']['FiltersArray'];
        };
        CreateMetricRequestCategoriesItem: {
            category: string;
            score: number | null;
        };
        CreateMetricRequestChildMetricsItem: {
            id?: string;
            name: string;
            weight: number;
            scale?: number | null;
        };
        /**
         * @default {
         *       "filterArray": []
         *     }
         */
        CreateMetricRequestFilters: {
            filterArray: components['schemas']['FiltersArray'];
        };
        UpdateMetricRequestThreshold: {
            min?: number;
            max?: number;
            pass_when?: boolean | number;
            passing_categories?: string[];
        };
        UpdateMetricRequestCategoriesItem: {
            category: string;
            score: number | null;
        };
        UpdateMetricRequestChildMetricsItem: {
            id?: string;
            name: string;
            weight: number;
            scale?: number | null;
        };
        UpdateMetricRequestFilters: {
            filterArray: components['schemas']['FiltersArray'];
        };
        LegacyUpdateMetricRequestCategoriesItem: {
            category: string;
            score: number | null;
        };
        LegacyUpdateMetricRequestChildMetricsItem: {
            id?: string;
            name: string;
            weight: number;
            scale?: number | null;
        };
        LegacyUpdateMetricRequestFilters: {
            filterArray: components['schemas']['FiltersArray'];
        };
        RunMetricRequestMetricCategoriesItem: {
            category: string;
            score: number | null;
        };
        RunMetricRequestMetricChildMetricsItem: {
            id?: string;
            name: string;
            weight: number;
            scale?: number | null;
        };
        /**
         * @default {
         *       "filterArray": []
         *     }
         */
        RunMetricRequestMetricFilters: {
            filterArray: components['schemas']['FiltersArray'];
        };
        RunMetricRequestMetric: {
            name: string;
            /** @enum {string} */
            type: 'LLM' | 'PYTHON';
            criteria: string;
            /** @default  */
            description?: string;
            /**
             * @default float
             * @enum {string}
             */
            return_type?: 'float' | 'boolean' | 'string' | 'categorical';
            /** @default false */
            enabled_in_prod?: boolean;
            /** @default 10 */
            sampling_percentage?: number;
            model_provider?: string | null;
            model_name?: string | null;
            scale?: number | null;
            threshold?: {
                min?: number;
                max?: number;
                pass_when?: boolean | number;
                passing_categories?: string[];
            } | null;
            categories?: components['schemas']['RunMetricRequestMetricCategoriesItem'][] | null;
            /**
             * @deprecated
             * @description Deprecated and ignored. Ground-truth use is inferred from the evaluator definition.
             */
            needs_ground_truth?: boolean;
            /**
             * @deprecated
             * @description Deprecated and ignored. Composite metrics are no longer supported.
             */
            child_metrics?: components['schemas']['RunMetricRequestMetricChildMetricsItem'][] | null;
            filters?: components['schemas']['RunMetricRequestMetricFilters'];
        };
        RunMetricRequestEventFeedback: {
            ground_truth?: unknown;
        } & {
            [key: string]: unknown;
        };
        RunMetricRequestEvent: {
            event_type?: string;
            event_name?: string;
            inputs?: {
                [key: string]: unknown;
            };
            outputs?: {
                [key: string]: unknown;
            };
            /**
             * @deprecated
             * @description Deprecated: ignored. The workspace whose provider credentials run the metric is derived from the caller’s authenticated scope.
             */
            workspace_id?: string;
            feedback?: components['schemas']['RunMetricRequestEventFeedback'];
        } & {
            [key: string]: unknown;
        };
        LegacyRunMetricRequestMetricCategoriesItem: {
            category: string;
            score: number | null;
        };
        LegacyRunMetricRequestMetricChildMetricsItem: {
            id?: string;
            name: string;
            weight: number;
            scale?: number | null;
        };
        /**
         * @default {
         *       "filterArray": []
         *     }
         */
        LegacyRunMetricRequestMetricFilters: {
            filterArray: components['schemas']['FiltersArray'];
        };
        LegacyRunMetricRequestMetric: {
            name: string;
            /** @enum {string} */
            type: 'LLM' | 'PYTHON';
            criteria: string;
            /** @default  */
            description?: string;
            /**
             * @default float
             * @enum {string}
             */
            return_type?: 'float' | 'boolean' | 'string' | 'categorical';
            /** @default false */
            enabled_in_prod?: boolean;
            /** @default 10 */
            sampling_percentage?: number;
            model_provider?: string | null;
            model_name?: string | null;
            scale?: number | null;
            threshold?: {
                min?: number;
                max?: number;
                pass_when?: boolean | number;
                passing_categories?: string[];
            } | null;
            categories?: components['schemas']['LegacyRunMetricRequestMetricCategoriesItem'][] | null;
            /**
             * @deprecated
             * @description Deprecated and ignored. Ground-truth use is inferred from the evaluator definition.
             */
            needs_ground_truth?: boolean;
            /**
             * @deprecated
             * @description Deprecated and ignored. Composite metrics are no longer supported.
             */
            child_metrics?: components['schemas']['LegacyRunMetricRequestMetricChildMetricsItem'][] | null;
            filters?: components['schemas']['LegacyRunMetricRequestMetricFilters'];
        };
        LegacyRunMetricRequestEventFeedback: {
            ground_truth?: unknown;
        } & {
            [key: string]: unknown;
        };
        LegacyRunMetricRequestEvent: {
            event_type?: string;
            event_name?: string;
            inputs?: {
                [key: string]: unknown;
            };
            outputs?: {
                [key: string]: unknown;
            };
            /**
             * @deprecated
             * @description Deprecated: ignored. The workspace whose provider credentials run the metric is derived from the caller’s authenticated scope.
             */
            workspace_id?: string;
            feedback?: components['schemas']['LegacyRunMetricRequestEventFeedback'];
        } & {
            [key: string]: unknown;
        };
        MetricVersionContentCategoriesItem: {
            category: string;
            score: number | null;
        };
        MetricVersionContentChildMetricsItem: {
            id?: string;
            name: string;
            weight: number;
            scale?: number | null;
        };
        MetricVersionContentFilters: {
            filterArray: components['schemas']['FiltersArray'];
        };
        MetricVersionContentRequestCategoriesItem: {
            category: string;
            score: number | null;
        };
        MetricVersionContentRequestChildMetricsItem: {
            id?: string;
            name: string;
            weight: number;
            scale?: number | null;
        };
        /**
         * @description ETL filter narrowing which events this metric applies to. Defaults to `{ filterArray: [] }` (no filtering).
         * @default {
         *       "filterArray": []
         *     }
         */
        MetricVersionContentRequestFilters: {
            filterArray: components['schemas']['FiltersArray'];
        };
        /**
         * @default {
         *       "filterArray": []
         *     }
         */
        CreateAnnotationQueueRequestFilters: {
            filterArray: components['schemas']['FiltersArray'];
        };
        UpdateAnnotationQueueRequestFilters: {
            filterArray: components['schemas']['FiltersArray'];
        };
        CreateAnnotationQueueResponseQueueFilters: {
            filterArray: components['schemas']['FiltersArray'];
        };
        CreateAnnotationQueueResponseQueue: {
            name: string;
            description: string;
            filters: components['schemas']['CreateAnnotationQueueResponseQueueFilters'];
            enabled: boolean;
            id: string;
            scope_id: string;
            /** @enum {string} */
            scope_type: 'system' | 'controlplane' | 'dataplane' | 'org' | 'workspace' | 'project';
            is_active: boolean;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string | null;
        };
        UpdateAnnotationQueueResponseQueueFilters: {
            filterArray: components['schemas']['FiltersArray'];
        };
        UpdateAnnotationQueueResponseQueue: {
            name: string;
            description: string;
            filters: components['schemas']['UpdateAnnotationQueueResponseQueueFilters'];
            enabled: boolean;
            id: string;
            scope_id: string;
            /** @enum {string} */
            scope_type: 'system' | 'controlplane' | 'dataplane' | 'org' | 'workspace' | 'project';
            is_active: boolean;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string | null;
        };
        GetAnnotationQueuesResponseQueuesItemFilters: {
            filterArray: components['schemas']['FiltersArray'];
        };
        GetAnnotationQueuesResponseQueuesItem: {
            name: string;
            description: string;
            filters: components['schemas']['GetAnnotationQueuesResponseQueuesItemFilters'];
            enabled: boolean;
            id: string;
            scope_id: string;
            /** @enum {string} */
            scope_type: 'system' | 'controlplane' | 'dataplane' | 'org' | 'workspace' | 'project';
            is_active: boolean;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string | null;
        };
        GetAnnotationQueueByIdResponseFilters: {
            filterArray: components['schemas']['FiltersArray'];
        };
        PostSessionRequestFeedback: {
            ground_truth?: unknown;
        };
        LegacyStartSessionRequestSession: {
            /** @description Client-provided session ID (server generates one if omitted) */
            session_id?: string;
            /** @description Display name for the session */
            session_name?: string;
            /** @description Fallback name if session_name is not provided */
            event_name?: string;
            /** @description Source of the session (e.g., sdk-python) */
            source?: string;
            /** @description Session start time as Unix milliseconds */
            start_time?: number;
            /** @description Session end time as Unix milliseconds */
            end_time?: number;
            /** @description Session duration in milliseconds */
            duration?: number;
            /** @description Configuration associated with the session */
            config?: {
                [key: string]: unknown;
            };
            /** @description Input data for the session */
            inputs?: {
                [key: string]: unknown;
            };
            /** @description Output data from the session */
            outputs?: {
                [key: string]: unknown;
            };
            /** @description Arbitrary metadata for the session */
            metadata?: {
                [key: string]: unknown;
            };
            /** @description User properties associated with the session */
            user_properties?: {
                [key: string]: unknown;
            };
            /** @description IDs of child events in this session */
            children_ids?: string[];
        } & {
            [key: string]: unknown;
        };
        GetEventsSchemaLegacyDateRangeOneOf1: {
            $gte?: string | number;
            $lte?: string | number;
        };
        GetRunsDateRangeOneOf1: {
            $gte?: string | number;
            $lte?: string | number;
        };
        GetRunsSchemaDateRangeOneOf1: {
            $gte?: string | number;
            $lte?: string | number;
        };
        GetRunSchemaDateRangeOneOf1: {
            $gte?: string | number;
            $lte?: string | number;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    startSessionLegacy: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['LegacyStartSessionRequest'];
            };
        };
        responses: {
            /** @description Session successfully started */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['PostSessionStartResponse'];
                };
            };
        };
    };
    addSessionTracesLegacy: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Session ID to add traces to */
                session_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['AddSessionTracesRequest'];
            };
        };
        responses: {
            /** @description Traces added successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['SessionTracesResponse'];
                };
            };
            /** @description Bad request: both `logs` and `events` supplied, or neither, or invalid event payload. */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    createSession: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['StartSessionRequest'];
            };
        };
        responses: {
            /** @description Session successfully started */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['PostSessionStartResponse'];
                };
            };
            /** @description Bad request (invalid session data) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    createSessionEventBatch: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Session ID to add events to */
                session_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['SessionEventBatchRequest'];
            };
        };
        responses: {
            /** @description Events added successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "success": true
                     *     }
                     */
                    'application/json': components['schemas']['SessionTracesResponse'];
                };
            };
            /** @description Bad request (invalid event data or missing required fields) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Events partially added */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    updateEventLegacy: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                /**
                 * @example {
                 *       "event_id": "7f22137a-6911-4ed3-bc36-110f1dde6b66",
                 *       "metadata": {
                 *         "cost": 0.00008,
                 *         "completion_tokens": 23,
                 *         "prompt_tokens": 35,
                 *         "total_tokens": 58
                 *       },
                 *       "feedback": {
                 *         "rating": 5
                 *       },
                 *       "metrics": {
                 *         "num_words": 2
                 *       },
                 *       "outputs": {
                 *         "role": "assistant",
                 *         "content": "Hello world"
                 *       },
                 *       "config": {
                 *         "template": [
                 *           {
                 *             "role": "system",
                 *             "content": "Hello, {{ name }}!"
                 *           }
                 *         ]
                 *       },
                 *       "user_properties": {
                 *         "user_id": "691b1f94-d38c-4e92-b051-5e03fee9ff86"
                 *       },
                 *       "duration": 42
                 *     }
                 */
                'application/json': components['schemas']['LegacyUpdateEventRequest'];
            };
        };
        responses: {
            /** @description Event updated */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Bad request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    createEventLegacy: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['LegacyPostEventRequest'];
            };
        };
        responses: {
            /** @description Event created successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "event_id": "7f22137a-6911-4ed3-bc36-110f1dde6b66",
                     *       "success": true
                     *     }
                     */
                    'application/json': components['schemas']['PostEventResponse'];
                };
            };
            /** @description Bad request (invalid event data or missing required fields) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    createEvent: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['PostEventRequest'];
            };
        };
        responses: {
            /** @description Event created successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "event_id": "7f22137a-6911-4ed3-bc36-110f1dde6b66",
                     *       "success": true
                     *     }
                     */
                    'application/json': components['schemas']['PostEventResponse'];
                };
            };
            /** @description Bad request (invalid event data or missing required fields) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getEventLegacy: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The unique identifier of the event to retrieve */
                event_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Event retrieved successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['GetEventResponse'];
                };
            };
            /** @description Bad request (invalid event_id) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Event not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    updateEvent: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The unique identifier of the event to update */
                event_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                /**
                 * @example {
                 *       "metadata": {
                 *         "cost": 0.00008,
                 *         "completion_tokens": 23,
                 *         "prompt_tokens": 35,
                 *         "total_tokens": 58
                 *       },
                 *       "feedback": {
                 *         "rating": 5
                 *       },
                 *       "metrics": {
                 *         "num_words": 2
                 *       },
                 *       "outputs": {
                 *         "role": "assistant",
                 *         "content": "Hello world"
                 *       },
                 *       "config": {
                 *         "template": [
                 *           {
                 *             "role": "system",
                 *             "content": "Hello, {{ name }}!"
                 *           }
                 *         ]
                 *       },
                 *       "user_properties": {
                 *         "user_id": "691b1f94-d38c-4e92-b051-5e03fee9ff86"
                 *       },
                 *       "duration": 42
                 *     }
                 */
                'application/json': components['schemas']['UpdateEventRequest'];
            };
        };
        responses: {
            /** @description Event updated */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Bad request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getEvent: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The unique identifier of the project that owns the event */
                project_id: string;
                /** @description The unique identifier of the event to retrieve */
                event_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Event retrieved successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['GetEventResponse'];
                };
            };
            /** @description Bad request (invalid event_id) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Event not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    exportEventsLegacy: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['LegacyExportEventsRequest'];
            };
        };
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['ExportEventsResponse'];
                };
            };
        };
    };
    searchEventsLegacy: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['SearchEventsRequest'];
            };
        };
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['ExportEventsResponse'];
                };
            };
        };
    };
    searchEvents: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The unique identifier of the project whose events to search */
                project_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['SearchEventsRequest'];
            };
        };
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['ExportEventsResponse'];
                };
            };
        };
    };
    createEventBatch: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['PostEventBatchRequest'];
            };
        };
        responses: {
            /** @description Events created */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "event_ids": [
                     *         "7f22137a-6911-4ed3-bc36-110f1dde6b66",
                     *         "7f22137a-6911-4ed3-bc36-110f1dde6b67"
                     *       ],
                     *       "session_id": "caf77ace-3417-4da4-944d-f4a0688f3c23",
                     *       "success": true
                     *     }
                     */
                    'application/json': components['schemas']['PostEventBatchResponse'];
                };
            };
            /** @description Bad request (invalid event data or missing required fields) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Events partially created */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    createModelEventLegacy: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['PostModelEventRequest'];
            };
        };
        responses: {
            /** @description Model event created */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "event_id": "7f22137a-6911-4ed3-bc36-110f1dde6b66",
                     *       "success": true
                     *     }
                     */
                    'application/json': components['schemas']['PostEventResponse'];
                };
            };
        };
    };
    createEventBatchLegacy: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['LegacyPostEventBatchRequest'];
            };
        };
        responses: {
            /** @description Events created */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "event_ids": [
                     *         "7f22137a-6911-4ed3-bc36-110f1dde6b66",
                     *         "7f22137a-6911-4ed3-bc36-110f1dde6b67"
                     *       ],
                     *       "session_id": "caf77ace-3417-4da4-944d-f4a0688f3c23",
                     *       "success": true
                     *     }
                     */
                    'application/json': components['schemas']['PostEventBatchResponse'];
                };
            };
            /** @description Events partially created */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    createModelEventBatchLegacy: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['PostModelEventBatchRequest'];
            };
        };
        responses: {
            /** @description Model events created */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "event_ids": [
                     *         "7f22137a-6911-4ed3-bc36-110f1dde6b66",
                     *         "7f22137a-6911-4ed3-bc36-110f1dde6b67"
                     *       ],
                     *       "success": true
                     *     }
                     */
                    'application/json': components['schemas']['PostEventBatchResponse'];
                };
            };
            /** @description Model events partially created */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getChartsLegacy: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Charts retrieved successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['GetChartsResponse'];
                };
            };
        };
    };
    createChartLegacy: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['CreateChartRequest'];
            };
        };
        responses: {
            /** @description Chart created successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['CreateChartResponse'];
                };
            };
        };
    };
    getChartLegacy: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The unique identifier of the chart to retrieve */
                chart_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Chart retrieved successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['GetChartResponse'];
                };
            };
        };
    };
    updateChartLegacy: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The unique identifier of the chart to update */
                chart_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['UpdateChartRequest'];
            };
        };
        responses: {
            /** @description Chart updated successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['UpdateChartResponse'];
                };
            };
        };
    };
    deleteChartLegacy: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The unique identifier of the chart to delete */
                chart_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Chart deleted successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['DeleteChartResponse'];
                };
            };
        };
    };
    getCharts: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The unique identifier of the project whose charts are listed */
                project_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Charts retrieved successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['GetChartsResponse'];
                };
            };
        };
    };
    createChart: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The unique identifier of the project the chart is created in */
                project_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['CreateChartRequest'];
            };
        };
        responses: {
            /** @description Chart created successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['CreateChartResponse'];
                };
            };
        };
    };
    queryChart: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The unique identifier of the project whose events are queried */
                project_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['ChartQueryRequest'];
            };
        };
        responses: {
            /** @description Chart query result */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['ChartQueryResponse'];
                };
            };
            /** @description The request is invalid or the query cannot be planned */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description The query exceeded its time or memory budget (`errorCode` `query_timeout` or `query_too_large`). Narrow the date range or add filters. */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description The query uses a shape that is not served yet (`scatter`, or a categorical `split_by` / `split_ranking`) */
            501: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getChart: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The unique identifier of the project that owns the chart */
                project_id: string;
                /** @description The unique identifier of the chart to retrieve */
                chart_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Chart retrieved successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['GetChartResponse'];
                };
            };
        };
    };
    deleteChart: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The unique identifier of the project that owns the chart */
                project_id: string;
                /** @description The unique identifier of the chart to delete */
                chart_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Chart deleted successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['DeleteChartResponse'];
                };
            };
        };
    };
    updateChart: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The unique identifier of the project that owns the chart */
                project_id: string;
                /** @description The unique identifier of the chart to update */
                chart_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['UpdateChartRequest'];
            };
        };
        responses: {
            /** @description Chart updated successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['UpdateChartResponse'];
                };
            };
        };
    };
    createDataPlaneApiKey: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The unique identifier of the project the key is rooted at */
                project_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['CreateDataPlaneApiKeyRequest'];
            };
        };
        responses: {
            /** @description Data plane API key created successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['CreateDataPlaneApiKeyResponse'];
                };
            };
        };
    };
    createIngestionApiKey: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The unique identifier of the project the key belongs to */
                project_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['CreateIngestionApiKeyRequest'];
            };
        };
        responses: {
            /** @description Ingestion API key created successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['CreateIngestionApiKeyResponse'];
                };
            };
        };
    };
    getMetrics: {
        parameters: {
            query?: {
                /** @description Filter by metric type */
                type?: string;
                /** @description Filter by specific metric ID */
                id?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Metrics retrieved successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['GetMetricsResponse'];
                };
            };
        };
    };
    updateMetricLegacy: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['LegacyUpdateMetricRequest'];
            };
        };
        responses: {
            /** @description Metric updated successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['UpdateMetricResponse'];
                };
            };
        };
    };
    createMetric: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['CreateMetricRequest'];
            };
        };
        responses: {
            /** @description Metric created successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['CreateMetricResponse'];
                };
            };
        };
    };
    deleteMetricLegacy: {
        parameters: {
            query: {
                metric_id: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Metric deleted successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['DeleteMetricResponse'];
                };
            };
        };
    };
    updateMetric: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The unique identifier of the metric to update */
                metric_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['UpdateMetricRequest'];
            };
        };
        responses: {
            /** @description Metric updated successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['UpdateMetricResponse'];
                };
            };
        };
    };
    deleteMetric: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The unique identifier of the metric to delete */
                metric_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Metric deleted successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['DeleteMetricResponse'];
                };
            };
        };
    };
    getMetricVersions: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The unique identifier of the metric whose versions are being listed */
                metric_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Metric versions retrieved successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['GetMetricVersionsResponse'];
                };
            };
            /** @description No metric with the given `metric_id` exists in the caller's scope. */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    createMetricVersion: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The unique identifier of the metric to version */
                metric_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['CreateMetricVersionRequest'];
            };
        };
        responses: {
            /** @description Metric version created successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['CreateMetricVersionResponse'];
                };
            };
            /** @description Invalid `content` payload. Fails cross-field validation (e.g. an `LLM` metric without `model_provider`/`model_name`). */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No metric with the given `metric_id` exists in the caller's scope. */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    deployMetricVersion: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The unique identifier of the metric */
                metric_id: string;
                /** @description The name of the version to deploy */
                version_name: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Metric version deployed successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['DeployMetricVersionResponse'];
                };
            };
            /** @description No metric with the given `metric_id` exists in the caller's scope, or no version with the given `version_name` exists for that metric. */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    runMetric: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['RunMetricRequest'];
            };
        };
        responses: {
            /** @description Metric evaluation succeeded */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['RunMetricResponse'];
                };
            };
            /** @description Bad request. Either the request body failed validation (malformed metric or event), or the metric could not be evaluated because the request was deficient before any compute ran (the metric requires ground truth the event lacks, or the metric config is invalid). The error `message` describes the specific cause. */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Could not process content. A compute request was dispatched but evaluation failed — e.g. the metric's code raised an error (`errorCode` `execution_error`, `compilation_error`) or the LLM evaluator's template/provider/response failed (`template_render_error`, `llm_response_parse_error`, ...). The error `message` carries the evaluator's detailed failure text. */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal error while running the metric. */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    runMetricLegacy: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['LegacyRunMetricRequest'];
            };
        };
        responses: {
            /** @description Metric evaluation succeeded */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['RunMetricResponse'];
                };
            };
            /** @description Bad request. Either the request body failed validation (malformed metric or event), or the metric could not be evaluated because the request was deficient before any compute ran (missing ground truth, invalid metric config). The error `message` describes the specific cause. */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Could not process content. A compute request was dispatched but evaluation failed (e.g. `execution_error`, `template_render_error`, `llm_response_parse_error`). */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal error while running the metric. */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getDatapointsLegacy: {
        parameters: {
            query?: {
                /** @description List of datapoint ids to fetch */
                datapoint_ids?: string[];
                /** @description Name of the dataset to get datapoints from */
                dataset_name?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['GetDatapointsResponse'];
                };
            };
        };
    };
    createDatapointLegacy: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['CreateDatapointRequest'];
            };
        };
        responses: {
            /** @description Datapoint successfully created */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['CreateDatapointResponse'];
                };
            };
        };
    };
    batchCreateDatapointsLegacy: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['BatchCreateDatapointsRequest'];
            };
        };
        responses: {
            /** @description Datapoints successfully created in batch */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['BatchCreateDatapointsResponse'];
                };
            };
        };
    };
    getDatapointLegacy: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Datapoint ID like `65c13dbbd65fb876b7886cdb` */
                datapoint_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['GetDatapointResponse'];
                };
            };
        };
    };
    updateDatapointLegacy: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description ID of datapoint to update */
                datapoint_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['UpdateDatapointRequest'];
            };
        };
        responses: {
            /** @description Datapoint successfully updated */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['UpdateDatapointResponse'];
                };
            };
            /** @description Error updating datapoint */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    deleteDatapointLegacy: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Datapoint ID like `65c13dbbd65fb876b7886cdb` */
                datapoint_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Datapoint successfully deleted */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['DeleteDatapointResponse'];
                };
            };
        };
    };
    getDatapoints: {
        parameters: {
            query?: {
                /** @description List of datapoint ids to fetch */
                datapoint_ids?: string[];
                /** @description Name of the dataset to get datapoints from */
                dataset_name?: string;
            };
            header?: never;
            path: {
                /** @description The unique identifier of the project whose datapoints are listed */
                project_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['GetDatapointsResponse'];
                };
            };
        };
    };
    createDatapoint: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The unique identifier of the project that owns the datapoint */
                project_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['CreateDatapointRequest'];
            };
        };
        responses: {
            /** @description Datapoint successfully created */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['CreateDatapointResponse'];
                };
            };
        };
    };
    batchCreateDatapoints: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The unique identifier of the project that owns the datapoints */
                project_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['BatchCreateDatapointsRequest'];
            };
        };
        responses: {
            /** @description Datapoints successfully created in batch */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['BatchCreateDatapointsResponse'];
                };
            };
        };
    };
    getDatapoint: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The unique identifier of the project that owns the datapoint */
                project_id: string;
                /** @description Datapoint ID like `65c13dbbd65fb876b7886cdb` */
                datapoint_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['GetDatapointResponse'];
                };
            };
        };
    };
    deleteDatapoint: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The unique identifier of the project that owns the datapoint */
                project_id: string;
                /** @description Datapoint ID like `65c13dbbd65fb876b7886cdb` */
                datapoint_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Datapoint successfully deleted */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['DeleteDatapointResponse'];
                };
            };
        };
    };
    updateDatapoint: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The unique identifier of the project that owns the datapoint */
                project_id: string;
                /** @description ID of datapoint to update */
                datapoint_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['UpdateDatapointRequest'];
            };
        };
        responses: {
            /** @description Datapoint successfully updated */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['UpdateDatapointResponse'];
                };
            };
            /** @description Error updating datapoint */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getDatasetsLegacy: {
        parameters: {
            query?: {
                /** @description Unique dataset ID for filtering specific dataset */
                dataset_id?: string;
                /** @description Dataset name to filter by */
                name?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['GetDatasetsResponse'];
                };
            };
        };
    };
    updateDatasetBodyIdLegacy: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['LegacyUpdateDatasetRequest'];
            };
        };
        responses: {
            /** @description Successful update */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['UpdateDatasetResponse'];
                };
            };
        };
    };
    createDatasetLegacy: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['CreateDatasetRequest'];
            };
        };
        responses: {
            /** @description Successful creation */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['CreateDatasetResponse'];
                };
            };
        };
    };
    deleteDatasetQueryIdLegacy: {
        parameters: {
            query: {
                /** @description The unique identifier of the dataset to be deleted like `663876ec4611c47f4970f0c3` */
                dataset_id: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful delete */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['DeleteDatasetResponse'];
                };
            };
        };
    };
    updateDatasetLegacy: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The unique identifier of the dataset to update like `663876ec4611c47f4970f0c3` */
                dataset_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['UpdateDatasetRequest'];
            };
        };
        responses: {
            /** @description Successful update */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['UpdateDatasetResponse'];
                };
            };
        };
    };
    deleteDatasetLegacy: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The unique identifier of the dataset to be deleted like `663876ec4611c47f4970f0c3` */
                dataset_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful delete */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['DeleteDatasetResponse'];
                };
            };
        };
    };
    addDatapointsLegacy: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The unique identifier of the dataset to add datapoints to like  `663876ec4611c47f4970f0c3` */
                dataset_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['AddDatapointsToDatasetRequest'];
            };
        };
        responses: {
            /** @description Successful addition */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['AddDatapointsResponse'];
                };
            };
        };
    };
    removeDatapointLegacy: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The unique identifier of the dataset */
                dataset_id: string;
                /** @description The unique identifier of the datapoint to remove */
                datapoint_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Datapoint successfully removed from dataset */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['RemoveDatapointResponse'];
                };
            };
        };
    };
    removeDatapointShortPathLegacy: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The unique identifier of the dataset */
                dataset_id: string;
                /** @description The unique identifier of the datapoint to remove */
                datapoint_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Datapoint successfully removed from dataset */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['RemoveDatapointResponse'];
                };
            };
        };
    };
    getDatasets: {
        parameters: {
            query?: {
                /** @description Unique dataset ID for filtering specific dataset */
                dataset_id?: string;
                /** @description Dataset name to filter by */
                name?: string;
            };
            header?: never;
            path: {
                /** @description The unique identifier of the project whose datasets are listed */
                project_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['GetDatasetsResponse'];
                };
            };
        };
    };
    createDataset: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The unique identifier of the project that owns the dataset */
                project_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['CreateDatasetRequest'];
            };
        };
        responses: {
            /** @description Successful creation */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['CreateDatasetResponse'];
                };
            };
        };
    };
    deleteDataset: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The unique identifier of the project that owns the dataset */
                project_id: string;
                /** @description The unique identifier of the dataset to be deleted like `663876ec4611c47f4970f0c3` */
                dataset_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful delete */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['DeleteDatasetResponse'];
                };
            };
        };
    };
    updateDataset: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The unique identifier of the project that owns the dataset */
                project_id: string;
                /** @description The unique identifier of the dataset to update like `663876ec4611c47f4970f0c3` */
                dataset_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['UpdateDatasetRequest'];
            };
        };
        responses: {
            /** @description Successful update */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['UpdateDatasetResponse'];
                };
            };
        };
    };
    addDatapoints: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The unique identifier of the project that owns the dataset */
                project_id: string;
                /** @description The unique identifier of the dataset to add datapoints to like  `663876ec4611c47f4970f0c3` */
                dataset_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['AddDatapointsToDatasetRequest'];
            };
        };
        responses: {
            /** @description Successful addition */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['AddDatapointsResponse'];
                };
            };
        };
    };
    removeDatapoint: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The unique identifier of the project that owns the dataset */
                project_id: string;
                /** @description The unique identifier of the dataset */
                dataset_id: string;
                /** @description The unique identifier of the datapoint to remove */
                datapoint_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Datapoint successfully removed from dataset */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['RemoveDatapointResponse'];
                };
            };
        };
    };
    getEventsSchemaLegacy: {
        parameters: {
            query?: {
                /** @description Filter by date range */
                dateRange?: string | components['schemas']['GetEventsSchemaLegacyDateRangeOneOf1'];
                /** @description Filter by evaluation/run ID */
                evaluation_id?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Events schema retrieved successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['GetEventsSchemaResponse'];
                };
            };
        };
    };
    getRunsLegacy: {
        parameters: {
            query?: {
                /** @description Filter by dataset ID */
                dataset_id?: string;
                /** @description Page number for pagination */
                page?: number;
                /** @description Number of results per page */
                limit?: number;
                /** @description List of specific run IDs to fetch */
                run_ids?: string[];
                /** @description Filter by run name */
                name?: string;
                /** @description Filter by run status */
                status?: 'pending' | 'completed' | 'failed' | 'cancelled' | 'running';
                /** @description Filter by date range */
                dateRange?: string | components['schemas']['GetRunsDateRangeOneOf1'];
                /** @description Field to sort by */
                sort_by?: 'created_at' | 'updated_at' | 'name' | 'status';
                /** @description Sort order */
                sort_order?: 'asc' | 'desc';
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['GetExperimentRunsResponse'];
                };
            };
            /** @description Error fetching evaluations */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    createRunLegacy: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['PostExperimentRunRequest'];
            };
        };
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['PostExperimentRunResponse'];
                };
            };
            /** @description Invalid input */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getRunsSchemaLegacy: {
        parameters: {
            query?: {
                /** @description Filter by date range */
                dateRange?: string | components['schemas']['GetRunsSchemaDateRangeOneOf1'];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Events schema retrieved successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['GetEventsSchemaResponse'];
                };
            };
            /** @description Error fetching events schema */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getRunLegacy: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                run_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['GetExperimentRunResponse'];
                };
            };
            /** @description Error fetching evaluation */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    updateRunLegacy: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                run_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['PutExperimentRunRequest'];
            };
        };
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['PutExperimentRunResponse'];
                };
            };
            /** @description Invalid input */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    deleteRunLegacy: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                run_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['DeleteExperimentRunResponse'];
                };
            };
            /** @description Error deleting evaluation */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getRunSchemaLegacy: {
        parameters: {
            query?: {
                /** @description Filter by date range */
                dateRange?: string | components['schemas']['GetRunSchemaDateRangeOneOf1'];
            };
            header?: never;
            path: {
                /** @description Experiment run ID (UUIDv4) */
                run_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Events schema retrieved successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['GetEventsSchemaResponse'];
                };
            };
            /** @description Error fetching events schema */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getExperimentRunMetricsLegacy: {
        parameters: {
            query?: {
                /** @description Date range filter as JSON string */
                dateRange?: string;
                /** @description Optional filters to apply (JSON string or array of filter objects) */
                filters?: string | Record<string, never>[];
            };
            header?: never;
            path: {
                /** @description Experiment run ID (UUIDv4) */
                run_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Event metrics retrieved successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['GetExperimentRunMetricsResponse'];
                };
            };
            /** @description Error fetching event metrics */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getExperimentSummaryLegacy: {
        parameters: {
            query?: {
                /** @description Aggregation function to apply to metrics */
                aggregate_function?: 'average' | 'min' | 'max' | 'median' | 'p95' | 'p99' | 'p90' | 'sum' | 'count';
                /** @description Optional filters to apply (JSON string or array of filter objects) */
                filters?: string | Record<string, never>[];
            };
            header?: never;
            path: {
                /** @description Experiment run ID (UUIDv4) */
                run_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Experiment summary retrieved successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['GetExperimentRunResultResponse'];
                };
            };
            /** @description Error processing experiment summary */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getExperimentResultLegacy: {
        parameters: {
            query?: {
                /** @description Aggregation function to apply to metrics */
                aggregate_function?: 'average' | 'min' | 'max' | 'median' | 'p95' | 'p99' | 'p90' | 'sum' | 'count';
                /** @description Optional filters to apply (JSON string or array of filter objects) */
                filters?: string | Record<string, never>[];
            };
            header?: never;
            path: {
                /** @description Experiment run ID (UUIDv4) */
                run_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Experiment result retrieved successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['GetExperimentRunResultResponse'];
                };
            };
            /** @description Error processing experiment result */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getExperimentComparisonLegacy: {
        parameters: {
            query?: {
                /** @description Aggregation function to apply to metrics */
                aggregate_function?: 'average' | 'min' | 'max' | 'median' | 'p95' | 'p99' | 'p90' | 'sum' | 'count';
                /** @description Optional filters to apply (JSON string or array of filter objects) */
                filters?: string | Record<string, never>[];
            };
            header?: never;
            path: {
                /** @description New experiment run ID to compare (UUIDv4) */
                new_run_id: string;
                /** @description Old experiment run ID to compare against (UUIDv4) */
                old_run_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Experiment comparison retrieved successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['GetExperimentRunCompareResponse'];
                };
            };
            /** @description Error processing experiment comparison */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getExperimentComparison: {
        parameters: {
            query?: {
                /** @description Aggregation function to apply to metrics */
                aggregate_function?: 'average' | 'min' | 'max' | 'median' | 'p95' | 'p99' | 'p90' | 'sum' | 'count';
                /** @description Optional filters to apply (JSON string or array of filter objects) */
                filters?: string | Record<string, never>[];
            };
            header?: never;
            path: {
                /** @description The unique identifier of the project that holds both runs */
                project_id: string;
                /** @description New experiment run ID to compare (UUIDv4) */
                new_run_id: string;
                /** @description Old experiment run ID to compare against (UUIDv4) */
                old_run_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Experiment comparison retrieved successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['GetExperimentRunCompareResponse'];
                };
            };
            /** @description Error processing experiment comparison */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getExperimentComparisonCompareWithLegacy: {
        parameters: {
            query?: {
                /** @description Aggregation function to apply to metrics */
                aggregate_function?: string;
                /** @description Optional filters to apply (JSON string or array of filter objects) */
                filters?: string | Record<string, never>[];
            };
            header?: never;
            path: {
                /** @description New experiment run ID to compare (UUIDv4) */
                new_run_id: string;
                /** @description Old experiment run ID to compare against (UUIDv4) */
                old_run_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Experiment comparison retrieved successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['GetExperimentRunCompareResponse'];
                };
            };
            /** @description Error processing experiment comparison */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getExperimentCompareEventsLegacy: {
        parameters: {
            query?: {
                /** @description Filter by event name */
                event_name?: string;
                /** @description Filter by event type */
                event_type?: string;
                /** @description Additional filter criteria (JSON string or object) */
                filter?: string | Record<string, never>;
                /** @description Maximum number of results */
                limit?: number;
                /** @description Page number for pagination */
                page?: number;
            };
            header?: never;
            path: {
                /** @description New experiment run ID (UUIDv4) */
                new_run_id: string;
                /** @description Old experiment run ID to compare against (UUIDv4) */
                old_run_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Event comparison retrieved successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['GetExperimentCompareEventsResponse'];
                };
            };
            /** @description Error fetching event comparison */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getExperimentCompareEventsQueryIdLegacy: {
        parameters: {
            query: {
                /** @description First experiment run ID (UUIDv4) */
                run_id_1: string;
                /** @description Second experiment run ID (UUIDv4) */
                run_id_2: string;
                /** @description Filter by event name */
                event_name?: string;
                /** @description Filter by event type */
                event_type?: string;
                /** @description Additional filter criteria (JSON string or object) */
                filter?: string | Record<string, never>;
                /** @description Maximum number of results */
                limit?: number;
                /** @description Page number for pagination */
                page?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Event comparison retrieved successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['GetExperimentCompareEventsResponse'];
                };
            };
            /** @description Error fetching event comparison */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getRuns: {
        parameters: {
            query?: {
                /** @description Filter by dataset ID */
                dataset_id?: string;
                /** @description Page number for pagination */
                page?: number;
                /** @description Number of results per page */
                limit?: number;
                /** @description List of specific run IDs to fetch */
                run_ids?: string[];
                /** @description Filter by run name */
                name?: string;
                /** @description Filter by run status */
                status?: 'pending' | 'completed' | 'failed' | 'cancelled' | 'running';
                /** @description Filter by date range */
                dateRange?: string | components['schemas']['GetRunsDateRangeOneOf1'];
                /** @description Field to sort by */
                sort_by?: 'created_at' | 'updated_at' | 'name' | 'status';
                /** @description Sort order */
                sort_order?: 'asc' | 'desc';
            };
            header?: never;
            path: {
                /** @description The unique identifier of the project whose runs are listed */
                project_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['GetExperimentRunsResponse'];
                };
            };
            /** @description Error fetching evaluations */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    createRun: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The unique identifier of the project that owns the run */
                project_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['PostExperimentRunRequest'];
            };
        };
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['PostExperimentRunResponse'];
                };
            };
            /** @description Invalid input */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getRunsSchema: {
        parameters: {
            query?: {
                /** @description Filter by date range */
                dateRange?: string | components['schemas']['GetRunsSchemaDateRangeOneOf1'];
            };
            header?: never;
            path: {
                /** @description The unique identifier of the project whose runs the schema covers */
                project_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Events schema retrieved successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['GetEventsSchemaResponse'];
                };
            };
            /** @description Error fetching events schema */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getRun: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The unique identifier of the project that owns the run */
                project_id: string;
                run_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['GetExperimentRunResponse'];
                };
            };
            /** @description Error fetching evaluation */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    deleteRun: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The unique identifier of the project that owns the run */
                project_id: string;
                run_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['DeleteExperimentRunResponse'];
                };
            };
            /** @description Error deleting evaluation */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    updateRun: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The unique identifier of the project that owns the run */
                project_id: string;
                run_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['PutExperimentRunRequest'];
            };
        };
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['PutExperimentRunResponse'];
                };
            };
            /** @description Invalid input */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getRunSchema: {
        parameters: {
            query?: {
                /** @description Filter by date range */
                dateRange?: string | components['schemas']['GetRunSchemaDateRangeOneOf1'];
            };
            header?: never;
            path: {
                /** @description The unique identifier of the project that holds the run */
                project_id: string;
                /** @description Experiment run ID (UUIDv4) */
                run_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Events schema retrieved successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['GetEventsSchemaResponse'];
                };
            };
            /** @description Error fetching events schema */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getExperimentSummary: {
        parameters: {
            query?: {
                /** @description Aggregation function to apply to metrics */
                aggregate_function?: 'average' | 'min' | 'max' | 'median' | 'p95' | 'p99' | 'p90' | 'sum' | 'count';
                /** @description Optional filters to apply (JSON string or array of filter objects) */
                filters?: string | Record<string, never>[];
            };
            header?: never;
            path: {
                /** @description The unique identifier of the project that holds the experiment run */
                project_id: string;
                /** @description Experiment run ID (UUIDv4) */
                run_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Experiment summary retrieved successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['GetExperimentRunResultResponse'];
                };
            };
            /** @description Error processing experiment summary */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getExperimentRunMetrics: {
        parameters: {
            query?: {
                /** @description Date range filter as JSON string */
                dateRange?: string;
                /** @description Optional filters to apply (JSON string or array of filter objects) */
                filters?: string | Record<string, never>[];
            };
            header?: never;
            path: {
                /** @description The unique identifier of the project that holds the run */
                project_id: string;
                /** @description Experiment run ID (UUIDv4) */
                run_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Event metrics retrieved successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['GetExperimentRunMetricsResponse'];
                };
            };
            /** @description Error fetching event metrics */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getExperimentCompareEvents: {
        parameters: {
            query?: {
                /** @description Filter by event name */
                event_name?: string;
                /** @description Filter by event type */
                event_type?: string;
                /** @description Additional filter criteria (JSON string or object) */
                filter?: string | Record<string, never>;
                /** @description Maximum number of results */
                limit?: number;
                /** @description Page number for pagination */
                page?: number;
            };
            header?: never;
            path: {
                /** @description The unique identifier of the project that holds both runs */
                project_id: string;
                /** @description New experiment run ID (UUIDv4) */
                new_run_id: string;
                /** @description Old experiment run ID to compare against (UUIDv4) */
                old_run_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Event comparison retrieved successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['GetExperimentCompareEventsResponse'];
                };
            };
            /** @description Error fetching event comparison */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getQueuesLegacy: {
        parameters: {
            query?: {
                /** @description Filter by enabled status */
                enabled?: boolean;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Queues retrieved successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['GetAnnotationQueuesResponse'];
                };
            };
        };
    };
    createQueueLegacy: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['CreateAnnotationQueueRequest'];
            };
        };
        responses: {
            /** @description Queue created successfully */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['CreateAnnotationQueueResponse'];
                };
            };
            /** @description Bad request (invalid queue data or missing required fields) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getQueues: {
        parameters: {
            query?: {
                /** @description Filter by enabled status */
                enabled?: boolean;
            };
            header?: never;
            path: {
                /** @description The unique identifier of the project whose annotation queues are listed */
                project_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Queues retrieved successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['GetAnnotationQueuesResponse'];
                };
            };
        };
    };
    createQueue: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The unique identifier of the project the annotation queue is created in */
                project_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['CreateAnnotationQueueRequest'];
            };
        };
        responses: {
            /** @description Queue created successfully */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['CreateAnnotationQueueResponse'];
                };
            };
            /** @description Bad request (invalid queue data or missing required fields) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getQueueLegacy: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Annotation queue ID */
                queue_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Queue retrieved successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['GetAnnotationQueueByIdResponse'];
                };
            };
            /** @description Queue not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    updateQueueLegacy: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Annotation queue ID */
                queue_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['UpdateAnnotationQueueRequest'];
            };
        };
        responses: {
            /** @description Queue updated successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['UpdateAnnotationQueueResponse'];
                };
            };
            /** @description Queue not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    deleteQueueLegacy: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Annotation queue ID */
                queue_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Queue deleted successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['DeleteAnnotationQueueResponse'];
                };
            };
            /** @description Queue not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getQueue: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The unique identifier of the project that holds the annotation queue */
                project_id: string;
                /** @description Annotation queue ID */
                queue_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Queue retrieved successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['GetAnnotationQueueByIdResponse'];
                };
            };
            /** @description Queue not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    deleteQueue: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The unique identifier of the project that holds the annotation queue */
                project_id: string;
                /** @description Annotation queue ID */
                queue_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Queue deleted successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['DeleteAnnotationQueueResponse'];
                };
            };
            /** @description Queue not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    updateQueue: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The unique identifier of the project that holds the annotation queue */
                project_id: string;
                /** @description Annotation queue ID */
                queue_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['UpdateAnnotationQueueRequest'];
            };
        };
        responses: {
            /** @description Queue updated successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['UpdateAnnotationQueueResponse'];
                };
            };
            /** @description Queue not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getConfigurations: {
        parameters: {
            query?: {
                /** @description The name of the configuration like `v0` */
                name?: string;
                /** @description Environment - "dev", "staging" or "prod" */
                env?: string;
                /** @description Tags to filter configurations */
                tags?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Configurations retrieved successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['GetConfigurationsResponse'];
                };
            };
        };
    };
    createConfiguration: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['CreateConfigurationRequest'];
            };
        };
        responses: {
            /** @description Configuration created successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['CreateConfigurationResponse'];
                };
            };
        };
    };
    updateConfiguration: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Configuration ID like `6638187d505c6812e4043f24` */
                configId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['UpdateConfigurationRequest'];
            };
        };
        responses: {
            /** @description Configuration updated successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['UpdateConfigurationResponse'];
                };
            };
        };
    };
    deleteConfiguration: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Configuration ID like `6638187d505c6812e4043f24` */
                configId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Configuration deleted successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['DeleteConfigurationResponse'];
                };
            };
        };
    };
}
//# sourceMappingURL=types.d.ts.map