import {
  LensProfileManagerRelayErrorReasonType,
  SafeApolloClient,
} from '@lens-protocol/api-bindings';
import {
  mockLensApolloClient,
  mockCreateOnchainMirrorTypedDataData,
  mockCreateOnchainMirrorTypedDataResponse,
  mockMirrorOnchainResponse,
  mockRelaySuccessFragment,
  mockLensProfileManagerRelayError,
} from '@lens-protocol/api-bindings/mocks';
import { NativeTransaction } from '@lens-protocol/domain/entities';
import { mockCreateMirrorRequest } from '@lens-protocol/domain/mocks';
import { BroadcastingError } from '@lens-protocol/domain/use-cases/transactions';

import { UnsignedProtocolCall } from '../../../../wallet/adapters/ConcreteWallet';
import {
  assertBroadcastingErrorResultWithRequestFallback,
  assertUnsignedProtocolCallCorrectness,
} from '../../__helpers__/assertions';
import { mockITransactionFactory } from '../../__helpers__/mocks';
import { CreateOnChainMirrorGateway } from '../CreateOnChainMirrorGateway';
import { mockOnchainMirrorRequest } from '../__helpers__/mocks';

function setupTestScenario({ apolloClient }: { apolloClient: SafeApolloClient }) {
  const transactionFactory = mockITransactionFactory();

  const gateway = new CreateOnChainMirrorGateway(apolloClient, transactionFactory);

  return { gateway };
}

describe(`Given an instance of ${CreateOnChainMirrorGateway.name}`, () => {
  const request = mockCreateMirrorRequest();
  const onchainMirrorRequest = mockOnchainMirrorRequest(request);
  const data = mockCreateOnchainMirrorTypedDataData();

  describe(`when creating an IUnsignedProtocolCall<CreateMirrorRequest>`, () => {
    it(`should create an instance of the ${UnsignedProtocolCall.name} with the expected typed data`, async () => {
      const apolloClient = mockLensApolloClient([
        mockCreateOnchainMirrorTypedDataResponse({
          variables: {
            request: onchainMirrorRequest,
          },
          data,
        }),
      ]);

      const { gateway } = setupTestScenario({ apolloClient });

      const unsignedCall = await gateway.createUnsignedProtocolCall(request);

      assertUnsignedProtocolCallCorrectness(unsignedCall, data.result);
    });
  });

  describe(`when creating a ${NativeTransaction.name}<CreateMirrorRequest>`, () => {
    it(`should create an instance of the ${NativeTransaction.name}`, async () => {
      const apolloClient = mockLensApolloClient([
        mockMirrorOnchainResponse({
          variables: {
            request: onchainMirrorRequest,
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
          mockMirrorOnchainResponse({
            variables: {
              request: onchainMirrorRequest,
            },
            data: {
              result: relayError,
            },
          }),
          mockCreateOnchainMirrorTypedDataResponse({
            variables: {
              request: onchainMirrorRequest,
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
