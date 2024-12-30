export const LATEST_REPORTS_QUERY = `
query LatestReport($first: Int) {
  reports(
    first: $first,
    orderBy: created,
    orderMode: desc
  ) {
    edges {
      node {
        # Basic fields
        id
        standard_id
        entity_type
        parent_types
        
        # Report specific fields
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
        
        # Relationships and objects
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
        
        # Additional metadata
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
        
        # Container specific fields
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
  }
}
`;

export const SEARCH_MALWARE_QUERY = `
query Malware($search: String, $first: Int) {
  stixCoreObjects(
    search: $search,
    first: $first,
    types: ["Malware"]
  ) {
    edges {
      node {
        ... on Malware {
          id
          name
          description
          created
          modified
          malware_types
          is_family
          first_seen
          last_seen
        }
      }
    }
  }
}
`;

export const SEARCH_INDICATORS_QUERY = `
query Indicators($search: String, $first: Int) {
  stixCoreObjects(
    search: $search,
    first: $first,
    types: ["Indicator"]
  ) {
    edges {
      node {
        ... on Indicator {
          id
          name
          description
          created_at
          pattern
          valid_from
          valid_until
          x_opencti_score
        }
      }
    }
  }
}
`;

export const SEARCH_THREAT_ACTORS_QUERY = `
query ThreatActors($search: String, $first: Int) {
  stixCoreObjects(
    search: $search,
    first: $first,
    types: ["ThreatActorGroup"]
  ) {
    edges {
      node {
        ... on ThreatActorGroup {
          id
          name
          description
          created
          modified
          threat_actor_types
          first_seen
          last_seen
          sophistication
          resource_level
          roles
          goals
        }
      }
    }
  }
}
`;
