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
  createMockApolloClientWithMultipleResponses,
  createPublicationMockedResponse,
  mockCommentFragment,
  mockMirrorFragment,
  mockPostFragment,
  mockPublicationStatsFragment,
  mockSources,
} from '@lens-protocol/api-bindings/mocks';
import {
  mockBroadcastedTransactionData,
  mockPaidCollectRequest,
} from '@lens-protocol/domain/mocks';

import { CollectPublicationResponder } from '../CollectPublicationResponder';

type AnyPublicationTypename = AnyPublication['__typename'];

const typeToFragmentMap: Record<AnyPublicationTypename, DocumentNode> = {
  Post: FragmentPost,
  Comment: FragmentComment,
  Mirror: FragmentMirror,
};

function setupTestScenario({
  publication,
  expected,
}: {
  publication: Post | Comment | Mirror;
  expected: Post | Comment | Mirror;
}) {
  const sources = mockSources();
  const apolloClient = createMockApolloClientWithMultipleResponses([
    createPublicationMockedResponse({
      variables: {
        publicationId: publication.id,
        sources,
      },
      result: expected,
    }),
  ]);

  const responder = new CollectPublicationResponder(apolloClient, sources);

  return {
    responder,

    get updatedPublicationFragment() {
      return apolloClient.cache.readFragment({
        id: apolloClient.cache.identify(publication),
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
      stats: knownInitialPublicationStats,
    }),

    mockCommentFragment({
      hasCollectedByMe: false,
      stats: knownInitialPublicationStats,
    }),
  ])('and a $__typename', (publication) => {
    describe(`when "${CollectPublicationResponder.prototype.commit.name}" method is invoked`, () => {
      it(`should update the publication from API`, async () => {
        const request = mockPaidCollectRequest({
          publicationId: publication.id,
        });
        const transactionData = mockBroadcastedTransactionData({ request });
        const scenario = setupTestScenario({
          publication,
          expected: {
            ...publication,
            hasCollectedByMe: true,
            stats: {
              ...publication.stats,
              totalAmountOfCollects: 2,
            },
          },
        });

        await scenario.responder.commit(transactionData);

        expect(scenario.updatedPublicationFragment).toMatchObject({
          hasCollectedByMe: true,
          stats: {
            totalAmountOfCollects: 2,
          },
        });
      });

      it('should update the publication from API if collected via a mirror', async () => {
        const mirror = mockMirrorFragment({
          mirrorOf: publication,
        });
        const request = mockPaidCollectRequest({
          publicationId: mirror.id,
        });
        const transactionData = mockBroadcastedTransactionData({ request });
        const scenario = setupTestScenario({
          publication: mirror,
          expected: {
            ...mirror,
            mirrorOf: {
              ...publication,
              hasCollectedByMe: true,
              stats: {
                ...publication.stats,
                totalAmountOfCollects: 2,
              },
            },
          },
        });

        await scenario.responder.commit(transactionData);

        expect(scenario.updatedPublicationFragment).toMatchObject({
          mirrorOf: {
            hasCollectedByMe: true,
            stats: {
              totalAmountOfCollects: 2,
            },
          },
        });
      });
    });
  });
});
