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
import {
  BroadcastingError,
  BroadcastingErrorReason,
} from '@lens-protocol/domain/use-cases/transactions';

import { UnsignedProtocolCall } from '../../../../wallet/adapters/ConcreteWallet';
import {
  assertBroadcastingErrorWithReason,
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
      {
        relayError: mockLensProfileManagerRelayError(
          LensProfileManagerRelayErrorReasonType.AppNotAllowed,
        ),
        reason: BroadcastingErrorReason.APP_NOT_ALLOWED,
      },
      {
        relayError: mockLensProfileManagerRelayError(
          LensProfileManagerRelayErrorReasonType.NoLensManagerEnabled,
        ),
        reason: BroadcastingErrorReason.NO_LENS_MANAGER_ENABLED,
      },
      {
        relayError: mockLensProfileManagerRelayError(
          LensProfileManagerRelayErrorReasonType.NotSponsored,
        ),
        reason: BroadcastingErrorReason.NOT_SPONSORED,
      },
      {
        relayError: mockLensProfileManagerRelayError(
          LensProfileManagerRelayErrorReasonType.RateLimited,
        ),
        reason: BroadcastingErrorReason.RATE_LIMITED,
      },
      {
        relayError: mockLensProfileManagerRelayError(LensProfileManagerRelayErrorReasonType.Failed),
        reason: BroadcastingErrorReason.UNKNOWN,
      },
    ])(
      `should fail w/ a ${BroadcastingError.name} with $reason in case of $relayError.__typename response with "$relayError.reason" reason`,
      async ({ relayError, reason }) => {
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

        assertBroadcastingErrorWithReason(result, reason);
      },
    );
  });
});
