export const USER_BY_ID_QUERY = `
query UserById($id: String!) {
  user(id: $id) {
    id
    standard_id
    entity_type
    parent_types
    user_email
    name
    firstname
    lastname
    groups {
      edges {
        node {
          id
          name
        }
      }
    }
  }
}
`;

export const ALL_USERS_QUERY = `
query AllUsers {
  users {
    edges {
      node {
        id
        standard_id
        entity_type
        user_email
        name
        firstname
        lastname
        external
        created_at
        updated_at
      }
    }
  }
}
`;

export const ALL_GROUPS_QUERY = `
query AllGroups($first: Int, $after: ID) {
  groups(first: $first, after: $after) {
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
        members(first: 5) {
          edges {
            node {
              id
              name
              user_email
            }
          }
        }
      }
    }
  }
}
`;

export const ALL_ROLES_QUERY = `
query AllRoles {
  roles {
    edges {
      node {
        id
        standard_id
        entity_type
        name
        description
        created_at
        updated_at
      }
    }
  }
}
`;

export const ALL_CAPABILITIES_QUERY = `
query AllCapabilities {
  capabilities {
    edges {
      node {
        id
        standard_id
        entity_type
        name
        description
        attribute_order
        created_at
        updated_at
      }
    }
  }
}
`;
