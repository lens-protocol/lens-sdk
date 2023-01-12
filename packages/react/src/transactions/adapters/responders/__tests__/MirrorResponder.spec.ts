import { isMirrorPublication, PostFragment } from '@lens-protocol/api-bindings';
import {
  createMockApolloClientWithMultipleResponses,
  mockPostFragment,
  mockProfileFieldsFragment,
  mockPublicationByTxHashMockedResponse,
} from '@lens-protocol/api-bindings/mocks';
import {
  mockBroadcastedTransactionData,
  mockCreateMirrorRequest,
} from '@lens-protocol/domain/mocks';
import { BroadcastedTransactionData } from '@lens-protocol/domain/use-cases/transactions';
import { CreateMirrorRequest } from '@lens-protocol/domain/use-cases/publications';

import { MirrorResponder } from '../MirrorResponder';
import { PublicationCacheModifier } from '../../PublicationCacheModifier';
import { invariant } from '@lens-protocol/shared-kernel';

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

  const publicationCacheModifier = new PublicationCacheModifier(apolloClient.cache);
  publicationCacheModifier.write(post);

  const responder = new MirrorResponder(apolloClient);

  return {
    responder,

    get updatedPost() {
      const result = publicationCacheModifier.read(post.id);

      const publication = result.unwrap();

      invariant(!isMirrorPublication(publication), "Mirrors can't be mirrored");

      return publication;
    },
  };
}

describe(`Given an instance of the ${MirrorResponder.name}`, () => {
  const author = mockProfileFieldsFragment();

  describe(`when "${MirrorResponder.prototype.prepare.name}" method is invoked`, () => {
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

  describe(`when "${MirrorResponder.prototype.commit.name}" method is invoked`, () => {
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

  describe(`when "${MirrorResponder.prototype.rollback.name}" method is invoked`, () => {
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
