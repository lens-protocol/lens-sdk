import { MockedResponse } from '@apollo/client/testing';
import { faker } from '@faker-js/faker';
import { omitTypename, ProfileFragment } from '@lens-protocol/api-bindings';
import {
  createCreateSetProfileMetadataTypedDataMutationMockedResponse,
  createCreateSetProfileMetadataViaDispatcherMutationMockedResponse,
  createMockApolloClientWithMultipleResponses,
  mockCreateSetProfileMetadataTypedDataMutation,
  mockGetProfileQueryMockedResponse,
  mockProfileFragment,
  mockRelayerResultFragment,
  mockSources,
} from '@lens-protocol/api-bindings/mocks';
import { NativeTransaction } from '@lens-protocol/domain/entities';
import { mockNonce, mockUpdateProfileDetailsRequest } from '@lens-protocol/domain/mocks';
import { ChainType, Url } from '@lens-protocol/shared-kernel';

import { UnsignedLensProtocolCall } from '../../../../wallet/adapters/ConcreteWallet';
import { mockIMetadataUploader, mockITransactionFactory } from '../../__helpers__/mocks';
import { ProfileMetadataCallGateway } from '../ProfileMetadataCallGateway';

function setupTestScenario({
  existingProfile,
  otherMockedResponses = [],
  uploadUrl,
}: {
  existingProfile: ProfileFragment;
  otherMockedResponses?: MockedResponse<unknown>[];
  uploadUrl: Url;
}) {
  const sources = mockSources();
  const getProfilesByIdQueryMockedResponse = mockGetProfileQueryMockedResponse({
    variables: {
      request: { profileId: existingProfile.id },
      observerId: existingProfile.id,
      sources,
    },
    profile: existingProfile,
  });

  const apolloClient = createMockApolloClientWithMultipleResponses([
    getProfilesByIdQueryMockedResponse,
    ...otherMockedResponses,
  ]);

  const transactionFactory = mockITransactionFactory();
  const uploader = mockIMetadataUploader(uploadUrl);

  const gateway = new ProfileMetadataCallGateway(
    apolloClient,
    transactionFactory,
    uploader,
    sources,
  );

  return { gateway, uploader };
}

const existingProfile = mockProfileFragment();
const uploadUrl = faker.internet.url();
const request = mockUpdateProfileDetailsRequest({ profileId: existingProfile.id });

describe(`Given an instance of the ${ProfileMetadataCallGateway.name}`, () => {
  describe(`when creating an ${UnsignedLensProtocolCall.name}<UpdateProfileDetailsRequest> via the "${ProfileMetadataCallGateway.prototype.createUnsignedProtocolCall.name}" method`, () => {
    it(`should:
        - create a new Profile Metadata updating the profile details
        - upload it via the IMetadataUploader<ProfileMetadata>
        - create an instance of the ${UnsignedLensProtocolCall.name} w/ the expected typed data`, async () => {
      const createSetProfileMetadataTypedDataMutation =
        mockCreateSetProfileMetadataTypedDataMutation();

      const { gateway, uploader } = setupTestScenario({
        existingProfile,
        uploadUrl,
        otherMockedResponses: [
          createCreateSetProfileMetadataTypedDataMutationMockedResponse({
            request: {
              profileId: request.profileId,
              metadata: uploadUrl,
            },
            data: createSetProfileMetadataTypedDataMutation,
          }),
        ],
      });

      const unsignedCall = await gateway.createUnsignedProtocolCall(request);

      expect(uploader.upload).toHaveBeenCalledWith(
        expect.objectContaining({
          version: '1.0.0',
          metadata_id: expect.any(String),
          name: request.name,
          bio: request.bio,
        }),
      );
      expect(unsignedCall).toBeInstanceOf(UnsignedLensProtocolCall);
      expect(unsignedCall.typedData).toEqual(
        omitTypename(createSetProfileMetadataTypedDataMutation.result.typedData),
      );
    });

    it(`should be possible to override the signature nonce`, async () => {
      const nonce = mockNonce();
      const { gateway } = setupTestScenario({
        existingProfile,
        uploadUrl,
        otherMockedResponses: [
          createCreateSetProfileMetadataTypedDataMutationMockedResponse({
            request: {
              profileId: request.profileId,
              metadata: uploadUrl,
            },
            overrideSigNonce: nonce,
          }),
        ],
      });

      const unsignedCall = await gateway.createUnsignedProtocolCall(request, nonce);

      expect(unsignedCall.nonce).toEqual(nonce);
    });
  });

  describe(`when creating a ${NativeTransaction.name}<UpdateProfileDetailsRequest> via the "${ProfileMetadataCallGateway.prototype.createDelegatedTransaction.name}" method`, () => {
    it(`should:
        - create a new Profile Metadata updating the profile details
        - upload it via the IMetadataUploader<ProfileMetadata>
        - create a ${NativeTransaction.name} instance`, async () => {
      const request = mockUpdateProfileDetailsRequest({ profileId: existingProfile.id });

      const { gateway, uploader } = setupTestScenario({
        existingProfile,
        uploadUrl,
        otherMockedResponses: [
          createCreateSetProfileMetadataViaDispatcherMutationMockedResponse({
            variables: {
              request: {
                profileId: request.profileId,
                metadata: uploadUrl,
              },
            },
            data: {
              result: mockRelayerResultFragment(),
            },
          }),
        ],
      });

      const transaction = await gateway.createDelegatedTransaction(request);

      await transaction.waitNextEvent();
      expect(uploader.upload).toHaveBeenCalledWith(
        expect.objectContaining({
          version: '1.0.0',
          metadata_id: expect.any(String),
          name: request.name,
          bio: request.bio,
        }),
      );
      expect(transaction).toBeInstanceOf(NativeTransaction);
      expect(transaction).toMatchObject({
        id: expect.any(String),
        chainType: ChainType.POLYGON,
        request,
      });
    });
  });
});
