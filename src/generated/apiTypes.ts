// AUTO-GENERATED — do not edit manually. Run `pnpm generate:client` to regenerate.

import {
  type StartSessionRequest,
  type AddSessionTracesRequest,
  type PostEventRequest as CreateEventRequest,
  type UpdateEventRequest,
  type GetEventsLegacyRequest as ExportEventsRequest,
  type PostModelEventRequest as CreateModelEventRequest,
  type PostEventBatchRequest as CreateEventBatchRequest,
  type PostModelEventBatchRequest as CreateModelEventBatchRequest,
  type CreateMetricRequest,
  type UpdateMetricRequest,
  type RunMetricRequest,
  type CreateDatapointRequest,
  type BatchCreateDatapointsRequest,
  type UpdateDatapointRequest,
  type CreateDatasetRequest,
  type UpdateDatasetRequest,
  type AddDatapointsToDatasetRequest as AddDatapointsRequest,
  type PostExperimentRunRequest as CreateRunRequest,
  type PutExperimentRunRequest as UpdateRunRequest,
  type CreateConfigurationRequest,
  type UpdateConfigurationRequest,
  type AddSessionTracesPath,
  type GetSessionPath,
  type DeleteSessionPath,
  type GetEventsBySessionIdPath,
  type DeleteEventPath,
  type GetDatapointPath,
  type UpdateDatapointPath,
  type DeleteDatapointPath,
  type AddDatapointsPath,
  type RemoveDatapointPath,
  type GetRunPath,
  type UpdateRunPath,
  type DeleteRunPath,
  type GetExperimentRunMetricsPath,
  type GetExperimentResultPath,
  type GetExperimentComparisonPath,
  type UpdateConfigurationPath,
  type DeleteConfigurationPath,
  type GetEventsQuery,
  type GetEventsChartQuery,
  type GetMetricsQuery,
  type DeleteMetricQuery,
  type GetDatapointsQuery,
  type GetDatasetsQuery,
  type DeleteDatasetQuery,
  type GetExperimentRunsSchemaQuery,
  type GetRunsQuery,
  type GetExperimentRunMetricsQuery,
  type GetExperimentResultQuery,
  type GetExperimentComparisonQuery,
  type GetExperimentCompareEventsQuery,
  type GetConfigurationsQuery,
} from './schemas.js';

// ---- Options types ----

export type StartSessionOptions = {
  body: StartSessionRequest;
};

export type AddSessionTracesOptions = {
  path: AddSessionTracesPath;
  body: AddSessionTracesRequest;
};

export type GetSessionOptions = {
  path: GetSessionPath;
};

export type DeleteSessionOptions = {
  path: DeleteSessionPath;
};

export type CreateEventOptions = {
  body: CreateEventRequest;
};

export type UpdateEventOptions = {
  body: UpdateEventRequest;
};

export type GetEventsOptions = {
  query?: GetEventsQuery;
};

export type GetEventsChartOptions = {
  query?: GetEventsChartQuery;
};

export type GetEventsBySessionIdOptions = {
  path: GetEventsBySessionIdPath;
};

export type DeleteEventOptions = {
  path: DeleteEventPath;
};

export type ExportEventsOptions = {
  body: ExportEventsRequest;
};

export type CreateModelEventOptions = {
  body: CreateModelEventRequest;
};

export type CreateEventBatchOptions = {
  body: CreateEventBatchRequest;
};

export type CreateModelEventBatchOptions = {
  body: CreateModelEventBatchRequest;
};

export type GetMetricsOptions = {
  query?: GetMetricsQuery;
};

export type CreateMetricOptions = {
  body: CreateMetricRequest;
};

export type UpdateMetricOptions = {
  body: UpdateMetricRequest;
};

export type DeleteMetricOptions = {
  query: DeleteMetricQuery;
};

export type RunMetricOptions = {
  body: RunMetricRequest;
};

export type GetDatapointsOptions = {
  query?: GetDatapointsQuery;
};

export type CreateDatapointOptions = {
  body: CreateDatapointRequest;
};

export type BatchCreateDatapointsOptions = {
  body: BatchCreateDatapointsRequest;
};

export type GetDatapointOptions = {
  path: GetDatapointPath;
};

export type UpdateDatapointOptions = {
  path: UpdateDatapointPath;
  body: UpdateDatapointRequest;
};

export type DeleteDatapointOptions = {
  path: DeleteDatapointPath;
};

export type GetDatasetsOptions = {
  query?: GetDatasetsQuery;
};

export type CreateDatasetOptions = {
  body: CreateDatasetRequest;
};

export type UpdateDatasetOptions = {
  body: UpdateDatasetRequest;
};

export type DeleteDatasetOptions = {
  query: DeleteDatasetQuery;
};

export type AddDatapointsOptions = {
  path: AddDatapointsPath;
  body: AddDatapointsRequest;
};

export type RemoveDatapointOptions = {
  path: RemoveDatapointPath;
};

export type GetExperimentRunsSchemaOptions = {
  query?: GetExperimentRunsSchemaQuery;
};

export type GetRunsOptions = {
  query?: GetRunsQuery;
};

export type CreateRunOptions = {
  body: CreateRunRequest;
};

export type GetRunOptions = {
  path: GetRunPath;
};

export type UpdateRunOptions = {
  path: UpdateRunPath;
  body: UpdateRunRequest;
};

export type DeleteRunOptions = {
  path: DeleteRunPath;
};

export type GetExperimentRunMetricsOptions = {
  path: GetExperimentRunMetricsPath;
  query?: GetExperimentRunMetricsQuery;
};

export type GetExperimentResultOptions = {
  path: GetExperimentResultPath;
  query?: GetExperimentResultQuery;
};

