export interface paths {
    '/session/start': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Start a new session
         * @description Start a new session. The request body wraps the session event object under the `session` key, matching the pattern used by POST /events.
         */
        post: operations['startSession'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/session/{session_id}/traces': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Add traces to a session
         * @description Add trace events to an existing session. The field is named `logs` for legacy compatibility with the Go ingestion handler.
         */
        post: operations['addSessionTraces'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/session/{session_id}': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get session tree by session ID
         * @description Retrieve a complete session event tree including all nested events and metadata
         */
        get: operations['getSession'];
        put?: never;
        post?: never;
        /**
         * Delete all events for a session
         * @description Delete all events associated with the given session ID from both events and aggregates tables
         */
        delete: operations['deleteSession'];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/events': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * Update an event
         * @description Update fields on an existing event. Only the provided fields are modified; omitted fields are left unchanged. The event_id field is required to identify the event to update.
         */
        put: operations['updateEvent'];
        /**
         * Create a new event
         * @description Create a new event (span) within a session trace. The request body wraps the event object under the `event` key.
         *
         *     **Required properties** within the event object:
         *     - `event_type` (string) — Must be one of: `chain`, `model`, `tool`, `session`.
         *     - `inputs` (object) — Input data for the event.
         *     **Auto-generated properties** (provided by the server when omitted):
         *     - `event_id` (string, UUID) — Unique identifier for the event.
         *     - `session_id` (string, UUID) — Session/trace identifier.
         *     - `parent_id` (string, UUID) — Parent event ID. Defaults to `session_id`.
         *     **Optional properties with defaults:**
         *     - `event_name` (string) — Name of the event. Defaults to `"unknown"`.
         *     - `source` (string) — Source of the event (e.g. `sdk-python`). Defaults to `"unknown"`.
         *     **Optional properties:**
         *     - `config` (object) — Configuration data (e.g. model parameters, prompt templates).
         *     - `outputs` (object) — Output data from the event.
         *     - `error` (string or null) — Error message if the event failed.
         *     - `children_ids` (array of strings) — IDs of child events.
         *     - `duration` (number) — Duration of the event in milliseconds.
         *     - `start_time` (number) — Unix timestamp in milliseconds for event start.
         *     - `end_time` (number) — Unix timestamp in milliseconds for event end.
         *     - `metadata` (object) — Additional metadata (e.g. token counts, cost).
         *     - `metrics` (object) — Custom metrics.
         *     - `feedback` (object) — Feedback data (e.g. ratings, ground truth).
         *     - `user_properties` (object) — User properties associated with the event.
         */
        post: operations['createEvent'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/events': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Query events with filters and projections
         * @description Retrieve events with optional filtering, projections, and pagination
         */
        get: operations['getEvents'];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/events/chart': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get charting data for events
         * @description Retrieve aggregated chart data for events with optional grouping and bucketing
         */
        get: operations['getEventsChart'];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/events/{id}': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get nested events for a session
         * @description Retrieve all nested events for a specific session ID. The `id` parameter is interpreted as a session_id for this operation.
         */
        get: operations['getEventsBySessionId'];
        put?: never;
        post?: never;
        /**
         * Delete an event
         * @description Delete a specific event by event ID. The `id` parameter is interpreted as an event_id for this operation.
         */
        delete: operations['deleteEvent'];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/events/export': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Retrieve events based on filters
         * @description Export events via POST with filtering, projections, and pagination. This is the primary method for retrieving events from HoneyHive.
         */
        post: operations['exportEvents'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/events/model': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Create a new model event
         * @description Create a model event. The event_type is automatically set to 'model'. Please refer to our instrumentation guide for detailed information.
         */
        post: operations['createModelEvent'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/events/batch': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Create a batch of events
         * @description Create multiple events in a single request. When single_session is true, all events share the same session. Please refer to our instrumentation guide for detailed information.
         */
        post: operations['createEventBatch'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/events/model/batch': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Create a batch of model events
         * @description Create multiple model events in a single request. The event_type is automatically set to 'model' for all events. When single_session is true, all events share the same session. Please refer to our instrumentation guide for detailed information.
         */
        post: operations['createModelEventBatch'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/metrics': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get all metrics
         * @description Retrieve a list of all metrics
         */
        get: operations['getMetrics'];
        /**
         * Update an existing metric
         * @description Edit a metric
         */
        put: operations['updateMetric'];
        /**
         * Create a new metric
         * @description Add a new metric
         */
        post: operations['createMetric'];
        /**
         * Delete a metric
         * @description Remove a metric
         */
        delete: operations['deleteMetric'];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/metrics/run_metric': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Run a metric evaluation
         * @description Execute a metric on a specific event
         */
        post: operations['runMetric'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/datapoints': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Retrieve a list of datapoints
         * @description Retrieve datapoints, optionally filtered by a list of datapoint IDs or dataset name.
         */
        get: operations['getDatapoints'];
        put?: never;
        /**
         * Create a new datapoint
         * @description Create a single datapoint with inputs, history, ground truth, and metadata.
         */
        post: operations['createDatapoint'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/datapoints/batch': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Create multiple datapoints in batch
         * @description Create multiple datapoints from events using field mappings and optional filters.
         */
        post: operations['batchCreateDatapoints'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/datapoints/{datapoint_id}': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Retrieve a specific datapoint
         * @description Get a single datapoint by its unique identifier.
         */
        get: operations['getDatapoint'];
        /**
         * Update a specific datapoint
         * @description Update fields on an existing datapoint. Only the provided fields are modified.
         */
        put: operations['updateDatapoint'];
        post?: never;
        /**
         * Delete a specific datapoint
         * @description Permanently delete a datapoint by its unique identifier.
         */
        delete: operations['deleteDatapoint'];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/datasets': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get datasets
         * @description Retrieve datasets, optionally filtered by dataset ID or name.
         */
        get: operations['getDatasets'];
        /**
         * Update a dataset
         * @description Update a dataset's name, description, or list of datapoint IDs.
         */
        put: operations['updateDataset'];
        /**
         * Create a dataset
         * @description Create a new dataset with an optional name, description, and initial set of datapoint IDs.
         */
        post: operations['createDataset'];
        /**
         * Delete a dataset
         * @description Permanently delete a dataset by its unique identifier.
         */
        delete: operations['deleteDataset'];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/datasets/{dataset_id}/datapoints': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Add datapoints to a dataset
         * @description Add new datapoints to an existing dataset. Provide raw data objects and a field mapping that specifies which fields map to inputs, ground truth, and history.
         */
        post: operations['addDatapoints'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/datasets/{dataset_id}/{datapoint_id}': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /**
         * Remove a datapoint from a dataset
         * @description Remove a specific datapoint from a dataset. The datapoint itself is not deleted, only dereferenced from the dataset.
         */
        delete: operations['removeDatapoint'];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/runs/schema': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get experiment runs schema
         * @description Retrieve the schema and metadata for experiment runs
         */
        get: operations['getExperimentRunsSchema'];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/runs': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get a list of evaluation runs
         * @description List experiment runs with optional filtering by dataset, status, name, date range, and specific run IDs. Results are paginated and sortable.
         */
        get: operations['getRuns'];
        put?: never;
        /**
         * Create a new evaluation run
         * @description Create a new experiment run to track an evaluation against a dataset.
         */
        post: operations['createRun'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/runs/{run_id}': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get details of an evaluation run
         * @description Retrieve the full details of a single experiment run by its run ID.
         */
        get: operations['getRun'];
        /**
         * Update an evaluation run
         * @description Update fields on an existing experiment run such as name, status, metadata, or results.
         */
        put: operations['updateRun'];
        post?: never;
        /**
         * Delete an evaluation run
         * @description Permanently delete an experiment run by its run ID.
         */
        delete: operations['deleteRun'];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/runs/{run_id}/metrics': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get event metrics for an experiment run
         * @description Retrieve event metrics from ClickHouse for a specific experiment run
         */
        get: operations['getExperimentRunMetrics'];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/runs/{run_id}/result': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Retrieve experiment result
         * @description Compute evaluation summary for an experiment run including pass/fail status, metrics, and datapoints
         */
        get: operations['getExperimentResult'];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/runs/{new_run_id}/compare-with/{old_run_id}': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Retrieve experiment comparison
         * @description Compare metrics and results between two experiment runs
         */
        get: operations['getExperimentComparison'];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/runs/compare/events': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Compare events between two experiment runs
         * @description Retrieve and compare events between two experiment runs for detailed analysis
         */
        get: operations['getExperimentCompareEvents'];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/configurations': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Retrieve a list of configurations
         * @description List configurations with optional filtering by name, environment, and tags.
         */
        get: operations['getConfigurations'];
        put?: never;
        /**
         * Create a new configuration
         * @description Create a new LLM or pipeline configuration with provider, parameters, and environment settings.
         */
        post: operations['createConfiguration'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/configurations/{configId}': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * Update an existing configuration
         * @description Update an existing configuration's name, provider, parameters, environment, or tags.
         */
        put: operations['updateConfiguration'];
        post?: never;
        /**
         * Delete a configuration
         * @description Permanently delete a configuration by its unique identifier.
         */
        delete: operations['deleteConfiguration'];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        SelectedFunction: {
            id: string;
            name: string;
            description?: string;
            parameters?: {
                [key: string]: unknown;
            };
        };
        ResponseFormat: {
            /** @enum {string} */
            type: 'text' | 'json_object';
        };
        TemplateItem: {
            role: string;
            content: string;
        };
        ConfigurationParameters: {
            /** @enum {string} */
            call_type: 'chat' | 'completion';
            model: string;
            hyperparameters?: {
                [key: string]: unknown;
            };
            responseFormat?: components['schemas']['ResponseFormat'];
            selectedFunctions?: components['schemas']['SelectedFunction'][];
            /** @enum {string} */
            functionCallParams?: 'none' | 'auto' | 'force';
            forceFunction?: {
                [key: string]: unknown;
            };
            template?: components['schemas']['TemplateItem'][] | string;
        };
        ConfigurationItem: {
            id: string;
            name: string;
            /** @enum {string} */
            type: 'LLM' | 'pipeline';
            provider: string;
            parameters: components['schemas']['ConfigurationParameters'];
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
        CreateConfigurationRequest: {
            name: string;
            /**
             * @default LLM
             * @enum {string}
             */
            type?: 'LLM' | 'pipeline';
            provider: string;
            parameters: components['schemas']['ConfigurationParameters'];
            env?: ('dev' | 'staging' | 'prod')[];
            tags?: string[];
            user_properties?: {
                [key: string]: unknown;
            } | null;
        };
        UpdateConfigurationRequest: {
            name: string;
            /**
             * @default LLM
             * @enum {string}
             */
            type?: 'LLM' | 'pipeline';
            provider?: string;
            parameters?: components['schemas']['ConfigurationParameters'];
            env?: ('dev' | 'staging' | 'prod')[];
            tags?: string[];
            user_properties?: {
                [key: string]: unknown;
            } | null;
        };
        GetConfigurationsQuery: {
            /** @description Filter configurations by name */
            name?: string;
            /** @description Filter configurations by environment */
            env?: string;
            /** @description Filter configurations by tags */
            tags?: string;
        };
        CreateConfigurationResponse: {
            acknowledged: boolean;
            insertedId: string;
        };
        UpdateConfigurationResponse: {
            acknowledged: boolean;
            modifiedCount: number;
            upsertedId: string | null;
            upsertedCount: number;
            matchedCount: number;
        };
        DeleteConfigurationResponse: {
            acknowledged: boolean;
            deletedCount: number;
        };
        GetConfigurationsResponse: components['schemas']['ConfigurationItem'][];
        DatapointMapping: {
            /** @default [] */
            inputs?: string[];
            /** @default [] */
            history?: string[];
            /** @default [] */
            ground_truth?: string[];
        };
        BatchDateRange: {
            $gte?: string;
            $lte?: string;
        };
        CheckState: {
            [key: string]: boolean;
        };
        Datapoint: {
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
        GetDatapointsQuery: {
            /** @description List of datapoint IDs to fetch */
            datapoint_ids?: string[];
            /** @description Dataset name to filter by */
            dataset_name?: string;
        };
        GetDatapointParams: {
            /** @description Unique identifier of the datapoint */
            datapoint_id: string;
        };
        CreateDatapointRequest: {
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
        UpdateDatapointRequest: {
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
        UpdateDatapointParams: {
            datapoint_id: string;
        };
        DeleteDatapointParams: {
            datapoint_id: string;
        };
        BatchCreateDatapointsRequest: {
            events?: string[];
            mapping?: components['schemas']['DatapointMapping'];
            filters?: {
                [key: string]: unknown;
            } | {
                [key: string]: unknown;
            }[];
            dateRange?: components['schemas']['BatchDateRange'];
            checkState?: components['schemas']['CheckState'];
            selectAll?: boolean;
            dataset_id?: string;
        };
        GetDatapointsResponse: {
            datapoints: components['schemas']['Datapoint'][];
        };
        GetDatapointResponse: {
            datapoint: components['schemas']['Datapoint'][];
        };
        CreateDatapointResponse: {
            inserted: boolean;
            result: {
                insertedIds: string[];
            };
        };
        UpdateDatapointResponse: {
            updated: boolean;
            result: {
                modifiedCount: number;
            };
        };
        DeleteDatapointResponse: {
            deleted: boolean;
        };
        BatchCreateDatapointsResponse: {
            inserted: boolean;
            insertedIds: string[];
        };
        Dataset: {
            id: string;
            name: string;
            description?: string | null;
            datapoints: string[];
            created_at?: string;
            updated_at?: string;
        };
        CreateDatasetRequest: {
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
        UpdateDatasetRequest: {
            /** @description Unique identifier of the dataset to update */
            dataset_id: string;
            /** @description New dataset name */
            name?: string;
            /** @description New dataset description */
            description?: string;
            /** @description Updated list of datapoint IDs */
            datapoints?: string[];
        };
        DeleteDatasetQuery: {
            /** @description Unique identifier of the dataset to delete */
            dataset_id: string;
        };
        AddDatapointsToDatasetRequest: {
            /** @description Array of datapoint data objects to add */
            data: {
                [key: string]: unknown;
            }[];
            mapping: components['schemas']['DatapointMapping'] & unknown;
        };
        RemoveDatapointFromDatasetParams: {
            /** @description Unique identifier of the dataset */
            dataset_id: string;
            /** @description Unique identifier of the datapoint to remove */
            datapoint_id: string;
        };
        CreateDatasetResponse: {
            inserted: boolean;
            result: components['schemas']['InsertResult'];
        };
        InsertResult: {
            insertedId: string;
        };
        UpdateDatasetResponse: {
            result: components['schemas']['Dataset'];
        };
        GetDatasetsResponse: {
            datasets: components['schemas']['Dataset'][];
        };
        DeleteDatasetResponse: {
            result: components['schemas']['DeleteResult'];
        };
        DeleteResult: {
            id: string;
        };
        AddDatapointsResponse: {
            inserted: boolean;
            datapoint_ids: string[];
        };
        RemoveDatapointResponse: {
            dereferenced: boolean;
            message: string;
        };
        SingleFilter: {
            field: string;
            /** @enum {string} */
            operator: 'exists' | 'not exists' | 'is' | 'is not' | 'contains' | 'not contains' | 'greater than' | 'less than' | 'after' | 'before';
            value: string | number | boolean | null;
            /** @enum {string} */
            type: 'string' | 'number' | 'boolean' | 'datetime';
        };
        FiltersArray: components['schemas']['SingleFilter'][];
        Event: {
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
        /** @description Full event object for legacy event creation endpoints */
        LegacyEvent: {
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
        /** @description Session properties for batch event creation */
        SessionProperties: {
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
        PostEventRequest: {
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
        GetEventsLegacyRequest: {
            /** @description Name of the project */
            project: string;
            filters: components['schemas']['FiltersArray'] & unknown;
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
        PostModelEventRequest: {
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
        PostEventBatchRequest: {
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
        PostModelEventBatchRequest: {
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
        /** @description Query parameters for GET /events */
        GetEventsQuery: {
            dateRange?: components['schemas']['DateRange'];
            filters?: components['schemas']['FiltersArray'] & unknown;
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
        /** @description Date range filter */
        DateRange: components['schemas']['RelativeDateRange'] | components['schemas']['AbsoluteDateRange'];
        RelativeDateRange: {
            relative: string;
        };
        AbsoluteDateRange: {
            $gte: string | number;
            $lte: string | number;
        };
        /** @description Query parameters for GET /events/chart */
        GetEventsChartQuery: {
            dateRange?: components['schemas']['DateRange'];
            filters?: components['schemas']['FiltersArray'];
            metric?: string;
            groupBy?: string;
            bucket?: string;
            aggregation?: string;
            evaluation_id?: string;
            only_experiments?: boolean;
        };
        /** @description Path parameters for GET /events/:session_id */
        GetEventsBySessionIdParams: {
            session_id: string;
        };
        /** @description Path parameters for DELETE /events/:event_id */
        DeleteEventParams: {
            event_id: string;
        };
        /** @description Response after creating an event */
        PostEventResponse: {
            success: boolean;
            event_id?: string;
        };
        GetEventsResponse: {
            events: unknown[];
            totalEvents: number;
        };
        /** @description Response for GET /events legacy endpoint */
        GetEventsLegacyResponse: {
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
        GetEventsChartResponse: {
            events: unknown[];
            totalEvents: number;
        };
        /** @description Event node in session tree with nested children */
        GetEventsBySessionIdResponse: {
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
        DeleteEventResponse: {
            success: boolean;
            deleted: string;
        };
        /** @description Response for POST /events/batch */
        PostEventBatchResponse: {
            event_ids: string[];
            session_id?: string;
            success: boolean;
        };
        Pagination: {
            page: number;
            limit: number;
            total: number;
            total_unfiltered: number;
            total_pages: number;
            has_next: boolean;
            has_prev: boolean;
        };
        PassingRange: {
            min?: number;
            max?: number;
        };
        MetricDatapoints: {
            /** @description Datapoint/session IDs that passed this metric */
            passed: string[];
            /** @description Datapoint/session IDs that failed this metric */
            failed: string[];
        };
        MetricDetail: {
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
            passing_range?: components['schemas']['PassingRange'];
            datapoints?: components['schemas']['MetricDatapoints'];
        };
        DatapointResult: {
            datapoint_id?: string | null;
            session_id: string;
            passed: boolean;
            metrics?: unknown[];
        };
        EventDetail: {
            event_name: string;
            event_type: string;
        };
        ExperimentSchemaField: {
            name: string;
            event_type: string;
        };
        ExperimentSchemaMappingEntry: {
            field_name: string;
            event_type: string;
        };
        MetricsAggregation: {
            aggregation_function?: string;
            details?: components['schemas']['MetricDetail'][];
        };
        ExperimentRunObject: {
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
        EventComparisonDetail: {
            event_name: string;
            event_type: string;
            /** @enum {string} */
            presence: 'old' | 'new' | 'both';
        };
        MetricComparison: {
            metric_name: string;
            metric_type?: string;
            old_aggregate?: number;
            new_aggregate?: number;
            difference?: number;
            percentage_change?: number;
        };
        PostExperimentRunRequest: {
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
                [key: string]: components['schemas']['PassingRange'];
            };
        };
        PutExperimentRunRequest: {
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
                [key: string]: components['schemas']['PassingRange'];
            };
        };
        GetExperimentRunsQuery: {
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
            dateRange?: string | components['schemas']['AbsoluteDateRange'];
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
        GetExperimentRunParams: {
            run_id: string;
        };
        GetExperimentRunMetricsQuery: {
            /** @description Date range filter as JSON string */
            dateRange?: string;
            /** @description Filters to apply to metrics */
            filters?: string | unknown[];
        };
        GetExperimentRunResultQuery: {
            /**
             * @description Aggregation function to apply (default: average)
             * @default average
             */
            aggregate_function?: string;
            /** @description Filters to apply to results */
            filters?: string | unknown[];
        };
        GetExperimentRunCompareParams: {
            /** @description The new run ID to compare */
            new_run_id: string;
            /** @description The old run ID to compare against */
            old_run_id: string;
        };
        GetExperimentRunCompareQuery: {
            /**
             * @description Aggregation function to apply (default: average)
             * @default average
             */
            aggregate_function?: string;
            /** @description Filters to apply to comparison */
            filters?: string | unknown[];
        };
        GetExperimentRunCompareEventsQuery: {
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
        DeleteExperimentRunParams: {
            run_id: string;
        };
        GetExperimentRunsSchemaQuery: {
            /** @description Date range to filter schema by */
            dateRange?: string | components['schemas']['AbsoluteDateRange'];
            /** @description Filter by evaluation/run ID */
            evaluation_id?: string;
        };
        PostExperimentRunResponse: {
            evaluation?: unknown;
            run_id: string;
        };
        PutExperimentRunResponse: {
            evaluation?: unknown;
            warning?: string;
        };
        GetExperimentRunsResponse: {
            evaluations: components['schemas']['ExperimentRunObject'][];
            pagination: components['schemas']['Pagination'];
            metrics: string[];
        };
        GetExperimentRunResponse: {
            evaluation?: unknown;
        };
        /** @description Evaluation summary for an experiment run including pass/fail status, metrics, and datapoints */
        GetExperimentRunResultResponse: {
            status: string;
            success: boolean;
            error?: string;
            passed: string[];
            failed: string[];
            metrics: components['schemas']['MetricsAggregation'];
            datapoints: components['schemas']['DatapointResult'][];
            event_details: components['schemas']['EventDetail'][];
            run_object: components['schemas']['ExperimentRunObject'];
        };
        /** @description Comparison between two experiment runs including metrics, common datapoints, and event details */
        GetExperimentRunCompareResponse: {
            metrics: components['schemas']['MetricComparison'][];
            commonDatapoints: string[];
            event_details: components['schemas']['EventComparisonDetail'][];
            old_run: components['schemas']['ExperimentRunObject'];
            new_run: components['schemas']['ExperimentRunObject'];
        };
        GetExperimentRunsSchemaResponse: {
            fields: components['schemas']['ExperimentSchemaField'][];
            datasets: string[];
            mappings: {
                [key: string]: components['schemas']['ExperimentSchemaMappingEntry'][];
            };
        };
        DeleteExperimentRunResponse: {
            id: string;
            deleted: boolean;
        };
        MetricItem: {
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
                filterArray: components['schemas']['FiltersArray'];
            };
            id: string;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string | null;
        };
        CreateMetricRequest: {
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
                filterArray: components['schemas']['FiltersArray'];
            };
        };
        UpdateMetricRequest: {
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
                filterArray: components['schemas']['FiltersArray'];
            };
            id: string;
        };
        GetMetricsQuery: {
            /** @description Filter metrics by type */
            type?: string;
            /** @description Filter by metric ID */
            id?: string;
        };
        DeleteMetricQuery: {
            /** @description Unique identifier of the metric to delete */
            metric_id: string;
        };
        RunMetricRequest: {
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
                    filterArray: components['schemas']['FiltersArray'];
                };
            };
            event?: unknown;
        };
        GetMetricsResponse: components['schemas']['MetricItem'][];
        CreateMetricResponse: {
            inserted: boolean;
            metric_id: string;
        };
        UpdateMetricResponse: {
            updated: boolean;
        };
        DeleteMetricResponse: {
            deleted: boolean;
        };
        RunMetricResponse: unknown;
        /** @description Project object */
        ProjectItem: {
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
        /** @description Request body for creating a project */
        PostProjectRequest: {
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
        /** @description Request body for updating a project */
        PutProjectRequest: {
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
        /** @description Array of projects */
        GetProjectsResponse: components['schemas']['ProjectItem'][];
        /** @description Created project */
        PostProjectResponse: {
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
        PostSessionRequest: {
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
        StartSessionRequest: {
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
        AddSessionTracesRequest: {
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
        PostSessionStartResponse: {
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
        GetSessionResponse: {
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
        DeleteSessionResponse: {
            success: boolean;
            deleted: string;
        };
        /** @description Response from adding traces to a session */
        SessionTracesResponse: {
            success: boolean;
        };
        /** @description TODO: This is a placeholder schema. Proper Zod schemas need to be created in @hive-kube/iso-core-ts for: Sessions, Events, Projects, and Experiment comparison/result endpoints. */
        TODOSchema: {
            /** @description Placeholder - Zod schema not yet implemented */
            message: string;
        };
        UpdateEventRequest: {
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
        CreateEventBatch500Response: {
            event_ids?: string[];
            errors?: string[];
            success?: boolean;
        };
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
        CreateModelEventBatch500Response: {
            event_ids?: string[];
            errors?: string[];
            success?: boolean;
        };
        GetExperimentRunMetricsResponse: {
            /** @description Array of event objects with metrics */
            events?: Record<string, never>[];
        };
        GetExperimentCompareEventsResponse: {
            /** @description Array of matched event pairs from both runs */
            events?: Record<string, never>[];
            pagination?: {
                page?: number;
                limit?: number;
                total?: number;
            };
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    startSession: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['StartSessionRequest'];
            };
        };
        responses: {
            /** @description Session successfully started */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['PostSessionStartResponse'];
                };
            };
        };
    };
    addSessionTraces: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Session ID to add traces to */
                session_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['AddSessionTracesRequest'];
            };
        };
        responses: {
            /** @description Traces added successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['SessionTracesResponse'];
                };
            };
        };
    };
    getSession: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Session ID (UUIDv4) */
                session_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Session tree with nested events */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['GetSessionResponse'];
                };
            };
            /** @description Missing required scope: org_id */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Session not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Error fetching session */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    deleteSession: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Session ID (UUIDv4) */
                session_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Session deleted successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['DeleteSessionResponse'];
                };
            };
            /** @description Invalid session ID or missing required scope */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Error deleting session */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    updateEvent: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                /**
                 * @example {
                 *       "event_id": "7f22137a-6911-4ed3-bc36-110f1dde6b66",
                 *       "metadata": {
                 *         "cost": 0.00008,
                 *         "completion_tokens": 23,
                 *         "prompt_tokens": 35,
                 *         "total_tokens": 58
                 *       },
                 *       "feedback": {
                 *         "rating": 5
                 *       },
                 *       "metrics": {
                 *         "num_words": 2
                 *       },
                 *       "outputs": {
                 *         "role": "assistant",
                 *         "content": "Hello world"
                 *       },
                 *       "config": {
                 *         "template": [
                 *           {
                 *             "role": "system",
                 *             "content": "Hello, {{ name }}!"
                 *           }
                 *         ]
                 *       },
                 *       "user_properties": {
                 *         "user_id": "691b1f94-d38c-4e92-b051-5e03fee9ff86"
                 *       },
                 *       "duration": 42
                 *     }
                 */
                'application/json': components['schemas']['UpdateEventRequest'];
            };
        };
        responses: {
            /** @description Event updated */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Bad request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    createEvent: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['PostEventRequest'];
            };
        };
        responses: {
            /** @description Event created successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "event_id": "7f22137a-6911-4ed3-bc36-110f1dde6b66",
                     *       "success": true
                     *     }
                     */
                    'application/json': components['schemas']['PostEventResponse'];
                };
            };
            /** @description Bad request (invalid event data or missing required fields) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getEvents: {
        parameters: {
            query?: {
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
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Events retrieved successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['GetEventsResponse'];
                };
            };
            /** @description Bad request (missing required scopes or invalid parameters) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getEventsChart: {
        parameters: {
            query?: {
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
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Chart data retrieved successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['GetEventsChartResponse'];
                };
            };
            /** @description Bad request (missing required scopes or invalid parameters) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getEventsBySessionId: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Session ID (UUIDv4) - retrieves all events belonging to this session */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Session events retrieved successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['GetEventsBySessionIdResponse'];
                };
            };
            /** @description Bad request (missing required scopes or invalid session ID) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    deleteEvent: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Event ID (UUIDv4) - the specific event to delete */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Event deleted successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['DeleteEventResponse'];
                };
            };
            /** @description Bad request (missing required scopes or invalid event ID) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    exportEvents: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['GetEventsLegacyRequest'];
            };
        };
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['GetEventsLegacyResponse'];
                };
            };
        };
    };
    createModelEvent: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['PostModelEventRequest'];
            };
        };
        responses: {
            /** @description Model event created */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "event_id": "7f22137a-6911-4ed3-bc36-110f1dde6b66",
                     *       "success": true
                     *     }
                     */
                    'application/json': components['schemas']['PostEventResponse'];
                };
            };
        };
    };
    createEventBatch: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['PostEventBatchRequest'];
            };
        };
        responses: {
            /** @description Events created */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "event_ids": [
                     *         "7f22137a-6911-4ed3-bc36-110f1dde6b66",
                     *         "7f22137a-6911-4ed3-bc36-110f1dde6b67"
                     *       ],
                     *       "session_id": "caf77ace-3417-4da4-944d-f4a0688f3c23",
                     *       "success": true
                     *     }
                     */
                    'application/json': components['schemas']['PostEventBatchResponse'];
                };
            };
            /** @description Events partially created */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['CreateEventBatch500Response'];
                };
            };
        };
    };
    createModelEventBatch: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['PostModelEventBatchRequest'];
            };
        };
        responses: {
            /** @description Model events created */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "event_ids": [
                     *         "7f22137a-6911-4ed3-bc36-110f1dde6b66",
                     *         "7f22137a-6911-4ed3-bc36-110f1dde6b67"
                     *       ],
                     *       "success": true
                     *     }
                     */
                    'application/json': components['schemas']['PostEventBatchResponse'];
                };
            };
            /** @description Model events partially created */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['CreateModelEventBatch500Response'];
                };
            };
        };
    };
    getMetrics: {
        parameters: {
            query?: {
                /** @description Filter by metric type */
                type?: string;
                /** @description Filter by specific metric ID */
                id?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description A list of metrics */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['GetMetricsResponse'];
                };
            };
        };
    };
    updateMetric: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['UpdateMetricRequest'];
            };
        };
        responses: {
            /** @description Metric updated successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['UpdateMetricResponse'];
                };
            };
        };
    };
    createMetric: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['CreateMetricRequest'];
            };
        };
        responses: {
            /** @description Metric created successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['CreateMetricResponse'];
                };
            };
        };
    };
    deleteMetric: {
        parameters: {
            query: {
                metric_id: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Metric deleted successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['DeleteMetricResponse'];
                };
            };
        };
    };
    runMetric: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['RunMetricRequest'];
            };
        };
        responses: {
            /** @description Metric execution result */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['RunMetricResponse'];
                };
            };
        };
    };
    getDatapoints: {
        parameters: {
            query?: {
                /** @description List of datapoint ids to fetch */
                datapoint_ids?: string[];
                /** @description Name of the dataset to get datapoints from */
                dataset_name?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['GetDatapointsResponse'];
                };
            };
        };
    };
    createDatapoint: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['CreateDatapointRequest'];
            };
        };
        responses: {
            /** @description Datapoint successfully created */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['CreateDatapointResponse'];
                };
            };
        };
    };
    batchCreateDatapoints: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['BatchCreateDatapointsRequest'];
            };
        };
        responses: {
            /** @description Datapoints successfully created in batch */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['BatchCreateDatapointsResponse'];
                };
            };
        };
    };
    getDatapoint: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Datapoint ID like `65c13dbbd65fb876b7886cdb` */
                datapoint_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['GetDatapointResponse'];
                };
            };
        };
    };
    updateDatapoint: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description ID of datapoint to update */
                datapoint_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['UpdateDatapointRequest'];
            };
        };
        responses: {
            /** @description Datapoint successfully updated */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['UpdateDatapointResponse'];
                };
            };
            /** @description Error updating datapoint */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    deleteDatapoint: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Datapoint ID like `65c13dbbd65fb876b7886cdb` */
                datapoint_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Datapoint successfully deleted */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['DeleteDatapointResponse'];
                };
            };
        };
    };
    getDatasets: {
        parameters: {
            query?: {
                /** @description Unique dataset ID for filtering specific dataset */
                dataset_id?: string;
                /** @description Dataset name to filter by */
                name?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['GetDatasetsResponse'];
                };
            };
        };
    };
    updateDataset: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['UpdateDatasetRequest'];
            };
        };
        responses: {
            /** @description Successful update */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['UpdateDatasetResponse'];
                };
            };
        };
    };
    createDataset: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['CreateDatasetRequest'];
            };
        };
        responses: {
            /** @description Successful creation */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['CreateDatasetResponse'];
                };
            };
        };
    };
    deleteDataset: {
        parameters: {
            query: {
                /** @description The unique identifier of the dataset to be deleted like `663876ec4611c47f4970f0c3` */
                dataset_id: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful delete */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['DeleteDatasetResponse'];
                };
            };
        };
    };
    addDatapoints: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The unique identifier of the dataset to add datapoints to like  `663876ec4611c47f4970f0c3` */
                dataset_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['AddDatapointsToDatasetRequest'];
            };
        };
        responses: {
            /** @description Successful addition */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['AddDatapointsResponse'];
                };
            };
        };
    };
    removeDatapoint: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The unique identifier of the dataset */
                dataset_id: string;
                /** @description The unique identifier of the datapoint to remove */
                datapoint_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Datapoint successfully removed from dataset */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['RemoveDatapointResponse'];
                };
            };
        };
    };
    getExperimentRunsSchema: {
        parameters: {
            query?: {
                /** @description Filter by date range */
                dateRange?: string | {
                    $gte?: string | number;
                    $lte?: string | number;
                };
                /** @description Filter by evaluation/run ID */
                evaluation_id?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Experiment runs schema retrieved successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['GetExperimentRunsSchemaResponse'];
                };
            };
        };
    };
    getRuns: {
        parameters: {
            query?: {
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
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['GetExperimentRunsResponse'];
                };
            };
            /** @description Error fetching evaluations */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    createRun: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['PostExperimentRunRequest'];
            };
        };
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['PostExperimentRunResponse'];
                };
            };
            /** @description Invalid input */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getRun: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                run_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['GetExperimentRunResponse'];
                };
            };
            /** @description Error fetching evaluation */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    updateRun: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                run_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['PutExperimentRunRequest'];
            };
        };
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['PutExperimentRunResponse'];
                };
            };
            /** @description Invalid input */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    deleteRun: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                run_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['DeleteExperimentRunResponse'];
                };
            };
            /** @description Error deleting evaluation */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getExperimentRunMetrics: {
        parameters: {
            query?: {
                /** @description Date range filter as JSON string */
                dateRange?: string;
                /** @description Optional filters to apply (JSON string or array of filter objects) */
                filters?: string | Record<string, never>[];
            };
            header?: never;
            path: {
                /** @description Experiment run ID (UUIDv4) */
                run_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Event metrics retrieved successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['GetExperimentRunMetricsResponse'];
                };
            };
            /** @description Error fetching event metrics */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getExperimentResult: {
        parameters: {
            query?: {
                /** @description Aggregation function to apply to metrics */
                aggregate_function?: 'average' | 'min' | 'max' | 'median' | 'p95' | 'p99' | 'p90' | 'sum' | 'count';
                /** @description Optional filters to apply (JSON string or array of filter objects) */
                filters?: string | Record<string, never>[];
            };
            header?: never;
            path: {
                /** @description Experiment run ID (UUIDv4) */
                run_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Experiment result retrieved successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['GetExperimentRunResultResponse'];
                };
            };
            /** @description Error processing experiment result */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getExperimentComparison: {
        parameters: {
            query?: {
                /** @description Aggregation function to apply to metrics */
                aggregate_function?: 'average' | 'min' | 'max' | 'median' | 'p95' | 'p99' | 'p90' | 'sum' | 'count';
                /** @description Optional filters to apply (JSON string or array of filter objects) */
                filters?: string | Record<string, never>[];
            };
            header?: never;
            path: {
                /** @description New experiment run ID to compare (UUIDv4) */
                new_run_id: string;
                /** @description Old experiment run ID to compare against (UUIDv4) */
                old_run_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Experiment comparison retrieved successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['GetExperimentRunCompareResponse'];
                };
            };
            /** @description Error processing experiment comparison */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getExperimentCompareEvents: {
        parameters: {
            query: {
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
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Event comparison retrieved successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['GetExperimentCompareEventsResponse'];
                };
            };
            /** @description Error fetching event comparison */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getConfigurations: {
        parameters: {
            query?: {
                /** @description The name of the configuration like `v0` */
                name?: string;
                /** @description Environment - "dev", "staging" or "prod" */
                env?: string;
                /** @description Tags to filter configurations */
                tags?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description An array of configurations */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['GetConfigurationsResponse'];
                };
            };
        };
    };
    createConfiguration: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['CreateConfigurationRequest'];
            };
        };
        responses: {
            /** @description Configuration created successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['CreateConfigurationResponse'];
                };
            };
        };
    };
    updateConfiguration: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Configuration ID like `6638187d505c6812e4043f24` */
                configId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['UpdateConfigurationRequest'];
            };
        };
        responses: {
            /** @description Configuration updated successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['UpdateConfigurationResponse'];
                };
            };
        };
    };
    deleteConfiguration: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Configuration ID like `6638187d505c6812e4043f24` */
                configId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Configuration deleted successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['DeleteConfigurationResponse'];
                };
            };
        };
    };
}
//# sourceMappingURL=types.d.ts.map