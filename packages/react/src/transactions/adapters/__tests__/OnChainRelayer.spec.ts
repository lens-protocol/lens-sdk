import { RelayError, RelayErrorReasonType, RelaySuccess } from '@lens-protocol/api-bindings';
import {
  mockBroadcastOnchainResponse,
  mockLensApolloClient,
  mockRelayErrorFragment,
  mockRelaySuccessFragment,
} from '@lens-protocol/api-bindings/mocks';
import { ISignedProtocolCall, MetaTransaction } from '@lens-protocol/domain/entities';
import {
  BroadcastingError,
  BroadcastingErrorReason,
  ProtocolTransactionRequest,
} from '@lens-protocol/domain/use-cases/transactions';
import { ChainType, ILogger } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';

import { mockSignedProtocolCall } from '../../../wallet/adapters/__helpers__/mocks';
import { OnChainRelayer } from '../OnChainRelayer';
import { assertBroadcastingErrorWithReason } from '../__helpers__/assertions';
import { mockITransactionFactory } from '../__helpers__/mocks';

function setupRelayer({
  broadcastResult,
  signedCall,
}: {
  broadcastResult: RelaySuccess | RelayError;
  signedCall: ISignedProtocolCall<ProtocolTransactionRequest>;
}) {
  const factory = mockITransactionFactory();
  const apollo = mockLensApolloClient([
    mockBroadcastOnchainResponse({
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
      const broadcastResult = mockRelaySuccessFragment();

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

  describe.only.each([
    {
      broadcastResult: mockRelayErrorFragment(RelayErrorReasonType.AppNotAllowed),
      reason: BroadcastingErrorReason.APP_NOT_ALLOWED,
    },
    {
      broadcastResult: mockRelayErrorFragment(RelayErrorReasonType.NotSponsored),
      reason: BroadcastingErrorReason.NOT_SPONSORED,
    },
    {
      broadcastResult: mockRelayErrorFragment(RelayErrorReasonType.RateLimited),
      reason: BroadcastingErrorReason.RATE_LIMITED,
    },
    {
      broadcastResult: mockRelayErrorFragment(RelayErrorReasonType.Failed),
      reason: BroadcastingErrorReason.UNKNOWN,
    },
  ])(
    `when relaying an ISignedProtocolCall returns a $broadcastResult.__typename with $broadcastResult.reason reason`,
    ({ broadcastResult, reason }) => {
      it(`should fail w/ a ${BroadcastingError.name} with ${reason} reason`, async () => {
        const relayer = setupRelayer({ broadcastResult, signedCall });
        const result = await relayer.relayProtocolCall(signedCall);

        assertBroadcastingErrorWithReason(result, reason);
      });
    },
  );
});