export type GetExperimentComparisonOptions = {
  path: GetExperimentComparisonPath;
  query?: GetExperimentComparisonQuery;
};

export type GetExperimentCompareEventsOptions = {
  query: GetExperimentCompareEventsQuery;
};

export type GetConfigurationsOptions = {
  query?: GetConfigurationsQuery;
};

export type CreateConfigurationOptions = {
  body: CreateConfigurationRequest;
};

export type UpdateConfigurationOptions = {
  path: UpdateConfigurationPath;
  body: UpdateConfigurationRequest;
};

export type DeleteConfigurationOptions = {
  path: DeleteConfigurationPath;
};

// ---- Path types ----

export { type AddSessionTracesPath };
export { type GetSessionPath };
export { type DeleteSessionPath };
export { type GetEventsBySessionIdPath };
export { type DeleteEventPath };
export { type GetDatapointPath };
export { type UpdateDatapointPath };
export { type DeleteDatapointPath };
export { type AddDatapointsPath };
export { type RemoveDatapointPath };
export { type GetRunPath };
export { type UpdateRunPath };
export { type DeleteRunPath };
export { type GetExperimentRunMetricsPath };
export { type GetExperimentResultPath };
export { type GetExperimentComparisonPath };
export { type UpdateConfigurationPath };
export { type DeleteConfigurationPath };

// ---- Query types ----

export { type GetEventsQuery };
export { type GetEventsChartQuery };
export { type GetMetricsQuery };
export { type DeleteMetricQuery };
export { type GetDatapointsQuery };
export { type GetDatasetsQuery };
export { type DeleteDatasetQuery };
export { type GetExperimentRunsSchemaQuery };
export { type GetRunsQuery };
export { type GetExperimentRunMetricsQuery };
export { type GetExperimentResultQuery };
export { type GetExperimentComparisonQuery };
export { type GetExperimentCompareEventsQuery };
export { type GetConfigurationsQuery };

// ---- Request types ----

export { type StartSessionRequest };
export { type AddSessionTracesRequest };
export { type CreateEventRequest };
export { type UpdateEventRequest };
export { type ExportEventsRequest };
export { type CreateModelEventRequest };
export { type CreateEventBatchRequest };
export { type CreateModelEventBatchRequest };
export { type CreateMetricRequest };
export { type UpdateMetricRequest };
export { type RunMetricRequest };
export { type CreateDatapointRequest };
export { type BatchCreateDatapointsRequest };
export { type UpdateDatapointRequest };
export { type CreateDatasetRequest };
export { type UpdateDatasetRequest };
export { type AddDatapointsRequest };
export { type CreateRunRequest };
export { type UpdateRunRequest };
export { type CreateConfigurationRequest };
export { type UpdateConfigurationRequest };

// ---- Response types ----

export { type PostSessionStartResponse as StartSessionResponse } from './schemas.js';
export { type SessionTracesResponse as AddSessionTracesResponse } from './schemas.js';
export { type GetSessionResponse } from './schemas.js';
export { type DeleteSessionResponse } from './schemas.js';
export { type PostEventResponse as CreateEventResponse } from './schemas.js';
export { type GetEventsResponse } from './schemas.js';
export { type GetEventsChartResponse } from './schemas.js';
export { type GetEventsBySessionIdResponse } from './schemas.js';
export { type DeleteEventResponse } from './schemas.js';
export { type GetEventsLegacyResponse as ExportEventsResponse } from './schemas.js';
export { type PostEventResponse as CreateModelEventResponse } from './schemas.js';
export { type PostEventBatchResponse as CreateEventBatchResponse } from './schemas.js';
export { type PostEventBatchResponse as CreateModelEventBatchResponse } from './schemas.js';
export { type GetMetricsResponse } from './schemas.js';
export { type CreateMetricResponse } from './schemas.js';
export { type UpdateMetricResponse } from './schemas.js';
export { type DeleteMetricResponse } from './schemas.js';
export { type RunMetricResponse } from './schemas.js';
export { type GetDatapointsResponse } from './schemas.js';
export { type CreateDatapointResponse } from './schemas.js';
export { type BatchCreateDatapointsResponse } from './schemas.js';
export { type GetDatapointResponse } from './schemas.js';
export { type UpdateDatapointResponse } from './schemas.js';
export { type DeleteDatapointResponse } from './schemas.js';
export { type GetDatasetsResponse } from './schemas.js';
export { type CreateDatasetResponse } from './schemas.js';
export { type UpdateDatasetResponse } from './schemas.js';
export { type DeleteDatasetResponse } from './schemas.js';
export { type AddDatapointsResponse } from './schemas.js';
export { type RemoveDatapointResponse } from './schemas.js';
export { type GetExperimentRunsSchemaResponse } from './schemas.js';
export { type GetExperimentRunsResponse as GetRunsResponse } from './schemas.js';
export { type PostExperimentRunResponse as CreateRunResponse } from './schemas.js';
export { type GetExperimentRunResponse as GetRunResponse } from './schemas.js';
export { type PutExperimentRunResponse as UpdateRunResponse } from './schemas.js';
export { type DeleteExperimentRunResponse as DeleteRunResponse } from './schemas.js';
export { type GetExperimentRunMetricsResponse } from './schemas.js';
export { type GetExperimentRunResultResponse as GetExperimentResultResponse } from './schemas.js';
export { type GetExperimentRunCompareResponse as GetExperimentComparisonResponse } from './schemas.js';
export { type GetExperimentCompareEventsResponse } from './schemas.js';
export { type GetConfigurationsResponse } from './schemas.js';
export { type CreateConfigurationResponse } from './schemas.js';
export { type UpdateConfigurationResponse } from './schemas.js';
export { type DeleteConfigurationResponse } from './schemas.js';
