import {
  SafeApolloClient,
  LensProfileManagerRelayErrorReasonType,
} from '@lens-protocol/api-bindings';
import {
  mockLensApolloClient,
  mockCreateOnchainPostTypedDataResponse,
  mockCreateOnchainPostTypedDataData,
  mockRelaySuccessFragment,
  mockPostOnchainResponse,
  mockLensProfileManagerRelayError,
} from '@lens-protocol/api-bindings/mocks';
import { NativeTransaction } from '@lens-protocol/domain/entities';
import { mockNonce, mockCreatePostRequest } from '@lens-protocol/domain/mocks';
import { ReferencePolicyType } from '@lens-protocol/domain/use-cases/publications';
import { BroadcastingError } from '@lens-protocol/domain/use-cases/transactions';
import { ChainType } from '@lens-protocol/shared-kernel';

import { UnsignedProtocolCall } from '../../../../wallet/adapters/ConcreteWallet';
import {
  assertBroadcastingErrorResultWithRequestFallback,
  assertUnsignedProtocolCallCorrectness,
} from '../../__helpers__/assertions';
import { mockITransactionFactory } from '../../__helpers__/mocks';
import { CreateOnChainPostGateway } from '../CreateOnChainPostGateway';
import { mockOnchainPostRequest } from '../__helpers__/mocks';

function setupTestScenario({ apolloClient }: { apolloClient: SafeApolloClient }) {
  const transactionFactory = mockITransactionFactory();

  const gateway = new CreateOnChainPostGateway(apolloClient, transactionFactory);

  return { gateway };
}

describe(`Given an instance of ${CreateOnChainPostGateway.name}`, () => {
  const request = mockCreatePostRequest({
    reference: {
      type: ReferencePolicyType.NO_ONE,
    },
  });
  const onchainPostRequest = mockOnchainPostRequest(request);
  const data = mockCreateOnchainPostTypedDataData();

  describe(`when creating an IUnsignedProtocolCall<CreatePostRequest>`, () => {
    it(`should create an instance of the ${UnsignedProtocolCall.name} with the expected typed data`, async () => {
      const apolloClient = mockLensApolloClient([
        mockCreateOnchainPostTypedDataResponse({
          variables: {
            request: onchainPostRequest,
          },
          data,
        }),
      ]);
      const { gateway } = setupTestScenario({ apolloClient });

      const unsignedCall = await gateway.createUnsignedProtocolCall(request);

      assertUnsignedProtocolCallCorrectness(unsignedCall, data.result);
    });

    it(`should allow to override the signature nonce`, async () => {
      const nonce = mockNonce();
      const apolloClient = mockLensApolloClient([
        mockCreateOnchainPostTypedDataResponse({
          variables: {
            request: onchainPostRequest,
            options: {
              overrideSigNonce: nonce,
            },
          },
          data: mockCreateOnchainPostTypedDataData({ nonce }),
        }),
      ]);
      const { gateway } = setupTestScenario({ apolloClient });

      const unsignedCall = await gateway.createUnsignedProtocolCall(request, nonce);

      expect(unsignedCall.nonce).toEqual(nonce);
    });
  });

  describe(`when creating a ${NativeTransaction.name}<CreatePostRequest>`, () => {
    it(`should create an instance of the ${NativeTransaction.name}`, async () => {
      const apolloClient = mockLensApolloClient([
        mockPostOnchainResponse({
          variables: {
            request: onchainPostRequest,
          },
          data: {
            result: mockRelaySuccessFragment(),
          },
        }),
      ]);
      const { gateway } = setupTestScenario({ apolloClient });

      const result = await gateway.createDelegatedTransaction(request);

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
      mockLensProfileManagerRelayError(LensProfileManagerRelayErrorReasonType.AppGaslessNotAllowed),
      mockLensProfileManagerRelayError(LensProfileManagerRelayErrorReasonType.NotSponsored),
      mockLensProfileManagerRelayError(LensProfileManagerRelayErrorReasonType.RateLimited),
    ])(
      `should fail w/ a ${BroadcastingError.name} in case of $__typename response with "$reason" reason`,
      async (relayError) => {
        const apolloClient = mockLensApolloClient([
          mockPostOnchainResponse({
            variables: {
              request: onchainPostRequest,
            },
            data: {
              result: relayError,
            },
          }),
          mockCreateOnchainPostTypedDataResponse({
            variables: {
              request: onchainPostRequest,
            },
            data,
          }),
        ]);

        const { gateway } = setupTestScenario({ apolloClient });
        const result = await gateway.createDelegatedTransaction(request);

        assertBroadcastingErrorResultWithRequestFallback(result, data.result.typedData);
      },
    );
  });
});
