// AUTO-GENERATED — do not edit manually. Run `pnpm generate:client` to regenerate.
import { createApiClient, unwrap } from '../util.js';
/** @inline */
class SessionsNamespace {
    #client;
    constructor(client) {
        this.#client = client;
    }
    /**
     * Start a new session
     *
     * Start a new session. The request body is a bare session object (no `session` wrapper). The server creates a session event and returns it.
     *
     * **No required properties** — every field has a server-side fallback.
     *
     * **Auto-generated properties** (provided by the server when omitted):
     * - `session_id` (string, UUID) — Server generates a UUIDv4 if omitted
     *   or if the supplied value is not a valid UUID.
     *
     * **Optional properties with defaults:**
     * - `event_name` (string) — Falls back to `session_name` when not
     *   provided; defaults to `"unknown"` if both are absent.
     *
     * - `source` (string) — Defaults to `"unknown"`.
     * **Optional properties:**
     * - `session_name` (string) — Display name for the session.
     * - `start_time` (number) — Session start time as Unix milliseconds.
     *   The session normalizer uses `getInt64()` which only accepts numeric
     *   types; if a string is passed, the server silently falls back to the
     *   current time.
     *
     * - `end_time` (number) — Session end time as Unix milliseconds (same
     *   numeric-only caveat as `start_time`).
     *
     * - `duration` (number) — Session duration in milliseconds.
     * - `config` (object) — Configuration associated with the session.
     * - `inputs` (object) — Input data for the session.
     * - `outputs` (object) — Output data from the session.
     * - `metadata` (object) — Arbitrary metadata.
     * - `user_properties` (object) — User properties.
     * - `children_ids` (array of strings) — IDs of child events.
     *
     * Idempotent on `session_id`: posting twice with the same `session_id` merges metadata/user_properties into the existing session and returns the existing event.
     */
    create(options) {
        return unwrap(this.#client.POST('/v1/sessions', { body: options.body }));
    }
}
/** @inline */
class EventsNamespace {
    #client;
    constructor(client) {
        this.#client = client;
    }
    /**
     * Create a new event
     *
     * Create a new event (span) within a session trace. The request body is a bare event object (no `event` wrapper).
     *
     * **Required properties:**
     * - `event_type` (string) — Must be one of: `chain`, `model`, `tool`, `session`.
     * - `inputs` (object) — Input data for the event.
     * **Auto-generated properties** (provided by the server when omitted):
     * - `event_id` (string, UUID) — Unique identifier for the event.
     * - `session_id` (string, UUID) — Session/trace identifier.
     * - `parent_id` (string, UUID) — Parent event ID. Defaults to `session_id`.
     * **Optional properties with defaults:**
     * - `event_name` (string) — Name of the event. Defaults to `"unknown"`.
     * - `source` (string) — Source of the event (e.g. `sdk-python`). Defaults to `"unknown"`.
     * **Optional properties:**
     * - `config` (object) — Configuration data (e.g. model parameters, prompt templates).
     * - `outputs` (object) — Output data from the event.
     * - `error` (string or null) — Error message if the event failed.
     * - `children_ids` (array of strings) — IDs of child events.
     * - `duration` (number) — Duration of the event in milliseconds.
     * - `start_time` (number) — Unix timestamp in milliseconds for event start.
     * - `end_time` (number) — Unix timestamp in milliseconds for event end.
     * - `metadata` (object) — Additional metadata (e.g. token counts, cost).
     * - `metrics` (object) — Custom metrics.
     * - `feedback` (object) — Feedback data (e.g. ratings, ground truth).
     * - `user_properties` (object) — User properties associated with the event.
     *
     * @example Response
     * ```json
     * {
     *   "event_id": "7f22137a-6911-4ed3-bc36-110f1dde6b66",
     *   "success": true
     * }
     * ```
     */
    create(options) {
        return unwrap(this.#client.POST('/v1/events', { body: options.body }));
    }
    /**
     * Update an event
     *
     * Update fields on an existing event. Only the provided fields are modified; omitted fields are left unchanged. Extra fields not listed below are accepted by the server but silently ignored.
     *
     * @example Request body
     * ```json
     * {
     *   "metadata": {
     *     "cost": 0.00008,
     *     "completion_tokens": 23,
     *     "prompt_tokens": 35,
     *     "total_tokens": 58
     *   },
     *   "feedback": {
     *     "rating": 5
     *   },
     *   "metrics": {
     *     "num_words": 2
     *   },
     *   "outputs": {
     *     "role": "assistant",
     *     "content": "Hello world"
     *   },
     *   "config": {
     *     "template": [
     *       {
     *         "role": "system",
     *         "content": "Hello, {{ name }}!"
     *       }
     *     ]
     *   },
     *   "user_properties": {
     *     "user_id": "691b1f94-d38c-4e92-b051-5e03fee9ff86"
     *   },
     *   "duration": 42
     * }
     * ```
     */
    update(options) {
        return unwrap(this.#client.PUT('/v1/events/{event_id}', {
            params: { path: options.path },
            body: options.body,
        }));
    }
    /**
     * Retrieve events based on filters
     *
     * Search events via POST with filtering and pagination. This is the primary method for retrieving events from HoneyHive.
     */
    search(options) {
        return unwrap(this.#client.POST('/v1/events/search', { body: options.body }));
    }
    /**
     * Create a batch of events
     *
     * Create multiple events in a single request. When `single_session` is true, all events share the same session created from `session_properties`.
     *
     * **Required properties:**
     * - `events` (array of event objects) — Each event must include
     *   `event_type` (one of `chain`, `model`, `tool`, `session`) and `inputs`.
     *
     * **Optional properties:**
     * - `single_session` (boolean) — If true, all events share a single session
     *   created from `session_properties`. Defaults to false.
     *
     * - `session_properties` (object) — Session metadata used when
     *   `single_session` is true. May include `session_name`, `start_time`,
     *   `metadata`.
     *
     * Unknown top-level fields and per-event fields are rejected at the SDK boundary; the legacy aliases `is_single_session`, `session`, and per-event `project` are no longer accepted.
     *
     * @example Response
     * ```json
     * {
     *   "event_ids": [
     *     "7f22137a-6911-4ed3-bc36-110f1dde6b66",
     *     "7f22137a-6911-4ed3-bc36-110f1dde6b67"
     *   ],
     *   "session_id": "caf77ace-3417-4da4-944d-f4a0688f3c23",
     *   "success": true
     * }
     * ```
     */
    createBatch(options) {
        return unwrap(this.#client.POST('/v1/events/batch', { body: options.body }));
    }
}
/** @inline */
class MetricsNamespace {
    #client;
    constructor(client) {
        this.#client = client;
    }
    /**
     * Get all metrics
     *
     * Retrieve a list of all metrics
     */
    list(options) {
        return unwrap(this.#client.GET('/v1/metrics', { params: { query: options?.query } }));
    }
    /**
     * Create a new metric
     *
     * Add a new metric
     */
    create(options) {
        return unwrap(this.#client.POST('/v1/metrics', { body: options.body }));
    }
    /**
     * Update an existing metric
     *
     * Update a metric's editable fields. Only fields included in the request body are modified.
     */
    update(options) {
        return unwrap(this.#client.PUT('/v1/metrics/{metric_id}', {
            params: { path: options.path },
            body: options.body,
        }));
    }
    /**
     * Delete a metric
     *
     * Remove a metric by id.
     */
    delete(options) {
        return unwrap(this.#client.DELETE('/v1/metrics/{metric_id}', { params: { path: options.path } }));
    }
    /**
     * Run a metric evaluation
     *
     * Execute a metric on a specific event
     */
    run(options) {
        return unwrap(this.#client.POST('/v1/metrics/run', { body: options.body }));
    }
}
/** @inline */
class DatapointsNamespace {
    #client;
    constructor(client) {
        this.#client = client;
    }
    /**
     * Retrieve a list of datapoints
     *
     * Retrieve datapoints, optionally filtered by a list of datapoint IDs or dataset name.
     */
    list(options) {
        return unwrap(this.#client.GET('/v1/datapoints', { params: { query: options?.query } }));
    }
    /**
     * Create a new datapoint
     *
     * Create a single datapoint with inputs, history, ground truth, and metadata.
     */
    create(options) {
        return unwrap(this.#client.POST('/v1/datapoints', { body: options.body }));
    }
    /**
     * Create multiple datapoints in batch
     *
     * Create multiple datapoints from events using field mappings and optional filters.
     */
    createBatch(options) {
        return unwrap(this.#client.POST('/v1/datapoints/batch', { body: options.body }));
    }
    /**
     * Retrieve a specific datapoint
     *
     * Get a single datapoint by its unique identifier.
     */
    get(options) {
        return unwrap(this.#client.GET('/v1/datapoints/{datapoint_id}', { params: { path: options.path } }));
    }
    /**
     * Update a specific datapoint
     *
     * Update fields on an existing datapoint. Only the provided fields are modified.
     */
    update(options) {
        return unwrap(this.#client.PUT('/v1/datapoints/{datapoint_id}', {
            params: { path: options.path },
            body: options.body,
        }));
    }
    /**
     * Delete a specific datapoint
     *
     * Permanently delete a datapoint by its unique identifier.
     */
    delete(options) {
        return unwrap(this.#client.DELETE('/v1/datapoints/{datapoint_id}', { params: { path: options.path } }));
    }
}
/** @inline */
class DatasetsNamespace {
    #client;
    constructor(client) {
        this.#client = client;
    }
    /**
     * Get datasets
     *
     * Retrieve datasets, optionally filtered by dataset ID or name.
     */
    list(options) {
        return unwrap(this.#client.GET('/v1/datasets', { params: { query: options?.query } }));
    }
    /**
     * Create a dataset
     *
     * Create a new dataset with an optional name, description, and initial set of datapoint IDs.
     */
    create(options) {
        return unwrap(this.#client.POST('/v1/datasets', { body: options.body }));
    }
    /**
     * Update a dataset
     *
     * Update a dataset's name, description, or list of datapoint IDs.
     */
    update(options) {
        return unwrap(this.#client.PUT('/v1/datasets/{dataset_id}', {
            params: { path: options.path },
            body: options.body,
        }));
    }
    /**
     * Delete a dataset
     *
     * Permanently delete a dataset by its unique identifier.
     */
    delete(options) {
        return unwrap(this.#client.DELETE('/v1/datasets/{dataset_id}', { params: { path: options.path } }));
    }
    /**
     * Add datapoints to a dataset
     *
     * Add new datapoints to an existing dataset. Provide raw data objects and a field mapping that specifies which fields map to inputs, ground truth, and history.
     */
    addDatapoints(options) {
        return unwrap(this.#client.POST('/v1/datasets/{dataset_id}/datapoints', {
            params: { path: options.path },
            body: options.body,
        }));
    }
    /**
     * Remove a datapoint from a dataset
     *
     * Remove a specific datapoint from a dataset. The datapoint itself is not deleted, only dereferenced from the dataset.
     */
    removeDatapoint(options) {
        return unwrap(this.#client.DELETE('/v1/datasets/{dataset_id}/datapoints/{datapoint_id}', {
            params: { path: options.path },
        }));
    }
}
/** @inline */
class ExperimentsNamespace {
    #client;
    constructor(client) {
        this.#client = client;
    }
    /**
     * Get a list of evaluation runs
     *
     * List experiment runs with optional filtering by dataset, status, name, date range, and specific run IDs. Results are paginated and sortable.
     */
    listRuns(options) {
        return unwrap(this.#client.GET('/v1/runs', { params: { query: options?.query } }));
    }
    /**
     * Create a new evaluation run
     *
     * Create a new experiment run to track an evaluation against a dataset.
     */
    createRun(options) {
        return unwrap(this.#client.POST('/v1/runs', { body: options.body }));
    }
    /**
     * Get events schema across all experiment runs in a project
     *
     * Retrieve the aggregated events schema (fields, datasets, mappings) across all experiment runs in the project.
     */
    getRunsSchema(options) {
        return unwrap(this.#client.GET('/v1/runs/schema', { params: { query: options?.query } }));
    }
    /**
     * Get details of an evaluation run
     *
     * Retrieve the full details of a single experiment run by its run ID.
     */
    getRun(options) {
        return unwrap(this.#client.GET('/v1/runs/{run_id}', { params: { path: options.path } }));
    }
    /**
     * Update an evaluation run
     *
     * Update fields on an existing experiment run such as name, status, metadata, or results.
     */
    updateRun(options) {
        return unwrap(this.#client.PUT('/v1/runs/{run_id}', { params: { path: options.path }, body: options.body }));
    }
    /**
     * Delete an evaluation run
     *
     * Permanently delete an experiment run by its run ID.
     */
    deleteRun(options) {
        return unwrap(this.#client.DELETE('/v1/runs/{run_id}', { params: { path: options.path } }));
    }
    /**
     * Get events schema for a single experiment run
     *
     * Retrieve the events schema (fields, datasets, mappings) for a single experiment run.
     */
    getRunSchema(options) {
        return unwrap(this.#client.GET('/v1/runs/{run_id}/schema', {
            params: { path: options.path, query: options.query },
        }));
    }
    /**
     * Get event metrics for an experiment run
     *
     * Retrieve event metrics from ClickHouse for a specific experiment run
     */
    getRunMetrics(options) {
        return unwrap(this.#client.GET('/v1/runs/{run_id}/metrics', {
            params: { path: options.path, query: options.query },
        }));
    }
    /**
     * Retrieve experiment comparison
     *
     * Compare metrics and results between two experiment runs
     */
    compareRuns(options) {
        return unwrap(this.#client.GET('/v1/runs/{new_run_id}/compare/{old_run_id}', {
            params: { path: options.path, query: options.query },
        }));
    }
    /**
     * Compare events between two experiment runs
     *
     * Retrieve and compare events between two experiment runs for detailed analysis
     */
    compareRunEvents(options) {
        return unwrap(this.#client.GET('/v1/runs/{new_run_id}/compare/{old_run_id}/events', {
            params: { path: options.path, query: options.query },
        }));
    }
}
/** @inline */
class QueuesNamespace {
    #client;
    constructor(client) {
        this.#client = client;
    }
    /**
     * List annotation queues
     *
     * List annotation queues for the current project scope, optionally filtered by enabled status.
     */
    list(options) {
        return unwrap(this.#client.GET('/v1/queues', { params: { query: options?.query } }));
    }
    /**
     * Create an annotation queue
     *
     * Create a new annotation queue with a name, optional description, filters, and an initial set of event IDs to add.
     */
    create(options) {
        return unwrap(this.#client.POST('/v1/queues', { body: options.body }));
    }
    /**
     * Get an annotation queue
     *
     * Retrieve a single annotation queue by its unique identifier.
     */
    get(options) {
        return unwrap(this.#client.GET('/v1/queues/{queue_id}', { params: { path: options.path } }));
    }
    /**
     * Update an annotation queue
     *
     * Update fields on an existing annotation queue. Supports updating name, description, filters, enabled status, and adding/removing events.
     */
    update(options) {
        return unwrap(this.#client.PUT('/v1/queues/{queue_id}', {
            params: { path: options.path },
            body: options.body,
        }));
    }
    /**
     * Delete an annotation queue
     *
     * Soft-delete an annotation queue by its unique identifier.
     */
    delete(options) {
        return unwrap(this.#client.DELETE('/v1/queues/{queue_id}', { params: { path: options.path } }));
    }
}
export class Client {
    #client;
    sessions;
    events;
    metrics;
    datapoints;
    datasets;
    experiments;
    queues;
    constructor(options = {}) {
        this.#client = createApiClient(options);
        this.sessions = new SessionsNamespace(this.#client);
        this.events = new EventsNamespace(this.#client);
        this.metrics = new MetricsNamespace(this.#client);
        this.datapoints = new DatapointsNamespace(this.#client);
        this.datasets = new DatasetsNamespace(this.#client);
        this.experiments = new ExperimentsNamespace(this.#client);
        this.queues = new QueuesNamespace(this.#client);
    }
}
//# sourceMappingURL=client.js.map