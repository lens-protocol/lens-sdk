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
import { ChainType } from '@lens-protocol/shared-kernel';

import { UnsignedLensProtocolCall } from '../../../../wallet/adapters/ConcreteWallet';
import {
  FailedUploadError,
  MetadataUploadAdapter,
  MetadataUploadHandler,
} from '../../MetadataUploadAdapter';
import { mockITransactionFactory } from '../../__helpers__/mocks';
import { ProfileMetadataCallGateway } from '../ProfileMetadataCallGateway';

function setupTestScenario({
  existingProfile,
  uploadHandler,
  otherMockedResponses = [],
}: {
  existingProfile: ProfileFragment;
  uploadHandler: MetadataUploadHandler;
  otherMockedResponses?: MockedResponse<unknown>[];
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

  return new ProfileMetadataCallGateway(
    apolloClient,
    transactionFactory,
    new MetadataUploadAdapter(uploadHandler),
    sources,
  );
}

const existingProfile = mockProfileFragment();
const metadataURI = faker.internet.url();
const successfulUploadHandler = jest.fn().mockResolvedValue(metadataURI);
const failingUploadHandler = jest.fn().mockRejectedValue(new Error('Unknown error'));
const request = mockUpdateProfileDetailsRequest({ profileId: existingProfile.id });

describe(`Given an instance of the ${ProfileMetadataCallGateway.name}`, () => {
  afterEach(() => {
    successfulUploadHandler.mockClear();
    failingUploadHandler.mockClear();
  });

  describe(`when creating an ${UnsignedLensProtocolCall.name}<UpdateProfileDetailsRequest> via the "${ProfileMetadataCallGateway.prototype.createUnsignedProtocolCall.name}" method`, () => {
    it(`should:
        - create a new Profile Metadata updating the profile details
        - upload it via the ${MetadataUploadAdapter.name}
        - create an instance of the ${UnsignedLensProtocolCall.name} w/ the expected typed data`, async () => {
      const createSetProfileMetadataTypedDataMutation =
        mockCreateSetProfileMetadataTypedDataMutation();

      const gateway = setupTestScenario({
        existingProfile,
        uploadHandler: successfulUploadHandler,
        otherMockedResponses: [
          createCreateSetProfileMetadataTypedDataMutationMockedResponse({
            request: {
              profileId: request.profileId,
              metadata: metadataURI,
            },
            data: createSetProfileMetadataTypedDataMutation,
          }),
        ],
      });

      const unsignedCall = await gateway.createUnsignedProtocolCall(request);

      expect(successfulUploadHandler).toHaveBeenCalledWith(
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
      const uploadHandler = jest.fn().mockResolvedValue(metadataURI);
      const nonce = mockNonce();
      const gateway = setupTestScenario({
        existingProfile,
        uploadHandler,
        otherMockedResponses: [
          createCreateSetProfileMetadataTypedDataMutationMockedResponse({
            request: {
              profileId: request.profileId,
              metadata: metadataURI,
            },
            overrideSigNonce: nonce,
          }),
        ],
      });

      const unsignedCall = await gateway.createUnsignedProtocolCall(request, nonce);

      expect(unsignedCall.nonce).toEqual(nonce);
    });

    it(`should throw a ${FailedUploadError.name} if the Profile Metadata upload fails`, async () => {
      const gateway = setupTestScenario({ existingProfile, uploadHandler: failingUploadHandler });

      await expect(() => gateway.createUnsignedProtocolCall(request)).rejects.toThrow(
        FailedUploadError,
      );
    });
  });

  describe(`when creating a ${NativeTransaction.name}<UpdateProfileDetailsRequest> via the "${ProfileMetadataCallGateway.prototype.createDelegatedTransaction.name}" method`, () => {
    it(`should:
          - create a new Profile Metadata updating the profile details
          - upload it via the ${MetadataUploadAdapter.name}
          - create a ${NativeTransaction.name} instance`, async () => {
      const request = mockUpdateProfileDetailsRequest({ profileId: existingProfile.id });

      const gateway = setupTestScenario({
        existingProfile,
        uploadHandler: successfulUploadHandler,
        otherMockedResponses: [
          createCreateSetProfileMetadataViaDispatcherMutationMockedResponse({
            variables: {
              request: {
                profileId: request.profileId,
                metadata: metadataURI,
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
      expect(successfulUploadHandler).toHaveBeenCalledWith(
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

    it(`should throw a ${FailedUploadError.name} if the Profile Metadata upload fails`, async () => {
      const gateway = setupTestScenario({ existingProfile, uploadHandler: failingUploadHandler });

      await expect(() => gateway.createDelegatedTransaction(request)).rejects.toThrow(
        FailedUploadError,
      );
    });
  });
});
