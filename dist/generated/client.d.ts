import { type paths } from './types.js';
import { type StartSessionOptions, type AddSessionTracesOptions, type CreateEventOptions, type UpdateEventOptions, type SearchEventsOptions, type CreateModelEventOptions, type CreateEventBatchOptions, type CreateModelEventBatchOptions, type GetEventsSchemaOptions, type GetMetricsOptions, type CreateMetricOptions, type UpdateMetricOptions, type DeleteMetricOptions, type RunMetricOptions, type GetDatapointsOptions, type CreateDatapointOptions, type BatchCreateDatapointsOptions, type GetDatapointOptions, type UpdateDatapointOptions, type DeleteDatapointOptions, type GetDatasetsOptions, type CreateDatasetOptions, type DeleteDatasetOptions, type UpdateDatasetOptions, type AddDatapointsOptions, type RemoveDatapointOptions, type GetRunsOptions, type CreateRunOptions, type GetRunOptions, type UpdateRunOptions, type DeleteRunOptions, type GetExperimentRunMetricsOptions, type GetExperimentResultOptions, type GetExperimentComparisonOptions, type GetExperimentCompareEventsOptions, type GetQueuesOptions, type CreateQueueOptions, type GetQueueOptions, type UpdateQueueOptions, type DeleteQueueOptions, type GetConfigurationsOptions, type CreateConfigurationOptions, type UpdateConfigurationOptions, type DeleteConfigurationOptions, type StartSessionResponse, type AddSessionTracesResponse, type CreateEventResponse, type SearchEventsResponse, type CreateModelEventResponse, type CreateEventBatchResponse, type CreateModelEventBatchResponse, type GetEventsSchemaResponse, type GetMetricsResponse, type CreateMetricResponse, type UpdateMetricResponse, type DeleteMetricResponse, type RunMetricResponse, type GetDatapointsResponse, type CreateDatapointResponse, type BatchCreateDatapointsResponse, type GetDatapointResponse, type UpdateDatapointResponse, type DeleteDatapointResponse, type GetDatasetsResponse, type CreateDatasetResponse, type DeleteDatasetResponse, type UpdateDatasetResponse, type AddDatapointsResponse, type RemoveDatapointResponse, type GetRunsResponse, type CreateRunResponse, type GetRunResponse, type UpdateRunResponse, type DeleteRunResponse, type GetExperimentRunMetricsResponse, type GetExperimentResultResponse, type GetExperimentComparisonResponse, type GetExperimentCompareEventsResponse, type GetQueuesResponse, type CreateQueueResponse, type GetQueueResponse, type UpdateQueueResponse, type DeleteQueueResponse, type GetConfigurationsResponse, type CreateConfigurationResponse, type UpdateConfigurationResponse, type DeleteConfigurationResponse } from './apiTypes.js';
import { type ClientConfig, createApiClient } from '../util.js';
/** @inline */
declare class SessionsNamespace {
    #private;
    constructor(client: ReturnType<typeof createApiClient<paths>>);
    /**
     * Start a new session
     *
     * Start a new session. The request body wraps the session event object under the `session` key, matching the pattern used by POST /events.
     */
    start(options: StartSessionOptions): Promise<StartSessionResponse>;
    /**
     * Add traces to a session
     *
     * Add trace events to an existing session. The field is named `logs` for legacy compatibility with the Go ingestion handler.
     */
    addTraces(options: AddSessionTracesOptions): Promise<AddSessionTracesResponse>;
}
/** @inline */
declare class EventsNamespace {
    #private;
    constructor(client: ReturnType<typeof createApiClient<paths>>);
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
    create(options: CreateEventOptions): Promise<CreateEventResponse>;
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
    update(options: UpdateEventOptions): Promise<void>;
    /**
     * Retrieve events based on filters
     *
     * Search events via POST with filtering and pagination. This is the primary method for retrieving events from HoneyHive.
     */
    search(options: SearchEventsOptions): Promise<SearchEventsResponse>;
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
    createModel(options: CreateModelEventOptions): Promise<CreateModelEventResponse>;
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
    createBatch(options: CreateEventBatchOptions): Promise<CreateEventBatchResponse>;
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
    createModelBatch(options: CreateModelEventBatchOptions): Promise<CreateModelEventBatchResponse>;
    /**
     * Get events schema
     *
     * Retrieve the schema and metadata for experiment events
     */
    getEventsSchema(options?: GetEventsSchemaOptions): Promise<GetEventsSchemaResponse>;
}
/** @inline */
declare class MetricsNamespace {
    #private;
    constructor(client: ReturnType<typeof createApiClient<paths>>);
    /**
     * Get all metrics
     *
     * Retrieve a list of all metrics
     */
    list(options?: GetMetricsOptions): Promise<GetMetricsResponse>;
    /**
     * Create a new metric
     *
     * Add a new metric
     */
    create(options: CreateMetricOptions): Promise<CreateMetricResponse>;
    /**
     * Update an existing metric
     *
     * Edit a metric
     */
    update(options: UpdateMetricOptions): Promise<UpdateMetricResponse>;
    /**
     * Delete a metric
     *
     * Remove a metric
     */
    delete(options: DeleteMetricOptions): Promise<DeleteMetricResponse>;
    /**
     * Run a metric evaluation
     *
     * Execute a metric on a specific event
     */
    run(options: RunMetricOptions): Promise<RunMetricResponse>;
}
/** @inline */
declare class DatapointsNamespace {
    #private;
    constructor(client: ReturnType<typeof createApiClient<paths>>);
    /**
     * Retrieve a list of datapoints
     *
     * Retrieve datapoints, optionally filtered by a list of datapoint IDs or dataset name.
     */
    list(options?: GetDatapointsOptions): Promise<GetDatapointsResponse>;
    /**
     * Create a new datapoint
     *
     * Create a single datapoint with inputs, history, ground truth, and metadata.
     */
    create(options: CreateDatapointOptions): Promise<CreateDatapointResponse>;
    /**
     * Create multiple datapoints in batch
     *
     * Create multiple datapoints from events using field mappings and optional filters.
     */
    createBatch(options: BatchCreateDatapointsOptions): Promise<BatchCreateDatapointsResponse>;
    /**
     * Retrieve a specific datapoint
     *
     * Get a single datapoint by its unique identifier.
     */
    get(options: GetDatapointOptions): Promise<GetDatapointResponse>;
    /**
     * Update a specific datapoint
     *
     * Update fields on an existing datapoint. Only the provided fields are modified.
     */
    update(options: UpdateDatapointOptions): Promise<UpdateDatapointResponse>;
    /**
     * Delete a specific datapoint
     *
     * Permanently delete a datapoint by its unique identifier.
     */
    delete(options: DeleteDatapointOptions): Promise<DeleteDatapointResponse>;
}
/** @inline */
declare class DatasetsNamespace {
    #private;
    constructor(client: ReturnType<typeof createApiClient<paths>>);
    /**
     * Get datasets
     *
     * Retrieve datasets, optionally filtered by dataset ID or name.
     */
    list(options?: GetDatasetsOptions): Promise<GetDatasetsResponse>;
    /**
     * Create a dataset
     *
     * Create a new dataset with an optional name, description, and initial set of datapoint IDs.
     */
    create(options: CreateDatasetOptions): Promise<CreateDatasetResponse>;
    /**
     * Delete a dataset
     *
     * Permanently delete a dataset by its unique identifier.
     */
    delete(options: DeleteDatasetOptions): Promise<DeleteDatasetResponse>;
    /**
     * Update a dataset
     *
     * Update a dataset's name, description, or list of datapoint IDs.
     */
    update(options: UpdateDatasetOptions): Promise<UpdateDatasetResponse>;
    /**
     * Add datapoints to a dataset
     *
     * Add new datapoints to an existing dataset. Provide raw data objects and a field mapping that specifies which fields map to inputs, ground truth, and history.
     */
    addDatapoints(options: AddDatapointsOptions): Promise<AddDatapointsResponse>;
    /**
     * Remove a datapoint from a dataset
     *
     * Remove a specific datapoint from a dataset. The datapoint itself is not deleted, only dereferenced from the dataset.
     */
    removeDatapoint(options: RemoveDatapointOptions): Promise<RemoveDatapointResponse>;
}
/** @inline */
declare class ExperimentsNamespace {
    #private;
    constructor(client: ReturnType<typeof createApiClient<paths>>);
    /**
     * Get a list of evaluation runs
     *
     * List experiment runs with optional filtering by dataset, status, name, date range, and specific run IDs. Results are paginated and sortable.
     */
    listRuns(options?: GetRunsOptions): Promise<GetRunsResponse>;
    /**
     * Create a new evaluation run
     *
     * Create a new experiment run to track an evaluation against a dataset.
     */
    createRun(options: CreateRunOptions): Promise<CreateRunResponse>;
    /**
     * Get details of an evaluation run
     *
     * Retrieve the full details of a single experiment run by its run ID.
     */
    getRun(options: GetRunOptions): Promise<GetRunResponse>;
    /**
     * Update an evaluation run
     *
     * Update fields on an existing experiment run such as name, status, metadata, or results.
     */
    updateRun(options: UpdateRunOptions): Promise<UpdateRunResponse>;
    /**
     * Delete an evaluation run
     *
     * Permanently delete an experiment run by its run ID.
     */
    deleteRun(options: DeleteRunOptions): Promise<DeleteRunResponse>;
    /**
     * Get event metrics for an experiment run
     *
     * Retrieve event metrics from ClickHouse for a specific experiment run
     */
    getRunMetrics(options: GetExperimentRunMetricsOptions): Promise<GetExperimentRunMetricsResponse>;
    /**
     * Retrieve experiment result
     *
     * Compute evaluation summary for an experiment run: pass/fail results, metric aggregations, per-datapoint results, event details, and the experiment run object.
     */
    getResult(options: GetExperimentResultOptions): Promise<GetExperimentResultResponse>;
    /**
     * Retrieve experiment comparison
     *
     * Compare metrics and results between two experiment runs
     */
    compareRuns(options: GetExperimentComparisonOptions): Promise<GetExperimentComparisonResponse>;
    /**
     * Compare events between two experiment runs
     *
     * Retrieve and compare events between two experiment runs for detailed analysis
     */
    compareRunEvents(options: GetExperimentCompareEventsOptions): Promise<GetExperimentCompareEventsResponse>;
}
/** @inline */
declare class QueuesNamespace {
    #private;
    constructor(client: ReturnType<typeof createApiClient<paths>>);
    /**
     * List annotation queues
     *
     * List annotation queues for the current project scope, optionally filtered by enabled status.
     */
    list(options?: GetQueuesOptions): Promise<GetQueuesResponse>;
    /**
     * Create an annotation queue
     *
     * Create a new annotation queue with a name, optional description, filters, and an initial set of event IDs to add.
     */
    create(options: CreateQueueOptions): Promise<CreateQueueResponse>;
    /**
     * Get an annotation queue
     *
     * Retrieve a single annotation queue by its unique identifier.
     */
    get(options: GetQueueOptions): Promise<GetQueueResponse>;
    /**
     * Update an annotation queue
     *
     * Update fields on an existing annotation queue. Supports updating name, description, filters, enabled status, and adding/removing events.
     */
    update(options: UpdateQueueOptions): Promise<UpdateQueueResponse>;
    /**
     * Delete an annotation queue
     *
     * Soft-delete an annotation queue by its unique identifier.
     */
    delete(options: DeleteQueueOptions): Promise<DeleteQueueResponse>;
}
/** @inline */
declare class ConfigurationsNamespace {
    #private;
    constructor(client: ReturnType<typeof createApiClient<paths>>);
    /**
     * Retrieve a list of configurations
     *
     * List configurations with optional filtering by name, environment, and tags.
     */
    list(options?: GetConfigurationsOptions): Promise<GetConfigurationsResponse>;
    /**
     * Create a new configuration
     *
     * Create a new LLM or pipeline configuration with provider, parameters, and environment settings.
     */
    create(options: CreateConfigurationOptions): Promise<CreateConfigurationResponse>;
    /**
     * Update an existing configuration
     *
     * Update an existing configuration's name, provider, parameters, environment, or tags.
     */
    update(options: UpdateConfigurationOptions): Promise<UpdateConfigurationResponse>;
    /**
     * Delete a configuration
     *
     * Permanently delete a configuration by its unique identifier.
     */
    delete(options: DeleteConfigurationOptions): Promise<DeleteConfigurationResponse>;
}
export declare class Client {
    #private;
    readonly sessions: SessionsNamespace;
    readonly events: EventsNamespace;
    readonly metrics: MetricsNamespace;
    readonly datapoints: DatapointsNamespace;
    readonly datasets: DatasetsNamespace;
    readonly experiments: ExperimentsNamespace;
    readonly queues: QueuesNamespace;
    readonly configurations: ConfigurationsNamespace;
    constructor(options?: ClientConfig);
}
export {};
//# sourceMappingURL=client.d.ts.map