import { faker } from '@faker-js/faker';
import { SafeApolloClient, RelayErrorReasons } from '@lens-protocol/api-bindings';
import {
  mockLensApolloClient,
  mockRelayerResultFragment,
  mockCreateCommentTypedDataData,
  mockCreateCommentTypedDataResponse,
  mockCreateCommentViaDispatcherResponse,
  mockRelayErrorFragment,
} from '@lens-protocol/api-bindings/mocks';
import { NativeTransaction } from '@lens-protocol/domain/entities';
import { mockNonce, mockCreateCommentRequest } from '@lens-protocol/domain/mocks';
import {
  CollectPolicyType,
  ReferencePolicyType,
} from '@lens-protocol/domain/use-cases/publications';
import { BroadcastingError } from '@lens-protocol/domain/use-cases/transactions';
import { ChainType, Url } from '@lens-protocol/shared-kernel';

import { UnsignedProtocolCall } from '../../../../wallet/adapters/ConcreteWallet';
import {
  assertBroadcastingErrorResultWithRequestFallback,
  assertUnsignedProtocolCallCorrectness,
  mockIMetadataUploader,
  mockITransactionFactory,
} from '../../__helpers__/mocks';
import { CreateOnChainCommentGateway } from '../CreateOnChainCommentGateway';

function setupTestScenario({
  apolloClient,
  uploadUrl,
}: {
  apolloClient: SafeApolloClient;
  uploadUrl: Url;
}) {
  const transactionFactory = mockITransactionFactory();
  const uploader = mockIMetadataUploader(uploadUrl);

  const gateway = new CreateOnChainCommentGateway(apolloClient, transactionFactory, uploader);

  return { gateway, uploader };
}

describe(`Given an instance of ${CreateOnChainCommentGateway.name}`, () => {
  const request = mockCreateCommentRequest({
    collect: {
      type: CollectPolicyType.NO_COLLECT,
    },
    reference: {
      type: ReferencePolicyType.ANYONE,
    },
  });
  const expectedMutationRequestDetails = {
    collectModule: {
      revertCollectModule: true,
    },
  };
  const uploadUrl = faker.internet.url();
  const data = mockCreateCommentTypedDataData();

  describe(`when creating an IUnsignedProtocolCall<CreateCommentRequest>`, () => {
    it(`should:
          - use the IMetadataUploader<CreateCommentRequest> to upload the publication metadata
          - create an instance of the ${UnsignedProtocolCall.name} with the expected typed data`, async () => {
      const apolloClient = mockLensApolloClient([
        mockCreateCommentTypedDataResponse({
          variables: {
            request: {
              contentURI: uploadUrl,
              profileId: request.profileId,
              publicationId: request.publicationId,
              ...expectedMutationRequestDetails,
            },
          },
          data,
        }),
      ]);
      const { gateway, uploader } = setupTestScenario({ apolloClient, uploadUrl });

      const unsignedCall = await gateway.createUnsignedProtocolCall(request);

      expect(uploader.upload).toHaveBeenCalledWith(request);
      assertUnsignedProtocolCallCorrectness(unsignedCall, data.result);
    });

    it(`should be possible to override the signature nonce`, async () => {
      const nonce = mockNonce();
      const apolloClient = mockLensApolloClient([
        mockCreateCommentTypedDataResponse({
          variables: {
            request: {
              contentURI: uploadUrl,
              profileId: request.profileId,
              publicationId: request.publicationId,
              ...expectedMutationRequestDetails,
            },
            options: {
              overrideSigNonce: nonce,
            },
          },
          data: mockCreateCommentTypedDataData({ nonce }),
        }),
      ]);
      const { gateway } = setupTestScenario({ apolloClient, uploadUrl });

      const unsignedCall = await gateway.createUnsignedProtocolCall(request, nonce);

      expect(unsignedCall.nonce).toEqual(nonce);
    });
  });

  describe(`when creating a ${NativeTransaction.name}<CreateCommentRequest>}"`, () => {
    it(`should:
          - use the IMetadataUploader<CreateCommentRequest> to upload the publication metadata
          - create an instance of the ${NativeTransaction.name}`, async () => {
      const apolloClient = mockLensApolloClient([
        mockCreateCommentViaDispatcherResponse({
          variables: {
            request: {
              contentURI: uploadUrl,
              profileId: request.profileId,
              publicationId: request.publicationId,

              ...expectedMutationRequestDetails,
            },
          },
          data: {
            result: mockRelayerResultFragment(),
          },
        }),
      ]);

      const { gateway, uploader } = setupTestScenario({ apolloClient, uploadUrl });

      const result = await gateway.createDelegatedTransaction(request);

      expect(uploader.upload).toHaveBeenCalledWith(request);
      expect(result.unwrap()).toBeInstanceOf(NativeTransaction);
      expect(result.unwrap()).toEqual(
        expect.objectContaining({
          chainType: ChainType.POLYGON,
          id: expect.any(String),
          request,
        }),
      );
    });

    it.each([
      mockRelayErrorFragment(RelayErrorReasons.Rejected),
      mockRelayErrorFragment(RelayErrorReasons.NotAllowed),
    ])(
      `should fail w/ a ${BroadcastingError.name} in case of RelayError response with "$reason" reason`,
      async (relayError) => {
        const apolloClient = mockLensApolloClient([
          mockCreateCommentViaDispatcherResponse({
            variables: {
              request: {
                contentURI: uploadUrl,
                profileId: request.profileId,
                publicationId: request.publicationId,

                ...expectedMutationRequestDetails,
              },
            },
            data: {
              result: relayError,
            },
          }),
          mockCreateCommentTypedDataResponse({
            variables: {
              request: {
                contentURI: uploadUrl,
                profileId: request.profileId,
                publicationId: request.publicationId,
                ...expectedMutationRequestDetails,
              },
            },
            data,
          }),
        ]);

        const { gateway } = setupTestScenario({ apolloClient, uploadUrl });

        const result = await gateway.createDelegatedTransaction(request);

        assertBroadcastingErrorResultWithRequestFallback(result, data.result.typedData);
      },
    );
  });
});
