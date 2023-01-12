import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { faker } from '@faker-js/faker';
import { omitTypename } from '@lens-protocol/api-bindings';
import {
  createCreateSetProfileMetadataTypedDataMutationMockedResponse,
  createCreateSetProfileMetadataViaDispatcherMutationMockedResponse,
  createMockApolloClientWithMultipleResponses,
  mockCreateSetProfileMetadataTypedDataMutation,
  mockGetProfileQueryMockedResponse,
  mockProfileFieldsFragment,
  mockRelayerResultFragment,
} from '@lens-protocol/api-bindings/mocks';
import { NativeTransaction } from '@lens-protocol/domain/entities';
import {
  mockNonce,
  mockUpdateCoverImageRequest,
  mockUpdateProfileDetailsRequest,
} from '@lens-protocol/domain/mocks';
import { ChainType } from '@lens-protocol/shared-kernel';

import { UnsignedLensProtocolCall } from '../../../../wallet/adapters/ConcreteWallet';
import { FailedUploadError, MetadataUploadAdapter } from '../../MetadataUploadAdapter';
import { mockITransactionFactory } from '../../__helpers__/mocks';
import { ProfileMetadataCallGateway } from '../ProfileMetadataCallGateway';

function setupTestScenario({
  apolloClient,
  metadataURI,
}: {
  apolloClient: ApolloClient<NormalizedCacheObject>;
  metadataURI?: string;
}) {
  const uploadHandler = jest.fn();

  if (metadataURI) {
    uploadHandler.mockResolvedValue(metadataURI);
  } else {
    uploadHandler.mockRejectedValue(new Error('Unknown error'));
  }

  const transactionFactory = mockITransactionFactory();
  const gateway = new ProfileMetadataCallGateway(
    apolloClient,
    transactionFactory,
    new MetadataUploadAdapter(uploadHandler),
  );

  return { gateway, uploadHandler };
}

