import { faker } from '@faker-js/faker';
import {
  MetaTransaction,
  NativeTransaction,
  ProtocolTransactionKinds,
  TransactionError,
  TransactionErrorReason,
  TransactionEvent,
  TransactionKind,
} from '@lens-protocol/domain/entities';
import { mockTransactionHash, mockAnyTransactionRequestModel } from '@lens-protocol/domain/mocks';
import {
  ProtocolTransactionRequest,
  AnyTransactionRequest,
} from '@lens-protocol/domain/use-cases/transactions';
import { never, success } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';

import {
  mockMetaTransactionData,
  mockNativeTransactionData,
  mockNativeTransactionDataWithRelayerTxId,
} from '../../adapters/__helpers__/mocks';
import { IndexingEvent, ITransactionObserver, TransactionFactory } from '../TransactionFactory';
import { MockedTransactionObserver } from '../__helpers__/mocks';

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
    const init = mockMetaTransactionData<ProtocolTransactionRequest>();

    describe(`when invoking the "waitNextEvent" method`, () => {
      it(`should
          - resolve with Success<TransactionEvent.${TransactionEvent.UPGRADED}> as the txHash changes while not yet indexed
          - and update the tx hash`, async () => {
        const indexingEvent = mockIndexingEvent({ indexed: false });
        const observer = MockedTransactionObserver.withIndexingEventSequence({
          request: {
            relayerTxId: init.relayerTxId,
          },
          events: [indexingEvent],
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
        const observer = MockedTransactionObserver.withIndexingEventSequence({
          request: {
            relayerTxId: init.relayerTxId,
          },
          events: [indexingEvent],
        });
        const factory = setupTransactionFactory({ observer });

        const transaction = factory.createMetaTransaction(init);

        const result = await transaction.waitNextEvent();

        expect(result.unwrap()).toBe(TransactionEvent.SETTLED);
        expect(transaction.hash).toEqual(indexingEvent.txHash);
      });

      it(`should forward any ${TransactionError.name} from the ITransactionObserver`, async () => {
        const error = new TransactionError(TransactionErrorReason.MINING_TIMEOUT);
        const observer = MockedTransactionObserver.withIndexingEventSequence({
          request: {
            relayerTxId: init.relayerTxId,
          },
          events: [error],
        });
        const factory = setupTransactionFactory({ observer });

        const transaction = factory.createMetaTransaction(init);

        const result = await transaction.waitNextEvent();

        expect(() => result.unwrap()).toThrow(error);
      });
    });
  });

  describe(`and a ${NativeTransaction.name} instance created via NativeTransactionData<ProtocolTransactionRequest>`, () => {
    describe(`with "relayerTxId"`, () => {
      const init = mockNativeTransactionDataWithRelayerTxId<AnyTransactionRequest>();

      describe(`when invoking the "waitNextEvent" method`, () => {
        it(`should
            - resolve with Success<TransactionEvent.${TransactionEvent.UPGRADED}> as the txHash changes while not yet indexed
            - and update the tx hash`, async () => {
          const indexingEvent = mockIndexingEvent({ indexed: false });
          const observer = MockedTransactionObserver.withIndexingEventSequence({
            request: {
              relayerTxId: init.relayerTxId,
            },
            events: [indexingEvent],
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
          const observer = MockedTransactionObserver.withIndexingEventSequence({
            request: {
              relayerTxId: init.relayerTxId,
            },
            events: [indexingEvent],
          });
          const factory = setupTransactionFactory({ observer });

          const transaction = factory.createNativeTransaction(init);
          const result = await transaction.waitNextEvent();

          expect(result.unwrap()).toBe(TransactionEvent.SETTLED);
          expect(transaction.hash).toEqual(indexingEvent.txHash);
        });

        it(`should forward any ${TransactionError.name} from the ITransactionObserver`, async () => {
          const error = new TransactionError(TransactionErrorReason.MINING_TIMEOUT);
          const observer = MockedTransactionObserver.withIndexingEventSequence({
            request: {
              relayerTxId: init.relayerTxId,
            },
            events: [error],
          });
          const factory = setupTransactionFactory({ observer });

          const transaction = factory.createNativeTransaction(init);
          const result = await transaction.waitNextEvent();

          expect(() => result.unwrap()).toThrow(error);
        });
      });
    });

    describe(`with NO "relayerTxId"`, () => {
      describe(`when invoking the "waitNextEvent" method`, () => {
        const anyKind = faker.helpers.arrayElement(Object.values(ProtocolTransactionKinds));
        const init = mockNativeTransactionData({
          request: mockAnyTransactionRequestModel({ kind: anyKind }) as AnyTransactionRequest,
        });

        it(`should resolve with Success<TransactionEvent.SETTLED> as soon as indexed by the BE`, async () => {
          const indexingEvent = mockIndexingEvent({ indexed: true });
          const observer = MockedTransactionObserver.withIndexingEventSequence({
            request: {
              txHash: init.txHash ?? never(),
            },
            events: [indexingEvent],
          });
          const factory = setupTransactionFactory({ observer });

          const transaction = factory.createNativeTransaction(init);
          const result = await transaction.waitNextEvent();

          expect(result.unwrap()).toBe(TransactionEvent.SETTLED);
        });
      });
    });
  });

  describe(`and a ${NativeTransaction.name} instance created via NativeTransactionData<TokenAllowanceRequest>`, () => {
    describe(`when invoking the "waitNextEvent" method`, () => {
      const init = mockNativeTransactionData({
        request: mockAnyTransactionRequestModel({
          kind: TransactionKind.APPROVE_MODULE,
        }) as AnyTransactionRequest,
      });

      it(`should resolve with Success<TransactionEvent.SETTLED> as soon as the transaction is executed`, async () => {
        const observer = MockedTransactionObserver.withExecutedOutcome({
          txHash: init.txHash ?? never(),
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
});
