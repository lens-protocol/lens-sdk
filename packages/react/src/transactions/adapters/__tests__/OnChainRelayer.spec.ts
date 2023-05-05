import { RelayErrorReasons, BroadcastOnChainResult } from '@lens-protocol/api-bindings';
import {
  createMockApolloClientWithMultipleResponses,
  createBroadcastOnChainMockedResponse,
  mockRelayerResultFragment,
  mockRelayErrorFragment,
} from '@lens-protocol/api-bindings/mocks';
import { ISignedProtocolCall, MetaTransaction } from '@lens-protocol/domain/entities';
import {
  BroadcastingError,
  ProtocolTransactionRequest,
} from '@lens-protocol/domain/use-cases/transactions';
import { assertFailure, ChainType, ILogger } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';

import { SignedProtocolCall } from '../../../wallet/adapters/ConcreteWallet';
import { mockSignedProtocolCall } from '../../../wallet/adapters/__helpers__/mocks';
import { OnChainRelayer } from '../OnChainRelayer';
import { mockITransactionFactory } from '../__helpers__/mocks';

function setupRelayer({
  broadcastResult,
  signedCall,
}: {
  broadcastResult: BroadcastOnChainResult;
  signedCall: ISignedProtocolCall<ProtocolTransactionRequest>;
}) {
  const factory = mockITransactionFactory();
  const apollo = createMockApolloClientWithMultipleResponses([
    createBroadcastOnChainMockedResponse({
      result: broadcastResult,
      variables: {
        request: {
          id: signedCall.id,
          signature: signedCall.signature,
        },
      },
    }),
  ]);
  return new OnChainRelayer(apollo, factory, mock<ILogger>());
}

describe(`Given an instance of the ${OnChainRelayer.name}`, () => {
  const signedCall = mockSignedProtocolCall<ProtocolTransactionRequest>();

  describe(`when relaying an ISignedProtocolCall succeeds`, () => {
    it(`should resolve with a success(${MetaTransaction.name}) on Polygon`, async () => {
      const broadcastResult = mockRelayerResultFragment();

      const relayer = setupRelayer({ broadcastResult, signedCall });
      const result = await relayer.relayProtocolCall(signedCall);

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
      const broadcastResult = mockRelayErrorFragment(RelayErrorReasons.Rejected);

      const relayer = setupRelayer({ broadcastResult, signedCall });
      const result = await relayer.relayProtocolCall(signedCall);

      assertFailure(result);
      expect(result.error).toBeInstanceOf(BroadcastingError);
      expect(result.error.fallback).toMatchObject(signedCall.fallback);
    });
  });
});
