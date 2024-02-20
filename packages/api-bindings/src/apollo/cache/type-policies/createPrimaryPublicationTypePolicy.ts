import { oneToOneRelationship } from '../utils/oneToOneRelationship';

export function createPrimaryPublicationTypePolicy() {
  return {
    fields: {
      stats: oneToOneRelationship(),
      metadata: oneToOneRelationship(),
    },
  };
}
