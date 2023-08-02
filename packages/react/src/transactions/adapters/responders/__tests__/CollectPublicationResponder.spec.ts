import { DocumentNode } from '@apollo/client';
import {
  FragmentComment,
  FragmentMirror,
  FragmentPost,
  AnyPublication,
  ContentPublication,
} from '@lens-protocol/api-bindings';
import {
  mockGetPublicationResponse,
  mockLensApolloClient,
  mockCommentFragment,
  mockMirrorFragment,
  mockPostFragment,
  mockProfileFragment,
  mockPublicationStatsFragment,
  mockSources,
  simulateAuthenticatedProfile,
} from '@lens-protocol/api-bindings/mocks';
import { mockTransactionData, mockPaidCollectRequest } from '@lens-protocol/domain/mocks';
import { nonNullable } from '@lens-protocol/shared-kernel';

import {
  defaultMediaTransformsConfig,
  mediaTransformConfigToQueryVariables,
} from '../../../../mediaTransforms';
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
  publication: AnyPublication;
  expected: AnyPublication;
}) {
  const activeProfile = mockProfileFragment();
  simulateAuthenticatedProfile(activeProfile);

  const sources = mockSources();
  const mediaTransforms = defaultMediaTransformsConfig;
  const apolloClient = mockLensApolloClient([
    mockGetPublicationResponse({
      variables: {
        request: { publicationId: publication.id },
        observerId: activeProfile.id,
        sources,
        ...mediaTransformConfigToQueryVariables(mediaTransforms),
      },
      publication: expected,
    }),
  ]);

  apolloClient.cache.writeFragment({
    id: apolloClient.cache.identify(publication),
    fragment: typeToFragmentMap[publication.__typename],
    fragmentName: publication.__typename,
    data: publication,
  });

  const responder = new CollectPublicationResponder(apolloClient, sources, mediaTransforms);

  return {
    responder,

    get updatedPublicationFragment() {
      return nonNullable(
        apolloClient.cache.readFragment({
          id: apolloClient.cache.identify(publication),
          fragment: typeToFragmentMap[publication.__typename],
          fragmentName: publication.__typename,
        }),
        "Can't find post in cache",
      );
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
        const transactionData = mockTransactionData({ request });
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
        const transactionData = mockTransactionData({ request });
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
