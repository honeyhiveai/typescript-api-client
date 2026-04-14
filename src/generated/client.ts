// AUTO-GENERATED — do not edit manually. Run `pnpm generate` to regenerate.

import { type paths } from './types.js';
import {
  type StartSessionOptions,
  type AddSessionTracesOptions,
  type CreateEventOptions,
  type UpdateEventOptions,
  type ExportEventsOptions,
  type CreateModelEventOptions,
  type CreateEventBatchOptions,
  type CreateModelEventBatchOptions,
  type GetMetricsOptions,
  type CreateMetricOptions,
  type UpdateMetricOptions,
  type DeleteMetricOptions,
  type RunMetricOptions,
  type GetDatapointsOptions,
  type CreateDatapointOptions,
  type BatchCreateDatapointsOptions,
  type GetDatapointOptions,
  type UpdateDatapointOptions,
  type DeleteDatapointOptions,
  type GetDatasetsOptions,
  type CreateDatasetOptions,
  type UpdateDatasetOptions,
  type DeleteDatasetOptions,
  type AddDatapointsOptions,
  type RemoveDatapointOptions,
  type GetExperimentRunsSchemaOptions,
  type GetRunsOptions,
  type CreateRunOptions,
  type GetRunOptions,
  type UpdateRunOptions,
  type DeleteRunOptions,
  type GetExperimentRunMetricsOptions,
  type GetExperimentResultOptions,
  type GetExperimentComparisonOptions,
  type GetExperimentCompareEventsOptions,
  type GetConfigurationsOptions,
  type CreateConfigurationOptions,
  type UpdateConfigurationOptions,
  type DeleteConfigurationOptions,
  type StartSessionResponse,
  type AddSessionTracesResponse,
  type CreateEventResponse,
  type ExportEventsResponse,
  type CreateModelEventResponse,
  type CreateEventBatchResponse,
  type CreateModelEventBatchResponse,
  type GetMetricsResponse,
  type CreateMetricResponse,
  type UpdateMetricResponse,
  type DeleteMetricResponse,
  type RunMetricResponse,
  type GetDatapointsResponse,
  type CreateDatapointResponse,
  type BatchCreateDatapointsResponse,
  type GetDatapointResponse,
  type UpdateDatapointResponse,
  type DeleteDatapointResponse,
  type GetDatasetsResponse,
  type CreateDatasetResponse,
  type UpdateDatasetResponse,
  type DeleteDatasetResponse,
  type AddDatapointsResponse,
  type RemoveDatapointResponse,
  type GetExperimentRunsSchemaResponse,
  type GetRunsResponse,
  type CreateRunResponse,
  type GetRunResponse,
  type UpdateRunResponse,
  type DeleteRunResponse,
  type GetExperimentRunMetricsResponse,
  type GetExperimentResultResponse,
  type GetExperimentComparisonResponse,
  type GetExperimentCompareEventsResponse,
  type GetConfigurationsResponse,
  type CreateConfigurationResponse,
  type UpdateConfigurationResponse,
  type DeleteConfigurationResponse,
} from './apiTypes.js';
import { type ClientConfig, createApiClient, unwrap } from '../util.js';

/** @inline */
class SessionsNamespace {
  #client: ReturnType<typeof createApiClient<paths>>;

  constructor(client: ReturnType<typeof createApiClient<paths>>) {
    this.#client = client;
  }

  /**
   * Start a new session
   *
   * Start a new session. The request body wraps the session event object under the `session` key, matching the pattern used by POST /events.
   */
  public start(options: StartSessionOptions): Promise<StartSessionResponse> {
    return unwrap(this.#client.POST('/session/start', { body: options.body }));
  }

  /**
   * Add traces to a session
   *
   * Add trace events to an existing session. The field is named `logs` for legacy compatibility with the Go ingestion handler.
   */
  public addTraces(options: AddSessionTracesOptions): Promise<AddSessionTracesResponse> {
    return unwrap(
      this.#client.POST('/session/{session_id}/traces', {
        params: { path: options.path },
        body: options.body,
      }),
    );
  }
}

/** @inline */
class EventsNamespace {
  #client: ReturnType<typeof createApiClient<paths>>;

