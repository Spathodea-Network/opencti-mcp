export const FILE_BY_ID_QUERY = `
query FileById($id: String!) {
  file(id: $id) {
    id
    entity_type
    name
    size
    lastModified
    metaData {
      encoding
      mimetype
      version
      messages {
        timestamp
        message
        sequence
        source
      }
      errors {
        timestamp
        message
        sequence
        source
      }
      list_filters
      entity_id
      entity {
        id
        entity_type
        parent_types
        standard_id
      }
      labels_text
      labels
      file_markings
      creator_id
      external_reference_id
      creator {
        id
        name
        entity_type
      }
      description
      order
      inCarousel
      analysis_content_source
      analysis_content_type
      analysis_type
    }
    objectMarking {
      id
      definition
      x_opencti_order
      x_opencti_color
    }
    uploadStatus
    works {
      id
      name
      status
    }
  }
}
`;

export const ALL_FILES_QUERY = `
query AllFiles {
  importFiles {
    edges {
      node {
        id
        entity_type
        name
        size
        lastModified
        metaData {
          encoding
          mimetype
          version
          messages {
            timestamp
            message
            sequence
            source
          }
          errors {
            timestamp
            message
            sequence
            source
          }
          list_filters
          entity_id
          entity {
            id
            entity_type
            parent_types
            standard_id
          }
          labels_text
          labels
          file_markings
          creator_id
          external_reference_id
          creator {
            id
            name
            entity_type
          }
          description
          order
          inCarousel
          analysis_content_source
          analysis_content_type
          analysis_type
        }
        objectMarking {
          id
          definition
          x_opencti_order
          x_opencti_color
        }
        uploadStatus
        works {
          id
          name
          status
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
