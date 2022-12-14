import { faker } from '@faker-js/faker';
import {
  MetaTransaction,
  NativeTransaction,
  ProxyActionStatus,
  ProxyTransaction,
  TransactionError,
  TransactionErrorReason,
  TransactionEvent,
} from '@lens-protocol/domain/entities';
import { mockSignedProtocolCall, mockTransactionHash } from '@lens-protocol/domain/mocks';
import { SupportedTransactionRequest } from '@lens-protocol/domain/use-cases/transactions';
import { ChainType, failure, success } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';

import {
  mockAsyncRelayReceipt,
  mockDeferredMetaTransactionInit,
  mockMetaTransactionData,
  mockNativeTransactionData,
  mockNativeTransactionDataWithIndexingId,
  mockProxyTransactionData,
  mockRelayReceipt,
} from '../../adapters/__helpers__/mocks';
import { IndexingEvent, ITransactionObserver, TransactionFactory } from '../TransactionFactory';
import { MockedTransactionObserver, mockProxyActionStatusEvent } from '../__helpers__/mocks';

function mockIndexingEvent(overrides?: Partial<IndexingEvent>): IndexingEvent {
  return {
    indexed: false,
    txHash: mockTransactionHash(),
    ...overrides,
  };
}

function setupTransactionFactory({
  observer = mock<ITransactionObserver>(),
}: { observer?: ITransactionObserver } = {}) {
  return new TransactionFactory(observer);
}

