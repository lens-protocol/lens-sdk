import { noCachedField } from '../utils/noCachedField';

export function createPrimaryPublicationTypePolicy() {
  return {
    fields: {
      stats: noCachedField(),
    },
  };
}
