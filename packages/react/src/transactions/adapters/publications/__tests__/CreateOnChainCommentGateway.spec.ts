import {
  LensProfileManagerRelayErrorReasonType,
  SafeApolloClient,
} from '@lens-protocol/api-bindings';
import {
  mockCommentOnchainResponse,
  mockCreateOnchainCommentTypedDataData,
  mockCreateOnchainCommentTypedDataResponse,
  mockLensApolloClient,
  mockLensProfileManagerRelayError,
  mockRelaySuccessFragment,
} from '@lens-protocol/api-bindings/mocks';
import { NativeTransaction } from '@lens-protocol/domain/entities';
import { mockNonce, mockCreateCommentRequest } from '@lens-protocol/domain/mocks';
import { BroadcastingError } from '@lens-protocol/domain/use-cases/transactions';
import { ChainType } from '@lens-protocol/shared-kernel';

import { UnsignedProtocolCall } from '../../../../wallet/adapters/ConcreteWallet';
import {
  assertBroadcastingErrorResultWithRequestFallback,
  assertUnsignedProtocolCallCorrectness,
} from '../../__helpers__/assertions';
import { mockITransactionFactory } from '../../__helpers__/mocks';
import { CreateOnChainCommentGateway } from '../CreateOnChainCommentGateway';
import { mockOnchainCommentRequest } from '../__helpers__/mocks';

function setupTestScenario({ apolloClient }: { apolloClient: SafeApolloClient }) {
  const transactionFactory = mockITransactionFactory();

  const gateway = new CreateOnChainCommentGateway(apolloClient, transactionFactory);

  return { gateway };
}

describe(`Given an instance of ${CreateOnChainCommentGateway.name}`, () => {
  const request = mockCreateCommentRequest();
  const onchainCommentRequest = mockOnchainCommentRequest(request);
  const data = mockCreateOnchainCommentTypedDataData();

  describe(`when creating an IUnsignedProtocolCall<CreateCommentRequest>`, () => {
    it(`should create an instance of the ${UnsignedProtocolCall.name} with the expected typed data`, async () => {
      const apolloClient = mockLensApolloClient([
        mockCreateOnchainCommentTypedDataResponse({
          variables: {
            request: onchainCommentRequest,
          },
          data,
        }),
      ]);
      const { gateway } = setupTestScenario({ apolloClient });

      const unsignedCall = await gateway.createUnsignedProtocolCall(request);

      assertUnsignedProtocolCallCorrectness(unsignedCall, data.result);
    });

    it(`should be possible to override the signature nonce`, async () => {
      const nonce = mockNonce();
      const apolloClient = mockLensApolloClient([
        mockCreateOnchainCommentTypedDataResponse({
          variables: {
            request: onchainCommentRequest,
            options: {
              overrideSigNonce: nonce,
            },
          },
          data: mockCreateOnchainCommentTypedDataData({ nonce }),
        }),
      ]);
      const { gateway } = setupTestScenario({ apolloClient });

      const unsignedCall = await gateway.createUnsignedProtocolCall(request, nonce);

      expect(unsignedCall.nonce).toEqual(nonce);
    });
  });

  describe(`when creating a ${NativeTransaction.name}<CreateCommentRequest>}"`, () => {
    it(`should create an instance of the ${NativeTransaction.name}`, async () => {
      const apolloClient = mockLensApolloClient([
        mockCommentOnchainResponse({
          variables: {
            request: onchainCommentRequest,
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
      mockLensProfileManagerRelayError(LensProfileManagerRelayErrorReasonType.AppNotAllowed),
      mockLensProfileManagerRelayError(LensProfileManagerRelayErrorReasonType.NoLensManagerEnabled),
      mockLensProfileManagerRelayError(LensProfileManagerRelayErrorReasonType.NotSponsored),
      mockLensProfileManagerRelayError(LensProfileManagerRelayErrorReasonType.RateLimited),
    ])(
      `should fail w/ a ${BroadcastingError.name} in case of $__typename response with "$reason" reason`,
      async (relayError) => {
        const apolloClient = mockLensApolloClient([
          mockCommentOnchainResponse({
            variables: {
              request: onchainCommentRequest,
            },
            data: {
              result: relayError,
            },
          }),
          mockCreateOnchainCommentTypedDataResponse({
            variables: {
              request: onchainCommentRequest,
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
