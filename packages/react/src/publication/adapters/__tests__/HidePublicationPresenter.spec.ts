import { FragmentPost, Post } from '@lens-protocol/api-bindings';
import { mockLensApolloClient, mockPostFragment } from '@lens-protocol/api-bindings/mocks';

import { PublicationCacheManager } from '../../infrastructure/PublicationCacheManager';
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

  const publicationCacheManager = new PublicationCacheManager(client);
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
        isHidden: false,
      });

      const scenario = setupTestScenario({
        post,
      });

      scenario.presenter.present(post.id);

      expect(scenario.updatedPostFragment).toEqual(
        expect.objectContaining({
          isHidden: true,
        }),
      );
    });
  });
});
