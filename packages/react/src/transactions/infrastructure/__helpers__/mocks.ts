import { ProxyActionStatus, TransactionError } from '@lens-protocol/domain/entities';
import { mockTransactionHash } from '@lens-protocol/domain/mocks';
import {
  ChainType,
  failure,
  invariant,
  never,
  PromiseResult,
  Result,
  success,
} from '@lens-protocol/shared-kernel';

import { IndexingEvent, ITransactionObserver, ProxyActionStatusEvent } from '../TransactionFactory';

type MockedTransactionObserverWaitForExecutedInstructions = {
  txHash: string;
  chainType: ChainType;
  result: Result<void, TransactionError>;
};

type MockedTransactionObserverWaitForNextIndexingEventInstructions = {
  indexingId: string;
  indexingEventsSequence: Array<IndexingEvent | ProxyActionStatusEvent | TransactionError>;
};

type MockedTransactionObserverInstructions =
  | MockedTransactionObserverWaitForExecutedInstructions
  | MockedTransactionObserverWaitForNextIndexingEventInstructions;

export class MockedTransactionObserver implements ITransactionObserver {
  private constructor(private readonly instructions: MockedTransactionObserverInstructions) {}

  async waitForExecuted(
    txHash: string,
    chainType: ChainType,
  ): PromiseResult<void, TransactionError> {
    if (!('txHash' in this.instructions)) {
      throw new Error('Method not implemented.');
    }
    invariant(txHash === this.instructions.txHash, 'txHash mismatch');
    invariant(chainType === this.instructions.chainType, 'chainType mismatch');

    return this.instructions.result;
  }

  async waitForNextIndexingEvent(
    indexingId: string,
  ): PromiseResult<IndexingEvent, TransactionError> {
    if (!('indexingId' in this.instructions)) {
      throw new Error('Method not implemented.');
    }
    invariant(
      indexingId === this.instructions.indexingId,
      `Indexing ID mismatch, expected: ${this.instructions.indexingId}, got: ${indexingId}`,
    );
    const item = this.instructions.indexingEventsSequence.shift();

    invariant(item, 'Indexing events sequence is empty');

    if (item instanceof TransactionError) {
      return failure(item);
    }

    if ('indexed' in item) {
      return success(item);
    }

    never(`Unexpected item in indexing events sequence`);
  }

  async waitForProxyTransactionStatus(
    indexingId: string,
  ): PromiseResult<ProxyActionStatusEvent, TransactionError> {
    if (!('indexingId' in this.instructions)) {
      throw new Error('Method not implemented.');
    }
    invariant(
      indexingId === this.instructions.indexingId,
      `Indexing ID mismatch, expected: ${this.instructions.indexingId}, got: ${indexingId}`,
    );
    const item = this.instructions.indexingEventsSequence.shift();

    invariant(item, 'Indexing events sequence is empty');

    if (item instanceof TransactionError) {
      return failure(item);
    }

    if ('status' in item) {
      return success(item);
    }

    never(`Unexpected item in indexing events sequence`);
  }

  static withIndexingEventsSequence(
    instructions: MockedTransactionObserverWaitForNextIndexingEventInstructions,
  ): MockedTransactionObserver {
    return new MockedTransactionObserver(instructions);
  }

  static withExecutedOutcome(instructions: MockedTransactionObserverWaitForExecutedInstructions) {
    return new MockedTransactionObserver(instructions);
  }
}

export function mockProxyActionStatusEvent(
  overrides?: Partial<ProxyActionStatusEvent>,
): ProxyActionStatusEvent {
  return {
    txHash: mockTransactionHash(),
    status: ProxyActionStatus.MINTING,
    ...overrides,
  };
}
