import { LensApolloClient } from '@lens-protocol/api-bindings';
import {
  createMockApolloClientWithMultipleResponses,
  createBroadcastProxyActionCallMockedResponse,
} from '@lens-protocol/api-bindings/mocks';
import { ProxyActionStatus, ProxyTransaction } from '@lens-protocol/domain/entities';
import { mockUnconstrainedFollowRequest } from '@lens-protocol/domain/mocks';
import { UnconstrainedFollowRequest } from '@lens-protocol/domain/use-cases/profile';
import { ChainType, ILogger, success } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';

import { ITransactionObserver } from '../../infrastructure/TransactionFactory';
import { FollowProxyActionRelayer } from '../FollowProxyActionRelayer';
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

function mockFollowProxyActionRelayer({
  apollo,
  factory,
}: {
  apollo: LensApolloClient;
  factory: ITransactionFactory<UnconstrainedFollowRequest>;
}) {
  return new FollowProxyActionRelayer(apollo, factory, mock<ILogger>());
}

describe(`Given an instance of the ${FollowProxyActionRelayer.name}`, () => {
  describe('when relaying an UnconstrainedFollowRequest', () => {
    const request = mockUnconstrainedFollowRequest();
    it(`should resolve with ${ProxyTransaction.name} on Polygon`, async () => {
      const indexingId = 'indexing-id';
      const apollo = createMockApolloClientWithMultipleResponses([
        createBroadcastProxyActionCallMockedResponse({
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
      const transactionRelayer = mockFollowProxyActionRelayer({ apollo, factory });

      const transaction = await transactionRelayer.createProxyTransaction(request);

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
