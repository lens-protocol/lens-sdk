import { faker } from '@faker-js/faker';
import { LensApolloClient, RelayErrorReasons } from '@lens-protocol/api-bindings';
import {
  createMockApolloClientWithMultipleResponses,
  mockCreatePostTypedDataData,
  mockRelayerResultFragment,
  createCreatePostTypedDataMockedResponse,
  createCreatePostViaDispatcherMockedResponse,
  mockRelayErrorFragment,
} from '@lens-protocol/api-bindings/mocks';
import { NativeTransaction } from '@lens-protocol/domain/entities';
import { mockNonce, mockCreatePostRequest } from '@lens-protocol/domain/mocks';
import {
  CollectPolicyType,
  ReferencePolicyType,
} from '@lens-protocol/domain/use-cases/publications';
import { BroadcastingError } from '@lens-protocol/domain/use-cases/transactions';
import { ChainType, Url } from '@lens-protocol/shared-kernel';

import { UnsignedProtocolCall } from '../../../../wallet/adapters/ConcreteWallet';
import {
  mockITransactionFactory,
  mockIMetadataUploader,
  assertUnsignedProtocolCallCorrectness,
  assertBroadcastingErrorResultWithRequestFallback,
} from '../../__helpers__/mocks';
import { CreateOnChainPostGateway } from '../CreateOnChainPostGateway';

function setupTestScenario({
  apolloClient,
  uploadUrl,
}: {
  apolloClient: LensApolloClient;
  uploadUrl: Url;
}) {
  const transactionFactory = mockITransactionFactory();
  const uploader = mockIMetadataUploader(uploadUrl);

  const gateway = new CreateOnChainPostGateway(apolloClient, transactionFactory, uploader);

  return { gateway, uploader };
}

describe(`Given an instance of ${CreateOnChainPostGateway.name}`, () => {
  const request = mockCreatePostRequest({
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
  const data = mockCreatePostTypedDataData();
  const uploadUrl = faker.internet.url();

  describe(`when creating an IUnsignedProtocolCall<CreatePostRequest>`, () => {
    it(`should:
            - use the IMetadataUploader<CreatePostRequest> to upload the publication metadata
            - create an instance of the ${UnsignedProtocolCall.name} with the expected typed data`, async () => {
      const apolloClient = createMockApolloClientWithMultipleResponses([
        createCreatePostTypedDataMockedResponse({
          variables: {
            request: {
              profileId: request.profileId,
              contentURI: uploadUrl,
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

    it(`should allow to override the signature nonce`, async () => {
      const nonce = mockNonce();
      const apolloClient = createMockApolloClientWithMultipleResponses([
        createCreatePostTypedDataMockedResponse({
          variables: {
            request: {
              profileId: request.profileId,
              contentURI: uploadUrl,
              ...expectedMutationRequestDetails,
            },
            options: {
              overrideSigNonce: nonce,
            },
          },
          data: mockCreatePostTypedDataData({ nonce }),
        }),
      ]);
      const { gateway } = setupTestScenario({ apolloClient, uploadUrl });

      const unsignedCall = await gateway.createUnsignedProtocolCall(request, nonce);

      expect(unsignedCall.nonce).toEqual(nonce);
    });
  });

  describe(`when creating a ${NativeTransaction.name}<CreatePostRequest>`, () => {
    it(`should:
          - use the IMetadataUploader<CreatePostRequest> to upload the publication metadata
          - create an instance of the ${NativeTransaction.name}`, async () => {
      const apolloClient = createMockApolloClientWithMultipleResponses([
        createCreatePostViaDispatcherMockedResponse({
          variables: {
            request: {
              profileId: request.profileId,
              contentURI: uploadUrl,
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
        const apolloClient = createMockApolloClientWithMultipleResponses([
          createCreatePostViaDispatcherMockedResponse({
            variables: {
              request: {
                profileId: request.profileId,
                contentURI: uploadUrl,
                ...expectedMutationRequestDetails,
              },
            },
            data: {
              result: relayError,
            },
          }),
          createCreatePostTypedDataMockedResponse({
            variables: {
              request: {
                profileId: request.profileId,
                contentURI: uploadUrl,
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
