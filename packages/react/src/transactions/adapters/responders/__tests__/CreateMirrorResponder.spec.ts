import { PostFragment, PostFragmentDoc } from '@lens-protocol/api-bindings';
import {
  createMockApolloClientWithMultipleResponses,
  mockPostFragment,
  mockProfileFragment,
  mockPublicationByTxHashMockedResponse,
} from '@lens-protocol/api-bindings/mocks';
import {
  mockBroadcastedTransactionData,
  mockCreateMirrorRequest,
} from '@lens-protocol/domain/mocks';
import { CreateMirrorRequest } from '@lens-protocol/domain/use-cases/publications';
import { BroadcastedTransactionData } from '@lens-protocol/domain/use-cases/transactions';
import { nonNullable } from '@lens-protocol/shared-kernel';

import { CreateMirrorResponder } from '../CreateMirrorResponder';

function setupTestScenario({
  post,
  transactionData,
}: {
  post: PostFragment;
  transactionData: BroadcastedTransactionData<CreateMirrorRequest>;
}) {
  const apolloClient = createMockApolloClientWithMultipleResponses([
    mockPublicationByTxHashMockedResponse({
      txHash: transactionData.txHash,
      observerId: transactionData.request.profileId,
      publication: { ...post, mirrors: post.mirrors.concat('<new-mirror-id>') },
    }),
  ]);

  apolloClient.cache.writeFragment({
    id: apolloClient.cache.identify({
      __typename: 'Post',
      id: post.id,
    }),
    fragment: PostFragmentDoc,
    fragmentName: 'Post',
    data: post,
  });

  const responder = new CreateMirrorResponder(apolloClient);

  return {
    responder,

    get updatedPost() {
      return nonNullable(
        apolloClient.cache.readFragment<PostFragment>({
          id: apolloClient.cache.identify({
            __typename: 'Post',
            id: post.id,
          }),
          fragment: PostFragmentDoc,
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

      const transactionData = mockBroadcastedTransactionData({
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

      const transactionData = mockBroadcastedTransactionData({
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

      const transactionData = mockBroadcastedTransactionData({
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
