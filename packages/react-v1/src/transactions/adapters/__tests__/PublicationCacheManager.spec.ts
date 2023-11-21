import { AnyPublication, FragmentPublication } from '@lens-protocol/api-bindings';
import {
  mockPostFragment,
  mockCommentFragment,
  mockMirrorFragment,
  mockGetPublicationResponse,
  mockSources,
  mockLensApolloClient,
  simulateAuthenticatedWallet,
} from '@lens-protocol/api-bindings/mocks';
import {
  mockCreatePostRequest,
  mockPublicationId,
  mockTransactionData,
  mockTransactionHash,
} from '@lens-protocol/domain/mocks';

import {
  defaultMediaTransformsConfig,
  mediaTransformConfigToQueryVariables,
} from '../../../mediaTransforms';
import { PublicationCacheManager } from '../PublicationCacheManager';

function setupTestScenario({
  txHash,
  publication,
}: {
  txHash?: string;
  publication: AnyPublication;
}) {
  const sources = mockSources();
  const mediaTransforms = defaultMediaTransformsConfig;
  const client = mockLensApolloClient([
    mockGetPublicationResponse({
      variables: {
        request: txHash
          ? {
              txHash,
            }
          : {
              publicationId: publication.id,
            },
        observerId: null,
        sources,
        ...mediaTransformConfigToQueryVariables(mediaTransforms),
      },
      publication,
    }),
  ]);

  client.cache.writeFragment({
    id: client.cache.identify({
      __typename: publication.__typename,
      id: publication.id,
    }),
    fragment: FragmentPublication,
    fragmentName: 'Publication',
    data: publication,
  });

  return {
    cacheManager: new PublicationCacheManager(client, sources, mediaTransforms),

    get publicationFromCache() {
      return client.cache.readFragment({
        id: client.cache.identify({
          __typename: publication.__typename,
          id: publication.id,
        }),
        fragment: FragmentPublication,
        fragmentName: 'Publication',
      });
    },
  };
}

describe(`Given the ${PublicationCacheManager.name}`, () => {
  beforeAll(() => {
    simulateAuthenticatedWallet();
  });

  describe(`when "${PublicationCacheManager.prototype.fetchNewPost.name}" method is invoked`, () => {
    const post = mockPostFragment();

    it('should fetch new publication by "txHash" if available', async () => {
      const txHash = mockTransactionHash();
      const scenario = setupTestScenario({
        txHash,
        publication: post,
      });

      const transactionData = mockTransactionData({
        txHash,
        request: mockCreatePostRequest(),
      });
      const publication = await scenario.cacheManager.fetchNewPost(transactionData);

      expect(publication).toMatchObject({
        id: post.id,
      });
    });

    it('should fetch new publication by "id" if "txHash" is not available', async () => {
      const request = mockCreatePostRequest();
      const scenario = setupTestScenario({
        publication: post,
      });

      const transactionData = mockTransactionData({ id: post.id, request });
      const publication = await scenario.cacheManager.fetchNewPost(transactionData);

      expect(publication).toMatchObject({
        id: post.id,
      });
    });
  });

  describe(`when "${PublicationCacheManager.prototype.update.name}" method is invoked`, () => {
    it.each([
      mockPostFragment({
        hidden: false,
      }),
      mockCommentFragment({
        hidden: false,
      }),
      mockMirrorFragment({
        hidden: false,
      }),
    ])(`should be able to update $__typename cache fragments`, async (publication) => {
      const scenario = setupTestScenario({ publication });

      scenario.cacheManager.update(publication.id, (data) => ({
        ...data,
        hidden: true,
      }));

      expect(scenario.publicationFromCache).toMatchObject({
        hidden: true,
      });
    });

    it(`should not call the update callback if the cache item is not present`, async () => {
      const scenario = setupTestScenario({
        publication: mockPostFragment(),
      });
      const updateSpy = jest.fn();

      scenario.cacheManager.update(mockPublicationId(), updateSpy);

      expect(updateSpy).not.toHaveBeenCalled();
    });
  });
});
