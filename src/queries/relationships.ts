export const ALL_STIX_CORE_RELATIONSHIPS_QUERY = `
query AllStixCoreRelationships($first: Int, $after: ID) {
  stixCoreRelationships(first: $first, after: $after) {
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
        relationship_type
        confidence
        start_time
        stop_time
        from {
          ... on StixDomainObject {
            id
            entity_type
            name
          }
          ... on StixCyberObservable {
            id
            entity_type
            observable_value
          }
        }
        to {
          ... on StixDomainObject {
            id
            entity_type
            name
          }
          ... on StixCyberObservable {
            id
            entity_type
            observable_value
          }
        }
      }
    }
  }
}
`;

export const ALL_STIX_SIGHTING_RELATIONSHIPS_QUERY = `
query AllStixSightingRelationships($first: Int, $after: ID) {
  stixSightingRelationships(first: $first, after: $after) {
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
        relationship_type
        confidence
        first_seen
        last_seen
        from {
          ... on StixDomainObject {
            id
            entity_type
            name
          }
          ... on StixCyberObservable {
            id
            entity_type
            observable_value
          }
        }
        to {
          ... on StixDomainObject {
            id
            entity_type
            name
          }
          ... on StixCyberObservable {
            id
            entity_type
            observable_value
          }
        }
      }
    }
  }
}
`;

export const ALL_STIX_REF_RELATIONSHIPS_QUERY = `
query AllStixRefRelationships($first: Int, $after: ID) {
  stixRefRelationships(first: $first, after: $after) {
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
        relationship_type
        confidence
        from {
          ... on StixDomainObject {
            id
            entity_type
            name
          }
          ... on StixCyberObservable {
            id
            entity_type
            observable_value
          }
        }
        to {
          ... on StixDomainObject {
            id
            entity_type
            name
          }
          ... on StixCyberObservable {
            id
            entity_type
            observable_value
          }
        }
      }
    }
  }
}
`;

export const ALL_STIX_RELATIONSHIPS_QUERY = `
query AllStixRelationships {
  stixRelationships {
    edges {
      node {
        id
        standard_id
        entity_type
        parent_types
        relationship_type
        confidence
        created_at
        updated_at
        from {
          ... on StixDomainObject {
            id
            entity_type
            name
          }
          ... on StixCyberObservable {
            id
            entity_type
            observable_value
          }
        }
        to {
          ... on StixDomainObject {
            id
            entity_type
            name
          }
          ... on StixCyberObservable {
            id
            entity_type
            observable_value
          }
        }
        objectMarking {
          id
          definition
          x_opencti_order
          x_opencti_color
        }
        createdBy {
          id
          name
          entity_type
        }
      }
    }
  }
}
`;
