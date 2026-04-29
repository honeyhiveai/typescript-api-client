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
     * Start a new session. The request body wraps the session event object under the `session` key, matching the pattern used by POST /events.
     */
    start(options) {
        return unwrap(this.#client.POST('/session/start', { body: options.body }));
    }
    /**
     * Add traces to a session
     *
     * Add trace events to an existing session. The field is named `logs` for legacy compatibility with the Go ingestion handler.
     */
    addTraces(options) {
        return unwrap(this.#client.POST('/session/{session_id}/traces', {
            params: { path: options.path },
            body: options.body,
        }));
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
     * Create a new event (span) within a session trace. The request body wraps the event object under the `event` key.
     *
     * **Required properties** within the event object:
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
        return unwrap(this.#client.POST('/events', { body: options.body }));
    }
    /**
     * Update an event
     *
     * Update fields on an existing event. Only the provided fields are modified; omitted fields are left unchanged. The event_id field is required to identify the event to update.
     *
     * @example Request body
     * ```json
     * {
     *   "event_id": "7f22137a-6911-4ed3-bc36-110f1dde6b66",
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
        return unwrap(this.#client.PUT('/events', { body: options.body }));
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
     * Create a new model event
     *
     * Create a model event. The event_type is automatically set to 'model'. Please refer to our instrumentation guide for detailed information.
     *
     * @example Response
     * ```json
     * {
     *   "event_id": "7f22137a-6911-4ed3-bc36-110f1dde6b66",
     *   "success": true
     * }
     * ```
     */
    createModel(options) {
        return unwrap(this.#client.POST('/events/model', { body: options.body }));
    }
    /**
     * Create a batch of events
     *
     * Create multiple events in a single request. When single_session is true, all events share the same session. Please refer to our instrumentation guide for detailed information.
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
        return unwrap(this.#client.POST('/events/batch', { body: options.body }));
    }
    /**
     * Create a batch of model events
     *
     * Create multiple model events in a single request. The event_type is automatically set to 'model' for all events. When single_session is true, all events share the same session. Please refer to our instrumentation guide for detailed information.
     *
     * @example Response
     * ```json
     * {
     *   "event_ids": [
     *     "7f22137a-6911-4ed3-bc36-110f1dde6b66",
     *     "7f22137a-6911-4ed3-bc36-110f1dde6b67"
     *   ],
     *   "success": true
     * }
     * ```
     */
    createModelBatch(options) {
        return unwrap(this.#client.POST('/events/model/batch', { body: options.body }));
    }
    /**
     * Get events schema
     *
     * Retrieve the schema and metadata for experiment events
     */
    getEventsSchema(options) {
        return unwrap(this.#client.GET('/v1/events/schema', { params: { query: options?.query } }));
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
     * Edit a metric
     */
    update(options) {
        return unwrap(this.#client.PUT('/v1/metrics', { body: options.body }));
    }
    /**
     * Delete a metric
     *
     * Remove a metric
     */
    delete(options) {
        return unwrap(this.#client.DELETE('/v1/metrics', { params: { query: options.query } }));
    }
    /**
     * Run a metric evaluation
     *
     * Execute a metric on a specific event
     */
    run(options) {
        return unwrap(this.#client.POST('/v1/metrics/run_metric', { body: options.body }));
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
     * Delete a dataset
     *
     * Permanently delete a dataset by its unique identifier.
     */
    delete(options) {
        return unwrap(this.#client.DELETE('/v1/datasets', { params: { query: options.query } }));
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
        return unwrap(this.#client.DELETE('/v1/datasets/{dataset_id}/{datapoint_id}', {
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
     * Retrieve experiment result
     *
     * Compute evaluation summary for an experiment run: pass/fail results, metric aggregations, per-datapoint results, event details, and the experiment run object.
     */
    getResult(options) {
        return unwrap(this.#client.GET('/v1/runs/{run_id}/result', {
            params: { path: options.path, query: options.query },
        }));
    }
    /**
     * Retrieve experiment comparison
     *
     * Compare metrics and results between two experiment runs
     */
    compareRuns(options) {
        return unwrap(this.#client.GET('/v1/runs/{new_run_id}/compare-with/{old_run_id}', {
            params: { path: options.path, query: options.query },
        }));
    }
    /**
     * Compare events between two experiment runs
     *
     * Retrieve and compare events between two experiment runs for detailed analysis
     */
    compareRunEvents(options) {
        return unwrap(this.#client.GET('/v1/runs/compare/events', { params: { query: options.query } }));
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
/** @inline */
class ConfigurationsNamespace {
    #client;
    constructor(client) {
        this.#client = client;
    }
    /**
     * Retrieve a list of configurations
     *
     * List configurations with optional filtering by name, environment, and tags.
     */
    list(options) {
        return unwrap(this.#client.GET('/v1/configurations', { params: { query: options?.query } }));
    }
    /**
     * Create a new configuration
     *
     * Create a new LLM or pipeline configuration with provider, parameters, and environment settings.
     */
    create(options) {
        return unwrap(this.#client.POST('/v1/configurations', { body: options.body }));
    }
    /**
     * Update an existing configuration
     *
     * Update an existing configuration's name, provider, parameters, environment, or tags.
     */
    update(options) {
        return unwrap(this.#client.PUT('/v1/configurations/{configId}', {
            params: { path: options.path },
            body: options.body,
        }));
    }
    /**
     * Delete a configuration
     *
     * Permanently delete a configuration by its unique identifier.
     */
    delete(options) {
        return unwrap(this.#client.DELETE('/v1/configurations/{configId}', { params: { path: options.path } }));
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
    configurations;
    constructor(options = {}) {
        this.#client = createApiClient(options);
        this.sessions = new SessionsNamespace(this.#client);
        this.events = new EventsNamespace(this.#client);
        this.metrics = new MetricsNamespace(this.#client);
        this.datapoints = new DatapointsNamespace(this.#client);
        this.datasets = new DatasetsNamespace(this.#client);
        this.experiments = new ExperimentsNamespace(this.#client);
        this.queues = new QueuesNamespace(this.#client);
        this.configurations = new ConfigurationsNamespace(this.#client);
    }
}
//# sourceMappingURL=client.js.map