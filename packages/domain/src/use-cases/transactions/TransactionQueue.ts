import { failure, invariant, PromiseResult, success } from '@lens-protocol/shared-kernel';

import {
  Transaction,
  TransactionError,
  TransactionKind,
  AnyTransactionRequestModel,
  TransactionEvent,
} from '../../entities';

export type NewTransactionsSubscriber<T extends AnyTransactionRequestModel> = (
  transactions: readonly Transaction<T>[],
) => void;

export interface IPendingTransactionGateway<T extends AnyTransactionRequestModel> {
  getAll(): Promise<readonly Transaction<T>[]>;
  save(tx: Transaction<T>): Promise<void>;
  remove(id: string): Promise<void>;
  subscribe(subscriber: NewTransactionsSubscriber<T>): void;
}

export type TransactionData<T extends AnyTransactionRequestModel> = {
  id: string;
  request: T;
  txHash?: string;
};

export interface ITransactionResponder<T extends AnyTransactionRequestModel> {
  prepare?(data: TransactionData<T>): Promise<unknown>;
  commit(data: TransactionData<T>): Promise<unknown>;
  rollback?(data: TransactionData<T>): Promise<unknown>;
}

function transactionData<T extends AnyTransactionRequestModel>(
  tx: Transaction<T>,
): TransactionData<T> {
  if ('hash' in tx) {
    return {
      id: tx.id,
      request: tx.request,
      txHash: tx.hash,
    };
  }
  return {
    id: tx.id,
    request: tx.request,
  };
}

export interface ITransactionQueuePresenter<T extends AnyTransactionRequestModel> {
  pending(data: TransactionData<T>): void;

  settled(data: TransactionData<T>): void;

  failed(error: TransactionError, data: TransactionData<T>): void;

  clearRecent(): void;
}

export type TransactionResponders<T extends AnyTransactionRequestModel> = {
  [K in TransactionKind]: ITransactionResponder<Extract<T, { kind: K }>>;
};

export class TransactionQueue<T extends AnyTransactionRequestModel> {
  private initialized = false;

  constructor(
    private readonly responders: TransactionResponders<T>,
    private readonly transactionGateway: IPendingTransactionGateway<T>,
    private readonly transactionQueuePresenter: ITransactionQueuePresenter<T>,
  ) {}

  clearRecent() {
    // This method might seem a bit weird, but it's actually a precursor to the
    // fully fledged solution which will store the transactions in the localStorage (at first).
    this.transactionQueuePresenter.clearRecent();
  }

  async push(transaction: Transaction<T>): Promise<void> {
    await this.transactionGateway.save(transaction);
    await this.handle(transaction);
  }

  async init() {
    invariant(!this.initialized, `${TransactionQueue.name} already initialized`);

    const transactions = await this.transactionGateway.getAll();

    for (const transaction of transactions) {
      await this.handle(transaction);
    }
    this.transactionGateway.subscribe(async (newTransactions) => {
      for (const transaction of newTransactions) {
        await this.handle(transaction);
      }
    });
    this.initialized = true;
  }

  private async handle(transaction: Transaction<T>) {
    const txData = transactionData(transaction);
    await this.prepare(txData);
    void this.observe(transaction);
  }

  private async observe(transaction: Transaction<T>): Promise<void> {
    const result = await this.waitCompletion(transaction);
    await this.transactionGateway.remove(transaction.id);

    if (result.isFailure()) {
      const txData = transactionData(transaction);
      await this.rollback(result.error, txData);
      return;
    }

    const txData = transactionData(transaction);
    await this.commit(txData);
  }

  private async prepare(txData: TransactionData<T>) {
    const responder = this.getResponderFor(txData.request.kind);
    await responder.prepare?.(txData);
    this.transactionQueuePresenter.pending(txData);
  }

  private async commit(txData: TransactionData<T>) {
    const responder = this.getResponderFor(txData.request.kind);
    await responder.commit(txData);
    this.transactionQueuePresenter.settled(txData);
  }

  private async rollback(error: TransactionError, txData: TransactionData<T>) {
    const responder = this.getResponderFor(txData.request.kind);
    await responder.rollback?.(txData);
    this.transactionQueuePresenter.failed(error, txData);
  }

  private async waitCompletion(transaction: Transaction<T>): PromiseResult<void, TransactionError> {
    while (true) {
      const result = await transaction.waitNextEvent();

      if (result.isFailure()) {
        return failure(result.error);
      }

      if (result.value === TransactionEvent.SETTLED) {
        return success();
      }

      this.transactionQueuePresenter.pending(transactionData(transaction));

      await this.transactionGateway.save(transaction);
    }
  }

  private getResponderFor(kind: TransactionKind): ITransactionResponder<T> {
    return this.responders[kind];
  }
}
