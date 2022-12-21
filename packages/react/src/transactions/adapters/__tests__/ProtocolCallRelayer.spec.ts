import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import {
  createMockApolloClientWithMultipleResponses,
  mockBroadcastProtocolCallMutationMockedResponse,
  mockRelayerResultFragment,
} from '@lens-protocol/api/mocks';
import { SignedProtocolCall, MetaTransaction } from '@lens-protocol/domain/entities';
import { mockSignedProtocolCall } from '@lens-protocol/domain/mocks';
import { SupportedTransactionRequest } from '@lens-protocol/domain/use-cases/transactions';
import { ChainType, ILogger } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';

import { ITransactionFactory } from '../ITransactionFactory';
import { ProtocolCallRelayer } from '../ProtocolCallRelayer';
import { mockITransactionFactory } from '../__helpers__/mocks';

function mockProtocolCallRelayer({
  apollo,
  factory,
}: {
  apollo: ApolloClient<NormalizedCacheObject>;
  factory: ITransactionFactory<SupportedTransactionRequest>;
}) {
  return new ProtocolCallRelayer(apollo, factory, mock<ILogger>());
}

describe(`Given an instance of the ${ProtocolCallRelayer.name}`, () => {
  const signedCall = mockSignedProtocolCall<SupportedTransactionRequest>();

  describe(`when relaying a ${SignedProtocolCall.name}`, () => {
    it(`should resolve with ${MetaTransaction.name} on Polygon`, async () => {
      const relayResult = mockRelayerResultFragment();
      const apollo = createMockApolloClientWithMultipleResponses([
        mockBroadcastProtocolCallMutationMockedResponse({
          result: relayResult,
          variables: {
            request: {
              id: signedCall.id,
              signature: signedCall.signature,
            },
          },
        }),
      ]);
      const factory = mockITransactionFactory();
      const transactionRelayer = mockProtocolCallRelayer({ apollo, factory });

      const transaction = await transactionRelayer.relayProtocolCall(signedCall);
      await transaction.waitNextEvent();

      expect(transaction).toEqual(
        expect.objectContaining({
          chainType: ChainType.POLYGON,
          id: signedCall.id,
          nonce: signedCall.nonce,
          request: signedCall.request,
        }),
      );
    });
  });
});
