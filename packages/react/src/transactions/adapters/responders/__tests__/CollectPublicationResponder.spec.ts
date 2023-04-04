import { DocumentNode } from '@apollo/client';
import {
  Comment,
  FragmentComment,
  Mirror,
  FragmentMirror,
  Post,
  FragmentPost,
  AnyPublication,
  ContentPublication,
} from '@lens-protocol/api-bindings';
import {
  createMockApolloCache,
  mockCommentFragment,
  mockMirrorFragment,
  mockPostFragment,
  mockPublicationStatsFragment,
} from '@lens-protocol/api-bindings/mocks';
import { mockTransactionData, mockPaidCollectRequest } from '@lens-protocol/domain/mocks';

import { PublicationCacheManager } from '../../PublicationCacheManager';
import { CollectPublicationResponder } from '../CollectPublicationResponder';

type AnyPublicationTypename = AnyPublication['__typename'];

const typeToFragmentMap: Record<AnyPublicationTypename, DocumentNode> = {
  Post: FragmentPost,
  Comment: FragmentComment,
  Mirror: FragmentMirror,
};

function setupTestScenario({ publication }: { publication: Post | Comment | Mirror }) {
  const apolloCache = createMockApolloCache();

  apolloCache.writeFragment({
    id: apolloCache.identify(publication),
    fragment: typeToFragmentMap[publication.__typename],
    fragmentName: publication.__typename,
    data: publication,
  });

  const publicationCacheManager = new PublicationCacheManager(apolloCache);
  const responder = new CollectPublicationResponder(publicationCacheManager);

  return {
    responder,

    get updatedPublicationFragment() {
      return apolloCache.readFragment({
        id: apolloCache.identify(publication),
        fragment: typeToFragmentMap[publication.__typename],
        fragmentName: publication.__typename,
      });
    },
  };
}

const knownInitialPublicationStats = mockPublicationStatsFragment({ totalAmountOfCollects: 1 });

describe(`Given the ${CollectPublicationResponder.name}`, () => {
  describe.each<ContentPublication>([
    mockPostFragment({
      hasCollectedByMe: false,
      hasOptimisticCollectedByMe: false,
      stats: knownInitialPublicationStats,
    }),

    mockCommentFragment({
      hasCollectedByMe: false,
      hasOptimisticCollectedByMe: false,
      stats: knownInitialPublicationStats,
    }),
  ])('and a $__typename', (publication) => {
    describe(`when "${CollectPublicationResponder.prototype.prepare.name}" method is invoked`, () => {
      it(`should optimistically update the publication with the new collect information`, async () => {
        const request = mockPaidCollectRequest({
          publicationId: publication.id,
        });
        const transactionData = mockTransactionData({ request });
        const scenario = setupTestScenario({ publication });

        await scenario.responder.prepare(transactionData);

        expect(scenario.updatedPublicationFragment).toMatchObject({
          hasOptimisticCollectedByMe: true,
          stats: {
            totalAmountOfCollects: 2,
          },
        });
      });

      it('should optimistically update the publication also if collected via a mirror', async () => {
        const mirror = mockMirrorFragment({
          mirrorOf: publication,
        });
        const request = mockPaidCollectRequest({
          publicationId: mirror.id,
        });
        const transactionData = mockTransactionData({ request });
        const scenario = setupTestScenario({ publication: mirror });

        await scenario.responder.prepare(transactionData);

        expect(scenario.updatedPublicationFragment).toMatchObject({
          mirrorOf: {
            hasOptimisticCollectedByMe: true,
            stats: {
              totalAmountOfCollects: 2,
            },
          },
        });
      });
    });

    describe(`when "${CollectPublicationResponder.prototype.commit.name}" method is invoked`, () => {
      it(`should confirm the changes done during the "${CollectPublicationResponder.prototype.prepare.name}" method call`, async () => {
        const request = mockPaidCollectRequest({
          publicationId: publication.id,
        });
        const transactionData = mockTransactionData({ request });
        const scenario = setupTestScenario({ publication });
        await scenario.responder.prepare(transactionData);

        await scenario.responder.commit(transactionData);

        expect(scenario.updatedPublicationFragment).toMatchObject({
          hasCollectedByMe: true,
          hasOptimisticCollectedByMe: false,
          stats: {
            totalAmountOfCollects: 2,
          },
        });
      });

      it('should confirm the changes also if collected via a mirror', async () => {
        const mirror = mockMirrorFragment({
          mirrorOf: publication,
        });
        const request = mockPaidCollectRequest({
          publicationId: mirror.id,
        });
        const transactionData = mockTransactionData({ request });
        const scenario = setupTestScenario({ publication: mirror });
        await scenario.responder.prepare(transactionData);

        await scenario.responder.commit(transactionData);

        expect(scenario.updatedPublicationFragment).toMatchObject({
          mirrorOf: {
            hasCollectedByMe: true,
            hasOptimisticCollectedByMe: false,
            stats: {
              totalAmountOfCollects: 2,
            },
          },
        });
      });
    });

    describe(`when "${CollectPublicationResponder.prototype.rollback.name}" method is invoked`, () => {
      it(`should revert the changes done during the "${CollectPublicationResponder.prototype.prepare.name}" method call`, async () => {
        const request = mockPaidCollectRequest({
          publicationId: publication.id,
        });
        const transactionData = mockTransactionData({ request });
        const scenario = setupTestScenario({ publication });
        await scenario.responder.prepare(transactionData);

        await scenario.responder.rollback(transactionData);

        expect(scenario.updatedPublicationFragment).toMatchObject({
          hasCollectedByMe: false,
          hasOptimisticCollectedByMe: false,
          stats: knownInitialPublicationStats,
        });
      });

      it('should revert the changes also if collected via a mirror', async () => {
        const mirror = mockMirrorFragment({
          mirrorOf: publication,
        });
        const request = mockPaidCollectRequest({
          publicationId: mirror.id,
        });
        const transactionData = mockTransactionData({ request });
        const scenario = setupTestScenario({ publication: mirror });
        await scenario.responder.prepare(transactionData);

        await scenario.responder.rollback(transactionData);

        expect(scenario.updatedPublicationFragment).toMatchObject({
          mirrorOf: {
            hasCollectedByMe: false,
            hasOptimisticCollectedByMe: false,
            stats: knownInitialPublicationStats,
          },
        });
      });
    });
  });
});
