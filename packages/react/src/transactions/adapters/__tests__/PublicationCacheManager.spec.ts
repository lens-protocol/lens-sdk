import { AnyPublication } from '@lens-protocol/api-bindings';
import {
  createMockApolloCache,
  mockPostFragment,
  mockCommentFragment,
  mockMirrorFragment,
} from '@lens-protocol/api-bindings/mocks';

import {
  FragmentNotFoundError,
  resolveFragmentDoc,
  PublicationCacheManager,
} from '../PublicationCacheManager';

function setupTestScenario({ publication }: { publication: AnyPublication }) {
  const apolloCache = createMockApolloCache();

  apolloCache.writeFragment({
    id: apolloCache.identify({
      __typename: publication.__typename,
      id: publication.id,
    }),
    fragment: resolveFragmentDoc(publication),
    fragmentName: publication.__typename,
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
        fragment: resolveFragmentDoc(publication),
        fragmentName: publication.__typename,
      });
    },
  };
}

describe(`Given the ${PublicationCacheManager.name}`, () => {
  describe(`when "${PublicationCacheManager.prototype.update.name}" method is invoked`, () => {
    it(`should update properly post cache fragment`, async () => {
      const post = mockPostFragment({
        hidden: false,
      });

      const scenario = setupTestScenario({
        publication: post,
      });

      scenario.cacheManager.update(post.id, (data) => ({
        ...data,
        hidden: true,
      }));

      expect(scenario.updatedPublicationFragment).toEqual(
        expect.objectContaining({
          hidden: true,
        }),
      );
    });

    it(`should update properly comment cache fragment`, async () => {
      const comment = mockCommentFragment({
        hidden: false,
      });

      const scenario = setupTestScenario({
        publication: comment,
      });

      scenario.cacheManager.update(comment.id, (data) => ({
        ...data,
        hidden: true,
      }));

      expect(scenario.updatedPublicationFragment).toEqual(
        expect.objectContaining({
          hidden: true,
        }),
      );
    });

    it(`should update properly mirror cache fragment`, async () => {
      const mirror = mockMirrorFragment({
        hidden: false,
      });

      const scenario = setupTestScenario({
        publication: mirror,
      });

      scenario.cacheManager.update(mirror.id, (data) => ({
        ...data,
        hidden: true,
      }));

      expect(scenario.updatedPublicationFragment).toEqual(
        expect.objectContaining({
          hidden: true,
        }),
      );
    });

    it(`should return failure when cache item is not present`, async () => {
      const scenario = setupTestScenario({
        publication: mockPostFragment(),
      });

      const result = scenario.cacheManager.update(mockMirrorFragment().id, (data) => ({
        ...data,
        hidden: true,
      }));

      expect(() => result.unwrap()).toThrow(FragmentNotFoundError);
    });
  });
});
