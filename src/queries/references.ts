export const ALL_MARKING_DEFINITIONS_QUERY = `
query AllMarkingDefinitions {
  markingDefinitions {
    edges {
      node {
        id
        standard_id
        entity_type
        definition_type
        definition
        x_opencti_order
        x_opencti_color
      }
    }
  }
}
`;

export const ALL_LABELS_QUERY = `
query AllLabels {
  labels {
    edges {
      node {
        id
        standard_id
        entity_type
        value
        color
      }
    }
  }
}
`;

export const ALL_EXTERNAL_REFERENCES_QUERY = `
query AllExternalReferences {
  externalReferences {
    edges {
      node {
        id
        standard_id
        entity_type
        source_name
        description
        url
        hash
        external_id
      }
    }
  }
}
`;

export const ALL_KILL_CHAIN_PHASES_QUERY = `
query AllKillChainPhases {
  killChainPhases {
    edges {
      node {
        id
        standard_id
        entity_type
        kill_chain_name
        phase_name
        x_opencti_order
      }
    }
  }
}
`;
