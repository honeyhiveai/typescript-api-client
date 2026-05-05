import { type StartSessionRequest as CreateSessionRequest, type PostEventRequest as CreateEventRequest, type UpdateEventRequest, type SearchEventsRequest, type PostEventBatchRequest as CreateEventBatchRequest, type CreateMetricRequest, type UpdateMetricRequest, type RunMetricRequest, type CreateDatapointRequest, type BatchCreateDatapointsRequest, type UpdateDatapointRequest, type CreateDatasetRequest, type UpdateDatasetRequest, type AddDatapointsToDatasetRequest as AddDatapointsRequest, type PostExperimentRunRequest as CreateRunRequest, type PutExperimentRunRequest as UpdateRunRequest, type CreateAnnotationQueueRequest as CreateQueueRequest, type UpdateAnnotationQueueRequest as UpdateQueueRequest, type UpdateEventPath, type UpdateMetricPath, type DeleteMetricPath, type GetDatapointPath, type UpdateDatapointPath, type DeleteDatapointPath, type UpdateDatasetPath, type DeleteDatasetPath, type AddDatapointsPath, type RemoveDatapointPath, type GetRunPath, type UpdateRunPath, type DeleteRunPath, type GetRunSchemaPath, type GetExperimentRunMetricsPath, type GetExperimentComparisonPath, type GetExperimentCompareEventsPath, type GetQueuePath, type UpdateQueuePath, type DeleteQueuePath, type GetMetricsQuery, type GetDatapointsQuery, type GetDatasetsQuery, type GetRunsQuery, type GetRunsSchemaQuery, type GetRunSchemaQuery, type GetExperimentRunMetricsQuery, type GetExperimentComparisonQuery, type GetExperimentCompareEventsQuery, type GetQueuesQuery } from './schemas.js';
export type CreateSessionOptions = {
    body: CreateSessionRequest;
};
export type CreateEventOptions = {
    body: CreateEventRequest;
};
export type UpdateEventOptions = {
    path: UpdateEventPath;
    body: UpdateEventRequest;
};
export type SearchEventsOptions = {
    body: SearchEventsRequest;
};
export type CreateEventBatchOptions = {
    body: CreateEventBatchRequest;
};
export type GetMetricsOptions = {
    query?: GetMetricsQuery;
};
export type CreateMetricOptions = {
    body: CreateMetricRequest;
};
export type UpdateMetricOptions = {
    path: UpdateMetricPath;
    body: UpdateMetricRequest;
};
export type DeleteMetricOptions = {
    path: DeleteMetricPath;
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
    path: UpdateDatasetPath;
    body: UpdateDatasetRequest;
};
export type DeleteDatasetOptions = {
    path: DeleteDatasetPath;
};
export type AddDatapointsOptions = {
    path: AddDatapointsPath;
    body: AddDatapointsRequest;
};
export type RemoveDatapointOptions = {
    path: RemoveDatapointPath;
};
export type GetRunsOptions = {
    query?: GetRunsQuery;
};
export type CreateRunOptions = {
    body: CreateRunRequest;
};
export type GetRunsSchemaOptions = {
    query?: GetRunsSchemaQuery;
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
export type GetRunSchemaOptions = {
    path: GetRunSchemaPath;
    query?: GetRunSchemaQuery;
};
export type GetExperimentRunMetricsOptions = {
    path: GetExperimentRunMetricsPath;
    query?: GetExperimentRunMetricsQuery;
};
export type GetExperimentComparisonOptions = {
    path: GetExperimentComparisonPath;
    query?: GetExperimentComparisonQuery;
};
export type GetExperimentCompareEventsOptions = {
    path: GetExperimentCompareEventsPath;
    query?: GetExperimentCompareEventsQuery;
};
export type GetQueuesOptions = {
    query?: GetQueuesQuery;
};
export type CreateQueueOptions = {
    body: CreateQueueRequest;
};
export type GetQueueOptions = {
    path: GetQueuePath;
};
export type UpdateQueueOptions = {
    path: UpdateQueuePath;
    body: UpdateQueueRequest;
};
export type DeleteQueueOptions = {
    path: DeleteQueuePath;
};
export { type UpdateEventPath };
export { type UpdateMetricPath };
export { type DeleteMetricPath };
export { type GetDatapointPath };
export { type UpdateDatapointPath };
export { type DeleteDatapointPath };
export { type UpdateDatasetPath };
export { type DeleteDatasetPath };
export { type AddDatapointsPath };
export { type RemoveDatapointPath };
export { type GetRunPath };
export { type UpdateRunPath };
export { type DeleteRunPath };
export { type GetRunSchemaPath };
export { type GetExperimentRunMetricsPath };
export { type GetExperimentComparisonPath };
export { type GetExperimentCompareEventsPath };
export { type GetQueuePath };
export { type UpdateQueuePath };
export { type DeleteQueuePath };
export { type GetMetricsQuery };
export { type GetDatapointsQuery };
export { type GetDatasetsQuery };
export { type GetRunsQuery };
export { type GetRunsSchemaQuery };
export { type GetRunSchemaQuery };
export { type GetExperimentRunMetricsQuery };
export { type GetExperimentComparisonQuery };
export { type GetExperimentCompareEventsQuery };
export { type GetQueuesQuery };
export { type CreateSessionRequest };
export { type CreateEventRequest };
export { type UpdateEventRequest };
export { type SearchEventsRequest };
export { type CreateEventBatchRequest };
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
export { type CreateQueueRequest };
export { type UpdateQueueRequest };
export { type PostSessionStartResponse as CreateSessionResponse } from './schemas.js';
export { type PostEventResponse as CreateEventResponse } from './schemas.js';
export { type ExportEventsResponse as SearchEventsResponse } from './schemas.js';
export { type PostEventBatchResponse as CreateEventBatchResponse } from './schemas.js';
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
export { type GetExperimentRunsResponse as GetRunsResponse } from './schemas.js';
export { type PostExperimentRunResponse as CreateRunResponse } from './schemas.js';
export { type GetEventsSchemaResponse as GetRunsSchemaResponse } from './schemas.js';
export { type GetExperimentRunResponse as GetRunResponse } from './schemas.js';
export { type PutExperimentRunResponse as UpdateRunResponse } from './schemas.js';
export { type DeleteExperimentRunResponse as DeleteRunResponse } from './schemas.js';
export { type GetEventsSchemaResponse as GetRunSchemaResponse } from './schemas.js';
export { type GetExperimentRunMetricsResponse } from './schemas.js';
export { type GetExperimentRunCompareResponse as GetExperimentComparisonResponse } from './schemas.js';
export { type GetExperimentCompareEventsResponse } from './schemas.js';
export { type GetAnnotationQueuesResponse as GetQueuesResponse } from './schemas.js';
export { type CreateAnnotationQueueResponse as CreateQueueResponse } from './schemas.js';
export { type GetAnnotationQueueByIdResponse as GetQueueResponse } from './schemas.js';
export { type UpdateAnnotationQueueResponse as UpdateQueueResponse } from './schemas.js';
export { type DeleteAnnotationQueueResponse as DeleteQueueResponse } from './schemas.js';
//# sourceMappingURL=apiTypes.d.ts.map