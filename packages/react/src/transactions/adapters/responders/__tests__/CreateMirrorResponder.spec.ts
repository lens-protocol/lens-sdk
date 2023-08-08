import { Post, FragmentPost } from '@lens-protocol/api-bindings';
import {
  mockLensApolloClient,
  mockPostFragment,
  mockProfileFragment,
  mockSources,
  mockGetPublicationResponse,
  simulateAuthenticatedProfile,
} from '@lens-protocol/api-bindings/mocks';
import {
  mockTransactionData,
  mockCreateMirrorRequest,
  mockPublicationId,
} from '@lens-protocol/domain/mocks';
import { CreateMirrorRequest } from '@lens-protocol/domain/use-cases/publications';
import { TransactionData } from '@lens-protocol/domain/use-cases/transactions';
import { nonNullable } from '@lens-protocol/shared-kernel';

import {
  defaultMediaTransformsConfig,
  mediaTransformConfigToQueryVariables,
} from '../../../../mediaTransforms';
import { CreateMirrorResponder } from '../CreateMirrorResponder';

function setupTestScenario({
  post,
  expected,
  transactionData,
}: {
  post: Post;
  expected: Post | null;
  transactionData: TransactionData<CreateMirrorRequest>;
}) {
  const activeProfile = mockProfileFragment();
  simulateAuthenticatedProfile(activeProfile);

  const sources = mockSources();
  const mediaTransforms = defaultMediaTransformsConfig;
  const apolloClient = mockLensApolloClient(
    expected
      ? [
          mockGetPublicationResponse({
            variables: {
              request: {
                publicationId: transactionData.request.publicationId,
              },
              observerId: activeProfile.id,
              sources,
              ...mediaTransformConfigToQueryVariables(mediaTransforms),
            },
            publication: expected,
          }),
        ]
      : [],
  );

  apolloClient.cache.writeFragment({
    id: apolloClient.cache.identify({
      __typename: 'Post',
      id: post.id,
    }),
    fragment: FragmentPost,
    fragmentName: 'Post',
    data: post,
  });

  const responder = new CreateMirrorResponder(apolloClient, sources, mediaTransforms);

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
    it(`should optimistically update the total amount of mirrors in publication stats`, async () => {
      const post = mockPostFragment({
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
        expected: null,
      });

      await scenario.responder.prepare(transactionData);

      expect(scenario.updatedPost.stats.totalAmountOfMirrors).toBe(
        post.stats.totalAmountOfMirrors + 1,
      );
    });
  });

  describe(`when "${CreateMirrorResponder.prototype.commit.name}" method is invoked`, () => {
    it(`should update the original publication 'mirrors' list`, async () => {
      const post = mockPostFragment({
        profile: author,
      });

      const transactionData = mockTransactionData({
        request: mockCreateMirrorRequest({
          profileId: author.id,
          publicationId: post.id,
        }),
      });

      const scenario = setupTestScenario({
        post: {
          ...post,
          mirrors: post.mirrors.concat(mockPublicationId()),
        },
        expected: {
          ...post,
          mirrors: post.mirrors.concat(mockPublicationId()),
        },
        transactionData,
      });

      await scenario.responder.commit(transactionData);

      expect(scenario.updatedPost.mirrors).toHaveLength(post.mirrors.length + 1);
    });
  });

  describe(`when "${CreateMirrorResponder.prototype.rollback.name}" method is invoked`, () => {
    it(`should update the original publication back inline with the network response`, async () => {
      const post = mockPostFragment({
        profile: author,
      });

      const transactionData = mockTransactionData({
        request: mockCreateMirrorRequest({
          profileId: author.id,
          publicationId: post.id,
        }),
      });

      const revertedTotalAmountOfMirrorsValue = post.stats.totalAmountOfMirrors - 1;
      const revertedMirrorsValue = post.mirrors.slice(0, -1);
      const scenario = setupTestScenario({
        post,
        expected: {
          ...post,
          mirrors: revertedMirrorsValue,
          stats: {
            ...post.stats,
            totalAmountOfMirrors: revertedTotalAmountOfMirrorsValue,
          },
        },
        transactionData,
      });

      await scenario.responder.rollback(transactionData);

      expect(scenario.updatedPost.mirrors).toEqual(revertedMirrorsValue);
      expect(scenario.updatedPost.stats.totalAmountOfMirrors).toEqual(
        revertedTotalAmountOfMirrorsValue,
      );
    });
  });
});
