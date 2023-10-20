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
import {
  BroadcastingError,
  BroadcastingErrorReason,
} from '@lens-protocol/domain/use-cases/transactions';
import { ChainType } from '@lens-protocol/shared-kernel';

import { UnsignedProtocolCall } from '../../../../wallet/adapters/ConcreteWallet';
import {
  assertBroadcastingErrorWithReason,
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

        assertBroadcastingErrorWithReason(result, reason);
      },
    );
  });
});
