export const ALL_CONNECTORS_QUERY = `
query AllConnectors {
  connectors {
    id
    name
    active
    auto
    only_contextual
    playbook_compatible
    connector_type
    connector_scope
    connector_state
    connector_schema
    connector_schema_ui
    connector_state_reset
    connector_user_id
    updated_at
    created_at
    config {
      connection {
        host
        vhost
        use_ssl
        port
        user
        pass
      }
      listen
      listen_routing
      listen_exchange
      push
      push_routing
      push_exchange
    }
    works {
      id
      name
      status
    }
  }
}
`;

export const ALL_STATUS_TEMPLATES_QUERY = `
query AllStatusTemplates {
  statusTemplates {
    edges {
      node {
        id
        name
        color
        editContext {
          name
          focusOn
        }
        usages
      }
    }
  }
}
`;

export const ALL_STATUSES_QUERY = `
query AllStatuses {
  statuses {
    edges {
      node {
        id
        template_id
        template {
          id
          name
          color
        }
        type
        order
        disabled
      }
    }
  }
}
`;

export const ALL_SUB_TYPES_QUERY = `
query AllSubTypes {
  subTypes {
    edges {
      node {
        id
        label
        statuses {
          id
          template {
            id
            name
            color
          }
          type
          order
          disabled
        }
        workflowEnabled
        settings {
          id
          entity_type
          parent_types
          standard_id
        }
      }
    }
  }
}
`;

export const ALL_RETENTION_RULES_QUERY = `
query AllRetentionRules {
  retentionRules {
    edges {
      node {
        id
        standard_id
        name
        filters
        max_retention
        retention_unit
        last_execution_date
        last_deleted_count
        remaining_count
        scope
      }
    }
  }
}
`;

export const ALL_BACKGROUND_TASKS_QUERY = `
query AllBackgroundTasks {
  backgroundTasks {
    edges {
      node {
        id
        type
        initiator {
          id
          name
          entity_type
        }
        actions {
          type
          context {
            field
            type
            values
          }
        }
        created_at
        last_execution_date
        completed
        task_expected_number
        task_processed_number
        errors {
          id
          timestamp
          message
        }
      }
    }
  }
}
`;

export const ALL_FEEDS_QUERY = `
query AllFeeds {
  feeds {
    edges {
      node {
        id
        standard_id
        name
        description
        filters
        separator
        rolling_time
        feed_date_attribute
        include_header
        feed_types
        feed_attributes {
          attribute
          mappings {
            type
            attribute
          }
        }
        feed_public
        authorized_members {
          id
          name
          entity_type
          access_right
        }
      }
    }
  }
}
`;

export const ALL_TAXII_COLLECTIONS_QUERY = `
query AllTaxiiCollections {
  taxiiCollections {
    edges {
      node {
        id
        name
        description
        filters
        include_inferences
        score_to_confidence
        taxii_public
        authorized_members {
          id
          name
          entity_type
          access_right
        }
      }
    }
  }
}
`;

export const ALL_STREAM_COLLECTIONS_QUERY = `
query AllStreamCollections {
  streamCollections {
    edges {
      node {
        id
        name
        description
        filters
        stream_live
        stream_public
        authorized_members {
          id
          name
          entity_type
          access_right
        }
      }
    }
  }
}
`;

export const ALL_RULES_QUERY = `
query AllRules {
  rules {
    id
    name
    description
    activated
    category
    display {
      if {
        source
        source_color
        relation
        target
        target_color
        identifier
        identifier_color
        action
      }
      then {
        source
        source_color
        relation
        target
        target_color
        identifier
        identifier_color
        action
      }
    }
  }
}
`;

export const ALL_SYNCHRONIZERS_QUERY = `
query AllSynchronizers {
  synchronizers {
    edges {
      node {
        id
        name
        uri
        token
        stream_id
        user {
          id
          name
          entity_type
        }
        running
        current_state_date
        listen_deletion
        no_dependencies
        ssl_verify
        synchronized
        queue_messages
      }
    }
  }
}
`;
