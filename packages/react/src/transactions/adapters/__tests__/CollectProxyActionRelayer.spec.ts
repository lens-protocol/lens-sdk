import { LensApolloClient } from '@lens-protocol/api-bindings';
import {
  createMockApolloClientWithMultipleResponses,
  createBroadcastProxyActionCallMockedResponse,
} from '@lens-protocol/api-bindings/mocks';
import { ProxyActionStatus, ProxyTransaction } from '@lens-protocol/domain/entities';
import { mockFreeCollectRequest } from '@lens-protocol/domain/mocks';
import { SupportedTransactionRequest } from '@lens-protocol/domain/use-cases/transactions';
import { ChainType, ILogger, success } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';

import { ITransactionObserver } from '../../infrastructure/TransactionFactory';
import { CollectProxyActionRelayer } from '../CollectProxyActionRelayer';
import { ITransactionFactory } from '../ITransactionFactory';
import { mockITransactionFactory } from '../__helpers__/mocks';

jest.mock('@lens-protocol/shared-kernel', () => {
  // eslint-disable-next-line
  const actual = jest.requireActual('@lens-protocol/shared-kernel');

  // eslint-disable-next-line
  return {
    ...actual,
    getID: jest.fn(() => 'id'),
  };
});

function mockITransactionObserver() {
  const observer = mock<ITransactionObserver>();
  observer.waitForProxyTransactionStatus.mockResolvedValue(
    success({ txHash: 'tx-hash', status: ProxyActionStatus.MINTING, txId: 'tx-id' }),
  );
  return observer;
}

function setupCollectProxyActionRelayer({
  apollo,
  factory,
}: {
  apollo: LensApolloClient;
  factory: ITransactionFactory<SupportedTransactionRequest>;
}) {
  return new CollectProxyActionRelayer(apollo, factory, mock<ILogger>());
}

describe(`Given an instance of the ${CollectProxyActionRelayer.name}`, () => {
  describe('when relaying a FreeCollectRequest', () => {
    const request = mockFreeCollectRequest();
    it(`should resolve with ${ProxyTransaction.name} on Polygon`, async () => {
      const indexingId = 'indexing-id';
      const apollo = createMockApolloClientWithMultipleResponses([
        createBroadcastProxyActionCallMockedResponse({
          result: indexingId,
          variables: {
            request: {
              collect: {
                freeCollect: {
                  publicationId: request.publicationId,
                },
              },
            },
          },
        }),
      ]);

      const mockTransactionObserver = mockITransactionObserver();
      const factory = mockITransactionFactory(mockTransactionObserver);
      const transactionRelayer = setupCollectProxyActionRelayer({ apollo, factory });

      const transaction = await transactionRelayer.relaySignlessProtocolCall(request);

      await transaction.waitNextEvent();

      expect(transaction).toEqual(
        expect.objectContaining({
          chainType: ChainType.POLYGON,
          id: 'id',
          request,
          status: ProxyActionStatus.MINTING,
        }),
      );

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
      expect((transaction as any).state.proxyId).toEqual(indexingId);
    });
  });
});
