import {
  ProfileAttributeReader,
  ProfileFieldsFragment,
  ProfileFieldsFragmentDoc,
} from '@lens-protocol/api-bindings';
import {
  createMockApolloClientWithMultipleResponses,
  mockGetProfileQueryMockedResponse,
  mockProfileFieldsFragment,
} from '@lens-protocol/api-bindings/mocks';
import {
  mockUpdateCoverImageRequest,
  mockUpdateProfileDetailsRequest,
  mockBroadcastedTransactionData,
  mockPendingTransactionData,
  mockProfileDetails,
} from '@lens-protocol/domain/mocks';
import {
  UpdateCoverImageRequest,
  UpdateProfileDetailsRequest,
} from '@lens-protocol/domain/use-cases/profile';
import { TransactionData } from '@lens-protocol/domain/use-cases/transactions';

import { UpdateProfileMetadataResponder } from '../UpdateProfileMetadataResponder';

function setupUpdateProfileMetadataResponder({
  transactionData,
  existingProfile,
  updatedProfile = mockProfileFieldsFragment(),
}: {
  transactionData: TransactionData<UpdateProfileDetailsRequest | UpdateCoverImageRequest>;
  existingProfile: ProfileFieldsFragment | null;
  updatedProfile?: ProfileFieldsFragment;
}) {
  const apolloClient = createMockApolloClientWithMultipleResponses([
    mockGetProfileQueryMockedResponse({
      profile: updatedProfile,
      request: { profileId: updatedProfile.id },
      observerId: updatedProfile.id,
    }),
  ]);

  const profileIdentifier = apolloClient.cache.identify({
    __typename: 'Profile',
    id: transactionData.request.profileId,
  });

  apolloClient.cache.writeFragment({
    id: profileIdentifier,
    fragment: ProfileFieldsFragmentDoc,
    fragmentName: 'ProfileFields',
    data: existingProfile,
  });

  const responder = new UpdateProfileMetadataResponder(apolloClient);

  return {
    responder,

    get profileFromCache() {
      return apolloClient.cache.readFragment({
        id: profileIdentifier,
        fragmentName: 'ProfileFields',
        fragment: ProfileFieldsFragmentDoc,
      });
    },
  };
}

const updateProfileDetailsRequest = mockUpdateProfileDetailsRequest({
  details: mockProfileDetails({
    attributes: {
      foo: 42,
    },
  }),
});
const updateCoverImageRequest = mockUpdateCoverImageRequest();

describe(`Given the ${UpdateProfileMetadataResponder.name}`, () => {
  describe.each([
    {
      requestName: 'UpdateProfileDetailsRequest',
      request: updateProfileDetailsRequest,
      expectedPrepareUpdate: {
        name: updateProfileDetailsRequest.details.name,
        bio: updateProfileDetailsRequest.details.bio,
        attributes: {
          foo: expect.any(ProfileAttributeReader),
        },
      },
    },
    {
      requestName: 'UpdateCoverImageRequest',
      request: updateCoverImageRequest,
      expectedPrepareUpdate: {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        coverPicture: expect.objectContaining({
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          original: expect.objectContaining({
            url: updateCoverImageRequest.url,
          }),
        }),
      },
    },
  ])('and a $requestName', ({ expectedPrepareUpdate, requestName, request }) => {
    const pendingTransactionData = mockPendingTransactionData({ request });

    describe(`when "${UpdateProfileMetadataResponder.prototype.prepare.name}" method is invoked with PendingTransactionData<${requestName}>`, () => {
      it(`should update the correct Profile in the Apollo Cache`, async () => {
        const existingProfile = mockProfileFieldsFragment({ id: request.profileId });
        const scenario = setupUpdateProfileMetadataResponder({
          existingProfile,
          transactionData: pendingTransactionData,
        });

        await scenario.responder.prepare(pendingTransactionData);

        expect(scenario.profileFromCache).toEqual(expect.objectContaining(expectedPrepareUpdate));
      });

      it('should act robustly in case of empty cache entry', async () => {
        const existingProfile = null;
        const scenario = setupUpdateProfileMetadataResponder({
          existingProfile,
          transactionData: pendingTransactionData,
        });

        await scenario.responder.prepare(pendingTransactionData);

        expect(scenario.profileFromCache).toEqual({});
      });
    });

    describe(`when "${UpdateProfileMetadataResponder.prototype.rollback.name}" method is invoked with TransactionData<${requestName}>`, () => {
      it(`should revert the previous changes to the correct Profile in the Apollo Cache`, async () => {
        const existingProfile = mockProfileFieldsFragment({ id: request.profileId });
        const scenario = setupUpdateProfileMetadataResponder({
          existingProfile,
          transactionData: pendingTransactionData,
        });
        await scenario.responder.prepare(pendingTransactionData);

        await scenario.responder.rollback(pendingTransactionData);

        expect(scenario.profileFromCache).toEqual(existingProfile);
      });

      it('should act robustly in case of empty cache entry', async () => {
        const existingProfile = null;
        const scenario = setupUpdateProfileMetadataResponder({
          existingProfile,
          transactionData: pendingTransactionData,
        });
        await scenario.responder.prepare(pendingTransactionData);

        await scenario.responder.rollback(pendingTransactionData);

        expect(scenario.profileFromCache).toEqual({});
      });
    });

    describe(`when "${UpdateProfileMetadataResponder.prototype.commit.name}" method is invoked with BroadcastedTransactionData<${requestName}>`, () => {
      const transactionData = mockBroadcastedTransactionData({ request });

      it(`should confirm the cache changes on the correct Profile with fresh data from the server`, async () => {
        const existingProfile = mockProfileFieldsFragment({ id: request.profileId });
        const updatedProfile = mockProfileFieldsFragment({ id: request.profileId });
        const scenario = setupUpdateProfileMetadataResponder({
          existingProfile,
          transactionData,
          updatedProfile,
        });
        await scenario.responder.prepare(transactionData);

        await scenario.responder.commit(transactionData);

        expect(scenario.profileFromCache).toEqual(updatedProfile);
      });

      it('should clear any previous profile snapshot for the given request', async () => {
        const existingProfile = mockProfileFieldsFragment({ id: request.profileId });
        const updatedProfile = mockProfileFieldsFragment({ id: request.profileId });
        const scenario = setupUpdateProfileMetadataResponder({
          existingProfile,
          transactionData,
          updatedProfile,
        });

        await scenario.responder.prepare(transactionData);
        await scenario.responder.commit(transactionData);
        // although it's not a real use case to call "rollback" after "commit", to prove
        // the responder is clearing its internal state correctly, we test it here.
        await scenario.responder.rollback(transactionData);

        expect(scenario.profileFromCache).toEqual(updatedProfile);
      });
    });
  });
});
