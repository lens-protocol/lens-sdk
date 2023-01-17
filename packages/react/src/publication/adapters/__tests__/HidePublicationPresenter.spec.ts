import { PostFragment, PostFragmentDoc } from '@lens-protocol/api-bindings';
import {
  createMockApolloCache,
  mockPostFragment,
  mockPublicationStatsFragment,
} from '@lens-protocol/api-bindings/mocks';

import { HidePublicationPresenter } from '../HidePublicationPresenter';

function setupTestScenario({ post }: { post: PostFragment }) {
  const apolloCache = createMockApolloCache();

  apolloCache.writeFragment({
    id: apolloCache.identify({
      __typename: 'Post',
      id: post.id,
    }),
    fragment: PostFragmentDoc,
    fragmentName: 'Post',
    data: post,
  });

  const presenter = new HidePublicationPresenter(apolloCache);

  return {
    presenter,

    get updatedPostFragment() {
      return apolloCache.readFragment({
        id: apolloCache.identify({
          __typename: 'Post',
          id: post.id,
        }),
        fragment: PostFragmentDoc,
        fragmentName: 'Post',
      });
    },
  };
}

describe(`Given the ${HidePublicationPresenter.name}`, () => {
  describe(`when "${HidePublicationPresenter.prototype.present.name}" method is invoked`, () => {
    it(`should update apollo cache by flagging publication as hidden`, async () => {
      const post = mockPostFragment({
        reaction: null,
        stats: mockPublicationStatsFragment({ totalUpvotes: 1 }),
      });

      const scenario = setupTestScenario({
        post,
      });

      await scenario.presenter.present(post.id);

      expect(scenario.updatedPostFragment).toEqual(
        expect.objectContaining({
          hidden: true,
        }),
      );
    });
  });
});
