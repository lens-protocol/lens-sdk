import { PostFragment, PostFragmentDoc, ReactionTypes } from '@lens-protocol/api-bindings';
import {
  createMockApolloCache,
  mockPost,
  mockPublicationStats,
} from '@lens-protocol/api-bindings/mocks';
import { mockReactionRequest } from '@lens-protocol/domain/mocks';
import { ReactionRequest } from '@lens-protocol/domain/use-cases/publications';

import { ReactionPresenter } from '../ReactionPresenter';

function setupTestScenario({ post, request }: { post: PostFragment; request: ReactionRequest }) {
  const apolloCache = createMockApolloCache();

  apolloCache.writeFragment({
    id: apolloCache.identify({
      __typename: 'Post',
      id: request.publicationId,
    }),
    fragment: PostFragmentDoc,
    fragmentName: 'Post',
    data: post,
  });

  const presenter = new ReactionPresenter(apolloCache);

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

describe(`Given the ${ReactionPresenter.name}`, () => {
  describe(`when "${ReactionPresenter.prototype.presentOptimisticAdd.name}" method is invoked`, () => {
    it(`should update apollo cache with added reaction`, async () => {
      const post = mockPost({
        reaction: null,
        stats: mockPublicationStats({ totalUpvotes: 1 }),
      });
      const request = mockReactionRequest({
        publicationId: post.id,
      });

      const scenario = setupTestScenario({
        post,
        request,
      });

      await scenario.presenter.presentOptimisticAdd(request);

      expect(scenario.updatedPostFragment).toEqual(
        expect.objectContaining({
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          stats: expect.objectContaining({
            totalUpvotes: post.stats.totalUpvotes + 1,
          }),
          reaction: ReactionTypes.Upvote,
        }),
      );
    });
  });

  describe(`when "${ReactionPresenter.prototype.presentOptimisticRemove.name}" method is invoked`, () => {
    it(`should update apollo cache with removed reaction`, async () => {
      const post = mockPost({
        reaction: ReactionTypes.Upvote,
        stats: mockPublicationStats({ totalUpvotes: 1 }),
      });
      const request = mockReactionRequest({
        publicationId: post.id,
      });

      const scenario = setupTestScenario({
        post,
        request,
      });

      await scenario.presenter.presentOptimisticRemove(request);

      expect(scenario.updatedPostFragment).toEqual(
        expect.objectContaining({
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          stats: expect.objectContaining({
            totalUpvotes: post.stats.totalUpvotes - 1,
          }),
          reaction: null,
        }),
      );
    });
  });

  describe(`when "${ReactionPresenter.prototype.revertOptimisticAdd.name}" method is invoked`, () => {
    it(`should:
          - update revert apollo cache update with added reaction
          - present error toast`, async () => {
      const post = mockPost({
        reaction: ReactionTypes.Upvote,
        stats: mockPublicationStats({ totalUpvotes: 1 }),
      });
      const request = mockReactionRequest({
        publicationId: post.id,
      });

      const scenario = setupTestScenario({
        post,
        request,
      });

      await scenario.presenter.revertOptimisticAdd(request);

      expect(scenario.updatedPostFragment).toEqual(
        expect.objectContaining({
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          stats: expect.objectContaining({
            totalUpvotes: post.stats.totalUpvotes - 1,
          }),
          reaction: null,
        }),
      );
    });
  });

  describe(`when "${ReactionPresenter.prototype.revertOptimisticRemove.name}" method is invoked`, () => {
    it(`should:
          - update revert apollo cache update with removed reaction
          - present error toast`, async () => {
      const post = mockPost({
        reaction: null,
        stats: mockPublicationStats({ totalUpvotes: 1 }),
      });
      const request = mockReactionRequest({
        publicationId: post.id,
      });

      const scenario = setupTestScenario({
        post,
        request,
      });

      await scenario.presenter.revertOptimisticRemove(request);

      expect(scenario.updatedPostFragment).toEqual(
        expect.objectContaining({
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          stats: expect.objectContaining({
            totalUpvotes: post.stats.totalUpvotes + 1,
          }),
          reaction: ReactionTypes.Upvote,
        }),
      );
    });
  });
});
