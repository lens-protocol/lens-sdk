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
  BroadcastingErrorReason,
  ProtocolTransactionRequest,
} from '@lens-protocol/domain/use-cases/transactions';
import { assertSuccess, ILogger } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';

import { mockSignedProtocolCall } from '../../../wallet/adapters/__helpers__/mocks';
import { MomokaRelayer } from '../MomokaRelayer';
import { assertBroadcastingErrorWithReason } from '../__helpers__/assertions';
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
      const result = await relayer.relaySignedMomoka(signedCall);

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
        const result = await relayer.relaySignedMomoka(signedCall);

        assertBroadcastingErrorWithReason(result, reason);
      });
    },
  );
});