  constructor(client: ReturnType<typeof createApiClient<paths>>) {
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
   */
  public create(options: CreateEventOptions): Promise<CreateEventResponse> {
    return unwrap(this.#client.POST('/events', { body: options.body }));
  }

  /**
   * Update an event
   *
   * Update fields on an existing event. Only the provided fields are modified; omitted fields are left unchanged. The event_id field is required to identify the event to update.
   */
  public update(options: UpdateEventOptions): Promise<void> {
    return unwrap(this.#client.PUT('/events', { body: options.body }));
  }

  /**
   * Retrieve events based on filters
   *
   * Export events via POST with filtering, projections, and pagination. This is the primary method for retrieving events from HoneyHive.
   */
  public export(options: ExportEventsOptions): Promise<ExportEventsResponse> {
    return unwrap(this.#client.POST('/v1/events/export', { body: options.body }));
  }

  /**
   * Create a new model event
   *
   * Create a model event. The event_type is automatically set to 'model'. Please refer to our instrumentation guide for detailed information.
   */
  public createModel(options: CreateModelEventOptions): Promise<CreateModelEventResponse> {
    return unwrap(this.#client.POST('/events/model', { body: options.body }));
  }

  /**
   * Create a batch of events
   *
   * Create multiple events in a single request. When single_session is true, all events share the same session. Please refer to our instrumentation guide for detailed information.
   */
  public createBatch(options: CreateEventBatchOptions): Promise<CreateEventBatchResponse> {
    return unwrap(this.#client.POST('/events/batch', { body: options.body }));
  }

  /**
   * Create a batch of model events
   *
   * Create multiple model events in a single request. The event_type is automatically set to 'model' for all events. When single_session is true, all events share the same session. Please refer to our instrumentation guide for detailed information.
   */
  public createModelBatch(
    options: CreateModelEventBatchOptions,
  ): Promise<CreateModelEventBatchResponse> {
    return unwrap(this.#client.POST('/events/model/batch', { body: options.body }));
  }
}

/** @inline */
class MetricsNamespace {
  #client: ReturnType<typeof createApiClient<paths>>;

  constructor(client: ReturnType<typeof createApiClient<paths>>) {
    this.#client = client;
  }

  /**
   * Get all metrics
   *
   * Retrieve a list of all metrics
   */
  public list(options?: GetMetricsOptions): Promise<GetMetricsResponse> {
    return unwrap(this.#client.GET('/v1/metrics', { params: { query: options?.query } }));
  }

  /**
   * Create a new metric
   *
   * Add a new metric
   */
  public create(options: CreateMetricOptions): Promise<CreateMetricResponse> {
    return unwrap(this.#client.POST('/v1/metrics', { body: options.body }));
  }

  /**
   * Update an existing metric
   *
   * Edit a metric
   */
  public update(options: UpdateMetricOptions): Promise<UpdateMetricResponse> {
    return unwrap(this.#client.PUT('/v1/metrics', { body: options.body }));
  }

  /**
   * Delete a metric
   *
   * Remove a metric
   */
  public delete(options: DeleteMetricOptions): Promise<DeleteMetricResponse> {
    return unwrap(this.#client.DELETE('/v1/metrics', { params: { query: options.query } }));
  }

  /**
   * Run a metric evaluation
   *
   * Execute a metric on a specific event
   */
  public run(options: RunMetricOptions): Promise<RunMetricResponse> {
    return unwrap(this.#client.POST('/v1/metrics/run_metric', { body: options.body }));
  }
}

/** @inline */
class DatapointsNamespace {
  #client: ReturnType<typeof createApiClient<paths>>;

  constructor(client: ReturnType<typeof createApiClient<paths>>) {
    this.#client = client;
  }

  /**
   * Retrieve a list of datapoints
   *
   * Retrieve datapoints, optionally filtered by a list of datapoint IDs or dataset name.
   */
  public list(options?: GetDatapointsOptions): Promise<GetDatapointsResponse> {
    return unwrap(this.#client.GET('/v1/datapoints', { params: { query: options?.query } }));
  }

  /**
   * Create a new datapoint
   *
   * Create a single datapoint with inputs, history, ground truth, and metadata.
   */
  public create(options: CreateDatapointOptions): Promise<CreateDatapointResponse> {
    return unwrap(this.#client.POST('/v1/datapoints', { body: options.body }));
  }

  /**
   * Create multiple datapoints in batch
   *
   * Create multiple datapoints from events using field mappings and optional filters.
   */
  public createBatch(
    options: BatchCreateDatapointsOptions,
  ): Promise<BatchCreateDatapointsResponse> {
    return unwrap(this.#client.POST('/v1/datapoints/batch', { body: options.body }));
  }

  /**
   * Retrieve a specific datapoint
   *
   * Get a single datapoint by its unique identifier.
   */
  public get(options: GetDatapointOptions): Promise<GetDatapointResponse> {
    return unwrap(
      this.#client.GET('/v1/datapoints/{datapoint_id}', { params: { path: options.path } }),
    );
  }

  /**
   * Update a specific datapoint
   *
   * Update fields on an existing datapoint. Only the provided fields are modified.
   */
  public update(options: UpdateDatapointOptions): Promise<UpdateDatapointResponse> {
    return unwrap(
      this.#client.PUT('/v1/datapoints/{datapoint_id}', {
        params: { path: options.path },
        body: options.body,
      }),
    );
  }

  /**
   * Delete a specific datapoint
   *
   * Permanently delete a datapoint by its unique identifier.
   */
  public delete(options: DeleteDatapointOptions): Promise<DeleteDatapointResponse> {
    return unwrap(
      this.#client.DELETE('/v1/datapoints/{datapoint_id}', { params: { path: options.path } }),
    );
  }
}

/** @inline */
class DatasetsNamespace {
  #client: ReturnType<typeof createApiClient<paths>>;

  constructor(client: ReturnType<typeof createApiClient<paths>>) {
    this.#client = client;
  }

  /**
   * Get datasets
   *
   * Retrieve datasets, optionally filtered by dataset ID or name.
   */
  public list(options?: GetDatasetsOptions): Promise<GetDatasetsResponse> {
    return unwrap(this.#client.GET('/v1/datasets', { params: { query: options?.query } }));
  }

  /**
   * Create a dataset
   *
   * Create a new dataset with an optional name, description, and initial set of datapoint IDs.
   */
  public create(options: CreateDatasetOptions): Promise<CreateDatasetResponse> {
    return unwrap(this.#client.POST('/v1/datasets', { body: options.body }));
  }

  /**
   * Update a dataset
   *
   * Update a dataset's name, description, or list of datapoint IDs.
   */
  public update(options: UpdateDatasetOptions): Promise<UpdateDatasetResponse> {
    return unwrap(this.#client.PUT('/v1/datasets', { body: options.body }));
  }

  /**
   * Delete a dataset
   *
   * Permanently delete a dataset by its unique identifier.
   */
  public delete(options: DeleteDatasetOptions): Promise<DeleteDatasetResponse> {
    return unwrap(this.#client.DELETE('/v1/datasets', { params: { query: options.query } }));
  }

  /**
   * Add datapoints to a dataset
   *
   * Add new datapoints to an existing dataset. Provide raw data objects and a field mapping that specifies which fields map to inputs, ground truth, and history.
   */
  public addDatapoints(options: AddDatapointsOptions): Promise<AddDatapointsResponse> {
    return unwrap(
      this.#client.POST('/v1/datasets/{dataset_id}/datapoints', {
        params: { path: options.path },
        body: options.body,
      }),
    );
  }

  /**
   * Remove a datapoint from a dataset
   *
   * Remove a specific datapoint from a dataset. The datapoint itself is not deleted, only dereferenced from the dataset.
   */
  public removeDatapoint(options: RemoveDatapointOptions): Promise<RemoveDatapointResponse> {
    return unwrap(
      this.#client.DELETE('/v1/datasets/{dataset_id}/{datapoint_id}', {
        params: { path: options.path },
      }),
    );
  }
}

/** @inline */
class ExperimentsNamespace {
  #client: ReturnType<typeof createApiClient<paths>>;

  constructor(client: ReturnType<typeof createApiClient<paths>>) {
    this.#client = client;
  }

  /**
   * Get experiment runs schema
   *
   * Retrieve the schema and metadata for experiment runs
   */
  public getRunsSchema(
    options?: GetExperimentRunsSchemaOptions,
  ): Promise<GetExperimentRunsSchemaResponse> {
    return unwrap(this.#client.GET('/v1/runs/schema', { params: { query: options?.query } }));
  }

  /**
   * Get a list of evaluation runs
   *
   * List experiment runs with optional filtering by dataset, status, name, date range, and specific run IDs. Results are paginated and sortable.
   */
  public listRuns(options?: GetRunsOptions): Promise<GetRunsResponse> {
    return unwrap(this.#client.GET('/v1/runs', { params: { query: options?.query } }));
  }

  /**
   * Create a new evaluation run
   *
   * Create a new experiment run to track an evaluation against a dataset.
   */
  public createRun(options: CreateRunOptions): Promise<CreateRunResponse> {
    return unwrap(this.#client.POST('/v1/runs', { body: options.body }));
  }

  /**
   * Get details of an evaluation run
   *
   * Retrieve the full details of a single experiment run by its run ID.
   */
  public getRun(options: GetRunOptions): Promise<GetRunResponse> {
    return unwrap(this.#client.GET('/v1/runs/{run_id}', { params: { path: options.path } }));
  }

  /**
   * Update an evaluation run
   *
   * Update fields on an existing experiment run such as name, status, metadata, or results.
   */
  public updateRun(options: UpdateRunOptions): Promise<UpdateRunResponse> {
    return unwrap(
      this.#client.PUT('/v1/runs/{run_id}', { params: { path: options.path }, body: options.body }),
    );
  }

  /**
   * Delete an evaluation run
   *
   * Permanently delete an experiment run by its run ID.
   */
  public deleteRun(options: DeleteRunOptions): Promise<DeleteRunResponse> {
    return unwrap(this.#client.DELETE('/v1/runs/{run_id}', { params: { path: options.path } }));
  }

  /**
   * Get event metrics for an experiment run
   *
   * Retrieve event metrics from ClickHouse for a specific experiment run
   */
  public getRunMetrics(
    options: GetExperimentRunMetricsOptions,
  ): Promise<GetExperimentRunMetricsResponse> {
    return unwrap(
      this.#client.GET('/v1/runs/{run_id}/metrics', {
        params: { path: options.path, query: options.query },
      }),
    );
  }

  /**
   * Retrieve experiment result
   *
   * Compute evaluation summary for an experiment run including pass/fail status, metrics, and datapoints
   */
  public getResult(options: GetExperimentResultOptions): Promise<GetExperimentResultResponse> {
    return unwrap(
      this.#client.GET('/v1/runs/{run_id}/result', {
        params: { path: options.path, query: options.query },
      }),
    );
  }

  /**
   * Retrieve experiment comparison
   *
   * Compare metrics and results between two experiment runs
   */
  public compareRuns(
    options: GetExperimentComparisonOptions,
  ): Promise<GetExperimentComparisonResponse> {
    return unwrap(
      this.#client.GET('/v1/runs/{new_run_id}/compare-with/{old_run_id}', {
        params: { path: options.path, query: options.query },
      }),
    );
  }

  /**
   * Compare events between two experiment runs
   *
   * Retrieve and compare events between two experiment runs for detailed analysis
   */
  public compareRunEvents(
    options: GetExperimentCompareEventsOptions,
  ): Promise<GetExperimentCompareEventsResponse> {
    return unwrap(
      this.#client.GET('/v1/runs/compare/events', { params: { query: options.query } }),
    );
  }
}

/** @inline */
class ConfigurationsNamespace {
  #client: ReturnType<typeof createApiClient<paths>>;

  constructor(client: ReturnType<typeof createApiClient<paths>>) {
    this.#client = client;
  }

  /**
   * Retrieve a list of configurations
   *
   * List configurations with optional filtering by name, environment, and tags.
   */
  public list(options?: GetConfigurationsOptions): Promise<GetConfigurationsResponse> {
    return unwrap(this.#client.GET('/v1/configurations', { params: { query: options?.query } }));
  }

  /**
   * Create a new configuration
   *
   * Create a new LLM or pipeline configuration with provider, parameters, and environment settings.
   */
  public create(options: CreateConfigurationOptions): Promise<CreateConfigurationResponse> {
    return unwrap(this.#client.POST('/v1/configurations', { body: options.body }));
  }

  /**
   * Update an existing configuration
   *
   * Update an existing configuration's name, provider, parameters, environment, or tags.
   */
  public update(options: UpdateConfigurationOptions): Promise<UpdateConfigurationResponse> {
    return unwrap(
      this.#client.PUT('/v1/configurations/{configId}', {
        params: { path: options.path },
        body: options.body,
      }),
    );
  }

  /**
   * Delete a configuration
   *
   * Permanently delete a configuration by its unique identifier.
   */
  public delete(options: DeleteConfigurationOptions): Promise<DeleteConfigurationResponse> {
    return unwrap(
      this.#client.DELETE('/v1/configurations/{configId}', { params: { path: options.path } }),
    );
  }
}

export class Client {
  #client: ReturnType<typeof createApiClient<paths>>;
  readonly sessions: SessionsNamespace;
  readonly events: EventsNamespace;
  readonly metrics: MetricsNamespace;
  readonly datapoints: DatapointsNamespace;
  readonly datasets: DatasetsNamespace;
  readonly experiments: ExperimentsNamespace;
  readonly configurations: ConfigurationsNamespace;

  constructor(options: ClientConfig = {}) {
    this.#client = createApiClient<paths>(options);
    this.sessions = new SessionsNamespace(this.#client);
    this.events = new EventsNamespace(this.#client);
    this.metrics = new MetricsNamespace(this.#client);
    this.datapoints = new DatapointsNamespace(this.#client);
    this.datasets = new DatasetsNamespace(this.#client);
    this.experiments = new ExperimentsNamespace(this.#client);
    this.configurations = new ConfigurationsNamespace(this.#client);
  }
}
