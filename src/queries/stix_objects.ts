export const REPORT_BY_ID_QUERY = `
query ReportById($id: String!) {
  report(id: $id) {
    id
    standard_id
    entity_type
    parent_types
    name
    description
    content
    content_mapping
    report_types
    published
    confidence
    createdBy {
      id
      name
      entity_type
    }
    objectMarking {
      id
      definition
      x_opencti_order
      x_opencti_color
    }
    objectLabel {
      id
      value
      color
    }
    externalReferences {
      edges {
        node {
          id
          source_name
          description
          url
          hash
          external_id
        }
      }
    }
    objects(first: 500) {
      edges {
        node {
          ... on StixDomainObject {
            id
            entity_type
            parent_types
            created
            updated_at
            standard_id
            created
            revoked
            confidence
            lang
            status {
              id
              template {
                name
                color
              }
            }
          }
          ... on StixCyberObservable {
            id
            entity_type
            parent_types
            observable_value
            x_opencti_description
            x_opencti_score
          }
          ... on StixCoreRelationship {
            id
            entity_type
            parent_types
            relationship_type
            description
            start_time
            stop_time
            from {
              ... on StixDomainObject {
                id
                entity_type
                parent_types
                created_at
                standard_id
              }
            }
            to {
              ... on StixDomainObject {
                id
                entity_type
                parent_types
                created_at
                standard_id
              }
            }
          }
        }
      }
    }
    created
    modified
    created_at
    updated_at
    x_opencti_stix_ids
    status {
      id
      template {
        name
        color
      }
    }
    workflowEnabled
    containersNumber {
      total
      count
    }
    containers {
      edges {
        node {
          id
          entity_type
          parent_types
          created_at
          standard_id
        }
      }
    }
  }
}
`;

export const ALL_ATTACK_PATTERNS_QUERY = `
query AllAttackPatterns($first: Int, $after: ID) {
  attackPatterns(first: $first, after: $after) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        id
        standard_id
        entity_type
        parent_types
        name
        description
        x_mitre_id
        killChainPhases {
          id
          kill_chain_name
          phase_name
        }
        coursesOfAction {
          edges {
            node {
              id
              name
              description
            }
          }
        }
      }
    }
  }
}
`;

export const CAMPAIGN_BY_NAME_QUERY = `
query CampaignByName($name: Any!) {
  campaigns(
    first: 1,
    filters: {
      mode: and,
      filters: [
        {
          key: "name",
          values: [$name],
          operator: eq,
          mode: or
        }
      ],
      filterGroups: []
    }
  ) {
    edges {
      node {
        id
        standard_id
        entity_type
        parent_types
        name
        description
        first_seen
        last_seen
        created
        modified
        created_at
        updated_at
      }
    }
  }
}
`;

export const ALL_STIX_CORE_OBJECTS_QUERY = `
query AllStixCoreObjects {
  stixCoreObjects {
    edges {
      node {
        id
        standard_id
        entity_type
        parent_types
        representative {
          main
          secondary
        }
        x_opencti_stix_ids
        is_inferred
        spec_version
        created_at
        updated_at
        createdBy {
          id
          name
          entity_type
        }
        numberOfConnectedElement
        objectMarking {
          id
          definition
          x_opencti_order
          x_opencti_color
        }
        objectOrganization {
          id
          name
        }
        objectLabel {
          id
          value
          color
        }
        externalReferences {
          edges {
            node {
              id
              source_name
              description
              url
              hash
              external_id
            }
          }
        }
        containersNumber {
          total
          count
        }
        containers {
          edges {
            node {
              id
              entity_type
              parent_types
              created_at
              standard_id
            }
          }
        }
        reports {
          edges {
            node {
              id
              name
            }
          }
        }
        notes {
          edges {
            node {
              id
              content
            }
          }
        }
        opinions {
          edges {
            node {
              id
              opinion
            }
          }
        }
        observedData {
          edges {
            node {
              id
              first_observed
              last_observed
              number_observed
            }
          }
        }
        groupings {
          edges {
            node {
              id
              name
            }
          }
        }
        cases {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    }
  }
}
`;

export const ALL_STIX_DOMAIN_OBJECTS_QUERY = `
query AllStixDomainObjects {
  stixDomainObjects {
    edges {
      node {
        id
        standard_id
        entity_type
        parent_types
        representative {
          main
          secondary
        }
        x_opencti_stix_ids
        is_inferred
        spec_version
        created_at
        updated_at
        createdBy {
          id
          name
          entity_type
        }
        numberOfConnectedElement
        objectMarking {
          id
          definition
          x_opencti_order
          x_opencti_color
        }
        objectOrganization {
          id
          name
        }
        objectLabel {
          id
          value
          color
        }
        externalReferences {
          edges {
            node {
              id
              source_name
              description
              url
              hash
              external_id
            }
          }
        }
        containersNumber {
          total
          count
        }
        containers {
          edges {
            node {
              id
              entity_type
              parent_types
              created_at
              standard_id
            }
          }
        }
        reports {
          edges {
            node {
              id
              name
            }
          }
        }
        notes {
          edges {
            node {
              id
              content
            }
          }
        }
        opinions {
          edges {
            node {
              id
              opinion
            }
          }
        }
        observedData {
          edges {
            node {
              id
              first_observed
              last_observed
              number_observed
            }
          }
        }
        groupings {
          edges {
            node {
              id
              name
            }
          }
        }
        cases {
          edges {
            node {
              id
              name
            }
          }
        }
        revoked
        confidence
        lang
        created
        modified
        x_opencti_graph_data
        objectAssignee {
          id
          name
          entity_type
        }
        objectParticipant {
          id
          name
          entity_type
        }
        status {
          id
          template {
            name
            color
          }
        }
        workflowEnabled
      }
    }
  }
}
`;
