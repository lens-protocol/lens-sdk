import {
  MetaTransaction,
  NativeTransaction,
  ProxyActionStatus,
  ProxyTransaction,
  TransactionError,
  TransactionErrorReason,
  TransactionEvent,
} from '@lens-protocol/domain/entities';
import { mockTransactionHash } from '@lens-protocol/domain/mocks';
import { SupportedTransactionRequest } from '@lens-protocol/domain/use-cases/transactions';
import { success } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';

import {
  mockMetaTransactionData,
  mockNativeTransactionData,
  mockNativeTransactionDataWithIndexingId,
  mockProxyTransactionData,
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
    describe(`when invoking the ${ProxyTransaction.name}#waitNextEvent() method`, () => {
      it(`should:
          - resolve with Success<TransactionEvent.${TransactionEvent.SETTLED}> as soon as the proxy action status is ${ProxyActionStatus.COMPLETE}
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

      it(`should:
          - resolve with Success<TransactionEvent.${TransactionEvent.BROADCASTED}>  as soon as the proxy action status is ${ProxyActionStatus.MINTING}
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

      it(`should:
          - resolve with Success<TransactionEvent.${TransactionEvent.BROADCASTED}> as soon as the proxy action status transitions from ${ProxyActionStatus.MINTING} to ${ProxyActionStatus.TRANSFERRING}
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

      it(`should reflect tx hash changes  the proxy action status is ${ProxyActionStatus.MINTING}`, async () => {
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

      it(`should reflect tx hash changes  the proxy action status is ${ProxyActionStatus.TRANSFERRING}`, async () => {
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
