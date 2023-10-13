import {
  CreateMomokaPublicationResult,
  RelayError,
  RelayErrorReasonType,
} from '@lens-protocol/api-bindings';
import {
  mockLensApolloClient,
  mockRelayErrorFragment,
  mockBroadcastOnMomokaResponse,
  mockCreateMomokaPublicationResult,
} from '@lens-protocol/api-bindings/mocks';
import { DataTransaction, ISignedProtocolCall } from '@lens-protocol/domain/entities';
import {
  BroadcastingError,
  ProtocolTransactionRequest,
} from '@lens-protocol/domain/use-cases/transactions';
import { assertFailure, assertSuccess, ILogger } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';

import { SignedProtocolCall } from '../../../wallet/adapters/ConcreteWallet';
import { mockSignedProtocolCall } from '../../../wallet/adapters/__helpers__/mocks';
import { MomokaRelayer } from '../MomokaRelayer';
import { mockITransactionFactory } from '../__helpers__/mocks';

function setupRelayer({
  broadcastResult,
  signedCall,
}: {
  broadcastResult: CreateMomokaPublicationResult | RelayError;
  signedCall: ISignedProtocolCall<ProtocolTransactionRequest>;
}) {
  const factory = mockITransactionFactory();
  const apollo = mockLensApolloClient([
    mockBroadcastOnMomokaResponse({
      result: broadcastResult,
      variables: {
        request: {
          id: signedCall.id,
          signature: signedCall.signature,
        },
      },
    }),
  ]);
  return new MomokaRelayer(apollo, factory, mock<ILogger>());
}

describe(`Given an instance of the ${MomokaRelayer.name}`, () => {
  const signedCall = mockSignedProtocolCall<ProtocolTransactionRequest>();

  describe(`when relaying an ISignedProtocolCall succeeds`, () => {
    it(`should resolve with a success(${DataTransaction.name})`, async () => {
      const broadcastResult = mockCreateMomokaPublicationResult();

      const relayer = setupRelayer({ broadcastResult, signedCall });
      const result = await relayer.relayProtocolCall(signedCall);

      assertSuccess(result);
      expect(result.value).toBeInstanceOf(DataTransaction);
      expect(result.value).toMatchObject(
        expect.objectContaining({
          id: broadcastResult.id,
          request: signedCall.request,
        }),
      );
    });
  });

  describe(`when relaying an ISignedProtocolCall fails`, () => {
    it.each([
      mockRelayErrorFragment(RelayErrorReasonType.AppNotAllowed),
      mockRelayErrorFragment(RelayErrorReasonType.NotSponsored),
      mockRelayErrorFragment(RelayErrorReasonType.RateLimited),
    ])(
      `should fail w/ a ${BroadcastingError.name} in case of $__typename response with "$reason" reason carrying the RequestFallback from the ${SignedProtocolCall.name}`,
      async (broadcastResult) => {
        const relayer = setupRelayer({ broadcastResult, signedCall });
        const result = await relayer.relayProtocolCall(signedCall);

        assertFailure(result);
        expect(result.error).toBeInstanceOf(BroadcastingError);
        expect(result.error.fallback).toMatchObject(signedCall.fallback);
      },
    );
  });
});
