import { MockedResponse } from '@apollo/client/testing';
import {
  CreateCollectTypedDataData,
  CreateCollectTypedDataDocument,
  CreateCollectTypedDataVariables,
  LensApolloClient,
} from '@lens-protocol/api-bindings';
import {
  createBroadcastProxyActionCallMockedError,
  createBroadcastProxyActionCallMockedResponse,
  createMockApolloClientWithMultipleResponses,
  mockCreateCollectTypedDataData,
} from '@lens-protocol/api-bindings/mocks';
import { ProxyActionStatus, ProxyTransaction } from '@lens-protocol/domain/entities';
import { mockFreeCollectRequest, mockNonce } from '@lens-protocol/domain/mocks';
import { FreeCollectRequest } from '@lens-protocol/domain/use-cases/publications';
import { BroadcastingError } from '@lens-protocol/domain/use-cases/transactions';
import { ChainType, ILogger, success } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';

import { UnsignedProtocolCall } from '../../../wallet/adapters/ConcreteWallet';
import { ITransactionObserver } from '../../infrastructure/TransactionFactory';
import { CollectPublicationGateway } from '../CollectPublicationGateway';
import { ITransactionFactory } from '../ITransactionFactory';
import {
  assertUnsignedProtocolCallCorrectness,
  mockITransactionFactory,
} from '../__helpers__/mocks';

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

function mockCollectPublicationGateway({
  apollo,
  factory,
}: {
  apollo: LensApolloClient;
  factory: ITransactionFactory<FreeCollectRequest>;
}) {
  return new CollectPublicationGateway(apollo, factory, mock<ILogger>());
}

function mockCreateCollectTypedDatMutationMockedResponse({
  variables,
  data,
}: {
  variables: CreateCollectTypedDataVariables;
  data: CreateCollectTypedDataData;
}): MockedResponse<CreateCollectTypedDataData> {
  return {
    request: {
      query: CreateCollectTypedDataDocument,
      variables,
    },
    result: {
      data,
    },
  };
}

describe(`Given an instance of the ${CollectPublicationGateway.name}`, () => {
  const request = mockFreeCollectRequest();

  describe(`when calling the "${CollectPublicationGateway.prototype.createUnsignedProtocolCall.name}"`, () => {
    it(`should create an "${UnsignedProtocolCall.name}" w/ the expected typed data`, async () => {
      const data = mockCreateCollectTypedDataData();

      const apollo = createMockApolloClientWithMultipleResponses([
        mockCreateCollectTypedDatMutationMockedResponse({
          variables: {
            request: {
              publicationId: request.publicationId,
            },
          },
          data,
        }),
      ]);

      const mockTransactionObserver = mockITransactionObserver();
      const factory = mockITransactionFactory(mockTransactionObserver);
      const collectPublicationGateway = mockCollectPublicationGateway({
        apollo,
        factory,
      });
      const unsignedCall = await collectPublicationGateway.createUnsignedProtocolCall(request);

      assertUnsignedProtocolCallCorrectness(unsignedCall, data.result);
    });

    it(`should be possible to override the signature nonce`, async () => {
      const nonce = mockNonce();
      const apollo = createMockApolloClientWithMultipleResponses([
        mockCreateCollectTypedDatMutationMockedResponse({
          variables: {
            request: {
              publicationId: request.publicationId,
            },
            options: {
              overrideSigNonce: nonce,
            },
          },
          data: mockCreateCollectTypedDataData({ nonce }),
        }),
      ]);

      const mockTransactionObserver = mockITransactionObserver();
      const factory = mockITransactionFactory(mockTransactionObserver);
      const collectPublicationGateway = mockCollectPublicationGateway({
        apollo,
        factory,
      });
      const unsignedCall = await collectPublicationGateway.createUnsignedProtocolCall(
        request,
        nonce,
      );

      expect(unsignedCall.nonce).toEqual(nonce);
    });
  });

  describe(`when relaying a FreeCollectRequest via the "${CollectPublicationGateway.prototype.createProxyTransaction.name}" method`, () => {
    const request = mockFreeCollectRequest();
    it(`should succeed with ${ProxyTransaction.name} on Polygon`, async () => {
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
      const collectPublicationGateway = mockCollectPublicationGateway({
        apollo,
        factory,
      });

      const transactionResult = await collectPublicationGateway.createProxyTransaction(request);

      if (transactionResult.isFailure()) throw transactionResult.error;

      const transaction = transactionResult.value;

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
    it(`should fail with ${ProxyTransaction.name} in the case of a broadcast failure`, async () => {
      const apollo = createMockApolloClientWithMultipleResponses([
        createBroadcastProxyActionCallMockedError({
          errorMessage: 'Failed to broadcast proxy action call',
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
        mockCreateCollectTypedDatMutationMockedResponse({
          variables: {
            request: {
              publicationId: request.publicationId,
            },
          },
          data: mockCreateCollectTypedDataData(),
        }),
      ]);

      const mockTransactionObserver = mockITransactionObserver();
      const factory = mockITransactionFactory(mockTransactionObserver);
      const collectPublicationGateway = mockCollectPublicationGateway({
        apollo,
        factory,
      });

      const transactionResult = await collectPublicationGateway.createProxyTransaction(request);

      if (transactionResult.isSuccess()) throw new Error('Expected transaction to fail');

      expect(transactionResult.error).toEqual(
        new BroadcastingError('Failed to broadcast proxy action call'),
      );
      expect(transactionResult.error.fallback).toEqual(
        expect.objectContaining({
          ...request,
        }),
      );
    });
  });
});
