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
import {
  BroadcastingError,
  SupportedTransactionRequest,
} from '@lens-protocol/domain/use-cases/transactions';
import { assertFailure, ChainType, ILogger } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';

import { SignedProtocolCall } from '../../../wallet/adapters/ConcreteWallet';
import { mockSignedProtocolCall } from '../../../wallet/adapters/__helpers__/mocks';
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
    it(`should resolve with a failure(${BroadcastingError.name}) carrying the RequestFallback from the ${SignedProtocolCall.name}`, async () => {
      const relayResult = mockRelayErrorFragment(RelayErrorReasons.Rejected);

      const transactionRelayer = setupProtocolCallRelayer({ relayResult, signedCall });
      const result = await transactionRelayer.relayProtocolCall(signedCall);

      assertFailure(result);
      expect(result.error).toBeInstanceOf(BroadcastingError);
      expect(result.error.fallback).toMatchObject(signedCall.fallback);
    });
  });
});
