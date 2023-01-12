import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import {
  createMockApolloClientWithMultipleResponses,
  createBroadcastProxyActionCallMutationMockedResponse,
} from '@lens-protocol/api-bindings/mocks';
import { ProxyActionStatus, ProxyTransaction } from '@lens-protocol/domain/entities';
import {
  mockFreeCollectRequest,
  mockUnconstrainedFollowRequest,
} from '@lens-protocol/domain/mocks';
import { SupportedTransactionRequest } from '@lens-protocol/domain/use-cases/transactions';
import { ChainType, ILogger, success } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';

import { ITransactionObserver } from '../../infrastructure/TransactionFactory';
import { ITransactionFactory } from '../ITransactionFactory';
import { SignlessProtocolCallRelayer } from '../SignlessProtocolCallRelayer';
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
  const mockITransactionObserver = mock<ITransactionObserver>();
  mockITransactionObserver.waitForProxyTransactionStatus.mockResolvedValue(
    success({ txHash: 'tx-hash', status: ProxyActionStatus.MINTING, txId: 'tx-id' }),
  );
  return mockITransactionObserver;
}

function mockSignlessProtocolCallRelayer({
  apollo,
  factory,
}: {
  apollo: ApolloClient<NormalizedCacheObject>;
  factory: ITransactionFactory<SupportedTransactionRequest>;
}) {
  return new SignlessProtocolCallRelayer(apollo, factory, mock<ILogger>());
}

describe(`Given an instance of the ${SignlessProtocolCallRelayer.name}`, () => {
  describe('when relaying an UnconstrainedFollowRequest', () => {
    const request = mockUnconstrainedFollowRequest();
    it(`should resolve with ${ProxyTransaction.name} on Polygon`, async () => {
      const indexingId = 'indexing-id';
      const apollo = createMockApolloClientWithMultipleResponses([
        createBroadcastProxyActionCallMutationMockedResponse({
          result: indexingId,
          variables: {
            request: {
              follow: {
                freeFollow: {
                  profileId: request.profileId,
                },
              },
            },
          },
        }),
      ]);
      const mockTransactionObserver = mockITransactionObserver();
      const factory = mockITransactionFactory(mockTransactionObserver);
      const transactionRelayer = mockSignlessProtocolCallRelayer({ apollo, factory });

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

  describe('when relaying an FreeCollectRequest', () => {
    const request = mockFreeCollectRequest();
    it(`should resolve with ${ProxyTransaction.name} on Polygon`, async () => {
      const indexingId = 'indexing-id';
      const apollo = createMockApolloClientWithMultipleResponses([
        createBroadcastProxyActionCallMutationMockedResponse({
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
      const transactionRelayer = mockSignlessProtocolCallRelayer({ apollo, factory });

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
