import { AnyPublication, FragmentPublication } from '@lens-protocol/api-bindings';
import {
  mockLensCache,
  mockPostFragment,
  mockCommentFragment,
  mockMirrorFragment,
} from '@lens-protocol/api-bindings/mocks';
import { mockPublicationId } from '@lens-protocol/domain/mocks';

import { PublicationCacheManager } from '../PublicationCacheManager';

function setupTestScenario({ publication }: { publication: AnyPublication }) {
  const apolloCache = mockLensCache();

  apolloCache.writeFragment({
    id: apolloCache.identify({
      __typename: publication.__typename,
      id: publication.id,
    }),
    fragment: FragmentPublication,
    fragmentName: 'Publication',
    data: publication,
  });

  return {
    cacheManager: new PublicationCacheManager(apolloCache),

    get updatedPublicationFragment() {
      return apolloCache.readFragment({
        id: apolloCache.identify({
          __typename: publication.__typename,
          id: publication.id,
        }),
        fragment: FragmentPublication,
        fragmentName: 'Publication',
      });
    },
  };
}

describe(`Given the ${PublicationCacheManager.name}`, () => {
  describe(`when "${PublicationCacheManager.prototype.update.name}" method is invoked`, () => {
    it.each([
      mockPostFragment({
        hidden: false,
      }),
      mockCommentFragment({
        hidden: false,
      }),
      mockMirrorFragment({
        hidden: false,
      }),
    ])(`should be able to update $__typename cache fragments`, async (publication) => {
      const scenario = setupTestScenario({ publication });

      scenario.cacheManager.update(publication.id, (data) => ({
        ...data,
        hidden: true,
      }));

      expect(scenario.updatedPublicationFragment).toMatchObject({
        hidden: true,
      });
    });

    it(`should not call the update callback if the cache item is not present`, async () => {
      const scenario = setupTestScenario({
        publication: mockPostFragment(),
      });
      const updateSpy = jest.fn();

      scenario.cacheManager.update(mockPublicationId(), updateSpy);

      expect(updateSpy).not.toHaveBeenCalled();
    });
  });
});
