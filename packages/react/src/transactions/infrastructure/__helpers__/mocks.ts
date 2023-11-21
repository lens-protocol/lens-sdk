import { TransactionError } from '@lens-protocol/domain/entities';
import {
  ChainType,
  failure,
  invariant,
  never,
  PromiseResult,
  Result,
  success,
} from '@lens-protocol/shared-kernel';

import {
  ConfirmationRequest,
  IndexingEvent,
  IndexingEventRequest,
  ITransactionObserver,
} from '../TransactionFactory';

type WaitForConfirmationInstructions = {
  txHash: string;
  chainType: ChainType;
  result: Result<void, TransactionError>;
};

type WaitForNextIndexingEventInstructions = {
  request: IndexingEventRequest;
  events: Array<IndexingEvent | TransactionError>;
};

type MockedTransactionObserverInstructions =
  | WaitForConfirmationInstructions
  | WaitForNextIndexingEventInstructions;

export class MockedTransactionObserver implements ITransactionObserver {
  private constructor(private readonly instructions: MockedTransactionObserverInstructions) {}

  async waitForConfirmation({
    txHash,
    chainType,
  }: ConfirmationRequest): PromiseResult<void, TransactionError> {
    if (!('txHash' in this.instructions)) {
      throw new Error('Method not implemented.');
    }
    invariant(txHash === this.instructions.txHash, 'txHash mismatch');
    invariant(chainType === this.instructions.chainType, 'chainType mismatch');

    return this.instructions.result;
  }

  async waitForNextIndexingEvent(
    request: IndexingEventRequest,
  ): PromiseResult<IndexingEvent, TransactionError> {
    if (!('events' in this.instructions)) {
      throw new Error('Method not implemented.');
    }
    invariant(
      JSON.stringify(request) === JSON.stringify(this.instructions.request),
      'Indexing event request mismatch',
    );

    const item = this.instructions.events.shift();

    invariant(item, 'Indexing events sequence is empty');

    if (item instanceof TransactionError) {
      return failure(item);
    }

    if ('indexed' in item) {
      return success(item);
    }

    never(`Unexpected item in indexing events sequence`);
  }

  static withIndexingEventSequence(
    instructions: WaitForNextIndexingEventInstructions,
  ): MockedTransactionObserver {
    return new MockedTransactionObserver(instructions);
  }

  static withExecutedOutcome(instructions: WaitForConfirmationInstructions) {
    return new MockedTransactionObserver(instructions);
  }
}