describe(`Given an instance of the ${TransactionFactory.name}`, () => {
  describe(`and a ${MetaTransaction.name} instance created via DeferredMetaTransactionInit<T>`, () => {
    const chainType = ChainType.ETHEREUM;

    describe(`when invoking the "waitNextEvent" method`, () => {
      const request = mock<SupportedTransactionRequest>();
      const signedCall = mockSignedProtocolCall(request);
      const relayReceipt = mockRelayReceipt();
      const init = mockDeferredMetaTransactionInit({ request, relayReceipt });

      it(`should
            - resolve with Success<TransactionEvent.${TransactionEvent.BROADCASTED}> as the provided AsyncRelayReceipt resolves with a successful result
            - and update the tx hash`, async () => {
        const factory = setupTransactionFactory();

        const transaction = factory.createMetaTransaction(init);
        const result = await transaction.waitNextEvent();

        expect(result.unwrap()).toBe(TransactionEvent.BROADCASTED);
        expect(transaction.hash).toEqual(relayReceipt.txHash);
      });

      it(`should forward any ${TransactionError.name} resulting from the provided AsyncRelayReceipt`, async () => {
        const error = new TransactionError(TransactionErrorReason.UNKNOWN);
        const factory = setupTransactionFactory();

        const transaction = factory.createMetaTransaction({
          chainType,
          signedCall,
          asyncRelayReceipt: mockAsyncRelayReceipt(failure(error)),
        });
        const result = await transaction.waitNextEvent();

        expect(() => result.unwrap()).toThrow(error);
      });

      it(`should
            - resolve with Success<TransactionEvent.${TransactionEvent.UPGRADED}> as the txHash changes while not yet indexed
            - and update the tx hash`, async () => {
        const indexingEvent = mockIndexingEvent({ indexed: false });
        const observer = MockedTransactionObserver.withIndexingEventsSequence({
          indexingId: relayReceipt.indexingId,
          indexingEventsSequence: [indexingEvent],
        });
        const factory = setupTransactionFactory({ observer });

        const transaction = factory.createMetaTransaction(init);
        await transaction.waitNextEvent();
        const result = await transaction.waitNextEvent();

        expect(result.unwrap()).toBe(TransactionEvent.UPGRADED);
        expect(transaction.hash).toEqual(indexingEvent.txHash);
      });

      it(`should:
            - resolve with Success<TransactionEvent.${TransactionEvent.SETTLED}> as soon as indexed by the BE
            - and update the tx hash if changed`, async () => {
        const indexingEvent = mockIndexingEvent({ indexed: true });
        const observer = MockedTransactionObserver.withIndexingEventsSequence({
          indexingId: relayReceipt.indexingId,
          indexingEventsSequence: [indexingEvent],
        });
        const factory = setupTransactionFactory({ observer });

        const transaction = factory.createMetaTransaction(init);
        await transaction.waitNextEvent();
        const result = await transaction.waitNextEvent();

        expect(result.unwrap()).toBe(TransactionEvent.SETTLED);
        expect(transaction.hash).toEqual(indexingEvent.txHash);
      });

      it(`should forward any ${TransactionError.name} from the ITransactionObserver`, async () => {
        const error = new TransactionError(TransactionErrorReason.MINING_TIMEOUT);
        const observer = MockedTransactionObserver.withIndexingEventsSequence({
          indexingId: relayReceipt.indexingId,
          indexingEventsSequence: [error],
        });
        const factory = setupTransactionFactory({ observer });

        const transaction = factory.createMetaTransaction(init);
        await transaction.waitNextEvent();
        const result = await transaction.waitNextEvent();

        expect(() => result.unwrap()).toThrow(error);
      });
    });
  });

  describe(`and a ${MetaTransaction.name} instance created via MetaTransactionData<T>`, () => {
    const init = mockMetaTransactionData<SupportedTransactionRequest>();

    describe(`when invoking the "waitNextEvent" method`, () => {
      it(`should
            - resolve with Success<TransactionEvent.${TransactionEvent.UPGRADED}> as the txHash changes while not yet indexed
            - and update the tx hash`, async () => {
        const indexingEvent = mockIndexingEvent({ indexed: false });
        const observer = MockedTransactionObserver.withIndexingEventsSequence({
          indexingId: init.indexingId,
          indexingEventsSequence: [indexingEvent],
        });
        const factory = setupTransactionFactory({ observer });

        const transaction = factory.createMetaTransaction(init);

        const result = await transaction.waitNextEvent();

        expect(result.unwrap()).toBe(TransactionEvent.UPGRADED);
        expect(transaction.hash).toEqual(indexingEvent.txHash);
      });

      it(`should:
            - resolve with Success<TransactionEvent.${TransactionEvent.SETTLED}> as soon as indexed by the BE
            - and update the tx hash if changed`, async () => {
        const indexingEvent = mockIndexingEvent({ indexed: true });
        const observer = MockedTransactionObserver.withIndexingEventsSequence({
          indexingId: init.indexingId,
          indexingEventsSequence: [indexingEvent],
        });
        const factory = setupTransactionFactory({ observer });

        const transaction = factory.createMetaTransaction(init);

        const result = await transaction.waitNextEvent();

        expect(result.unwrap()).toBe(TransactionEvent.SETTLED);
        expect(transaction.hash).toEqual(indexingEvent.txHash);
      });

      it(`should forward any ${TransactionError.name} from the ITransactionObserver`, async () => {
        const error = new TransactionError(TransactionErrorReason.MINING_TIMEOUT);
        const observer = MockedTransactionObserver.withIndexingEventsSequence({
          indexingId: init.indexingId,
          indexingEventsSequence: [error],
        });
        const factory = setupTransactionFactory({ observer });

        const transaction = factory.createMetaTransaction(init);

        const result = await transaction.waitNextEvent();

        expect(() => result.unwrap()).toThrow(error);
      });
    });
  });

  describe(`and an ${NativeTransaction.name} instance created via DeferredNativeTransactionInit<T>`, () => {
    describe(`when invoking the "waitNextEvent" method`, () => {
      const request = mock<SupportedTransactionRequest>();
      const relayResult = mockRelayReceipt();
      const successfulAsyncRelayReceipt = mockAsyncRelayReceipt(success(relayResult));
      const indexingId = faker.datatype.uuid();
      const chainType = ChainType.ETHEREUM;

      it(`should
          - resolve with Success<TransactionEvent.${TransactionEvent.BROADCASTED}> as the provided AsyncRelayReceipt resolves with a successful result
          - and update the tx hash`, async () => {
        const indexingEvent = mockIndexingEvent({ indexed: false });
        const observer = MockedTransactionObserver.withIndexingEventsSequence({
          indexingId,
          indexingEventsSequence: [indexingEvent],
        });
        const factory = setupTransactionFactory({ observer });

        const transaction = factory.createNativeTransaction({
          chainType,
          id: faker.datatype.uuid(),
          request,
          asyncRelayReceipt: successfulAsyncRelayReceipt,
        });
        const result = await transaction.waitNextEvent();

        expect(result.unwrap()).toBe(TransactionEvent.BROADCASTED);
        expect(transaction.hash).toEqual(relayResult.txHash);
      });

      it(`should forward any ${TransactionError.name} resulting from the provided AsyncRelayReceipt`, async () => {
        const error = new TransactionError(TransactionErrorReason.UNKNOWN);
        const factory = setupTransactionFactory();

        const transaction = factory.createNativeTransaction({
          chainType,
          id: faker.datatype.uuid(),
          request,
          asyncRelayReceipt: mockAsyncRelayReceipt(failure(error)),
        });
        const result = await transaction.waitNextEvent();

        expect(() => result.unwrap()).toThrow(error);
      });

      it(`should
          - resolve with Success<TransactionEvent.${TransactionEvent.UPGRADED}> as the txHash changes while not yet indexed
          - and update the tx hash`, async () => {
        const indexingEvent = mockIndexingEvent({ indexed: false });
        const observer = MockedTransactionObserver.withIndexingEventsSequence({
          indexingId: relayResult.indexingId,
          indexingEventsSequence: [indexingEvent],
        });
        const factory = setupTransactionFactory({ observer });

        const transaction = factory.createNativeTransaction({
          chainType,
          id: faker.datatype.uuid(),
          request,
          asyncRelayReceipt: successfulAsyncRelayReceipt,
        });
        await transaction.waitNextEvent();
        const result = await transaction.waitNextEvent();

        expect(result.unwrap()).toBe(TransactionEvent.UPGRADED);
        expect(transaction.hash).toEqual(indexingEvent.txHash);
      });

      it(`should:
          - resolve with Success<TransactionEvent.${TransactionEvent.SETTLED}> as soon as indexed by the BE
          - and update the tx hash if changed`, async () => {
        const indexingEvent = mockIndexingEvent({ indexed: true });
        const observer = MockedTransactionObserver.withIndexingEventsSequence({
          indexingId: relayResult.indexingId,
          indexingEventsSequence: [indexingEvent],
        });
        const factory = setupTransactionFactory({ observer });

        const transaction = factory.createNativeTransaction({
          chainType,
          id: faker.datatype.uuid(),
          request,
          asyncRelayReceipt: successfulAsyncRelayReceipt,
        });
        await transaction.waitNextEvent();
        const result = await transaction.waitNextEvent();

        expect(result.unwrap()).toBe(TransactionEvent.SETTLED);
        expect(transaction.hash).toEqual(indexingEvent.txHash);
      });

      it(`should forward any ${TransactionError.name} from the ITransactionObserver`, async () => {
        const error = new TransactionError(TransactionErrorReason.MINING_TIMEOUT);
        const observer = MockedTransactionObserver.withIndexingEventsSequence({
          indexingId: relayResult.indexingId,
          indexingEventsSequence: [error],
        });
        const factory = setupTransactionFactory({ observer });

        const transaction = factory.createNativeTransaction({
          chainType,
          id: faker.datatype.uuid(),
          request,
          asyncRelayReceipt: successfulAsyncRelayReceipt,
        });
        await transaction.waitNextEvent();
        const result = await transaction.waitNextEvent();

        expect(() => result.unwrap()).toThrow(error);
      });
    });
  });

  describe(`and an ${NativeTransaction.name} instance created via NativeTransactionData<T> with "indexingId"`, () => {
    const init = mockNativeTransactionDataWithIndexingId<SupportedTransactionRequest>();

    describe(`when invoking the "waitNextEvent" method`, () => {
      it(`should
          - resolve with Success<TransactionEvent.${TransactionEvent.UPGRADED}> as the txHash changes while not yet indexed
          - and update the tx hash`, async () => {
        const indexingEvent = mockIndexingEvent({ indexed: false });
        const observer = MockedTransactionObserver.withIndexingEventsSequence({
          indexingId: init.indexingId,
          indexingEventsSequence: [indexingEvent],
        });
        const factory = setupTransactionFactory({ observer });

        const transaction = factory.createNativeTransaction(init);
        const result = await transaction.waitNextEvent();

        expect(result.unwrap()).toBe(TransactionEvent.UPGRADED);
        expect(transaction.hash).toEqual(indexingEvent.txHash);
      });

      it(`should:
          - resolve with Success<TransactionEvent.${TransactionEvent.SETTLED}> as soon as indexed by the BE
          - and update the tx hash if changed`, async () => {
        const indexingEvent = mockIndexingEvent({ indexed: true });
        const observer = MockedTransactionObserver.withIndexingEventsSequence({
          indexingId: init.indexingId,
          indexingEventsSequence: [indexingEvent],
        });
        const factory = setupTransactionFactory({ observer });

        const transaction = factory.createNativeTransaction(init);
        const result = await transaction.waitNextEvent();

        expect(result.unwrap()).toBe(TransactionEvent.SETTLED);
        expect(transaction.hash).toEqual(indexingEvent.txHash);
      });

      it(`should forward any ${TransactionError.name} from the ITransactionObserver`, async () => {
        const error = new TransactionError(TransactionErrorReason.MINING_TIMEOUT);
        const observer = MockedTransactionObserver.withIndexingEventsSequence({
          indexingId: init.indexingId,
          indexingEventsSequence: [error],
        });
        const factory = setupTransactionFactory({ observer });

        const transaction = factory.createNativeTransaction(init);
        const result = await transaction.waitNextEvent();

        expect(() => result.unwrap()).toThrow(error);
      });
    });
  });

  describe(`and a ${NativeTransaction.name} instance created via NativeTransactionData<T> with NO "indexingId"`, () => {
    describe(`when invoking the "waitNextEvent" method`, () => {
      const init = mockNativeTransactionData<SupportedTransactionRequest>();

      it(`should resolve with Success<TransactionEvent.SETTLED> as soon as the transaction is executed`, async () => {
        const observer = MockedTransactionObserver.withExecutedOutcome({
          txHash: init.txHash,
          chainType: init.chainType,
          result: success(),
        });
        const factory = setupTransactionFactory({ observer });

        const transaction = factory.createNativeTransaction(init);
        const result = await transaction.waitNextEvent();

        expect(result.unwrap()).toBe(TransactionEvent.SETTLED);
      });
    });
  });

  describe(`and a ${ProxyTransaction.name} instance created via ProxyTransactionData<T>`, () => {
    describe(`when invoking the "waitNextEvent" method`, () => {
      describe('when provided with a ProxyTransactionData<T> instance', () => {
        describe(`when the returned proxy action status is ${ProxyActionStatus.COMPLETE}`, () => {
          it(`should:
              - resolve with Success<TransactionEvent.${TransactionEvent.SETTLED}>
              - update the tx hash`, async () => {
            const init = mockProxyTransactionData<SupportedTransactionRequest>();
            const proxyActionStatusEvent = mockProxyActionStatusEvent({
              txHash: mockTransactionHash(),
              status: ProxyActionStatus.COMPLETE,
            });
            const observer = MockedTransactionObserver.withIndexingEventsSequence({
              indexingId: init.proxyId,
              indexingEventsSequence: [proxyActionStatusEvent],
            });
            const factory = setupTransactionFactory({ observer });

            const transaction = factory.createProxyTransaction(init);
            const result = await transaction.waitNextEvent();

            expect(result.unwrap()).toBe(TransactionEvent.SETTLED);
            expect(transaction.hash).toEqual(proxyActionStatusEvent.txHash);
          });
        });

        describe(`when the proxy action status is first returned as ${ProxyActionStatus.MINTING}`, () => {
          it(`should:
              - resolve with Success<TransactionEvent.${TransactionEvent.BROADCASTED}>
              - update the status to ${ProxyActionStatus.MINTING}
              - update the tx hash`, async () => {
            const init = mockProxyTransactionData<SupportedTransactionRequest>({
              txHash: undefined,
              status: undefined,
            });

            const proxyActionStatusEvent = mockProxyActionStatusEvent({
              txHash: mockTransactionHash(),
              status: ProxyActionStatus.MINTING,
            });

            const observer = MockedTransactionObserver.withIndexingEventsSequence({
              indexingId: init.proxyId,
              indexingEventsSequence: [proxyActionStatusEvent],
            });
            const factory = setupTransactionFactory({ observer });

            const transaction = factory.createProxyTransaction(init);
            const result = await transaction.waitNextEvent();

            expect(result.unwrap()).toBe(TransactionEvent.BROADCASTED);
            expect(transaction.hash).toEqual(proxyActionStatusEvent.txHash);
            expect(transaction.status).toBe(ProxyActionStatus.MINTING);
          });
        });

        describe(`when the proxy action status changes from ${ProxyActionStatus.MINTING} to ${ProxyActionStatus.TRANSFERRING}`, () => {
          it(`should:
              - resolve with Success<TransactionEvent.${TransactionEvent.BROADCASTED}>
              - update the status to ${ProxyActionStatus.TRANSFERRING}
              - update the tx hash`, async () => {
            const init = mockProxyTransactionData<SupportedTransactionRequest>({
              status: ProxyActionStatus.MINTING,
            });

            const proxyActionStatusEvent = mockProxyActionStatusEvent({
              txHash: mockTransactionHash(),
              status: ProxyActionStatus.TRANSFERRING,
            });

            const observer = MockedTransactionObserver.withIndexingEventsSequence({
              indexingId: init.proxyId,
              indexingEventsSequence: [proxyActionStatusEvent],
            });
            const factory = setupTransactionFactory({ observer });

            const transaction = factory.createProxyTransaction(init);
            const result = await transaction.waitNextEvent();

            expect(result.unwrap()).toBe(TransactionEvent.BROADCASTED);
            expect(transaction.hash).toEqual(proxyActionStatusEvent.txHash);
            expect(transaction.status).toBe(ProxyActionStatus.TRANSFERRING);
          });
        });
      });

      describe('when the tx hash is upgraded for the same proxy action status', () => {
        describe(`and the current status is ${ProxyActionStatus.MINTING}`, () => {
          it(`should:
              - resolve with Success<TransactionEvent.${TransactionEvent.UPGRADED}>
              - maintain the status as ${ProxyActionStatus.MINTING}
              - update the tx hash`, async () => {
            const init = mockProxyTransactionData<SupportedTransactionRequest>({
              status: ProxyActionStatus.MINTING,
            });

            const proxyActionStatusEvent = mockProxyActionStatusEvent({
              txHash: mockTransactionHash(),
              status: ProxyActionStatus.MINTING,
            });

            const observer = MockedTransactionObserver.withIndexingEventsSequence({
              indexingId: init.proxyId,
              indexingEventsSequence: [proxyActionStatusEvent],
            });
            const factory = setupTransactionFactory({ observer });

            const transaction = factory.createProxyTransaction(init);
            const result = await transaction.waitNextEvent();

            expect(result.unwrap()).toBe(TransactionEvent.UPGRADED);
            expect(transaction.hash).toEqual(proxyActionStatusEvent.txHash);
            expect(transaction.status).toBe(ProxyActionStatus.MINTING);
          });
        });
        describe(`and the current status is ${ProxyActionStatus.TRANSFERRING}`, () => {
          it(`should:
              - resolve with Success<TransactionEvent.${TransactionEvent.UPGRADED}>
              - maintain the status as ${ProxyActionStatus.TRANSFERRING}
              - update the tx hash`, async () => {
            const init = mockProxyTransactionData<SupportedTransactionRequest>({
              status: ProxyActionStatus.TRANSFERRING,
            });

            const proxyActionStatusEvent = mockProxyActionStatusEvent({
              txHash: mockTransactionHash(),
              status: ProxyActionStatus.TRANSFERRING,
            });

            const observer = MockedTransactionObserver.withIndexingEventsSequence({
              indexingId: init.proxyId,
              indexingEventsSequence: [proxyActionStatusEvent],
            });
            const factory = setupTransactionFactory({ observer });

            const transaction = factory.createProxyTransaction(init);
            const result = await transaction.waitNextEvent();

            expect(result.unwrap()).toBe(TransactionEvent.UPGRADED);
            expect(transaction.hash).toEqual(proxyActionStatusEvent.txHash);
            expect(transaction.status).toBe(ProxyActionStatus.TRANSFERRING);
          });
        });
      });

      it(`should forward any ${TransactionError.name} from the ITransactionObserver`, async () => {
        const init = mockProxyTransactionData<SupportedTransactionRequest>();
        const error = new TransactionError(TransactionErrorReason.MINING_TIMEOUT);
        const observer = MockedTransactionObserver.withIndexingEventsSequence({
          indexingId: init.proxyId,
          indexingEventsSequence: [error],
        });
        const factory = setupTransactionFactory({ observer });

        const transaction = factory.createProxyTransaction(init);
        const result = await transaction.waitNextEvent();

        expect(() => result.unwrap()).toThrow(error);
      });
    });
  });
});
