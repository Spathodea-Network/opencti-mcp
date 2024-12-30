export const FILE_BY_ID_QUERY = `
query FileById($id: String!) {
  file(id: $id) {
    id
    name
    size
    lastModified
    uploadStatus
  }
}
`;

export const ALL_FILES_QUERY = `
query AllFiles {
  importFiles(first: 100) {
    edges {
      node {
        id
        name
        size
        uploadStatus
        lastModified
        metaData {
          mimetype
          version
        }
      }
    }
  }
}
`;

export const ALL_INDEXED_FILES_QUERY = `
query AllIndexedFiles {
  indexedFiles {
    edges {
      node {
        id
        name
        file_id
        uploaded_at
        entity {
          id
          entity_type
          parent_types
          standard_id
        }
        searchOccurrences
      }
    }
  }
}
`;

export const ALL_LOGS_QUERY = `
query AllLogs {
  logs {
    edges {
      node {
        id
        entity_type
        event_type
        event_scope
        event_status
        timestamp
        user_id
        user {
          id
          name
          entity_type
        }
        context_uri
        context_data {
          entity_id
          entity_name
          entity_type
          from_id
          to_id
          message
          commit
          external_references {
            id
            source_name
            description
            url
            hash
            external_id
          }
        }
      }
    }
  }
}
`;

export const ALL_AUDITS_QUERY = `
query AllAudits {
  audits {
    edges {
      node {
        id
        entity_type
        event_type
        event_scope
        event_status
        timestamp
        user_id
        user {
          id
          name
          entity_type
        }
        context_uri
        context_data {
          entity_id
          entity_name
          entity_type
          from_id
          to_id
          message
          commit
          external_references {
            id
            source_name
            description
            url
            hash
            external_id
          }
        }
      }
    }
  }
}
`;

export const ALL_ATTRIBUTES_QUERY = `
query AllAttributes {
  runtimeAttributes {
    edges {
      node {
        id
        key
        value
      }
    }
  }
}
`;

export const ALL_SCHEMA_ATTRIBUTE_NAMES_QUERY = `
query AllSchemaAttributeNames {
  schemaAttributeNames(elementType: ["Report", "Note"]) {
    edges {
      node {
        id
        key
        value
      }
    }
  }
}
`;

export const ALL_FILTER_KEYS_SCHEMA_QUERY = `
query AllFilterKeysSchema {
  filterKeysSchema {
    entity_type
    filters_schema {
      filterKey
      filterDefinition {
        filterKey
        label
        type
        multiple
        subEntityTypes
        elementsForFilterValuesSearch
        subFilters {
          filterKey
          label
          type
          multiple
          subEntityTypes
          elementsForFilterValuesSearch
        }
      }
    }
  }
}
`;
