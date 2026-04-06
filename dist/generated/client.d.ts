import { type paths } from './types.js';
import { type StartSessionOptions, type AddSessionTracesOptions, type GetSessionOptions, type DeleteSessionOptions, type CreateEventOptions, type UpdateEventOptions, type GetEventsOptions, type GetEventsChartOptions, type GetEventsBySessionIdOptions, type DeleteEventOptions, type ExportEventsOptions, type CreateModelEventOptions, type CreateEventBatchOptions, type CreateModelEventBatchOptions, type GetMetricsOptions, type CreateMetricOptions, type UpdateMetricOptions, type DeleteMetricOptions, type RunMetricOptions, type GetDatapointsOptions, type CreateDatapointOptions, type BatchCreateDatapointsOptions, type GetDatapointOptions, type UpdateDatapointOptions, type DeleteDatapointOptions, type GetDatasetsOptions, type CreateDatasetOptions, type UpdateDatasetOptions, type DeleteDatasetOptions, type AddDatapointsOptions, type RemoveDatapointOptions, type GetExperimentRunsSchemaOptions, type GetRunsOptions, type CreateRunOptions, type GetRunOptions, type UpdateRunOptions, type DeleteRunOptions, type GetExperimentRunMetricsOptions, type GetExperimentResultOptions, type GetExperimentComparisonOptions, type GetExperimentCompareEventsOptions, type GetConfigurationsOptions, type CreateConfigurationOptions, type UpdateConfigurationOptions, type DeleteConfigurationOptions, type StartSessionResponse, type AddSessionTracesResponse, type GetSessionResponse, type DeleteSessionResponse, type CreateEventResponse, type GetEventsResponse, type GetEventsChartResponse, type GetEventsBySessionIdResponse, type DeleteEventResponse, type ExportEventsResponse, type CreateModelEventResponse, type CreateEventBatchResponse, type CreateModelEventBatchResponse, type GetMetricsResponse, type CreateMetricResponse, type UpdateMetricResponse, type DeleteMetricResponse, type RunMetricResponse, type GetDatapointsResponse, type CreateDatapointResponse, type BatchCreateDatapointsResponse, type GetDatapointResponse, type UpdateDatapointResponse, type DeleteDatapointResponse, type GetDatasetsResponse, type CreateDatasetResponse, type UpdateDatasetResponse, type DeleteDatasetResponse, type AddDatapointsResponse, type RemoveDatapointResponse, type GetExperimentRunsSchemaResponse, type GetRunsResponse, type CreateRunResponse, type GetRunResponse, type UpdateRunResponse, type DeleteRunResponse, type GetExperimentRunMetricsResponse, type GetExperimentResultResponse, type GetExperimentComparisonResponse, type GetExperimentCompareEventsResponse, type GetConfigurationsResponse, type CreateConfigurationResponse, type UpdateConfigurationResponse, type DeleteConfigurationResponse } from './apiTypes.js';
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
    startSession(options: StartSessionOptions): Promise<StartSessionResponse>;
    /**
     * Add traces to a session
     *
     * Add trace events to an existing session. The field is named `logs` for legacy compatibility with the Go ingestion handler.
     */
    addSessionTraces(options: AddSessionTracesOptions): Promise<AddSessionTracesResponse>;
    /**
     * Get session tree by session ID
     *
     * Retrieve a complete session event tree including all nested events and metadata
     */
    getSession(options: GetSessionOptions): Promise<GetSessionResponse>;
    /**
     * Delete all events for a session
     *
     * Delete all events associated with the given session ID from both events and aggregates tables
     */
    deleteSession(options: DeleteSessionOptions): Promise<DeleteSessionResponse>;
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
     */
    createEvent(options: CreateEventOptions): Promise<CreateEventResponse>;
    /**
     * Update an event
     *
     * Update fields on an existing event. Only the provided fields are modified; omitted fields are left unchanged. The event_id field is required to identify the event to update.
     */
    updateEvent(options: UpdateEventOptions): Promise<void>;
    /**
     * Query events with filters and projections
     *
     * Retrieve events with optional filtering, projections, and pagination
     */
    getEvents(options?: GetEventsOptions): Promise<GetEventsResponse>;
    /**
     * Get charting data for events
     *
     * Retrieve aggregated chart data for events with optional grouping and bucketing
     */
    getEventsChart(options?: GetEventsChartOptions): Promise<GetEventsChartResponse>;
    /**
     * Get nested events for a session
     *
     * Retrieve all nested events for a specific session ID. The `id` parameter is interpreted as a session_id for this operation.
     */
    getEventsBySessionId(options: GetEventsBySessionIdOptions): Promise<GetEventsBySessionIdResponse>;
    /**
     * Delete an event
     *
     * Delete a specific event by event ID. The `id` parameter is interpreted as an event_id for this operation.
     */
    deleteEvent(options: DeleteEventOptions): Promise<DeleteEventResponse>;
    /**
     * Retrieve events based on filters
     *
     * Export events via POST with filtering, projections, and pagination. This is the primary method for retrieving events from HoneyHive.
     */
    exportEvents(options: ExportEventsOptions): Promise<ExportEventsResponse>;
    /**
     * Create a new model event
     *
     * Create a model event. The event_type is automatically set to 'model'. Please refer to our instrumentation guide for detailed information.
     */
    createModelEvent(options: CreateModelEventOptions): Promise<CreateModelEventResponse>;
    /**
     * Create a batch of events
     *
     * Create multiple events in a single request. When single_session is true, all events share the same session. Please refer to our instrumentation guide for detailed information.
     */
    createEventBatch(options: CreateEventBatchOptions): Promise<CreateEventBatchResponse>;
    /**
     * Create a batch of model events
     *
     * Create multiple model events in a single request. The event_type is automatically set to 'model' for all events. When single_session is true, all events share the same session. Please refer to our instrumentation guide for detailed information.
     */
    createModelEventBatch(options: CreateModelEventBatchOptions): Promise<CreateModelEventBatchResponse>;
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
    getMetrics(options?: GetMetricsOptions): Promise<GetMetricsResponse>;
    /**
     * Create a new metric
     *
     * Add a new metric
     */
    createMetric(options: CreateMetricOptions): Promise<CreateMetricResponse>;
    /**
     * Update an existing metric
     *
     * Edit a metric
     */
    updateMetric(options: UpdateMetricOptions): Promise<UpdateMetricResponse>;
    /**
     * Delete a metric
     *
     * Remove a metric
     */
    deleteMetric(options: DeleteMetricOptions): Promise<DeleteMetricResponse>;
    /**
     * Run a metric evaluation
     *
     * Execute a metric on a specific event
     */
    runMetric(options: RunMetricOptions): Promise<RunMetricResponse>;
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
    getDatapoints(options?: GetDatapointsOptions): Promise<GetDatapointsResponse>;
    /**
     * Create a new datapoint
     *
     * Create a single datapoint with inputs, history, ground truth, and metadata.
     */
    createDatapoint(options: CreateDatapointOptions): Promise<CreateDatapointResponse>;
    /**
     * Create multiple datapoints in batch
     *
     * Create multiple datapoints from events using field mappings and optional filters.
     */
    batchCreateDatapoints(options: BatchCreateDatapointsOptions): Promise<BatchCreateDatapointsResponse>;
    /**
     * Retrieve a specific datapoint
     *
     * Get a single datapoint by its unique identifier.
     */
    getDatapoint(options: GetDatapointOptions): Promise<GetDatapointResponse>;
    /**
     * Update a specific datapoint
     *
     * Update fields on an existing datapoint. Only the provided fields are modified.
     */
    updateDatapoint(options: UpdateDatapointOptions): Promise<UpdateDatapointResponse>;
    /**
     * Delete a specific datapoint
     *
     * Permanently delete a datapoint by its unique identifier.
     */
    deleteDatapoint(options: DeleteDatapointOptions): Promise<DeleteDatapointResponse>;
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
    getDatasets(options?: GetDatasetsOptions): Promise<GetDatasetsResponse>;
    /**
     * Create a dataset
     *
     * Create a new dataset with an optional name, description, and initial set of datapoint IDs.
     */
    createDataset(options: CreateDatasetOptions): Promise<CreateDatasetResponse>;
    /**
     * Update a dataset
     *
     * Update a dataset's name, description, or list of datapoint IDs.
     */
    updateDataset(options: UpdateDatasetOptions): Promise<UpdateDatasetResponse>;
    /**
     * Delete a dataset
     *
     * Permanently delete a dataset by its unique identifier.
     */
    deleteDataset(options: DeleteDatasetOptions): Promise<DeleteDatasetResponse>;
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
     * Get experiment runs schema
     *
     * Retrieve the schema and metadata for experiment runs
     */
    getExperimentRunsSchema(options?: GetExperimentRunsSchemaOptions): Promise<GetExperimentRunsSchemaResponse>;
    /**
     * Get a list of evaluation runs
     *
     * List experiment runs with optional filtering by dataset, status, name, date range, and specific run IDs. Results are paginated and sortable.
     */
    getRuns(options?: GetRunsOptions): Promise<GetRunsResponse>;
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
    getExperimentRunMetrics(options: GetExperimentRunMetricsOptions): Promise<GetExperimentRunMetricsResponse>;
    /**
     * Retrieve experiment result
     *
     * Compute evaluation summary for an experiment run including pass/fail status, metrics, and datapoints
     */
    getExperimentResult(options: GetExperimentResultOptions): Promise<GetExperimentResultResponse>;
    /**
     * Retrieve experiment comparison
     *
     * Compare metrics and results between two experiment runs
     */
    getExperimentComparison(options: GetExperimentComparisonOptions): Promise<GetExperimentComparisonResponse>;
    /**
     * Compare events between two experiment runs
     *
     * Retrieve and compare events between two experiment runs for detailed analysis
     */
    getExperimentCompareEvents(options: GetExperimentCompareEventsOptions): Promise<GetExperimentCompareEventsResponse>;
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
    getConfigurations(options?: GetConfigurationsOptions): Promise<GetConfigurationsResponse>;
    /**
     * Create a new configuration
     *
     * Create a new LLM or pipeline configuration with provider, parameters, and environment settings.
     */
    createConfiguration(options: CreateConfigurationOptions): Promise<CreateConfigurationResponse>;
    /**
     * Update an existing configuration
     *
     * Update an existing configuration's name, provider, parameters, environment, or tags.
     */
    updateConfiguration(options: UpdateConfigurationOptions): Promise<UpdateConfigurationResponse>;
    /**
     * Delete a configuration
     *
     * Permanently delete a configuration by its unique identifier.
     */
    deleteConfiguration(options: DeleteConfigurationOptions): Promise<DeleteConfigurationResponse>;
}
export declare class Client {
    #private;
    readonly sessions: SessionsNamespace;
    readonly events: EventsNamespace;
    readonly metrics: MetricsNamespace;
    readonly datapoints: DatapointsNamespace;
    readonly datasets: DatasetsNamespace;
    readonly experiments: ExperimentsNamespace;
    readonly configurations: ConfigurationsNamespace;
    constructor(options?: ClientConfig);
}
export {};
//# sourceMappingURL=client.d.ts.map