// AUTO-GENERATED — do not edit manually. Run `pnpm generate:client` to regenerate.

import { type paths } from './types.js';
import {
  type CreateSessionOptions,
  type CreateEventOptions,
  type UpdateEventOptions,
  type SearchEventsOptions,
  type CreateEventBatchOptions,
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
  type GetRunsOptions,
  type CreateRunOptions,
  type GetRunsSchemaOptions,
  type GetRunOptions,
  type UpdateRunOptions,
  type DeleteRunOptions,
  type GetRunSchemaOptions,
  type GetExperimentRunMetricsOptions,
  type GetExperimentComparisonOptions,
  type GetExperimentCompareEventsOptions,
  type GetQueuesOptions,
  type CreateQueueOptions,
  type GetQueueOptions,
  type UpdateQueueOptions,
  type DeleteQueueOptions,
  type CreateSessionResponse,
  type CreateEventResponse,
  type SearchEventsResponse,
  type CreateEventBatchResponse,
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
  type GetRunsResponse,
  type CreateRunResponse,
  type GetRunsSchemaResponse,
  type GetRunResponse,
  type UpdateRunResponse,
  type DeleteRunResponse,
  type GetRunSchemaResponse,
  type GetExperimentRunMetricsResponse,
  type GetExperimentComparisonResponse,
  type GetExperimentCompareEventsResponse,
  type GetQueuesResponse,
  type CreateQueueResponse,
  type GetQueueResponse,
  type UpdateQueueResponse,
  type DeleteQueueResponse,
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
  public create(options: CreateSessionOptions): Promise<CreateSessionResponse> {
    return unwrap(this.#client.POST('/v1/sessions', { body: options.body }));
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
  public create(options: CreateEventOptions): Promise<CreateEventResponse> {
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
  public update(options: UpdateEventOptions): Promise<void> {
    return unwrap(
      this.#client.PUT('/v1/events/{event_id}', {
        params: { path: options.path },
        body: options.body,
      }),
    );
  }

  /**
   * Retrieve events based on filters
   *
   * Search events via POST with filtering and pagination. This is the primary method for retrieving events from HoneyHive.
   */
  public search(options: SearchEventsOptions): Promise<SearchEventsResponse> {
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
  public createBatch(options: CreateEventBatchOptions): Promise<CreateEventBatchResponse> {
    return unwrap(this.#client.POST('/v1/events/batch', { body: options.body }));
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
   * Update a metric's editable fields. Only fields included in the request body are modified.
   */
  public update(options: UpdateMetricOptions): Promise<UpdateMetricResponse> {
    return unwrap(
      this.#client.PUT('/v1/metrics/{metric_id}', {
        params: { path: options.path },
        body: options.body,
      }),
    );
  }

  /**
   * Delete a metric
   *
   * Remove a metric by id.
   */
  public delete(options: DeleteMetricOptions): Promise<DeleteMetricResponse> {
    return unwrap(
      this.#client.DELETE('/v1/metrics/{metric_id}', { params: { path: options.path } }),
    );
  }

  /**
   * Run a metric evaluation
   *
   * Execute a metric on a specific event
   */
  public run(options: RunMetricOptions): Promise<RunMetricResponse> {
    return unwrap(this.#client.POST('/v1/metrics/run', { body: options.body }));
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
    return unwrap(
      this.#client.PUT('/v1/datasets/{dataset_id}', {
        params: { path: options.path },
        body: options.body,
      }),
    );
  }

  /**
   * Delete a dataset
   *
   * Permanently delete a dataset by its unique identifier.
   */
  public delete(options: DeleteDatasetOptions): Promise<DeleteDatasetResponse> {
    return unwrap(
      this.#client.DELETE('/v1/datasets/{dataset_id}', { params: { path: options.path } }),
    );
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
      this.#client.DELETE('/v1/datasets/{dataset_id}/datapoints/{datapoint_id}', {
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
   * Get events schema across all experiment runs in a project
   *
   * Retrieve the aggregated events schema (fields, datasets, mappings) across all experiment runs in the project.
   */
  public getRunsSchema(options?: GetRunsSchemaOptions): Promise<GetRunsSchemaResponse> {
    return unwrap(this.#client.GET('/v1/runs/schema', { params: { query: options?.query } }));
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
   * Get events schema for a single experiment run
   *
   * Retrieve the events schema (fields, datasets, mappings) for a single experiment run.
   */
  public getRunSchema(options: GetRunSchemaOptions): Promise<GetRunSchemaResponse> {
    return unwrap(
      this.#client.GET('/v1/runs/{run_id}/schema', {
        params: { path: options.path, query: options.query },
      }),
    );
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
   * Retrieve experiment comparison
   *
   * Compare metrics and results between two experiment runs
   */
  public compareRuns(
    options: GetExperimentComparisonOptions,
  ): Promise<GetExperimentComparisonResponse> {
    return unwrap(
      this.#client.GET('/v1/runs/{new_run_id}/compare/{old_run_id}', {
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
      this.#client.GET('/v1/runs/{new_run_id}/compare/{old_run_id}/events', {
        params: { path: options.path, query: options.query },
      }),
    );
  }
}

/** @inline */
class QueuesNamespace {
  #client: ReturnType<typeof createApiClient<paths>>;

  constructor(client: ReturnType<typeof createApiClient<paths>>) {
    this.#client = client;
  }

  /**
   * List annotation queues
   *
   * List annotation queues for the current project scope, optionally filtered by enabled status.
   */
  public list(options?: GetQueuesOptions): Promise<GetQueuesResponse> {
    return unwrap(this.#client.GET('/v1/queues', { params: { query: options?.query } }));
  }

  /**
   * Create an annotation queue
   *
   * Create a new annotation queue with a name, optional description, filters, and an initial set of event IDs to add.
   */
  public create(options: CreateQueueOptions): Promise<CreateQueueResponse> {
    return unwrap(this.#client.POST('/v1/queues', { body: options.body }));
  }

  /**
   * Get an annotation queue
   *
   * Retrieve a single annotation queue by its unique identifier.
   */
  public get(options: GetQueueOptions): Promise<GetQueueResponse> {
    return unwrap(this.#client.GET('/v1/queues/{queue_id}', { params: { path: options.path } }));
  }

  /**
   * Update an annotation queue
   *
   * Update fields on an existing annotation queue. Supports updating name, description, filters, enabled status, and adding/removing events.
   */
  public update(options: UpdateQueueOptions): Promise<UpdateQueueResponse> {
    return unwrap(
      this.#client.PUT('/v1/queues/{queue_id}', {
        params: { path: options.path },
        body: options.body,
      }),
    );
  }

  /**
   * Delete an annotation queue
   *
   * Soft-delete an annotation queue by its unique identifier.
   */
  public delete(options: DeleteQueueOptions): Promise<DeleteQueueResponse> {
    return unwrap(this.#client.DELETE('/v1/queues/{queue_id}', { params: { path: options.path } }));
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
  readonly queues: QueuesNamespace;

  constructor(options: ClientConfig = {}) {
    this.#client = createApiClient<paths>(options);
    this.sessions = new SessionsNamespace(this.#client);
    this.events = new EventsNamespace(this.#client);
    this.metrics = new MetricsNamespace(this.#client);
    this.datapoints = new DatapointsNamespace(this.#client);
    this.datasets = new DatasetsNamespace(this.#client);
    this.experiments = new ExperimentsNamespace(this.#client);
    this.queues = new QueuesNamespace(this.#client);
  }
}
