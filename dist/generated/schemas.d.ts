/** @inline */
export type SelectedFunction = {
    id: string;
    name: string;
    description?: string;
    parameters?: {
        [key: string]: unknown;
    };
};
/** @inline */
export type ResponseFormat = {
    /** @enum {string} */
    type: 'text' | 'json_object';
};
/** @inline */
export type TemplateItem = {
    role: string;
    content: string;
};
/** @inline */
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
/** @inline */
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
export type CreateConfigurationResponse = {
    acknowledged: boolean;
    insertedId: string;
};
export type UpdateConfigurationResponse = {
    acknowledged: boolean;
    modifiedCount: number;
    upsertedId: string | null;
    upsertedCount: number;
    matchedCount: number;
};
export type DeleteConfigurationResponse = {
    acknowledged: boolean;
    deletedCount: number;
};
export type GetConfigurationsResponse = Array<{
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
}>;
/** @inline */
export type DatapointMapping = {
    /** @default [] */
    inputs?: string[];
    /** @default [] */
    history?: string[];
    /** @default [] */
    ground_truth?: string[];
};
/** @inline */
export type BatchDateRange = {
    $gte?: string;
    $lte?: string;
};
/** @inline */
export type CheckState = {
    [key: string]: boolean;
};
/** @inline */
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
/** @inline */
export type GetDatapointParams = {
    /** @description Unique identifier of the datapoint */
    datapoint_id: string;
};
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
/** @inline */
export type UpdateDatapointParams = {
    datapoint_id: string;
};
/** @inline */
export type DeleteDatapointParams = {
    datapoint_id: string;
};
export type BatchCreateDatapointsRequest = {
    events?: string[];
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
export type GetDatapointsResponse = {
    datapoints: Datapoint[];
};
export type GetDatapointResponse = {
    datapoint: Datapoint[];
};
export type CreateDatapointResponse = {
    inserted: boolean;
    result: {
        insertedIds: string[];
    };
};
export type UpdateDatapointResponse = {
    updated: boolean;
    result: {
        modifiedCount: number;
    };
};
export type DeleteDatapointResponse = {
    deleted: boolean;
};
export type BatchCreateDatapointsResponse = {
    inserted: boolean;
    insertedIds: string[];
};
/** @inline */
export type Dataset = {
    id: string;
    name: string;
    description?: string | null;
    datapoints: string[];
    created_at?: string;
    updated_at?: string;
};
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
export type UpdateDatasetRequest = {
    /** @description Unique identifier of the dataset to update */
    dataset_id: string;
    /** @description New dataset name */
    name?: string;
    /** @description New dataset description */
    description?: string;
    /** @description Updated list of datapoint IDs */
    datapoints?: string[];
};
export type AddDatapointsToDatasetRequest = {
    /** @description Array of datapoint data objects to add */
    data: {
        [key: string]: unknown;
    }[];
    mapping: DatapointMapping & unknown;
};
/** @inline */
export type RemoveDatapointFromDatasetParams = {
    /** @description Unique identifier of the dataset */
    dataset_id: string;
    /** @description Unique identifier of the datapoint to remove */
    datapoint_id: string;
};
export type CreateDatasetResponse = {
    inserted: boolean;
    result: InsertResult;
};
/** @inline */
export type InsertResult = {
    insertedId: string;
};
export type UpdateDatasetResponse = {
    result: Dataset;
};
export type GetDatasetsResponse = {
    datasets: Dataset[];
};
export type DeleteDatasetResponse = {
    result: DeleteResult;
};
/** @inline */
export type DeleteResult = {
    id: string;
};
export type AddDatapointsResponse = {
    inserted: boolean;
    datapoint_ids: string[];
};
export type RemoveDatapointResponse = {
    dereferenced: boolean;
    message: string;
};
/** @inline */
export type SingleFilter = {
    field: string;
    /** @enum {string} */
    operator: 'exists' | 'not exists' | 'is' | 'is not' | 'contains' | 'not contains' | 'greater than' | 'less than' | 'after' | 'before';
    value: string | number | boolean | null;
    /** @enum {string} */
    type: 'string' | 'number' | 'boolean' | 'datetime';
};
/** @inline */
export type FiltersArray = SingleFilter[];
/** @inline */
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
    feedback?: {
        ground_truth?: unknown;
    };
} & {
    [key: string]: unknown;
};
/** @inline */
/** @description Full event object for legacy event creation endpoints */
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
/** @inline */
/** @description Session properties for batch event creation */
export type SessionProperties = {
    session_name?: string;
    user_properties?: {
        [key: string]: unknown;
    };
    metadata?: {
        [key: string]: unknown;
    };
} & {
    [key: string]: unknown;
};
/** @description Request to create a new event */
export type PostEventRequest = {
    /** @description Full event object for legacy event creation endpoints */
    event: {
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
};
/** @description Request body for GET /events legacy endpoint */
export type GetEventsLegacyRequest = {
    /** @description Name of the project */
    project: string;
    filters: FiltersArray & unknown;
    dateRange?: {
        /** @description ISO String for start of date range */
        $gte: string;
        /** @description ISO String for end of date range */
        $lte: string;
    };
    /** @description Fields to include in the response */
    projections?: string[];
    /** @description Limit number of results (default 1000, max 7500) */
    limit?: number;
    /** @description Page number of results (default 1) */
    page?: number;
};
/** @description Request body for POST /events/model */
export type PostModelEventRequest = {
    /** @description Full event object for legacy event creation endpoints */
    model_event: {
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
};
/** @description Request body for POST /events/batch */
export type PostEventBatchRequest = {
    /** @description Array of events to create */
    events: ({
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
    })[];
    /** @description If true, all events share the same session */
    single_session?: boolean;
    /**
     * @deprecated
     * @description Legacy field name for single_session (backward compatibility)
     */
    is_single_session?: boolean;
    /** @description Session properties for batch event creation */
    session_properties?: {
        session_name?: string;
        user_properties?: {
            [key: string]: unknown;
        };
        metadata?: {
            [key: string]: unknown;
        };
    } & {
        [key: string]: unknown;
    };
};
/** @description Request body for POST /events/model/batch */
export type PostModelEventBatchRequest = {
    /** @description Array of model events to create */
    model_events: ({
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
    })[];
    /** @description If true, all events share the same session */
    single_session?: boolean;
    /**
     * @deprecated
     * @description Legacy field name for single_session (backward compatibility)
     */
    is_single_session?: boolean;
    /** @description Session properties for batch event creation */
    session_properties?: {
        session_name?: string;
        user_properties?: {
            [key: string]: unknown;
        };
        metadata?: {
            [key: string]: unknown;
        };
    } & {
        [key: string]: unknown;
    };
};
/** @inline */
/** @description Date range filter */
export type DateRange = RelativeDateRange | AbsoluteDateRange;
/** @inline */
export type RelativeDateRange = {
    relative: string;
};
/** @inline */
export type AbsoluteDateRange = {
    $gte: string | number;
    $lte: string | number;
};
/** @inline */
/** @description Path parameters for GET /events/:session_id */
export type GetEventsBySessionIdParams = {
    session_id: string;
};
/** @inline */
/** @description Path parameters for DELETE /events/:event_id */
export type DeleteEventParams = {
    event_id: string;
};
/** @description Response after creating an event */
export type PostEventResponse = {
    success: boolean;
    event_id?: string;
};
export type GetEventsResponse = {
    events: unknown[];
    totalEvents: number;
};
/** @description Response for GET /events legacy endpoint */
export type GetEventsLegacyResponse = {
    events: ({
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
    })[];
    totalEvents: number;
};
/** @description Chart data response for events */
export type GetEventsChartResponse = {
    events: unknown[];
    totalEvents: number;
};
/** @description Event node in session tree with nested children */
export type GetEventsBySessionIdResponse = {
    event_id: string;
    /** @enum {string} */
    event_type: 'session' | 'model' | 'chain' | 'tool';
    event_name: string;
    children: unknown[];
    start_time: number;
    end_time: number;
    duration: number;
    metadata: {
        num_events?: number;
        num_model_events?: number;
        has_feedback?: boolean;
        cost?: number;
        total_tokens?: number;
        prompt_tokens?: number;
        completion_tokens?: number;
        scope?: {
            name?: string;
        };
    } & {
        [key: string]: unknown;
    };
    parent_id?: string;
    session_id?: string;
    children_ids?: string[];
    config?: unknown;
    inputs?: unknown;
    outputs?: unknown;
    error?: string;
    source?: string;
    user_properties?: unknown;
    metrics?: unknown;
    feedback?: unknown;
    org_id: string;
    workspace_id?: string;
    project_id: string;
} & {
    [key: string]: unknown;
};
/** @description Response for DELETE /events/:event_id */
export type DeleteEventResponse = {
    success: boolean;
    deleted: string;
};
/** @description Response for POST /events/batch */
export type PostEventBatchResponse = {
    event_ids: string[];
    session_id?: string;
    success: boolean;
};
/** @inline */
export type Pagination = {
    page: number;
    limit: number;
    total: number;
    total_unfiltered: number;
    total_pages: number;
    has_next: boolean;
    has_prev: boolean;
};
/** @inline */
export type PassingRange = {
    min?: number;
    max?: number;
};
/** @inline */
export type MetricDatapoints = {
    /** @description Datapoint/session IDs that passed this metric */
    passed: string[];
    /** @description Datapoint/session IDs that failed this metric */
    failed: string[];
};
/** @inline */
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
/** @inline */
export type DatapointResult = {
    datapoint_id?: string | null;
    session_id: string;
    passed: boolean;
    metrics?: unknown[];
};
/** @inline */
export type EventDetail = {
    event_name: string;
    event_type: string;
};
/** @inline */
export type ExperimentSchemaField = {
    name: string;
    event_type: string;
};
/** @inline */
export type ExperimentSchemaMappingEntry = {
    field_name: string;
    event_type: string;
};
/** @inline */
export type MetricsAggregation = {
    aggregation_function?: string;
    details?: MetricDetail[];
};
/** @inline */
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
/** @inline */
export type EventComparisonDetail = {
    event_name: string;
    event_type: string;
    /** @enum {string} */
    presence: 'old' | 'new' | 'both';
};
/** @inline */
export type MetricComparison = {
    metric_name: string;
    metric_type?: string;
    old_aggregate?: number;
    new_aggregate?: number;
    difference?: number;
    percentage_change?: number;
};
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
/** @inline */
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
/** @inline */
export type GetExperimentRunParams = {
    run_id: string;
};
/** @inline */
export type GetExperimentRunResultQuery = {
    /**
     * @description Aggregation function to apply (default: average)
     * @default average
     */
    aggregate_function?: string;
    /** @description Filters to apply to results */
    filters?: string | unknown[];
};
/** @inline */
export type GetExperimentRunCompareParams = {
    /** @description The new run ID to compare */
    new_run_id: string;
    /** @description The old run ID to compare against */
    old_run_id: string;
};
/** @inline */
export type GetExperimentRunCompareQuery = {
    /**
     * @description Aggregation function to apply (default: average)
     * @default average
     */
    aggregate_function?: string;
    /** @description Filters to apply to comparison */
    filters?: string | unknown[];
};
/** @inline */
export type GetExperimentRunCompareEventsQuery = {
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
/** @inline */
export type DeleteExperimentRunParams = {
    run_id: string;
};
export type PostExperimentRunResponse = {
    evaluation?: unknown;
    run_id: string;
};
export type PutExperimentRunResponse = {
    evaluation?: unknown;
    warning?: string;
};
export type GetExperimentRunsResponse = {
    evaluations: ExperimentRunObject[];
    pagination: Pagination;
    metrics: string[];
};
export type GetExperimentRunResponse = {
    evaluation?: unknown;
};
/** @description Evaluation summary for an experiment run including pass/fail status, metrics, and datapoints */
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
/** @description Comparison between two experiment runs including metrics, common datapoints, and event details */
export type GetExperimentRunCompareResponse = {
    metrics: MetricComparison[];
    commonDatapoints: string[];
    event_details: EventComparisonDetail[];
    old_run: ExperimentRunObject;
    new_run: ExperimentRunObject;
};
export type GetExperimentRunsSchemaResponse = {
    fields: ExperimentSchemaField[];
    datasets: string[];
    mappings: {
        [key: string]: ExperimentSchemaMappingEntry[];
    };
};
export type DeleteExperimentRunResponse = {
    id: string;
    deleted: boolean;
};
/** @inline */
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
    categories?: {
        category: string;
        score: number | null;
    }[] | null;
    child_metrics?: {
        id?: string;
        name: string;
        weight: number;
        scale?: number | null;
    }[] | null;
    filters: {
        filterArray: FiltersArray;
    };
    id: string;
    /** Format: date-time */
    created_at: string;
    /** Format: date-time */
    updated_at: string | null;
};
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
    /** @default 100 */
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
    categories?: {
        category: string;
        score: number | null;
    }[] | null;
    child_metrics?: {
        id?: string;
        name: string;
        weight: number;
        scale?: number | null;
    }[] | null;
    /**
     * @default {
     *       "filterArray": []
     *     }
     */
    filters?: {
        filterArray: FiltersArray;
    };
};
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
    threshold?: {
        min?: number;
        max?: number;
        pass_when?: boolean | number;
        passing_categories?: string[];
    } | null;
    categories?: {
        category: string;
        score: number | null;
    }[] | null;
    child_metrics?: {
        id?: string;
        name: string;
        weight: number;
        scale?: number | null;
    }[] | null;
    filters?: {
        filterArray: FiltersArray;
    };
    id: string;
};
export type RunMetricRequest = {
    metric: {
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
        /** @default 100 */
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
        categories?: {
            category: string;
            score: number | null;
        }[] | null;
        child_metrics?: {
            id?: string;
            name: string;
            weight: number;
            scale?: number | null;
        }[] | null;
        /**
         * @default {
         *       "filterArray": []
         *     }
         */
        filters?: {
            filterArray: FiltersArray;
        };
    };
    event?: unknown;
};
export type GetMetricsResponse = Array<{
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
    categories?: {
        category: string;
        score: number | null;
    }[] | null;
    child_metrics?: {
        id?: string;
        name: string;
        weight: number;
        scale?: number | null;
    }[] | null;
    filters: {
        filterArray: FiltersArray;
    };
    id: string;
    /** Format: date-time */
    created_at: string;
    /** Format: date-time */
    updated_at: string | null;
}>;
export type CreateMetricResponse = {
    inserted: boolean;
    metric_id: string;
};
export type UpdateMetricResponse = {
    updated: boolean;
};
export type DeleteMetricResponse = {
    deleted: boolean;
};
export type RunMetricResponse = unknown;
/** @inline */
/** @description Project object */
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
/** @inline */
/** @description Request body for creating a project */
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
/** @inline */
/** @description Request body for updating a project */
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
/** @inline */
/** @description Array of projects */
export type GetProjectsResponse = ProjectItem[];
/** @inline */
/** @description Created project */
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
/** @inline */
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
    feedback?: {
        ground_truth?: unknown;
    };
} & {
    [key: string]: unknown;
};
/** @description Request to start a new session */
export type StartSessionRequest = {
    session: {
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
};
/** @description Request to add traces to a session */
export type AddSessionTracesRequest = {
    logs: ({
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
    })[];
};
/** @description Full session event object returned after starting a new session */
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
/** @description Event node in session tree with nested children */
export type GetSessionResponse = {
    event_id: string;
    /** @enum {string} */
    event_type: 'session' | 'model' | 'chain' | 'tool';
    event_name: string;
    children: unknown[];
    start_time: number;
    end_time: number;
    duration: number;
    metadata: {
        num_events?: number;
        num_model_events?: number;
        has_feedback?: boolean;
        cost?: number;
        total_tokens?: number;
        prompt_tokens?: number;
        completion_tokens?: number;
        scope?: {
            name?: string;
        };
    } & {
        [key: string]: unknown;
    };
    parent_id?: string;
    session_id?: string;
    children_ids?: string[];
    config?: unknown;
    inputs?: unknown;
    outputs?: unknown;
    error?: string;
    source?: string;
    user_properties?: unknown;
    metrics?: unknown;
    feedback?: unknown;
    org_id: string;
    workspace_id?: string;
    project_id: string;
} & {
    [key: string]: unknown;
};
/** @description Confirmation of session deletion */
export type DeleteSessionResponse = {
    success: boolean;
    deleted: string;
};
/** @description Response from adding traces to a session */
export type SessionTracesResponse = {
    success: boolean;
};
/** @inline */
/** @description TODO: This is a placeholder schema. Proper Zod schemas need to be created in @hive-kube/iso-core-ts for: Sessions, Events, Projects, and Experiment comparison/result endpoints. */
export type TODOSchema = {
    /** @description Placeholder - Zod schema not yet implemented */
    message: string;
};
export type UpdateEventRequest = {
    event_id: string;
    metadata?: {
        [key: string]: unknown;
    };
    feedback?: {
        [key: string]: unknown;
    };
    metrics?: {
        [key: string]: unknown;
    };
    outputs?: {
        [key: string]: unknown;
    };
    config?: {
        [key: string]: unknown;
    };
    user_properties?: {
        [key: string]: unknown;
    };
    duration?: number;
};
/** @inline */
/**
 * @example {
 *       "event_ids": [
 *         "7f22137a-6911-4ed3-bc36-110f1dde6b66",
 *         "7f22137a-6911-4ed3-bc36-110f1dde6b67"
 *       ],
 *       "errors": [
 *         "Could not create event due to missing inputs",
 *         "Could not create event due to missing source"
 *       ],
 *       "success": true
 *     }
 */
export type CreateEventBatch500Response = {
    event_ids?: string[];
    errors?: string[];
    success?: boolean;
};
/** @inline */
/**
 * @example {
 *       "event_ids": [
 *         "7f22137a-6911-4ed3-bc36-110f1dde6b66",
 *         "7f22137a-6911-4ed3-bc36-110f1dde6b67"
 *       ],
 *       "errors": [
 *         "Could not create event due to missing model",
 *         "Could not create event due to missing provider"
 *       ],
 *       "success": true
 *     }
 */
export type CreateModelEventBatch500Response = {
    event_ids?: string[];
    errors?: string[];
    success?: boolean;
};
export type GetExperimentRunMetricsResponse = {
    /** @description Array of event objects with metrics */
    events?: Record<string, never>[];
};
export type GetExperimentCompareEventsResponse = {
    /** @description Array of matched event pairs from both runs */
    events?: Record<string, never>[];
    pagination?: {
        page?: number;
        limit?: number;
        total?: number;
    };
};
export type AddSessionTracesPath = {
    /** @description Session ID to add traces to */
    session_id: string;
};
export type GetSessionPath = {
    /** @description Session ID (UUIDv4) */
    session_id: string;
};
export type DeleteSessionPath = {
    /** @description Session ID (UUIDv4) */
    session_id: string;
};
export type GetEventsQuery = {
    /** @description Date range filter (ISO string or object with $gte/$lte) */
    dateRange?: string | {
        /** Format: date-time */
        $gte?: string;
        /** Format: date-time */
        $lte?: string;
    };
    /** @description Array of filter objects or JSON string */
    filters?: Record<string, never>[] | string;
    /** @description Fields to include in response (array or JSON string) */
    projections?: string[] | string;
    /** @description Whether to ignore ordering */
    ignore_order?: boolean | string;
    /** @description Maximum number of results (default 1000) */
    limit?: number | string;
    /** @description Page number (default 1) */
    page?: number | string;
    /** @description Filter by evaluation ID */
    evaluation_id?: string;
};
export type GetEventsChartQuery = {
    /** @description Date range filter (ISO string or object with $gte/$lte) */
    dateRange?: string | {
        /** Format: date-time */
        $gte?: string;
        /** Format: date-time */
        $lte?: string;
    };
    /** @description Array of filter objects or JSON string */
    filters?: Record<string, never>[] | string;
    /** @description Metric to aggregate (default 'duration') */
    metric?: string;
    /** @description Field to group by */
    groupBy?: string;
    /** @description Time bucket for aggregation (default 'hour') */
    bucket?: 'minute' | 'minutes' | '1m' | 'hour' | 'hours' | '1h' | 'day' | 'days' | '1d' | 'week' | 'weeks' | '1w' | 'month' | 'months' | '1M';
    /** @description Aggregation function (default 'average') */
    aggregation?: 'avg' | 'average' | 'mean' | 'p50' | 'p75' | 'p90' | 'p95' | 'p99' | 'count' | 'sum' | 'min' | 'max' | 'median';
    /** @description Filter by evaluation ID */
    evaluation_id?: string;
    /** @description Filter to only experiment events */
    only_experiments?: boolean | string;
};
export type GetEventsBySessionIdPath = {
    /** @description Session ID (UUIDv4) - retrieves all events belonging to this session */
    id: string;
};
export type DeleteEventPath = {
    /** @description Event ID (UUIDv4) - the specific event to delete */
    id: string;
};
export type GetMetricsQuery = {
    /** @description Filter by metric type */
    type?: string;
    /** @description Filter by specific metric ID */
    id?: string;
};
export type DeleteMetricQuery = {
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
export type DeleteDatasetQuery = {
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
export type GetExperimentRunsSchemaQuery = {
    /** @description Filter by date range */
    dateRange?: string | {
        $gte?: string | number;
        $lte?: string | number;
    };
    /** @description Filter by evaluation/run ID */
    evaluation_id?: string;
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
    dateRange?: string | {
        $gte?: string | number;
        $lte?: string | number;
    };
    /** @description Field to sort by */
    sort_by?: 'created_at' | 'updated_at' | 'name' | 'status';
    /** @description Sort order */
    sort_order?: 'asc' | 'desc';
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
export type GetExperimentResultPath = {
    /** @description Experiment run ID (UUIDv4) */
    run_id: string;
};
export type GetExperimentResultQuery = {
    /** @description Aggregation function to apply to metrics */
    aggregate_function?: 'average' | 'min' | 'max' | 'median' | 'p95' | 'p99' | 'p90' | 'sum' | 'count';
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
export type GetExperimentCompareEventsQuery = {
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
export type GetConfigurationsQuery = {
    /** @description The name of the configuration like `v0` */
    name?: string;
    /** @description Environment - "dev", "staging" or "prod" */
    env?: string;
    /** @description Tags to filter configurations */
    tags?: string;
};
export type UpdateConfigurationPath = {
    /** @description Configuration ID like `6638187d505c6812e4043f24` */
    configId: string;
};
export type DeleteConfigurationPath = {
    /** @description Configuration ID like `6638187d505c6812e4043f24` */
    configId: string;
};
//# sourceMappingURL=schemas.d.ts.map