import { Post, FragmentPost } from '@lens-protocol/api-bindings';
import {
  mockLensApolloClient,
  mockPostFragment,
  mockPublicationStatsFragment,
  mockSources,
} from '@lens-protocol/api-bindings/mocks';

import { defaultMediaTransformsConfig } from '../../../mediaTransforms';
import { PublicationCacheManager } from '../../../transactions/adapters/PublicationCacheManager';
import { HidePublicationPresenter } from '../HidePublicationPresenter';

function setupTestScenario({ post }: { post: Post }) {
  const client = mockLensApolloClient();

  client.cache.writeFragment({
    id: client.cache.identify({
      __typename: 'Post',
      id: post.id,
    }),
    fragment: FragmentPost,
    fragmentName: 'Post',
    data: post,
  });

  const publicationCacheManager = new PublicationCacheManager(
    client,
    mockSources(),
    defaultMediaTransformsConfig,
  );
  const presenter = new HidePublicationPresenter(publicationCacheManager);

  return {
    presenter,

    get updatedPostFragment() {
      return client.cache.readFragment({
        id: client.cache.identify({
          __typename: 'Post',
          id: post.id,
        }),
        fragment: FragmentPost,
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

      scenario.presenter.present(post.id);

      expect(scenario.updatedPostFragment).toEqual(
        expect.objectContaining({
          hidden: true,
        }),
      );
    });
  });
});
