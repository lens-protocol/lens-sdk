import { PublicationMetadataFilters } from '@lens-protocol/api-bindings';

import { createPublicationMetadataFilters } from '../filters';

describe(`Given ${createPublicationMetadataFilters.name}`, () => {
  describe('when supplied with allowed filters', () => {
    it('should return the correct filter for the api', () => {
      const expectedFilters: PublicationMetadataFilters = {
        tags: {
          oneOf: ['sports'],
        },
      };

      expect(
        createPublicationMetadataFilters({
          restrictPublicationTagsTo: {
            oneOf: ['sports'],
          },
        }),
      ).toEqual(expectedFilters);

      expect(createPublicationMetadataFilters(undefined)).toBeUndefined();
    });
  });
});
