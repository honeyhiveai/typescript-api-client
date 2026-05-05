/**
 * @inline
 */
export type SelectedFunction = {
    id: string;
    name: string;
    description?: string;
    parameters?: {
        [key: string]: unknown;
    };
};
/**
 * @inline
 */
export type ResponseFormat = {
    /** @enum {string} */
    type: 'text' | 'json_object';
};
/**
 * @inline
 */
export type TemplateItem = {
    role: string;
    content: string;
};
/**
 * @inline
 */
export type ConfigurationParameters = {
    /** @enum {string} */
    call_type: 'chat' | 'completion';
    model: string;
    hyperparameters?: {
        [key: string]: unknown;
    };
    responseFormat?: ResponseFormat;
    selectedFunctions?: SelectedFunction[];
    /** @enum {string} */
    functionCallParams?: 'none' | 'auto' | 'force';
    forceFunction?: {
        [key: string]: unknown;
    };
    template?: TemplateItem[] | string;
};
/**
 * @inline
 */
export type ConfigurationItem = {
    id: string;
    name: string;
    /** @enum {string} */
    type: 'LLM' | 'pipeline';
    provider: string;
    parameters: ConfigurationParameters;
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
/**
 * @description Request body for POST /configurations
 * @inline
 */
export type CreateConfigurationRequest = {
    name: string;
    /**
     * @default LLM
     * @enum {string}
     */
    type?: 'LLM' | 'pipeline';
    provider: string;
    parameters: ConfigurationParameters;
    env?: ('dev' | 'staging' | 'prod')[];
    tags?: string[];
    user_properties?: {
        [key: string]: unknown;
    } | null;
};
/**
 * @description Request body for PUT /configurations
 * @inline
 */
export type UpdateConfigurationRequest = {
    name: string;
    /**
     * @default LLM
     * @enum {string}
     */
    type?: 'LLM' | 'pipeline';
    provider?: string;
    parameters?: ConfigurationParameters;
    env?: ('dev' | 'staging' | 'prod')[];
    tags?: string[];
    user_properties?: {
        [key: string]: unknown;
    } | null;
};
/**
 * @description Query parameters for GET /configurations
 * @inline
 */
export type GetConfigurationsQuery = {
    /** @description Filter configurations by name */
    name?: string;
    /** @description Filter configurations by environment */
    env?: string;
    /** @description Filter configurations by tags */
    tags?: string;
};
/**
 * @description Response for POST /configurations
 * @inline
 */
export type CreateConfigurationResponse = {
    acknowledged: boolean;
    insertedId: string;
};
/**
 * @description Response for PUT /configurations
 * @inline
 */
export type UpdateConfigurationResponse = {
    acknowledged: boolean;
    modifiedCount: number;
    upsertedId: string | null;
    upsertedCount: number;
    matchedCount: number;
};
/**
 * @description Response for DELETE /configurations
 * @inline
 */
export type DeleteConfigurationResponse = {
    acknowledged: boolean;
    deletedCount: number;
};
/**
 * @description Response for GET /configurations
 * @inline
 */
export type GetConfigurationsResponse = {
    configurations: ConfigurationItem[];
};
/**
 * @inline
 */
export type DatapointMapping = {
    /** @default [] */
    inputs?: string[];
    /** @default [] */
    history?: string[];
    /** @default [] */
    ground_truth?: string[];
};
/**
 * @inline
 */
export type BatchDateRange = {
    $gte?: string;
    $lte?: string;
};
/**
 * @inline
 */
export type CheckState = {
    [key: string]: boolean;
};
/**
 * @inline
 */
export type Datapoint = {
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
/**
 * @description Path parameters for GET /datapoints/{datapoint_id}
 * @inline
 */
export type GetDatapointParams = {
    /** @description Unique identifier of the datapoint */
    datapoint_id: string;
};
/**
 * @description Request body for POST /datapoints
 */
export type CreateDatapointRequest = {
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
/**
 * @description Request body for PUT /datapoints/{datapoint_id}
 */
export type UpdateDatapointRequest = {
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
    linked_event?: string;
    linked_datasets?: string[];
};
/**
 * @description Path parameters for PUT /datapoints/{datapoint_id}
 * @inline
 */
export type UpdateDatapointParams = {
    datapoint_id: string;
};
/**
 * @description Path parameters for DELETE /datapoints/{datapoint_id}
 * @inline
 */
export type DeleteDatapointParams = {
    datapoint_id: string;
};
/**
 * @description Request body for POST /datapoints/batch
 */
export type BatchCreateDatapointsRequest = {
    /** @deprecated */
    events?: string[];
    /** @deprecated */
    mapping?: DatapointMapping;
    filters?: {
        [key: string]: unknown;
    } | {
        [key: string]: unknown;
    }[];
    dateRange?: BatchDateRange;
    checkState?: CheckState;
    selectAll?: boolean;
    dataset_id?: string;
};
/**
 * @description Response for GET /datapoints
 */
export type GetDatapointsResponse = {
    datapoints: Datapoint[];
};
/**
 * @description Response for GET /datapoints/{datapoint_id}
 */
export type GetDatapointResponse = {
    datapoint: Datapoint[];
};
/**
 * @description Response for POST /datapoints
 */
export type CreateDatapointResponse = {
    inserted: boolean;
    result: CreateDatapointResponseResult;
};
/**
 * @description Response for PUT /datapoints/{datapoint_id}
 */
export type UpdateDatapointResponse = {
    updated: boolean;
    result: UpdateDatapointResponseResult;
};
/**
 * @description Response for DELETE /datapoints/{datapoint_id}
 */
export type DeleteDatapointResponse = {
    deleted: boolean;
};
/**
 * @description Response for POST /datapoints/batch
 */
export type BatchCreateDatapointsResponse = {
    inserted: boolean;
    insertedIds: string[];
};
/**
 * @inline
 */
export type Dataset = {
    id: string;
    name: string;
    description?: string | null;
    datapoints: string[];
    created_at?: string;
    updated_at?: string;
};
/**
 * @description Request body for POST /datasets
 */
export type CreateDatasetRequest = {
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
/**
 * @description Request body for PUT /datasets/{dataset_id}
 */
export type UpdateDatasetRequest = {
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
 * @inline
 */
export type LegacyUpdateDatasetRequest = {
    /** @description Unique identifier of the dataset to update */
    dataset_id: string;
    /** @description New dataset name */
    name?: string;
    /** @description New dataset description */
    description?: string;
    /** @description Updated list of datapoint IDs */
    datapoints?: string[];
};
/**
 * @description Path parameters for DELETE /datasets/{dataset_id}
 * @inline
 */
export type DeleteDatasetParams = {
    /** @description Unique identifier of the dataset to delete */
    dataset_id: string;
};
/**
 * @deprecated
 * @description Query parameters for DELETE /datasets (deprecated — use DELETE /datasets/{dataset_id})
 * @inline
 */
export type LegacyDeleteDatasetQuery = {
    /** @description Unique identifier of the dataset to delete */
    dataset_id: string;
};
/**
 * @description Request body for POST /datasets/{dataset_id}/datapoints
 */
export type AddDatapointsToDatasetRequest = {
    /** @description Array of datapoint data objects to add */
    data: {
        [key: string]: unknown;
    }[];
    /** @description Field mapping for inputs, ground truth, and history */
    mapping: DatapointMapping;
};
/**
 * @description Path parameters for DELETE /datasets/{dataset_id}/datapoints/{datapoint_id}
 * @inline
 */
export type RemoveDatapointFromDatasetParams = {
    /** @description Unique identifier of the dataset */
    dataset_id: string;
    /** @description Unique identifier of the datapoint to remove */
    datapoint_id: string;
};
/**
 * @deprecated
 * @description Path parameters for DELETE /datasets/{dataset_id}/{datapoint_id} (deprecated — use DELETE /datasets/{dataset_id}/datapoints/{datapoint_id})
 * @inline
 */
export type LegacyRemoveDatapointFromDatasetParams = {
    /** @description Unique identifier of the dataset */
    dataset_id: string;
    /** @description Unique identifier of the datapoint to remove */
    datapoint_id: string;
};
/**
 * @description Response for POST /datasets
 */
export type CreateDatasetResponse = {
    inserted: boolean;
    result: InsertResult;
};
/**
 * @inline
 */
export type InsertResult = {
    insertedId: string;
};
/**
 * @description Response for PUT /datasets
 */
export type UpdateDatasetResponse = {
    result: Dataset;
};
/**
 * @description Response for GET /datasets
 */
export type GetDatasetsResponse = {
    datasets: Dataset[];
};
/**
 * @description Response for DELETE /datasets
 */
export type DeleteDatasetResponse = {
    result: DeleteResult;
};
/**
 * @inline
 */
export type DeleteResult = {
    id: string;
};
/**
 * @description Response for POST /datasets/{dataset_id}/datapoints
 */
export type AddDatapointsResponse = {
    inserted: boolean;
    datapoint_ids: string[];
};
/**
 * @description Response for DELETE /datasets/{dataset_id}/datapoints/{datapoint_id}
 */
export type RemoveDatapointResponse = {
    dereferenced: boolean;
    message: string;
};
/**
 * @inline
 */
export type SingleFilter = {
    field: string;
    /** @enum {string} */
    operator: 'exists' | 'not exists' | 'is' | 'is not' | 'contains' | 'not contains' | 'greater than' | 'less than' | 'after' | 'before';
    value: string | number | boolean | null;
    /** @enum {string} */
    type: 'string' | 'number' | 'boolean' | 'datetime';
};
/**
 * @inline
 */
export type FiltersArray = SingleFilter[];
/**
 * @inline
 */
export type EventSearchFilter = {
    field: string;
    /** @enum {string} */
    operator: 'exists' | 'not exists' | 'is' | 'is not' | 'contains' | 'not contains' | 'greater than' | 'less than' | 'after' | 'before';
    value: string | number | boolean | null;
    /** @enum {string} */
    type?: 'string' | 'number' | 'boolean' | 'datetime';
};
/**
 * @inline
 */
export type EventSearchFiltersArray = EventSearchFilter[];
/**
 * @description Minimal event object used by evaluation and session endpoints; permissive (passthrough)
 * @inline
 */
export type Event = {
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
    feedback?: EventFeedback;
} & {
    [key: string]: unknown;
};
/**
 * @description Full event object for legacy event creation endpoints
 * @inline
 */
export type LegacyEvent = {
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
/**
 * @description Model event object with model-specific fields and legacy aliases
 * @inline
 */
export type ModelEvent = {
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
/**
 * @description Session properties for batch event creation
 * @inline
 */
export type SessionProperties = {
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
/**
 * @description Request body for PUT /v1/events/{event_id}
 */
export type UpdateEventRequest = {
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
    /** @description Output data to replace on the event (accepts objects, strings, arrays, or scalars) */
    outputs?: unknown;
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
 * @inline
 */
export type LegacyUpdateEventRequest = {
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
    /** @description Output data to replace on the event (accepts objects, strings, arrays, or scalars) */
    outputs?: unknown;
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
 * @description Request body for POST /v1/events (bare event object)
 */
export type PostEventRequest = {
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
 * @inline
 */
export type LegacyPostEventRequest = {
    event: LegacyPostEventRequestEvent;
};
/**
 * @description Request body for POST /v1/events/search
 */
export type SearchEventsRequest = {
    /** @description Array of filter criteria to apply */
    filters?: EventSearchFiltersArray;
    dateRange?: SearchEventsRequestDateRange;
    /** @description Limit number of results (default 1000, max 1000) */
    limit?: number;
    /** @description Page number of results (default 1) */
    page?: number;
    /** @description Deprecated: accepted for SDK back-compat but treated as a no-op. Pagination requires a stable ORDER BY to produce consistent pages, and with the 1000-row cap skipping the sort is not worth the inconsistency. The route always orders by start_time DESC. */
    ignore_order?: boolean;
    /** @description Filter by evaluation/experiment run ID */
    evaluation_id?: string;
};
/**
 * @description Request body for POST /v1/events/export
 * @inline
 */
export type LegacyExportEventsRequest = {
    /** @description Array of filter criteria to apply */
    filters?: FiltersArray;
    dateRange?: LegacyExportEventsRequestDateRange;
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
/**
 * @description Request body for POST /events/model
 * @inline
 */
export type PostModelEventRequest = {
    model_event: ModelEvent;
};
/**
 * @description Request body for POST /v1/events/batch
 */
export type PostEventBatchRequest = {
    /** @description Array of events to create */
    events: PostEventRequest[];
    /** @description If true, all events share the same session */
    single_session?: boolean;
    session_properties?: SessionProperties;
};
/**
 * @deprecated
 * @description Request body for POST /events/batch (deprecated — use POST /v1/events/batch)
 * @inline
 */
export type LegacyPostEventBatchRequest = {
    /** @description Array of events to create */
    events: LegacyEvent[];
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
    session?: SessionProperties;
    session_properties?: SessionProperties;
};
/**
 * @description Request body for POST /events/model/batch
 * @inline
 */
export type PostModelEventBatchRequest = {
    /** @description Array of model events to create */
    model_events: ModelEvent[];
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
    session?: SessionProperties;
    session_properties?: SessionProperties;
};
/**
 * @description Query parameters for GET /events
 * @inline
 */
export type GetEventsQuery = {
    dateRange?: DateRange;
    /** @description Event filters to apply */
    filters?: FiltersArray;
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
/**
 * @description Date range filter
 * @inline
 */
export type DateRange = RelativeDateRange | AbsoluteDateRange;
/**
 * @inline
 */
export type RelativeDateRange = {
    relative: string;
};
/**
 * @inline
 */
export type AbsoluteDateRange = {
    $gte: string | number;
    $lte: string | number;
};
/**
 * @description Response after creating an event
 */
export type PostEventResponse = {
    success: boolean;
    event_id?: string;
};
/**
 * @description Response for GET /events
 * @inline
 */
export type GetEventsResponse = {
    events: unknown[];
    totalEvents: number;
};
/**
 * @description Response for POST /v1/events/search and POST /v1/events/export
 */
export type ExportEventsResponse = {
    events: LegacyEvent[];
    count: number;
};
/**
 * @description Response for POST /events/batch
 */
export type PostEventBatchResponse = {
    event_ids: string[];
    session_id?: string;
    success: boolean;
};
/**
 * @inline
 */
export type Pagination = {
    page: number;
    limit: number;
    total: number;
    total_unfiltered: number;
    total_pages: number;
    has_next: boolean;
    has_prev: boolean;
};
/**
 * @inline
 */
export type PassingRange = {
    min?: number;
    max?: number;
};
/**
 * @inline
 */
export type MetricDatapoints = {
    /** @description Datapoint/session IDs that passed this metric */
    passed: string[];
    /** @description Datapoint/session IDs that failed this metric */
    failed: string[];
};
/**
 * @inline
 */
export type MetricDetail = {
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
    passing_range?: PassingRange;
    datapoints?: MetricDatapoints;
};
/**
 * @inline
 */
export type DatapointResult = {
    datapoint_id?: string | null;
    session_id: string;
    passed: boolean;
    metrics?: unknown[];
};
/**
 * @inline
 */
export type EventDetail = {
    event_name: string;
    event_type: string;
};
/**
 * @inline
 */
export type ExperimentSchemaField = {
    name: string;
    event_type: string;
};
/**
 * @inline
 */
export type ExperimentSchemaMappingEntry = {
    field_name: string;
    event_type: string;
};
/**
 * @inline
 */
export type MetricsAggregation = {
    aggregation_function?: string;
    details?: MetricDetail[];
};
/**
 * @inline
 */
export type ExperimentRunObject = {
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
};
/**
 * @inline
 */
export type EventComparisonDetail = {
    event_name: string;
    event_type: string;
    /** @enum {string} */
    presence: 'old' | 'new' | 'both';
};
/**
 * @inline
 */
export type MetricComparison = {
    metric_name: string;
    metric_type?: string;
    old_aggregate?: number;
    new_aggregate?: number;
    difference?: number;
    percentage_change?: number;
};
/**
 * @inline
 */
export type EventMetricData = {
    event_name: string;
    event_type: string;
    session_id: string;
    metadata: EventMetricDataMetadata;
    /** @description Metric name → value, merged from numeric, float, and boolean ClickHouse columns */
    metrics: {
        [key: string]: number | boolean;
    };
};
/**
 * @inline
 */
export type ComparableEvent = {
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
/**
 * @description Request body for POST /runs
 */
export type PostExperimentRunRequest = {
    run_id?: string;
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
        [key: string]: PassingRange;
    };
};
/**
 * @description Request body for PUT /runs/{run_id}
 */
export type PutExperimentRunRequest = {
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
        [key: string]: PassingRange;
    };
};
/**
 * @description Query parameters for GET /runs
 * @inline
 */
export type GetExperimentRunsQuery = {
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
    dateRange?: string | AbsoluteDateRange;
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
/**
 * @description Path parameters for GET /runs/{run_id}
 * @inline
 */
export type GetExperimentRunParams = {
    run_id: string;
};
/**
 * @description Query parameters for GET /runs/{run_id}/result
 * @inline
 */
export type GetExperimentRunResultQuery = {
    /**
     * @description Aggregation function to apply (default: average)
     * @default average
     */
    aggregate_function?: string;
    /** @description Filters to apply to results */
    filters?: string | unknown[];
};
/**
 * @description Path parameters for GET /runs/{new_run_id}/compare/{old_run_id}
 * @inline
 */
export type GetExperimentRunCompareParams = {
    /** @description The new run ID to compare */
    new_run_id: string;
    /** @description The old run ID to compare against */
    old_run_id: string;
};
/**
 * @description Query parameters for GET /runs/{new_run_id}/compare/{old_run_id}
 * @inline
 */
export type GetExperimentRunCompareQuery = {
    /**
     * @description Aggregation function to apply (default: average)
     * @default average
     * @enum {string}
     */
    aggregate_function?: 'average' | 'min' | 'max' | 'median' | 'p95' | 'p99' | 'p90' | 'sum' | 'count';
    /** @description Filters to apply to comparison */
    filters?: string | unknown[];
};
/**
 * @deprecated
 * @description Path parameters for GET /runs/{new_run_id}/compare-with/{old_run_id} (deprecated — use GET /runs/{new_run_id}/compare/{old_run_id})
 * @inline
 */
export type LegacyGetExperimentRunCompareParams = {
    /** @description The new run ID to compare */
    new_run_id: string;
    /** @description The old run ID to compare against */
    old_run_id: string;
};
/**
 * @deprecated
 * @description Query parameters for GET /runs/{new_run_id}/compare-with/{old_run_id} (deprecated — use GET /runs/{new_run_id}/compare/{old_run_id})
 * @inline
 */
export type LegacyGetExperimentRunCompareQuery = {
    /**
     * @description Aggregation function to apply (default: average)
     * @default average
     */
    aggregate_function?: string;
    /** @description Filters to apply to comparison */
    filters?: string | unknown[];
};
/**
 * @description Path parameters for GET /runs/{new_run_id}/compare/{old_run_id}/events
 * @inline
 */
export type GetExperimentRunCompareEventsParams = {
    /** @description The new run ID to compare */
    new_run_id: string;
    /** @description The old run ID to compare against */
    old_run_id: string;
};
/**
 * @description Query parameters for GET /runs/{new_run_id}/compare/{old_run_id}/events
 * @inline
 */
export type GetExperimentRunCompareEventsQuery = {
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
/**
 * @deprecated
 * @description Query parameters for GET /runs/compare/events (deprecated — use GET /runs/{new_run_id}/compare/{old_run_id}/events)
 * @inline
 */
export type LegacyGetExperimentRunCompareEventsQuery = {
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
/**
 * @description Path parameters for DELETE /runs/{run_id}
 * @inline
 */
export type DeleteExperimentRunParams = {
    run_id: string;
};
/**
 * @deprecated
 * @description Query parameters for GET /events/schema (deprecated — use GET /runs/{run_id}/schema or GET /runs/schema)
 * @inline
 */
export type LegacyGetEventsSchemaQuery = {
    /** @description Date range to filter schema by */
    dateRange?: string | AbsoluteDateRange;
    /** @description Filter by evaluation/run ID */
    evaluation_id?: string;
};
/**
 * @description Response for POST /runs
 */
export type PostExperimentRunResponse = {
    evaluation: ExperimentRunObject;
    run_id: string;
};
/**
 * @description Response for PUT /runs/{run_id}
 */
export type PutExperimentRunResponse = {
    evaluation: ExperimentRunObject;
    warning?: string;
};
/**
 * @description Response for GET /runs
 */
export type GetExperimentRunsResponse = {
    evaluations: ExperimentRunObject[];
    pagination: Pagination;
    metrics: string[];
};
/**
 * @description Response for GET /runs/{run_id}
 */
export type GetExperimentRunResponse = {
    evaluation: ExperimentRunObject;
};
/**
 * @description Evaluation summary for an experiment run: pass/fail results, metric aggregations, per-datapoint results, event details, and the experiment run object.
 * @inline
 */
export type GetExperimentRunResultResponse = {
    status: string;
    success: boolean;
    error?: string;
    passed: string[];
    failed: string[];
    metrics: MetricsAggregation;
    datapoints: DatapointResult[];
    event_details: EventDetail[];
    run_object: ExperimentRunObject;
};
/**
 * @description Comparison between two experiment runs including metrics, common datapoints, and event details
 */
export type GetExperimentRunCompareResponse = {
    metrics: MetricComparison[];
    commonDatapoints: string[];
    event_details: EventComparisonDetail[];
    old_run: ExperimentRunObject;
    new_run: ExperimentRunObject;
};
/**
 * @description Response for GET /runs/{run_id}/metrics
 */
export type GetExperimentRunMetricsResponse = {
    events: EventMetricData[];
    /** @description Total number of events matching the query */
    totalEvents: number;
};
/**
 * @description Response for GET /events/schema, GET /runs/{run_id}/schema, and GET /runs/schema
 */
export type GetEventsSchemaResponse = {
    fields: ExperimentSchemaField[];
    datasets: string[];
    mappings: {
        [key: string]: ExperimentSchemaMappingEntry[];
    };
};
/**
 * @description Response for GET /runs/{new_run_id}/compare/{old_run_id}/events
 */
export type GetExperimentCompareEventsResponse = {
    events: ComparableEvent[];
    /** @description Total number of events matching the comparison query */
    totalEvents: number;
};
/**
 * @description Response for DELETE /runs/{run_id}
 */
export type DeleteExperimentRunResponse = {
    id: string;
    deleted: boolean;
};
/**
 * @inline
 */
export type MetricItem = {
    name: string;
    /** @enum {string} */
    type: 'PYTHON' | 'LLM' | 'HUMAN' | 'COMPOSITE';
    criteria: string;
    description: string | null;
    /** @enum {string} */
    return_type: 'float' | 'boolean' | 'string' | 'categorical';
    enabled_in_prod: boolean;
    needs_ground_truth: boolean;
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
    categories?: MetricItemCategoriesItem[] | null;
    child_metrics?: MetricItemChildMetricsItem[] | null;
    filters: MetricItemFilters;
    id: string;
    /** Format: date-time */
    created_at: string;
    /** Format: date-time */
    updated_at: string | null;
};
/**
 * @description Request body for POST /metrics
 */
export type CreateMetricRequest = {
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
    /** @default false */
    needs_ground_truth?: boolean;
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
    categories?: CreateMetricRequestCategoriesItem[] | null;
    child_metrics?: CreateMetricRequestChildMetricsItem[] | null;
    filters?: CreateMetricRequestFilters;
};
/**
 * @description Request body for PUT /metrics/{metric_id}
 */
export type UpdateMetricRequest = {
    name?: string;
    /** @enum {string} */
    type?: 'PYTHON' | 'LLM' | 'HUMAN' | 'COMPOSITE';
    criteria?: string;
    description?: string | null;
    /** @enum {string} */
    return_type?: 'float' | 'boolean' | 'string' | 'categorical';
    enabled_in_prod?: boolean;
    needs_ground_truth?: boolean;
    sampling_percentage?: number;
    model_provider?: string | null;
    model_name?: string | null;
    scale?: number | null;
    threshold?: UpdateMetricRequestThreshold;
    categories?: UpdateMetricRequestCategoriesItem[];
    child_metrics?: UpdateMetricRequestChildMetricsItem[];
    filters?: UpdateMetricRequestFilters;
};
/**
 * @description Path parameters for PUT /metrics/{metric_id}
 * @inline
 */
export type UpdateMetricParams = {
    /** @description Unique identifier of the metric to update */
    metric_id: string;
};
/**
 * @deprecated
 * @description Request body for PUT /metrics (deprecated — use PUT /metrics/{metric_id})
 * @inline
 */
export type LegacyUpdateMetricRequest = {
    name?: string;
    /** @enum {string} */
    type?: 'PYTHON' | 'LLM' | 'HUMAN' | 'COMPOSITE';
    criteria?: string;
    description?: string | null;
    /** @enum {string} */
    return_type?: 'float' | 'boolean' | 'string' | 'categorical';
    enabled_in_prod?: boolean;
    needs_ground_truth?: boolean;
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
    categories?: LegacyUpdateMetricRequestCategoriesItem[] | null;
    child_metrics?: LegacyUpdateMetricRequestChildMetricsItem[] | null;
    filters?: LegacyUpdateMetricRequestFilters;
    id: string;
};
/**
 * @description Path parameters for DELETE /metrics/{metric_id}
 * @inline
 */
export type DeleteMetricParams = {
    /** @description Unique identifier of the metric to delete */
    metric_id: string;
};
/**
 * @deprecated
 * @description Query parameters for DELETE /metrics (deprecated — use DELETE /metrics/{metric_id})
 * @inline
 */
export type LegacyDeleteMetricQuery = {
    /** @description Unique identifier of the metric to delete */
    metric_id: string;
};
/**
 * @description Request body for POST /metrics/run
 */
export type RunMetricRequest = {
    metric: RunMetricRequestMetric;
    event: RunMetricRequestEvent;
};
/**
 * @deprecated
 * @description Request body for POST /metrics/run_metric (deprecated — use POST /metrics/run)
 * @inline
 */
export type LegacyRunMetricRequest = {
    metric: LegacyRunMetricRequestMetric;
    event: LegacyRunMetricRequestEvent;
};
/**
 * @description Response for GET /metrics
 */
export type GetMetricsResponse = {
    metrics: MetricItem[];
};
/**
 * @description Response for POST /metrics
 */
export type CreateMetricResponse = {
    inserted: boolean;
    metric_id: string;
};
/**
 * @description Response for PUT /metrics
 */
export type UpdateMetricResponse = {
    updated: boolean;
};
/**
 * @description Response for DELETE /metrics/{metric_id}
 */
export type DeleteMetricResponse = {
    deleted: boolean;
};
/**
 * @description Response for POST /metrics/run
 */
export type RunMetricResponse = {
    success: boolean;
    loading: boolean;
    result: boolean | number | string | null;
    explanation: string | null;
};
/**
 * @description Project object
 * @inline
 */
export type ProjectItem = {
    id: string;
    /** @description Project name */
    name: string;
    /** @description Project description */
    description?: string;
    /**
     * @description Project type
     * @enum {string}
     */
    type?: 'evaluation' | 'completion';
    /** @description Organization ID */
    org_id: string;
    /** Format: date-time */
    created_at?: string;
    /** Format: date-time */
    updated_at?: string;
} & {
    [key: string]: unknown;
};
/**
 * @description Request body for creating a project
 * @inline
 */
export type PostProjectRequest = {
    /** @description Project name */
    name: string;
    /** @description Project description */
    description?: string;
    /**
     * @description Project type
     * @enum {string}
     */
    type?: 'evaluation' | 'completion';
};
/**
 * @description Request body for updating a project
 * @inline
 */
export type PutProjectRequest = {
    /** @description Project name to identify the project */
    name: string;
    /** @description New project name */
    new_name?: string;
    /** @description New project description */
    description?: string;
    /**
     * @description New project type
     * @enum {string}
     */
    type?: 'evaluation' | 'completion';
};
/**
 * @description Array of projects
 * @inline
 */
export type GetProjectsResponse = ProjectItem[];
/**
 * @description Created project
 * @inline
 */
export type PostProjectResponse = {
    id: string;
    /** @description Project name */
    name: string;
    /** @description Project description */
    description?: string;
    /**
     * @description Project type
     * @enum {string}
     */
    type?: 'evaluation' | 'completion';
    /** @description Organization ID */
    org_id: string;
    /** Format: date-time */
    created_at?: string;
    /** Format: date-time */
    updated_at?: string;
} & {
    [key: string]: unknown;
};
/**
 * @inline
 */
export type AnnotationQueue = {
    name: string;
    description: string;
    filters: AnnotationQueueFilters;
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
/**
 * @inline
 */
export type BaseAnnotationQueue = {
    name: string;
    description: string;
    filters: BaseAnnotationQueueFilters;
    enabled: boolean;
};
export type CreateAnnotationQueueRequest = {
    name: string;
    /** @default  */
    description?: string;
    filters?: CreateAnnotationQueueRequestFilters;
    /** @default true */
    enabled?: boolean;
    /** @default [] */
    event_ids?: string[];
};
export type UpdateAnnotationQueueRequest = {
    name?: string;
    description?: string;
    filters?: UpdateAnnotationQueueRequestFilters;
    enabled?: boolean;
    id: string;
    add_event_ids?: string[];
    remove_event_ids?: string[];
};
/**
 * @inline
 */
export type GetAnnotationQueuesQuery = {
    enabled?: boolean | null;
};
export type CreateAnnotationQueueResponse = {
    queue: CreateAnnotationQueueResponseQueue;
    message: string;
};
export type UpdateAnnotationQueueResponse = {
    queue: UpdateAnnotationQueueResponseQueue;
    message: string;
};
export type GetAnnotationQueuesResponse = {
    queues: GetAnnotationQueuesResponseQueuesItem[];
};
export type GetAnnotationQueueByIdResponse = {
    name: string;
    description: string;
    filters: GetAnnotationQueueByIdResponseFilters;
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
export type DeleteAnnotationQueueResponse = {
    message: string;
};
/**
 * @description Minimal event object used by evaluation and session endpoints; permissive (passthrough)
 * @inline
 */
export type PostSessionRequest = {
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
    feedback?: PostSessionRequestFeedback;
} & {
    [key: string]: unknown;
};
/**
 * @deprecated
 * @description Request body for POST /session/start (deprecated — use POST /v1/sessions)
 * @inline
 */
export type LegacyStartSessionRequest = {
    session: LegacyStartSessionRequestSession;
};
/**
 * @description Request body for POST /v1/sessions (bare session object)
 */
export type StartSessionRequest = {
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
 * @description Request to add traces to a session
 * @inline
 */
export type AddSessionTracesRequest = {
    logs: LegacyEvent[];
};
/**
 * @description Full session event object returned after starting a new session
 */
export type PostSessionStartResponse = {
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
/**
 * @description Response from adding traces to a session
 * @inline
 */
export type SessionTracesResponse = {
    success: boolean;
};
/**
 * @description TODO: This is a placeholder schema. Proper Zod schemas need to be created in @hive-kube/iso-core-ts for: Sessions, Events, Projects, and Experiment comparison/result endpoints.
 * @inline
 */
export type TODOSchema = {
    /** @description Placeholder - Zod schema not yet implemented */
    message: string;
};
/**
 * @inline
 */
export type CreateDatapointResponseResult = {
    insertedIds: string[];
};
/**
 * @inline
 */
export type UpdateDatapointResponseResult = {
    modifiedCount: number;
};
/**
 * @inline
 */
export type EventFeedback = {
    ground_truth?: unknown;
};
/**
 * @description Full event object for legacy event creation endpoints
 * @inline
 */
export type LegacyPostEventRequestEvent = {
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
/**
 * @inline
 */
export type SearchEventsRequestDateRange = {
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
/**
 * @inline
 */
export type LegacyExportEventsRequestDateRange = {
    /** @description ISO String for start of date range */
    $gte: string;
    /** @description ISO String for end of date range */
    $lte: string;
};
/**
 * @inline
 */
export type EventMetricDataMetadata = {
    datapoint_id?: string;
};
/**
 * @inline
 */
export type MetricItemCategoriesItem = {
    category: string;
    score: number | null;
};
/**
 * @inline
 */
export type MetricItemChildMetricsItem = {
    id?: string;
    name: string;
    weight: number;
    scale?: number | null;
};
/**
 * @inline
 */
export type MetricItemFilters = {
    filterArray: FiltersArray;
};
/**
 * @inline
 */
export type CreateMetricRequestCategoriesItem = {
    category: string;
    score: number | null;
};
/**
 * @inline
 */
export type CreateMetricRequestChildMetricsItem = {
    id?: string;
    name: string;
    weight: number;
    scale?: number | null;
};
/**
 * @default {
 *       "filterArray": []
 *     }
 * @inline
 */
export type CreateMetricRequestFilters = {
    filterArray: FiltersArray;
};
/**
 * @inline
 */
export type UpdateMetricRequestThreshold = {
    min?: number;
    max?: number;
    pass_when?: boolean | number;
    passing_categories?: string[];
};
/**
 * @inline
 */
export type UpdateMetricRequestCategoriesItem = {
    category: string;
    score: number | null;
};
/**
 * @inline
 */
export type UpdateMetricRequestChildMetricsItem = {
    id?: string;
    name: string;
    weight: number;
    scale?: number | null;
};
/**
 * @inline
 */
export type UpdateMetricRequestFilters = {
    filterArray: FiltersArray;
};
/**
 * @inline
 */
export type LegacyUpdateMetricRequestCategoriesItem = {
    category: string;
    score: number | null;
};
/**
 * @inline
 */
export type LegacyUpdateMetricRequestChildMetricsItem = {
    id?: string;
    name: string;
    weight: number;
    scale?: number | null;
};
/**
 * @inline
 */
export type LegacyUpdateMetricRequestFilters = {
    filterArray: FiltersArray;
};
/**
 * @inline
 */
export type RunMetricRequestMetricCategoriesItem = {
    category: string;
    score: number | null;
};
/**
 * @inline
 */
export type RunMetricRequestMetricChildMetricsItem = {
    id?: string;
    name: string;
    weight: number;
    scale?: number | null;
};
/**
 * @default {
 *       "filterArray": []
 *     }
 * @inline
 */
export type RunMetricRequestMetricFilters = {
    filterArray: FiltersArray;
};
/**
 * @inline
 */
export type RunMetricRequestMetric = {
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
    /** @default false */
    needs_ground_truth?: boolean;
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
    categories?: RunMetricRequestMetricCategoriesItem[] | null;
    child_metrics?: RunMetricRequestMetricChildMetricsItem[] | null;
    filters?: RunMetricRequestMetricFilters;
};
/**
 * @inline
 */
export type RunMetricRequestEventFeedback = {
    ground_truth?: unknown;
} & {
    [key: string]: unknown;
};
/**
 * @inline
 */
export type RunMetricRequestEvent = {
    event_type?: string;
    event_name?: string;
    inputs?: {
        [key: string]: unknown;
    };
    outputs?: {
        [key: string]: unknown;
    };
    workspace_id?: string;
    feedback?: RunMetricRequestEventFeedback;
} & {
    [key: string]: unknown;
};
/**
 * @inline
 */
export type LegacyRunMetricRequestMetricCategoriesItem = {
    category: string;
    score: number | null;
};
/**
 * @inline
 */
export type LegacyRunMetricRequestMetricChildMetricsItem = {
    id?: string;
    name: string;
    weight: number;
    scale?: number | null;
};
/**
 * @default {
 *       "filterArray": []
 *     }
 * @inline
 */
export type LegacyRunMetricRequestMetricFilters = {
    filterArray: FiltersArray;
};
/**
 * @inline
 */
export type LegacyRunMetricRequestMetric = {
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
    /** @default false */
    needs_ground_truth?: boolean;
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
    categories?: LegacyRunMetricRequestMetricCategoriesItem[] | null;
    child_metrics?: LegacyRunMetricRequestMetricChildMetricsItem[] | null;
    filters?: LegacyRunMetricRequestMetricFilters;
};
/**
 * @inline
 */
export type LegacyRunMetricRequestEventFeedback = {
    ground_truth?: unknown;
} & {
    [key: string]: unknown;
};
/**
 * @inline
 */
export type LegacyRunMetricRequestEvent = {
    event_type?: string;
    event_name?: string;
    inputs?: {
        [key: string]: unknown;
    };
    outputs?: {
        [key: string]: unknown;
    };
    workspace_id?: string;
    feedback?: LegacyRunMetricRequestEventFeedback;
} & {
    [key: string]: unknown;
};
/**
 * @inline
 */
export type AnnotationQueueFilters = {
    filterArray: FiltersArray;
};
/**
 * @inline
 */
export type BaseAnnotationQueueFilters = {
    filterArray: FiltersArray;
};
/**
 * @default {
 *       "filterArray": []
 *     }
 * @inline
 */
export type CreateAnnotationQueueRequestFilters = {
    filterArray: FiltersArray;
};
/**
 * @inline
 */
export type UpdateAnnotationQueueRequestFilters = {
    filterArray: FiltersArray;
};
/**
 * @inline
 */
export type CreateAnnotationQueueResponseQueueFilters = {
    filterArray: FiltersArray;
};
/**
 * @inline
 */
export type CreateAnnotationQueueResponseQueue = {
    name: string;
    description: string;
    filters: CreateAnnotationQueueResponseQueueFilters;
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
/**
 * @inline
 */
export type UpdateAnnotationQueueResponseQueueFilters = {
    filterArray: FiltersArray;
};
/**
 * @inline
 */
export type UpdateAnnotationQueueResponseQueue = {
    name: string;
    description: string;
    filters: UpdateAnnotationQueueResponseQueueFilters;
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
/**
 * @inline
 */
export type GetAnnotationQueuesResponseQueuesItemFilters = {
    filterArray: FiltersArray;
};
/**
 * @inline
 */
export type GetAnnotationQueuesResponseQueuesItem = {
    name: string;
    description: string;
    filters: GetAnnotationQueuesResponseQueuesItemFilters;
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
/**
 * @inline
 */
export type GetAnnotationQueueByIdResponseFilters = {
    filterArray: FiltersArray;
};
/**
 * @inline
 */
export type PostSessionRequestFeedback = {
    ground_truth?: unknown;
};
/**
 * @inline
 */
export type LegacyStartSessionRequestSession = {
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
/**
 * @inline
 */
export type GetEventsSchemaLegacyDateRangeOneOf1 = {
    $gte?: string | number;
    $lte?: string | number;
};
/**
 * @inline
 */
export type GetRunsDateRangeOneOf1 = {
    $gte?: string | number;
    $lte?: string | number;
};
/**
 * @inline
 */
export type GetRunsSchemaDateRangeOneOf1 = {
    $gte?: string | number;
    $lte?: string | number;
};
/**
 * @inline
 */
export type GetRunSchemaDateRangeOneOf1 = {
    $gte?: string | number;
    $lte?: string | number;
};
export type UpdateEventPath = {
    /** @description The unique identifier of the event to update */
    event_id: string;
};
export type GetMetricsQuery = {
    /** @description Filter by metric type */
    type?: string;
    /** @description Filter by specific metric ID */
    id?: string;
};
export type UpdateMetricPath = {
    /** @description The unique identifier of the metric to update */
    metric_id: string;
};
export type DeleteMetricPath = {
    /** @description The unique identifier of the metric to delete */
    metric_id: string;
};
export type GetDatapointsQuery = {
    /** @description List of datapoint ids to fetch */
    datapoint_ids?: string[];
    /** @description Name of the dataset to get datapoints from */
    dataset_name?: string;
};
export type GetDatapointPath = {
    /** @description Datapoint ID like `65c13dbbd65fb876b7886cdb` */
    datapoint_id: string;
};
export type UpdateDatapointPath = {
    /** @description ID of datapoint to update */
    datapoint_id: string;
};
export type DeleteDatapointPath = {
    /** @description Datapoint ID like `65c13dbbd65fb876b7886cdb` */
    datapoint_id: string;
};
export type GetDatasetsQuery = {
    /** @description Unique dataset ID for filtering specific dataset */
    dataset_id?: string;
    /** @description Dataset name to filter by */
    name?: string;
};
export type UpdateDatasetPath = {
    /** @description The unique identifier of the dataset to update like `663876ec4611c47f4970f0c3` */
    dataset_id: string;
};
export type DeleteDatasetPath = {
    /** @description The unique identifier of the dataset to be deleted like `663876ec4611c47f4970f0c3` */
    dataset_id: string;
};
export type AddDatapointsPath = {
    /** @description The unique identifier of the dataset to add datapoints to like  `663876ec4611c47f4970f0c3` */
    dataset_id: string;
};
export type RemoveDatapointPath = {
    /** @description The unique identifier of the dataset */
    dataset_id: string;
    /** @description The unique identifier of the datapoint to remove */
    datapoint_id: string;
};
export type GetRunsQuery = {
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
    dateRange?: string | GetRunsDateRangeOneOf1;
    /** @description Field to sort by */
    sort_by?: 'created_at' | 'updated_at' | 'name' | 'status';
    /** @description Sort order */
    sort_order?: 'asc' | 'desc';
};
export type GetRunsSchemaQuery = {
    /** @description Filter by date range */
    dateRange?: string | GetRunsSchemaDateRangeOneOf1;
};
export type GetRunPath = {
    run_id: string;
};
export type UpdateRunPath = {
    run_id: string;
};
export type DeleteRunPath = {
    run_id: string;
};
export type GetRunSchemaPath = {
    /** @description Experiment run ID (UUIDv4) */
    run_id: string;
};
export type GetRunSchemaQuery = {
    /** @description Filter by date range */
    dateRange?: string | GetRunSchemaDateRangeOneOf1;
};
export type GetExperimentRunMetricsPath = {
    /** @description Experiment run ID (UUIDv4) */
    run_id: string;
};
export type GetExperimentRunMetricsQuery = {
    /** @description Date range filter as JSON string */
    dateRange?: string;
    /** @description Optional filters to apply (JSON string or array of filter objects) */
    filters?: string | Record<string, never>[];
};
export type GetExperimentComparisonPath = {
    /** @description New experiment run ID to compare (UUIDv4) */
    new_run_id: string;
    /** @description Old experiment run ID to compare against (UUIDv4) */
    old_run_id: string;
};
export type GetExperimentComparisonQuery = {
    /** @description Aggregation function to apply to metrics */
    aggregate_function?: 'average' | 'min' | 'max' | 'median' | 'p95' | 'p99' | 'p90' | 'sum' | 'count';
    /** @description Optional filters to apply (JSON string or array of filter objects) */
    filters?: string | Record<string, never>[];
};
export type GetExperimentCompareEventsPath = {
    /** @description New experiment run ID (UUIDv4) */
    new_run_id: string;
    /** @description Old experiment run ID to compare against (UUIDv4) */
    old_run_id: string;
};
export type GetExperimentCompareEventsQuery = {
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
export type GetQueuesQuery = {
    /** @description Filter by enabled status */
    enabled?: boolean;
};
export type GetQueuePath = {
    /** @description Annotation queue ID */
    queue_id: string;
};
export type UpdateQueuePath = {
    /** @description Annotation queue ID */
    queue_id: string;
};
export type DeleteQueuePath = {
    /** @description Annotation queue ID */
    queue_id: string;
};
//# sourceMappingURL=schemas.d.ts.map