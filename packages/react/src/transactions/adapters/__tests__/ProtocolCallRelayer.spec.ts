import { RelayErrorReasons, RelayResult } from '@lens-protocol/api-bindings';
import {
  createMockApolloClientWithMultipleResponses,
  createBroadcastProtocolCallMockedResponse,
  mockRelayerResultFragment,
  mockRelayErrorFragment,
} from '@lens-protocol/api-bindings/mocks';
import {
  ISignedProtocolCall,
  MetaTransaction,
  TransactionRequestModel,
} from '@lens-protocol/domain/entities';
import { mockSignedProtocolCall } from '@lens-protocol/domain/mocks';
import {
  BroadcastingError,
  BroadcastingErrorReason,
  SupportedTransactionRequest,
} from '@lens-protocol/domain/use-cases/transactions';
import { ChainType, ILogger } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';

import { ProtocolCallRelayer } from '../ProtocolCallRelayer';
import { mockITransactionFactory } from '../__helpers__/mocks';

function setupProtocolCallRelayer({
  relayResult,
  signedCall,
}: {
  relayResult: RelayResult;
  signedCall: ISignedProtocolCall<TransactionRequestModel>;
}) {
  const factory = mockITransactionFactory();
  const apollo = createMockApolloClientWithMultipleResponses([
    createBroadcastProtocolCallMockedResponse({
      result: relayResult,
      variables: {
        request: {
          id: signedCall.id,
          signature: signedCall.signature,
        },
      },
    }),
  ]);
  return new ProtocolCallRelayer(apollo, factory, mock<ILogger>());
}

describe(`Given an instance of the ${ProtocolCallRelayer.name}`, () => {
  const signedCall = mockSignedProtocolCall<SupportedTransactionRequest>();

  describe(`when relaying an ISignedProtocolCall succeeds`, () => {
    it(`should resolve with a success(${MetaTransaction.name}) on Polygon`, async () => {
      const relayResult = mockRelayerResultFragment();

      const transactionRelayer = setupProtocolCallRelayer({ relayResult, signedCall });
      const result = await transactionRelayer.relayProtocolCall(signedCall);

      expect(result.unwrap()).toMatchObject(
        expect.objectContaining({
          chainType: ChainType.POLYGON,
          id: signedCall.id,
          nonce: signedCall.nonce,
          request: signedCall.request,
        }),
      );
    });
  });

  describe(`when relaying an ISignedProtocolCall fails`, () => {
    describe(`with a Rejected reason`, () => {
      it(`should resolve with a failure(${BroadcastingError.name}) with ${BroadcastingErrorReason.REJECTED}`, async () => {
        const relayResult = mockRelayErrorFragment(RelayErrorReasons.Rejected);

        const transactionRelayer = setupProtocolCallRelayer({ relayResult, signedCall });
        const result = await transactionRelayer.relayProtocolCall(signedCall);

        expect(() => result.unwrap()).toThrowError(
          new BroadcastingError(BroadcastingErrorReason.REJECTED),
        );
      });
    });

    describe(`with any other reason than Rejected`, () => {
      it(`should resolve with a failure(${BroadcastingError.name}) with ${BroadcastingErrorReason.UNSPECIFIED}`, async () => {
        const relayResult = mockRelayErrorFragment(RelayErrorReasons.NotAllowed);

        const transactionRelayer = setupProtocolCallRelayer({ relayResult, signedCall });
        const result = await transactionRelayer.relayProtocolCall(signedCall);

        expect(() => result.unwrap()).toThrowError(
          new BroadcastingError(BroadcastingErrorReason.UNSPECIFIED),
        );
      });
    });
  });
});
