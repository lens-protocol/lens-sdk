import { PostFragment, ProfileFieldsFragment } from '@lens-protocol/api-bindings';
import {
  createMockApolloClientWithMultipleResponses,
  mockGetProfileQueryMockedResponse,
  mockPostFragment,
  mockProfileFieldsFragment,
  mockPublicationByTxHashMockedResponse,
} from '@lens-protocol/api-bindings/mocks';
import { mockCreatePostRequest, mockBroadcastedTransactionData } from '@lens-protocol/domain/mocks';
import { CreatePostRequest } from '@lens-protocol/domain/use-cases/publications';
import { BroadcastedTransactionData } from '@lens-protocol/domain/use-cases/transactions';

import { CreatePostResponder, recentPosts } from '../CreatePostResponder';

function setupTestScenario({
  author,
  post = mockPostFragment(),
  transactionData = mockBroadcastedTransactionData(),
}: {
  author: ProfileFieldsFragment;
  post?: PostFragment;
  transactionData?: BroadcastedTransactionData<CreatePostRequest>;
}) {
  const apolloClient = createMockApolloClientWithMultipleResponses([
    mockGetProfileQueryMockedResponse({
      profile: author,
      request: {
        profileId: author.id,
      },
    }),
    mockPublicationByTxHashMockedResponse({
      txHash: transactionData.txHash,
      observerId: author.id,
      publication: post,
    }),
  ]);

  return new CreatePostResponder(apolloClient);
}

describe(`Given an instance of the ${CreatePostResponder.name}`, () => {
  const author = mockProfileFieldsFragment();

  afterEach(() => {
    recentPosts([]);
  });

  describe(`when "${CreatePostResponder.prototype.prepare.name}" method is invoked`, () => {
    it(`should optimistically add a PendingPostFragment at the top of the provided recent posts ReactiveVar`, async () => {
      const responder = setupTestScenario({
        author,
      });

      const transactionData = mockBroadcastedTransactionData({
        request: mockCreatePostRequest({
          profileId: author.id,
        }),
      });
      await responder.prepare(transactionData);

      expect(recentPosts()[0]).toMatchObject({
        __typename: 'PendingPost',
        id: transactionData.id,
      });
    });
  });

  describe(`when "${CreatePostResponder.prototype.commit.name}" method is invoked`, () => {
    const post = mockPostFragment();
    const transactionData = mockBroadcastedTransactionData({
      request: mockCreatePostRequest({
        profileId: author.id,
      }),
    });

    it(`should replace the PendingPostFragment added during the "${CreatePostResponder.prototype.prepare.name}" method call with the actual PostFragment retrieved from the BE`, async () => {
      const responder = setupTestScenario({
        author,
        post,
        transactionData,
      });
      await responder.prepare(transactionData);

      await responder.commit(transactionData);

      expect(recentPosts()[0]).toMatchObject({
        __typename: 'Post',
        id: post.id,
      });
    });
  });

  describe(`when "${CreatePostResponder.prototype.rollback.name}" method is invoked`, () => {
    const post = mockPostFragment();
    const transactionData = mockBroadcastedTransactionData({
      request: mockCreatePostRequest({
        profileId: author.id,
      }),
    });

    it(`should remove the PendingPostFragment added during the "${CreatePostResponder.prototype.prepare.name}" method call`, async () => {
      const responder = setupTestScenario({
        author,
        post,
        transactionData,
      });
      await responder.prepare(transactionData);

      await responder.rollback(transactionData);

      expect(recentPosts().length).toBe(0);
    });
  });
});