describe(`Given an instance of the ${ProfileMetadataCallGateway.name}`, () => {
  const existingProfile = mockProfileFieldsFragment();
  const getProfilesByIdQueryMockedResponse = mockGetProfileQueryMockedResponse({
    observerId: existingProfile.id,
    profile: existingProfile,
    request: { profileId: existingProfile.id },
  });
  const metadataURI = faker.internet.url();

  describe(`when creating an UpdateProfileDetailsRequest`, () => {
    const request = mockUpdateProfileDetailsRequest({ profileId: existingProfile.id });

    describe(`via the "${ProfileMetadataCallGateway.prototype.createUnsignedProtocolCall.name}" method`, () => {
      it(`should:
          - create a new Profile Metadata updating the profile details
          - upload it via the ${MetadataUploadAdapter.name}
          - create an instance of the ${UnsignedLensProtocolCall.name} w/ the expected typed data`, async () => {
        const createSetProfileMetadataTypedDataMutation =
          mockCreateSetProfileMetadataTypedDataMutation();

        const apolloClient = createMockApolloClientWithMultipleResponses([
          getProfilesByIdQueryMockedResponse,
          createCreateSetProfileMetadataTypedDataMutationMockedResponse({
            request: {
              profileId: request.profileId,
              metadata: metadataURI,
            },
            data: createSetProfileMetadataTypedDataMutation,
          }),
        ]);

        const { gateway, uploadHandler } = setupTestScenario({ apolloClient, metadataURI });
        const unsignedCall = await gateway.createUnsignedProtocolCall(request);

        expect(uploadHandler).toHaveBeenCalledWith(
          expect.objectContaining({
            version: '1.0.0',
            metadata_id: expect.any(String),
            name: request.details.name,
            bio: request.details.bio,
          }),
        );
        expect(unsignedCall).toBeInstanceOf(UnsignedLensProtocolCall);
        expect(unsignedCall.typedData).toEqual(
          omitTypename(createSetProfileMetadataTypedDataMutation.result.typedData),
        );
      });

      it(`should be possible to override the signature nonce`, async () => {
        const nonce = mockNonce();
        const apolloClient = createMockApolloClientWithMultipleResponses([
          getProfilesByIdQueryMockedResponse,
          createCreateSetProfileMetadataTypedDataMutationMockedResponse({
            request: {
              profileId: request.profileId,
              metadata: metadataURI,
            },
            overrideSigNonce: nonce,
          }),
        ]);

        const { gateway } = setupTestScenario({ apolloClient, metadataURI });

        const unsignedCall = await gateway.createUnsignedProtocolCall(request, nonce);

        expect(unsignedCall.nonce).toEqual(nonce);
      });

      it(`should throw a ${FailedUploadError.name} if the Profile Metadata upload fails`, async () => {
        const apolloClient = createMockApolloClientWithMultipleResponses([
          getProfilesByIdQueryMockedResponse,
        ]);
        const { gateway } = setupTestScenario({ apolloClient });

        await expect(() => gateway.createUnsignedProtocolCall(request)).rejects.toThrow(
          FailedUploadError,
        );
      });
    });

    describe(`via the "${ProfileMetadataCallGateway.prototype.createDelegatedTransaction.name}" method`, () => {
      it(`should:
          - create a new Profile Metadata updating the profile details
          - upload it via the ${MetadataUploadAdapter.name}
          - create a ${NativeTransaction.name} instance`, async () => {
        const request = mockUpdateProfileDetailsRequest({ profileId: existingProfile.id });

        const apolloClient = createMockApolloClientWithMultipleResponses([
          getProfilesByIdQueryMockedResponse,
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
        ]);

        const { gateway, uploadHandler } = setupTestScenario({ apolloClient, metadataURI });

        const transaction = await gateway.createDelegatedTransaction(request);

        await transaction.waitNextEvent();

        expect(uploadHandler).toHaveBeenCalledWith(
          expect.objectContaining({
            version: '1.0.0',
            metadata_id: expect.any(String),
            name: request.details.name,
            bio: request.details.bio,
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
        const apolloClient = createMockApolloClientWithMultipleResponses([
          getProfilesByIdQueryMockedResponse,
        ]);
        const { gateway } = setupTestScenario({ apolloClient });

        await expect(() => gateway.createDelegatedTransaction(request)).rejects.toThrow(
          FailedUploadError,
        );
      });
    });
  });

  describe(`when creating an UpdateCoverImageRequest`, () => {
    const request = mockUpdateCoverImageRequest({ profileId: existingProfile.id });

    describe(`via the "${ProfileMetadataCallGateway.prototype.createUnsignedProtocolCall.name}" method`, () => {
      it(`should:
          - create a new Profile Metadata updating the cover picture
          - upload it via the ${MetadataUploadAdapter.name}
          - create an "${UnsignedLensProtocolCall.name}" w/ the expected typed data`, async () => {
        const createSetProfileMetadataTypedDataMutation =
          mockCreateSetProfileMetadataTypedDataMutation();

        const apolloClient = createMockApolloClientWithMultipleResponses([
          getProfilesByIdQueryMockedResponse,
          createCreateSetProfileMetadataTypedDataMutationMockedResponse({
            request: {
              profileId: request.profileId,
              metadata: metadataURI,
            },
            data: createSetProfileMetadataTypedDataMutation,
          }),
        ]);
        const { gateway, uploadHandler } = setupTestScenario({ apolloClient, metadataURI });

        const unsignedCall = await gateway.createUnsignedProtocolCall(request);

        expect(uploadHandler).toHaveBeenCalledWith(
          expect.objectContaining({
            version: '1.0.0',
            metadata_id: expect.any(String),
            cover_picture: request.url,
          }),
        );
        expect(unsignedCall).toBeInstanceOf(UnsignedLensProtocolCall);
        expect(unsignedCall.typedData).toEqual(
          omitTypename(createSetProfileMetadataTypedDataMutation.result.typedData),
        );
      });

      it(`should be possible to override the signature nonce`, async () => {
        const nonce = mockNonce();
        const apolloClient = createMockApolloClientWithMultipleResponses([
          getProfilesByIdQueryMockedResponse,
          createCreateSetProfileMetadataTypedDataMutationMockedResponse({
            request: {
              profileId: request.profileId,
              metadata: metadataURI,
            },
            data: mockCreateSetProfileMetadataTypedDataMutation(),
          }),
          getProfilesByIdQueryMockedResponse,
          createCreateSetProfileMetadataTypedDataMutationMockedResponse({
            request: {
              profileId: request.profileId,
              metadata: metadataURI,
            },
            overrideSigNonce: nonce,

            data: mockCreateSetProfileMetadataTypedDataMutation({ nonce }),
          }),
        ]);
        const { gateway } = setupTestScenario({ apolloClient, metadataURI });

        const unsignedCall = await gateway.createUnsignedProtocolCall(request, nonce);

        expect(unsignedCall.nonce).toEqual(nonce);
      });

      it(`should throw a ${FailedUploadError.name} if the Profile Metadata upload fails`, async () => {
        const apolloClient = createMockApolloClientWithMultipleResponses([
          getProfilesByIdQueryMockedResponse,
        ]);
        const { gateway } = setupTestScenario({ apolloClient });

        await expect(() => gateway.createUnsignedProtocolCall(request)).rejects.toThrow(
          FailedUploadError,
        );
      });
    });

    describe(`via the "${ProfileMetadataCallGateway.prototype.createDelegatedTransaction.name}" method`, () => {
      it(`should:
          - create a new Profile Metadata updating the profile details
          - upload it via the ${MetadataUploadAdapter.name}
          - create a ${NativeTransaction.name} instance`, async () => {
        const apolloClient = createMockApolloClientWithMultipleResponses([
          getProfilesByIdQueryMockedResponse,
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
        ]);
        const { gateway, uploadHandler } = setupTestScenario({ apolloClient, metadataURI });

        const transaction = await gateway.createDelegatedTransaction(request);

        await transaction.waitNextEvent();
        expect(uploadHandler).toHaveBeenCalledWith(
          expect.objectContaining({
            version: '1.0.0',
            metadata_id: expect.any(String),
            cover_picture: request.url,
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
        const apolloClient = createMockApolloClientWithMultipleResponses([
          getProfilesByIdQueryMockedResponse,
        ]);
        const { gateway } = setupTestScenario({ apolloClient });

        await expect(() => gateway.createDelegatedTransaction(request)).rejects.toThrow(
          FailedUploadError,
        );
      });
    });
  });
});
