import { AnyPublication } from '@lens-protocol/api-bindings';
import {
  mockLensApolloClient,
  mockGetPublicationsResponse,
  mockPostFragment,
} from '@lens-protocol/api-bindings/mocks';
import { ProfileId } from '@lens-protocol/domain/entities';
import {
  mockCreateCommentRequest,
  mockCreateMirrorRequest,
  mockCreatePostRequest,
  mockPaidFollowRequest,
  mockProfileId,
} from '@lens-protocol/domain/mocks';
import { ProtocolTransactionRequest } from '@lens-protocol/domain/use-cases/transactions';
import { never } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';

import {
  defaultMediaTransformsConfig,
  mediaTransformConfigToQueryVariables,
} from '../../../mediaTransforms';
import { PendingTransactionGateway } from '../../adapters/PendingTransactionGateway';
import { mockITransactionFactory, mockMetaTransactionData } from '../../adapters/__helpers__/mocks';
import { PublicationIdPredictor } from '../PublicationIdPredictor';

function setupTestScenario({
  profileId,
  publications,
  pendingTransactionsFor = [],
}: {
  profileId: ProfileId;
  publications: AnyPublication[];
  pendingTransactionsFor?: ProtocolTransactionRequest[];
}) {
  const apolloClient = mockLensApolloClient([
    mockGetPublicationsResponse({
      variables: {
        profileId,
        limit: 1,
        sources: [],
        ...mediaTransformConfigToQueryVariables(defaultMediaTransformsConfig),
      },
      publications,
    }),
  ]);

  const transactionGateway = mock<PendingTransactionGateway>();

  const factory = mockITransactionFactory();
  const transactions = pendingTransactionsFor.map((request) => {
    const init = mockMetaTransactionData({ request });
    return factory.createMetaTransaction(init);
  });

  transactionGateway.getAll.mockResolvedValue(transactions);

  const publicationIdPredictor = new PublicationIdPredictor(apolloClient, transactionGateway);

  return { publicationIdPredictor };
}

describe(`Given an instance of the ${PublicationIdPredictor.name}`, () => {
  describe('when predicting the first publication id', () => {
    it('should return the very first publication id for the given profile', async () => {
      const profileId = mockProfileId();
      const { publicationIdPredictor } = setupTestScenario({
        profileId,
        publications: [],
      });

      const actual = await publicationIdPredictor.predictNextPublicationIdFor(profileId);

      const expected = `${profileId}-0x1`;
      expect(actual).toEqual(expected);
    });
  });

  describe('when predicting the next publication id', () => {
    it(`should retrieve the last finalized publication id`, async () => {
      const post = mockPostFragment();
      const { publicationIdPredictor } = setupTestScenario({
        profileId: post.profile.id,
        publications: [post],
      });

      const actual = await publicationIdPredictor.predictNextPublicationIdFor(post.profile.id);

      const onchainId = post.id.split('-').pop() ?? never();
      const newSequentialId = parseInt(onchainId, 16) + 1;
      const expected = `${post.profile.id}-0x${newSequentialId.toString(16)}`;
      expect(actual).toEqual(expected);
    });

    it('should account for pending transactions involving publications (comment, post, mirror)', async () => {
      const post = mockPostFragment();
      const { publicationIdPredictor } = setupTestScenario({
        profileId: post.profile.id,
        publications: [post],
        pendingTransactionsFor: [
          mockPaidFollowRequest(),
          mockCreateCommentRequest({ profileId: post.profile.id }), // only these should count
          mockCreateCommentRequest(),
          mockCreatePostRequest({ profileId: post.profile.id }), // only these should count
          mockCreatePostRequest(),
          mockCreateMirrorRequest({ profileId: post.profile.id }), // only these should count
          mockCreateMirrorRequest(),
        ],
      });

      const actual = await publicationIdPredictor.predictNextPublicationIdFor(post.profile.id);

      const onchainId = post.id.split('-').pop() ?? never();
      const newSequentialId = parseInt(onchainId, 16) + 1 + 3; // 3 pending transactions
      const expected = `${post.profile.id}-0x${newSequentialId.toString(16)}`;
      expect(actual).toEqual(expected);
    });
  });
});
