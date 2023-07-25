import { Post, Profile } from '@lens-protocol/api-bindings';
import {
  mockLensApolloClient,
  mockGetProfileResponse,
  mockPostFragment,
  mockProfileFragment,
  mockSources,
  mockGetPublicationResponse,
} from '@lens-protocol/api-bindings/mocks';
import { PublicationId } from '@lens-protocol/domain/entities';
import {
  mockCreatePostRequest,
  mockTransactionData,
  mockTransactionHash,
} from '@lens-protocol/domain/mocks';
import { CreatePostRequest } from '@lens-protocol/domain/use-cases/publications';
import { TransactionData } from '@lens-protocol/domain/use-cases/transactions';

import {
  defaultMediaTransformsConfig,
  mediaTransformConfigToQueryVariables,
} from '../../../../mediaTransforms';
import { ProfileCacheManager } from '../../../infrastructure/ProfileCacheManager';
import { CreatePostResponder, recentPosts } from '../CreatePostResponder';

function setupTestScenario({
  author,
  post = mockPostFragment(),
  transactionData = mockTransactionData(),
}: {
  author: Profile;
  post?: Post;
  transactionData?: TransactionData<CreatePostRequest>;
}) {
  const sources = mockSources();
  const mediaTransforms = defaultMediaTransformsConfig;
  const apolloClient = mockLensApolloClient([
    mockGetProfileResponse({
      profile: author,
      variables: {
        request: {
          profileId: author.id,
        },
        observerId: null,
        sources,
        ...mediaTransformConfigToQueryVariables(mediaTransforms),
      },
    }),
    mockGetPublicationResponse({
      variables: {
        request: transactionData.txHash
          ? {
              txHash: transactionData.txHash,
            }
          : {
              publicationId: transactionData.id as PublicationId,
            },
        observerId: author.id,
        sources,
        ...mediaTransformConfigToQueryVariables(mediaTransforms),
      },
      publication: post,
    }),
  ]);

  const profileCacheManager = new ProfileCacheManager(apolloClient, sources, mediaTransforms);
  return new CreatePostResponder(profileCacheManager, apolloClient, sources, mediaTransforms);
}

describe(`Given an instance of the ${CreatePostResponder.name}`, () => {
  const author = mockProfileFragment();

  afterEach(() => {
    recentPosts([]);
  });

  describe(`when "${CreatePostResponder.prototype.prepare.name}" method is invoked`, () => {
    it(`should optimistically add a PendingPost at the top of the provided recent posts ReactiveVar`, async () => {
      const responder = setupTestScenario({
        author,
      });

      const transactionData = mockTransactionData({
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

    it(`should replace the PendingPost added during the "${CreatePostResponder.prototype.prepare.name}" method call with the actual Post retrieved from the BE`, async () => {
      const transactionData = mockTransactionData({
        txHash: mockTransactionHash(),
        request: mockCreatePostRequest({
          profileId: author.id,
        }),
      });
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

    it('should fallback to retrieve the Post by PublicationId if the txHash is not available', async () => {
      const transactionData = mockTransactionData({
        request: mockCreatePostRequest({
          profileId: author.id,
        }),
      });
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
    const transactionData = mockTransactionData({
      request: mockCreatePostRequest({
        profileId: author.id,
      }),
    });

    it(`should remove the PendingPost added during the "${CreatePostResponder.prototype.prepare.name}" method call`, async () => {
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
