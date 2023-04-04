import { Post, FragmentPost } from '@lens-protocol/api-bindings';
import {
  createMockApolloClientWithMultipleResponses,
  mockPostFragment,
  mockProfileFragment,
  createPublicationByTxHashMockedResponse,
  mockSources,
} from '@lens-protocol/api-bindings/mocks';
import {
  mockTransactionData,
  mockCreateMirrorRequest,
  mockPublicationId,
} from '@lens-protocol/domain/mocks';
import { CreateMirrorRequest } from '@lens-protocol/domain/use-cases/publications';
import { TransactionData } from '@lens-protocol/domain/use-cases/transactions';
import { never, nonNullable } from '@lens-protocol/shared-kernel';

import { PublicationCacheManager } from '../../PublicationCacheManager';
import { CreateMirrorResponder } from '../CreateMirrorResponder';

function setupTestScenario({
  post,
  transactionData,
}: {
  post: Post;
  transactionData: TransactionData<CreateMirrorRequest>;
}) {
  const sources = mockSources();
  const apolloClient = createMockApolloClientWithMultipleResponses([
    createPublicationByTxHashMockedResponse({
      variables: {
        txHash: transactionData.txHash ?? never(),
        observerId: transactionData.request.profileId,
        sources,
      },
      publication: { ...post, mirrors: post.mirrors.concat(mockPublicationId()) },
    }),
  ]);

  apolloClient.cache.writeFragment({
    id: apolloClient.cache.identify({
      __typename: 'Post',
      id: post.id,
    }),
    fragment: FragmentPost,
    fragmentName: 'Post',
    data: post,
  });

  const publicationCacheManager = new PublicationCacheManager(apolloClient.cache);
  const responder = new CreateMirrorResponder(apolloClient, publicationCacheManager, sources);

  return {
    responder,

    get updatedPost() {
      return nonNullable(
        apolloClient.cache.readFragment<Post>({
          id: apolloClient.cache.identify({
            __typename: 'Post',
            id: post.id,
          }),
          fragment: FragmentPost,
          fragmentName: 'Post',
        }),
        "Can't find post in cache",
      );
    },
  };
}

describe(`Given an instance of the ${CreateMirrorResponder.name}`, () => {
  const author = mockProfileFragment();

  describe(`when "${CreateMirrorResponder.prototype.prepare.name}" method is invoked`, () => {
    it(`should mark as optimistically mirrored by me and update total mirrors count`, async () => {
      const post = mockPostFragment({
        isOptimisticMirroredByMe: false,
        profile: author,
      });

      const transactionData = mockTransactionData({
        request: mockCreateMirrorRequest({
          profileId: author.id,
          publicationId: post.id,
        }),
      });

      const scenario = setupTestScenario({
        post,
        transactionData,
      });

      await scenario.responder.prepare(transactionData);

      expect(scenario.updatedPost.stats.totalAmountOfMirrors).toBe(
        post.stats.totalAmountOfMirrors + 1,
      );
      expect(scenario.updatedPost.isOptimisticMirroredByMe).toBeTruthy();
    });
  });

  describe(`when "${CreateMirrorResponder.prototype.commit.name}" method is invoked`, () => {
    it(`should update the publication 'mirrors' list and unmark optimistically mirrored by me`, async () => {
      const post = mockPostFragment({
        isOptimisticMirroredByMe: true,
        profile: author,
      });

      const transactionData = mockTransactionData({
        request: mockCreateMirrorRequest({
          profileId: author.id,
          publicationId: post.id,
        }),
      });

      const scenario = setupTestScenario({
        post,
        transactionData,
      });

      await scenario.responder.commit(transactionData);

      expect(scenario.updatedPost.mirrors).toHaveLength(post.mirrors.length + 1);
      expect(scenario.updatedPost.isOptimisticMirroredByMe).toBeFalsy();
    });
  });

  describe(`when "${CreateMirrorResponder.prototype.rollback.name}" method is invoked`, () => {
    it(`should rollback optimistically mirrored by me and total mirrors count`, async () => {
      const post = mockPostFragment({
        isOptimisticMirroredByMe: true,
        profile: author,
      });

      const transactionData = mockTransactionData({
        request: mockCreateMirrorRequest({
          profileId: author.id,
          publicationId: post.id,
        }),
      });

      const scenario = setupTestScenario({
        post,
        transactionData,
      });

      await scenario.responder.rollback(transactionData);

      expect(scenario.updatedPost.stats.totalAmountOfMirrors).toBe(
        post.stats.totalAmountOfMirrors - 1,
      );
      expect(scenario.updatedPost.isOptimisticMirroredByMe).toBeFalsy();
    });
  });
});
