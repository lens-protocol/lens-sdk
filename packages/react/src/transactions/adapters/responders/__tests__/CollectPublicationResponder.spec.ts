import { DocumentNode } from '@apollo/client';
import {
  CommentFragment,
  CommentFragmentDoc,
  MirrorFragment,
  MirrorFragmentDoc,
  PostFragment,
  PostFragmentDoc,
  PublicationFragment,
} from '@lens-protocol/api-bindings';
import {
  createMockApolloCache,
  mockCommentFragment,
  mockMirrorFragment,
  mockPostFragment,
  mockPublicationStatsFragment,
} from '@lens-protocol/api-bindings/mocks';
import {
  mockBroadcastedTransactionData,
  mockPaidCollectRequest,
} from '@lens-protocol/domain/mocks';
import { CollectRequest } from '@lens-protocol/domain/use-cases/publications';
import { BroadcastedTransactionData } from '@lens-protocol/domain/use-cases/transactions';

import { PublicationCacheManager } from '../../PublicationCacheManager';
import { CollectPublicationResponder } from '../CollectPublicationResponder';

type PubType = PublicationFragment['__typename'];

const typeToFragmentMap: Record<PubType, DocumentNode> = {
  Post: PostFragmentDoc,
  Comment: CommentFragmentDoc,
  Mirror: MirrorFragmentDoc,
};

function setupTestScenario({
  typeName,
  data,
  transactionData,
}: {
  typeName: PubType;
  data: PostFragment | CommentFragment | MirrorFragment;
  transactionData: BroadcastedTransactionData<CollectRequest>;
}) {
  const apolloCache = createMockApolloCache();

  apolloCache.writeFragment({
    id: apolloCache.identify({
      __typename: typeName,
      id: transactionData.request.publicationId,
    }),
    fragment: typeToFragmentMap[typeName],
    fragmentName: typeName,
    data,
  });

  const publicationCacheManager = new PublicationCacheManager(apolloCache);
  const responder = new CollectPublicationResponder(publicationCacheManager);

  return {
    responder,

    get updatedPublicationFragment() {
      return apolloCache.readFragment({
        id: apolloCache.identify({
          __typename: typeName,
          id: data.id,
        }),
        fragment: typeToFragmentMap[typeName],
        fragmentName: typeName,
      });
    },
  };
}

const typeToMockFnMap = {
  Post: mockPostFragment,
  Comment: mockCommentFragment,
  Mirror: mockMirrorFragment,
};

describe(`Given the ${CollectPublicationResponder.name}`, () => {
  describe(`when "${CollectPublicationResponder.prototype.prepare.name}" method is invoked`, () => {
    it.each<PubType>(['Post', 'Comment', 'Mirror'])(
      `should update apollo cache with %s collect information`,
      async (publicationType) => {
        const mockFn = typeToMockFnMap[publicationType];
        const publication = mockFn({
          stats: mockPublicationStatsFragment({ totalAmountOfCollects: 1 }),
        });

        const request = mockPaidCollectRequest({
          publicationId: publication.id,
        });
        const transactionData = mockBroadcastedTransactionData({ request });
        const scenario = setupTestScenario({
          typeName: publicationType,
          data: publication,
          transactionData,
        });

        await scenario.responder.prepare(transactionData);

        expect(scenario.updatedPublicationFragment).toEqual(
          expect.objectContaining({
            hasOptimisticCollectedByMe: true,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            stats: expect.objectContaining({
              totalAmountOfCollects: 2,
            }),
          }),
        );
      },
    );
  });

  describe(`when "${CollectPublicationResponder.prototype.commit.name}" method is invoked`, () => {
    it.each<PubType>(['Post', 'Comment', 'Mirror'])(
      `should update apollo cache with collect information`,
      async (publicationType) => {
        const mockFn = typeToMockFnMap[publicationType];
        const publication = mockFn({
          hasCollectedByMe: false,
          stats: mockPublicationStatsFragment({ totalAmountOfCollects: 1 }),
        });
        const request = mockPaidCollectRequest({
          publicationId: publication.id,
        });
        const transactionData = mockBroadcastedTransactionData({ request });
        const scenario = setupTestScenario({
          typeName: publicationType,
          data: publication,
          transactionData,
        });

        await scenario.responder.commit(transactionData);

        expect(scenario.updatedPublicationFragment).toEqual(
          expect.objectContaining({
            hasCollectedByMe: true,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            stats: expect.objectContaining({
              totalAmountOfCollects: 1,
            }),
          }),
        );
      },
    );
  });

  describe(`when "${CollectPublicationResponder.prototype.rollback.name}" method is invoked`, () => {
    it.each<PubType>(['Post', 'Comment', 'Mirror'])(
      `should update apollo cache with collect information`,
      async (publicationType) => {
        const mockFn = typeToMockFnMap[publicationType];
        const publication = mockFn({
          hasCollectedByMe: false,
          hasOptimisticCollectedByMe: true,
          stats: mockPublicationStatsFragment({ totalAmountOfCollects: 2 }),
        });
        const request = mockPaidCollectRequest({
          publicationId: publication.id,
        });
        const transactionData = mockBroadcastedTransactionData({ request });
        const scenario = setupTestScenario({
          typeName: publicationType,
          data: publication,
          transactionData,
        });

        await scenario.responder.rollback(transactionData);

        expect(scenario.updatedPublicationFragment).toEqual(
          expect.objectContaining({
            hasCollectedByMe: false,
            hasOptimisticCollectedByMe: false,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            stats: expect.objectContaining({
              totalAmountOfCollects: 1,
            }),
          }),
        );
      },
    );
  });
});
