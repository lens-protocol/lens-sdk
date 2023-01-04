import {
  FeedDocument,
  FeedQuery,
  FeedQueryVariables,
  PostFragment,
  ProfileFieldsFragment,
} from '@lens-protocol/api-bindings';
import {
  createMockApolloClientWithMultipleResponses,
  mockFeedQuery,
  mockGetProfileQueryMockedResponse,
  mockPostFragment,
  mockProfileFieldsFragment,
  mockPublicationByTxHashMockedResponse,
} from '@lens-protocol/api-bindings/mocks';
import { CreatePostRequest } from '@lens-protocol/domain/dist/esm/use-cases/publications';
import { BroadcastedTransactionData } from '@lens-protocol/domain/dist/esm/use-cases/transactions';
import { mockCreatePostRequest, mockBroadcastedTransactionData } from '@lens-protocol/domain/mocks';
import { nonNullable } from '@lens-protocol/shared-kernel';

import { CreatePostResponder } from '../CreatePostResponder';

function setupTestScenario({
  author,
  cachedFeedData,
  post = mockPostFragment(),
  transactionData = mockBroadcastedTransactionData(),
}: {
  author: ProfileFieldsFragment;
  cachedFeedData: FeedQuery;
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

  apolloClient.cache.writeQuery({
    query: FeedDocument,
    data: cachedFeedData,
    variables: {
      profileId: author.id,
      observerId: author.id,
      limit: 10,
    },
  });

  const responder = new CreatePostResponder(apolloClient);

  return {
    responder,

    get updatedFeedQuery() {
      return nonNullable(
        apolloClient.cache.readQuery<FeedQuery, FeedQueryVariables>({
          query: FeedDocument,
          variables: {
            profileId: author.id,
            observerId: author.id,
            limit: 10,
          },
        }),
        'Invalid FeedQuery',
      );
    },
  };
}

describe(`Given an instance of the ${CreatePostResponder.name}`, () => {
  const author = mockProfileFieldsFragment();
  const cachedFeedData = mockFeedQuery();

  describe(`when "${CreatePostResponder.prototype.prepare.name}" method is invoked`, () => {
    it(`should optimistically add FeedItem with a PendingPostFragment at the top of the corresponding FeedQuery cache entry`, async () => {
      const scenario = setupTestScenario({
        cachedFeedData,
        author,
      });

      const transactionData = mockBroadcastedTransactionData({
        request: mockCreatePostRequest({
          profileId: author.id,
        }),
      });
      await scenario.responder.prepare(transactionData);

      expect(scenario.updatedFeedQuery.result.items).toHaveLength(
        cachedFeedData.result.items.length + 1,
      );
    });
  });

  describe(`when "${CreatePostResponder.prototype.commit.name}" method is invoked`, () => {
    const post = mockPostFragment();
    const transactionData = mockBroadcastedTransactionData({
      request: mockCreatePostRequest({
        profileId: author.id,
      }),
    });

    it(`should replace the FeedItem with the PendingPostFragment added during the "${CreatePostResponder.prototype.prepare.name}" method call with the actual PostFragment retrieved from the BE`, async () => {
      const scenario = setupTestScenario({
        cachedFeedData,
        author,
        post,
        transactionData,
      });
      await scenario.responder.prepare(transactionData);

      await scenario.responder.commit(transactionData);

      expect(scenario.updatedFeedQuery.result.items).toHaveLength(
        cachedFeedData.result.items.length + 1,
      );
      expect(scenario.updatedFeedQuery.result.items[0]).toMatchObject({
        root: {
          __typename: 'Post',
          id: post.id,
        },
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

    it(`should remove the FeedItem with the PendingPostFragment added during the "${CreatePostResponder.prototype.prepare.name}" method call`, async () => {
      const scenario = setupTestScenario({
        cachedFeedData,
        author,
        post,
        transactionData,
      });
      await scenario.responder.prepare(transactionData);

      await scenario.responder.rollback(transactionData);

      expect(scenario.updatedFeedQuery).toMatchObject(cachedFeedData);
    });
  });
});
