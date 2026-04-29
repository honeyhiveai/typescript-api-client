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
         * Retrieve events based on filters (deprecated)
         * @deprecated
         * @description Deprecated. Use `POST /v1/events/search` instead.
         */
        post: operations['exportEventsLegacy'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/events/search': {
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
         * @description Search events via POST with filtering and pagination. This is the primary method for retrieving events from HoneyHive.
         */
        post: operations['searchEvents'];
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
         * Update a dataset (deprecated)
         * @deprecated
         * @description Deprecated. Use `PUT /v1/datasets/{dataset_id}` instead.
         */
        put: operations['updateDatasetLegacy'];
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
    '/v1/datasets/{dataset_id}': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * Update a dataset
         * @description Update a dataset's name, description, or list of datapoint IDs.
         */
        put: operations['updateDataset'];
        post?: never;
        delete?: never;
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
    '/v1/events/schema': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get events schema
         * @description Retrieve the schema and metadata for experiment events
         */
        get: operations['getEventsSchema'];
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
         * @description Compute evaluation summary for an experiment run: pass/fail results, metric aggregations, per-datapoint results, event details, and the experiment run object.
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
    '/v1/queues': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List annotation queues
         * @description List annotation queues for the current project scope, optionally filtered by enabled status.
         */
        get: operations['getQueues'];
        put?: never;
        /**
         * Create an annotation queue
         * @description Create a new annotation queue with a name, optional description, filters, and an initial set of event IDs to add.
         */
        post: operations['createQueue'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/queues/{queue_id}': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get an annotation queue
         * @description Retrieve a single annotation queue by its unique identifier.
         */
        get: operations['getQueue'];
        /**
         * Update an annotation queue
         * @description Update fields on an existing annotation queue. Supports updating name, description, filters, enabled status, and adding/removing events.
         */
        put: operations['updateQueue'];
        post?: never;
        /**
         * Delete an annotation queue
         * @description Soft-delete an annotation queue by its unique identifier.
         */
        delete: operations['deleteQueue'];
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
        /** @description Request body for POST /configurations */
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
        /** @description Request body for PUT /configurations */
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
        /** @description Query parameters for GET /configurations */
        GetConfigurationsQuery: {
            /** @description Filter configurations by name */
            name?: string;
            /** @description Filter configurations by environment */
            env?: string;
            /** @description Filter configurations by tags */
            tags?: string;
        };
        /** @description Response for POST /configurations */
        CreateConfigurationResponse: {
            acknowledged: boolean;
            insertedId: string;
        };
        /** @description Response for PUT /configurations */
        UpdateConfigurationResponse: {
            acknowledged: boolean;
            modifiedCount: number;
            upsertedId: string | null;
            upsertedCount: number;
            matchedCount: number;
        };
        /** @description Response for DELETE /configurations */
        DeleteConfigurationResponse: {
            acknowledged: boolean;
            deletedCount: number;
        };
        /** @description Response for GET /configurations */
        GetConfigurationsResponse: {
            configurations: components['schemas']['ConfigurationItem'][];
        };
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
        /** @description Query parameters for GET /datapoints */
        GetDatapointsQuery: {
            /** @description List of datapoint IDs to fetch */
            datapoint_ids?: string[];
            /** @description Dataset name to filter by */
            dataset_name?: string;
        };
        /** @description Path parameters for GET /datapoints/{datapoint_id} */
        GetDatapointParams: {
            /** @description Unique identifier of the datapoint */
            datapoint_id: string;
        };
        /** @description Request body for POST /datapoints */
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
        /** @description Request body for PUT /datapoints/{datapoint_id} */
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
        /** @description Path parameters for PUT /datapoints/{datapoint_id} */
        UpdateDatapointParams: {
            datapoint_id: string;
        };
        /** @description Path parameters for DELETE /datapoints/{datapoint_id} */
        DeleteDatapointParams: {
            datapoint_id: string;
        };
        /** @description Request body for POST /datapoints/batch */
        BatchCreateDatapointsRequest: {
            /** @deprecated */
            events?: string[];
            /** @deprecated */
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
        /** @description Response for GET /datapoints */
        GetDatapointsResponse: {
            datapoints: components['schemas']['Datapoint'][];
        };
        /** @description Response for GET /datapoints/{datapoint_id} */
        GetDatapointResponse: {
            datapoint: components['schemas']['Datapoint'][];
        };
        /** @description Response for POST /datapoints */
        CreateDatapointResponse: {
            inserted: boolean;
            result: components['schemas']['CreateDatapointResponseResult'];
        };
        /** @description Response for PUT /datapoints/{datapoint_id} */
        UpdateDatapointResponse: {
            updated: boolean;
            result: components['schemas']['UpdateDatapointResponseResult'];
        };
        /** @description Response for DELETE /datapoints/{datapoint_id} */
        DeleteDatapointResponse: {
            deleted: boolean;
        };
        /** @description Response for POST /datapoints/batch */
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
        /** @description Request body for POST /datasets */
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
        /** @description Request body for PUT /datasets/{dataset_id} */
        UpdateDatasetRequest: {
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
         */
        LegacyUpdateDatasetRequest: {
            /** @description Unique identifier of the dataset to update */
            dataset_id: string;
            /** @description New dataset name */
            name?: string;
            /** @description New dataset description */
            description?: string;
            /** @description Updated list of datapoint IDs */
            datapoints?: string[];
        };
        /** @description Query parameters for DELETE /datasets */
        DeleteDatasetQuery: {
            /** @description Unique identifier of the dataset to delete */
            dataset_id: string;
        };
        /** @description Request body for POST /datasets/{dataset_id}/datapoints */
        AddDatapointsToDatasetRequest: {
            /** @description Array of datapoint data objects to add */
            data: {
                [key: string]: unknown;
            }[];
            /** @description Field mapping for inputs, ground truth, and history */
            mapping: components['schemas']['DatapointMapping'];
        };
        /** @description Path parameters for DELETE /datasets/{dataset_id}/datapoints/{datapoint_id} */
        RemoveDatapointFromDatasetParams: {
            /** @description Unique identifier of the dataset */
            dataset_id: string;
            /** @description Unique identifier of the datapoint to remove */
            datapoint_id: string;
        };
        /** @description Response for POST /datasets */
        CreateDatasetResponse: {
            inserted: boolean;
            result: components['schemas']['InsertResult'];
        };
        InsertResult: {
            insertedId: string;
        };
        /** @description Response for PUT /datasets */
        UpdateDatasetResponse: {
            result: components['schemas']['Dataset'];
        };
        /** @description Response for GET /datasets */
        GetDatasetsResponse: {
            datasets: components['schemas']['Dataset'][];
        };
        /** @description Response for DELETE /datasets */
        DeleteDatasetResponse: {
            result: components['schemas']['DeleteResult'];
        };
        DeleteResult: {
            id: string;
        };
        /** @description Response for POST /datasets/{dataset_id}/datapoints */
        AddDatapointsResponse: {
            inserted: boolean;
            datapoint_ids: string[];
        };
        /** @description Response for DELETE /datasets/{dataset_id}/datapoints/{datapoint_id} */
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
        EventSearchFilter: {
            field: string;
            /** @enum {string} */
            operator: 'exists' | 'not exists' | 'is' | 'is not' | 'contains' | 'not contains' | 'greater than' | 'less than' | 'after' | 'before';
            value: string | number | boolean | null;
            /** @enum {string} */
            type?: 'string' | 'number' | 'boolean' | 'datetime';
        };
        EventSearchFiltersArray: components['schemas']['EventSearchFilter'][];
        /** @description Minimal event object used by evaluation and session endpoints; permissive (passthrough) */
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
            feedback?: components['schemas']['EventFeedback'];
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
        /** @description Model event object with model-specific fields and legacy aliases */
        ModelEvent: {
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
        /** @description Session properties for batch event creation */
        SessionProperties: {
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
        /** @description Request to update an existing event */
        UpdateEventRequest: {
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
        /** @description Request to create a new event */
        PostEventRequest: {
            event: components['schemas']['PostEventRequestEvent'];
        };
        /** @description Request body for POST /v1/events/search */
        SearchEventsRequest: {
            /** @description Array of filter criteria to apply */
            filters?: components['schemas']['EventSearchFiltersArray'];
            dateRange?: components['schemas']['SearchEventsRequestDateRange'];
            /** @description Limit number of results (default 1000, max 7500) */
            limit?: number;
            /** @description Page number of results (default 1) */
            page?: number;
            /** @description If true, skip result ordering for faster queries */
            ignore_order?: boolean;
            /** @description Filter by evaluation/experiment run ID */
            evaluation_id?: string;
        };
        /** @description Request body for POST /v1/events/export */
        LegacyExportEventsRequest: {
            /** @description Array of filter criteria to apply */
            filters?: components['schemas']['FiltersArray'];
            dateRange?: components['schemas']['LegacyExportEventsRequestDateRange'];
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
        /** @description Request body for POST /events/model */
        PostModelEventRequest: {
            model_event: components['schemas']['ModelEvent'];
        };
        /** @description Request body for POST /events/batch */
        PostEventBatchRequest: {
            /** @description Array of events to create */
            events: components['schemas']['LegacyEvent'][];
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
            session?: components['schemas']['SessionProperties'];
            session_properties?: components['schemas']['SessionProperties'];
        };
        /** @description Request body for POST /events/model/batch */
        PostModelEventBatchRequest: {
            /** @description Array of model events to create */
            model_events: components['schemas']['ModelEvent'][];
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
            session?: components['schemas']['SessionProperties'];
            session_properties?: components['schemas']['SessionProperties'];
        };
        /** @description Query parameters for GET /events */
        GetEventsQuery: {
            dateRange?: components['schemas']['DateRange'];
            /** @description Event filters to apply */
            filters?: components['schemas']['FiltersArray'];
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
        /** @description Response after creating an event */
        PostEventResponse: {
            success: boolean;
            event_id?: string;
        };
        /** @description Response for GET /events */
        GetEventsResponse: {
            events: unknown[];
            totalEvents: number;
        };
        /** @description Response for POST /v1/events/search and POST /v1/events/export */
        ExportEventsResponse: {
            events: components['schemas']['LegacyEvent'][];
            count: number;
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
        EventMetricData: {
            event_name: string;
            event_type: string;
            session_id: string;
            metadata: components['schemas']['EventMetricDataMetadata'];
            /** @description Metric name → value, merged from numeric, float, and boolean ClickHouse columns */
            metrics: {
                [key: string]: number | boolean;
            };
        };
        ComparableEvent: {
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
        /** @description Request body for POST /runs */
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
        /** @description Request body for PUT /runs/{run_id} */
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
        /** @description Query parameters for GET /runs */
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
        /** @description Path parameters for GET /runs/{run_id} */
        GetExperimentRunParams: {
            run_id: string;
        };
        /** @description Query parameters for GET /runs/{run_id}/metrics */
        GetExperimentRunMetricsQuery: {
            /** @description Date range filter as JSON string */
            dateRange?: string;
            /** @description Filters to apply to metrics */
            filters?: string | unknown[];
        };
        /** @description Query parameters for GET /runs/{run_id}/result */
        GetExperimentRunResultQuery: {
            /**
             * @description Aggregation function to apply (default: average)
             * @default average
             */
            aggregate_function?: string;
            /** @description Filters to apply to results */
            filters?: string | unknown[];
        };
        /** @description Path parameters for GET /runs/{new_run_id}/compare-with/{old_run_id} */
        GetExperimentRunCompareParams: {
            /** @description The new run ID to compare */
            new_run_id: string;
            /** @description The old run ID to compare against */
            old_run_id: string;
        };
        /** @description Query parameters for GET /runs/{new_run_id}/compare-with/{old_run_id} */
        GetExperimentRunCompareQuery: {
            /**
             * @description Aggregation function to apply (default: average)
             * @default average
             */
            aggregate_function?: string;
            /** @description Filters to apply to comparison */
            filters?: string | unknown[];
        };
        /** @description Query parameters for GET /runs/compare/events */
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
        /** @description Path parameters for DELETE /runs/{run_id} */
        DeleteExperimentRunParams: {
            run_id: string;
        };
        /** @description Query parameters for GET /events/schema */
        GetEventsSchemaQuery: {
            /** @description Date range to filter schema by */
            dateRange?: string | components['schemas']['AbsoluteDateRange'];
            /** @description Filter by evaluation/run ID */
            evaluation_id?: string;
        };
        /** @description Response for POST /runs */
        PostExperimentRunResponse: {
            evaluation: components['schemas']['ExperimentRunObject'];
            run_id: string;
        };
        /** @description Response for PUT /runs/{run_id} */
        PutExperimentRunResponse: {
            evaluation: components['schemas']['ExperimentRunObject'];
            warning?: string;
        };
        /** @description Response for GET /runs */
        GetExperimentRunsResponse: {
            evaluations: components['schemas']['ExperimentRunObject'][];
            pagination: components['schemas']['Pagination'];
            metrics: string[];
        };
        /** @description Response for GET /runs/{run_id} */
        GetExperimentRunResponse: {
            evaluation: components['schemas']['ExperimentRunObject'];
        };
        /** @description Evaluation summary for an experiment run: pass/fail results, metric aggregations, per-datapoint results, event details, and the experiment run object. */
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
        /** @description Response for GET /runs/{run_id}/metrics */
        GetExperimentRunMetricsResponse: {
            events: components['schemas']['EventMetricData'][];
            /** @description Total number of events matching the query */
            totalEvents: number;
        };
        /** @description Response for GET /events/schema */
        GetEventsSchemaResponse: {
            fields: components['schemas']['ExperimentSchemaField'][];
            datasets: string[];
            mappings: {
                [key: string]: components['schemas']['ExperimentSchemaMappingEntry'][];
            };
        };
        /** @description Response for GET /runs/compare/events */
        GetExperimentCompareEventsResponse: {
            events: components['schemas']['ComparableEvent'][];
            /** @description Total number of events matching the comparison query */
            totalEvents: number;
        };
        /** @description Response for DELETE /runs/{run_id} */
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
            categories?: components['schemas']['MetricItemCategoriesItem'][] | null;
            child_metrics?: components['schemas']['MetricItemChildMetricsItem'][] | null;
            filters: components['schemas']['MetricItemFilters'];
            id: string;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string | null;
        };
        /** @description Request body for POST /metrics */
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
            categories?: components['schemas']['CreateMetricRequestCategoriesItem'][] | null;
            child_metrics?: components['schemas']['CreateMetricRequestChildMetricsItem'][] | null;
            filters?: components['schemas']['CreateMetricRequestFilters'];
        };
        /** @description Request body for PUT /metrics */
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
            categories?: components['schemas']['UpdateMetricRequestCategoriesItem'][] | null;
            child_metrics?: components['schemas']['UpdateMetricRequestChildMetricsItem'][] | null;
            filters?: components['schemas']['UpdateMetricRequestFilters'];
            id: string;
        };
        /** @description Query parameters for GET /metrics */
        GetMetricsQuery: {
            /** @description Filter metrics by type */
            type?: string;
            /** @description Filter by metric ID */
            id?: string;
        };
        /** @description Query parameters for DELETE /metrics */
        DeleteMetricQuery: {
            /** @description Unique identifier of the metric to delete */
            metric_id: string;
        };
        /** @description Request body for POST /metrics/run_metric */
        RunMetricRequest: {
            metric: components['schemas']['RunMetricRequestMetric'];
            event: components['schemas']['RunMetricRequestEvent'];
        };
        /** @description Response for GET /metrics */
        GetMetricsResponse: {
            metrics: components['schemas']['MetricItem'][];
        };
        /** @description Response for POST /metrics */
        CreateMetricResponse: {
            inserted: boolean;
            metric_id: string;
        };
        /** @description Response for PUT /metrics */
        UpdateMetricResponse: {
            updated: boolean;
        };
        /** @description Response for DELETE /metrics */
        DeleteMetricResponse: {
            deleted: boolean;
        };
        /** @description Response for POST /metrics/run_metric */
        RunMetricResponse: {
            success: boolean;
            loading: boolean;
            result: boolean | number | string | null;
            explanation: string | null;
        };
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
        AnnotationQueue: {
            name: string;
            description: string;
            filters: components['schemas']['AnnotationQueueFilters'];
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
        BaseAnnotationQueue: {
            name: string;
            description: string;
            filters: components['schemas']['BaseAnnotationQueueFilters'];
            enabled: boolean;
        };
        CreateAnnotationQueueRequest: {
            name: string;
            /** @default  */
            description?: string;
            filters?: components['schemas']['CreateAnnotationQueueRequestFilters'];
            /** @default true */
            enabled?: boolean;
            /** @default [] */
            event_ids?: string[];
        };
        UpdateAnnotationQueueRequest: {
            name?: string;
            description?: string;
            filters?: components['schemas']['UpdateAnnotationQueueRequestFilters'];
            enabled?: boolean;
            id: string;
            add_event_ids?: string[];
            remove_event_ids?: string[];
        };
        GetAnnotationQueuesQuery: {
            enabled?: boolean | null;
        };
        CreateAnnotationQueueResponse: {
            queue: components['schemas']['CreateAnnotationQueueResponseQueue'];
            message: string;
        };
        UpdateAnnotationQueueResponse: {
            queue: components['schemas']['UpdateAnnotationQueueResponseQueue'];
            message: string;
        };
        GetAnnotationQueuesResponse: {
            queues: components['schemas']['GetAnnotationQueuesResponseQueuesItem'][];
        };
        GetAnnotationQueueByIdResponse: {
            name: string;
            description: string;
            filters: components['schemas']['GetAnnotationQueueByIdResponseFilters'];
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
        DeleteAnnotationQueueResponse: {
            message: string;
        };
        /** @description Minimal event object used by evaluation and session endpoints; permissive (passthrough) */
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
            feedback?: components['schemas']['PostSessionRequestFeedback'];
        } & {
            [key: string]: unknown;
        };
        /** @description Request to start a new session */
        StartSessionRequest: {
            session: components['schemas']['StartSessionRequestSession'];
        };
        /** @description Request to add traces to a session */
        AddSessionTracesRequest: {
            logs: components['schemas']['LegacyEvent'][];
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
        /** @description Response from adding traces to a session */
        SessionTracesResponse: {
            success: boolean;
        };
        /** @description TODO: This is a placeholder schema. Proper Zod schemas need to be created in @hive-kube/iso-core-ts for: Sessions, Events, Projects, and Experiment comparison/result endpoints. */
        TODOSchema: {
            /** @description Placeholder - Zod schema not yet implemented */
            message: string;
        };
        CreateDatapointResponseResult: {
            insertedIds: string[];
        };
        UpdateDatapointResponseResult: {
            modifiedCount: number;
        };
        EventFeedback: {
            ground_truth?: unknown;
        };
        /** @description Full event object for legacy event creation endpoints */
        PostEventRequestEvent: {
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
        SearchEventsRequestDateRange: {
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
        LegacyExportEventsRequestDateRange: {
            /** @description ISO String for start of date range */
            $gte: string;
            /** @description ISO String for end of date range */
            $lte: string;
        };
        EventMetricDataMetadata: {
            datapoint_id?: string;
        };
        MetricItemCategoriesItem: {
            category: string;
            score: number | null;
        };
        MetricItemChildMetricsItem: {
            id?: string;
            name: string;
            weight: number;
            scale?: number | null;
        };
        MetricItemFilters: {
            filterArray: components['schemas']['FiltersArray'];
        };
        CreateMetricRequestCategoriesItem: {
            category: string;
            score: number | null;
        };
        CreateMetricRequestChildMetricsItem: {
            id?: string;
            name: string;
            weight: number;
            scale?: number | null;
        };
        /**
         * @default {
         *       "filterArray": []
         *     }
         */
        CreateMetricRequestFilters: {
            filterArray: components['schemas']['FiltersArray'];
        };
        UpdateMetricRequestCategoriesItem: {
            category: string;
            score: number | null;
        };
        UpdateMetricRequestChildMetricsItem: {
            id?: string;
            name: string;
            weight: number;
            scale?: number | null;
        };
        UpdateMetricRequestFilters: {
            filterArray: components['schemas']['FiltersArray'];
        };
        RunMetricRequestMetricCategoriesItem: {
            category: string;
            score: number | null;
        };
        RunMetricRequestMetricChildMetricsItem: {
            id?: string;
            name: string;
            weight: number;
            scale?: number | null;
        };
        /**
         * @default {
         *       "filterArray": []
         *     }
         */
        RunMetricRequestMetricFilters: {
            filterArray: components['schemas']['FiltersArray'];
        };
        RunMetricRequestMetric: {
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
            categories?: components['schemas']['RunMetricRequestMetricCategoriesItem'][] | null;
            child_metrics?: components['schemas']['RunMetricRequestMetricChildMetricsItem'][] | null;
            filters?: components['schemas']['RunMetricRequestMetricFilters'];
        };
        RunMetricRequestEventFeedback: {
            ground_truth?: unknown;
        } & {
            [key: string]: unknown;
        };
        RunMetricRequestEvent: {
            event_type?: string;
            event_name?: string;
            inputs?: {
                [key: string]: unknown;
            };
            outputs?: {
                [key: string]: unknown;
            };
            workspace_id?: string;
            feedback?: components['schemas']['RunMetricRequestEventFeedback'];
        } & {
            [key: string]: unknown;
        };
        AnnotationQueueFilters: {
            filterArray: components['schemas']['FiltersArray'];
        };
        BaseAnnotationQueueFilters: {
            filterArray: components['schemas']['FiltersArray'];
        };
        /**
         * @default {
         *       "filterArray": []
         *     }
         */
        CreateAnnotationQueueRequestFilters: {
            filterArray: components['schemas']['FiltersArray'];
        };
        UpdateAnnotationQueueRequestFilters: {
            filterArray: components['schemas']['FiltersArray'];
        };
        CreateAnnotationQueueResponseQueueFilters: {
            filterArray: components['schemas']['FiltersArray'];
        };
        CreateAnnotationQueueResponseQueue: {
            name: string;
            description: string;
            filters: components['schemas']['CreateAnnotationQueueResponseQueueFilters'];
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
        UpdateAnnotationQueueResponseQueueFilters: {
            filterArray: components['schemas']['FiltersArray'];
        };
        UpdateAnnotationQueueResponseQueue: {
            name: string;
            description: string;
            filters: components['schemas']['UpdateAnnotationQueueResponseQueueFilters'];
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
        GetAnnotationQueuesResponseQueuesItemFilters: {
            filterArray: components['schemas']['FiltersArray'];
        };
        GetAnnotationQueuesResponseQueuesItem: {
            name: string;
            description: string;
            filters: components['schemas']['GetAnnotationQueuesResponseQueuesItemFilters'];
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
        GetAnnotationQueueByIdResponseFilters: {
            filterArray: components['schemas']['FiltersArray'];
        };
        PostSessionRequestFeedback: {
            ground_truth?: unknown;
        };
        StartSessionRequestSession: {
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
        GetEventsSchemaDateRangeOneOf1: {
            $gte?: string | number;
            $lte?: string | number;
        };
        GetRunsDateRangeOneOf1: {
            $gte?: string | number;
            $lte?: string | number;
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
    exportEventsLegacy: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['LegacyExportEventsRequest'];
            };
        };
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['ExportEventsResponse'];
                };
            };
        };
    };
    searchEvents: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['SearchEventsRequest'];
            };
        };
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['ExportEventsResponse'];
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
                content?: never;
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
                content?: never;
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
            /** @description Metrics retrieved successfully */
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
    updateDatasetLegacy: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['LegacyUpdateDatasetRequest'];
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
    updateDataset: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The unique identifier of the dataset to update like `663876ec4611c47f4970f0c3` */
                dataset_id: string;
            };
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
    getEventsSchema: {
        parameters: {
            query?: {
                /** @description Filter by date range */
                dateRange?: string | components['schemas']['GetEventsSchemaDateRangeOneOf1'];
                /** @description Filter by evaluation/run ID */
                evaluation_id?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Events schema retrieved successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['GetEventsSchemaResponse'];
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
                dateRange?: string | components['schemas']['GetRunsDateRangeOneOf1'];
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
    getQueues: {
        parameters: {
            query?: {
                /** @description Filter by enabled status */
                enabled?: boolean;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Queues retrieved successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['GetAnnotationQueuesResponse'];
                };
            };
        };
    };
    createQueue: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['CreateAnnotationQueueRequest'];
            };
        };
        responses: {
            /** @description Queue created successfully */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['CreateAnnotationQueueResponse'];
                };
            };
            /** @description Bad request (invalid queue data or missing required fields) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getQueue: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Annotation queue ID */
                queue_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Queue retrieved successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['GetAnnotationQueueByIdResponse'];
                };
            };
            /** @description Queue not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    updateQueue: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Annotation queue ID */
                queue_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['UpdateAnnotationQueueRequest'];
            };
        };
        responses: {
            /** @description Queue updated successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['UpdateAnnotationQueueResponse'];
                };
            };
            /** @description Queue not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    deleteQueue: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Annotation queue ID */
                queue_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Queue deleted successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['DeleteAnnotationQueueResponse'];
                };
            };
            /** @description Queue not found */
            404: {
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
            /** @description Configurations retrieved successfully */
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