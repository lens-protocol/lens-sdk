import { MockedResponse } from '@apollo/client/testing';
import { faker } from '@faker-js/faker';
import { omitTypename, Profile } from '@lens-protocol/api-bindings';
import {
  createCreateSetProfileMetadataTypedDataMockedResponse,
  createCreateSetProfileMetadataViaDispatcherMockedResponse,
  createMockApolloClientWithMultipleResponses,
  mockCreateSetProfileMetadataTypedDataData,
  createGetProfileMockedResponse,
  mockProfileFragment,
  mockRelayerResultFragment,
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
  existingProfile: Profile;
  otherMockedResponses?: MockedResponse<unknown>[];
  uploadUrl: Url;
}) {
  const getProfilesByIdQueryMockedResponse = createGetProfileMockedResponse({
    variables: {
      request: { profileId: existingProfile.id },
      sources: [],
    },
    profile: existingProfile,
  });

  const apolloClient = createMockApolloClientWithMultipleResponses([
    getProfilesByIdQueryMockedResponse,
    ...otherMockedResponses,
  ]);

  const transactionFactory = mockITransactionFactory();
  const uploader = mockIMetadataUploader(uploadUrl);

  const gateway = new ProfileMetadataCallGateway(apolloClient, transactionFactory, uploader);

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
      const data = mockCreateSetProfileMetadataTypedDataData();

      const { gateway, uploader } = setupTestScenario({
        existingProfile,
        uploadUrl,
        otherMockedResponses: [
          createCreateSetProfileMetadataTypedDataMockedResponse({
            request: {
              profileId: request.profileId,
              metadata: uploadUrl,
            },
            data,
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
      expect(unsignedCall.typedData).toEqual(omitTypename(data.result.typedData));
    });

    it(`should be possible to override the signature nonce`, async () => {
      const nonce = mockNonce();
      const { gateway } = setupTestScenario({
        existingProfile,
        uploadUrl,
        otherMockedResponses: [
          createCreateSetProfileMetadataTypedDataMockedResponse({
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
          createCreateSetProfileMetadataViaDispatcherMockedResponse({
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
