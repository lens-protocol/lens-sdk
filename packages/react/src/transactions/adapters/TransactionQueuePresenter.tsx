import {
  recentTransactionsVar,
  TxStatus,
  PendingTransactionState,
  BroadcastedTransactionState,
  TransactionState,
} from '@lens-protocol/api-bindings';
import { TransactionError } from '@lens-protocol/domain/entities';
import {
  BroadcastedTransactionData,
  ITransactionQueuePresenter,
  PendingTransactionData,
  SupportedTransactionRequest,
  TransactionData,
} from '@lens-protocol/domain/use-cases/transactions';
import { CausedError } from '@lens-protocol/shared-kernel';

import { ErrorHandler } from '../../ErrorHandler';

/**
 * Error thrown when a transaction fails
 */
export class FailedTransactionError extends CausedError {
  readonly data?: TransactionData<SupportedTransactionRequest>;

  constructor(cause: TransactionError, data: TransactionData<SupportedTransactionRequest>) {
    super(`Failed ${data.request.kind} transaction due to ${cause.reason}`, { cause });

    this.data = data;
  }
}

type PartialTransactionStateUpdate<T extends SupportedTransactionRequest> =
  | Partial<PendingTransactionState<T>>
  | Partial<BroadcastedTransactionState<T>>;

export class TransactionQueuePresenter<T extends SupportedTransactionRequest>
  implements ITransactionQueuePresenter<T>
{
  constructor(private readonly errorHandler: ErrorHandler<FailedTransactionError>) {}

  clearRecent(): void {
    const transactions = recentTransactionsVar();
    const filteredTransactions = transactions.filter(
      (tx) => tx.status !== TxStatus.FAILED && tx.status !== TxStatus.SETTLED,
    );

    recentTransactionsVar(filteredTransactions);
  }

  broadcasting(data: PendingTransactionData<T>): void {
    this.addTransaction({
      id: data.id,
      status: TxStatus.BROADCASTING,
      request: data.request,
    });
  }

  mining(data: BroadcastedTransactionData<T>): void {
    if (recentTransactionsVar().find(({ id }) => id === data.id)) {
      this.updateById(data.id, {
        ...data,
        status: TxStatus.MINING,
      });
    } else {
      this.addTransaction({
        id: data.id,
        status: TxStatus.MINING,
        request: data.request,
        txHash: data.txHash,
      });
    }
  }

  settled(data: BroadcastedTransactionData<T>): void {
    this.updateById(data.id, { status: TxStatus.SETTLED });
  }

  failed(error: TransactionError, data: TransactionData<T>): void {
    this.errorHandler(new FailedTransactionError(error, data));
    this.updateById(data.id, { status: TxStatus.FAILED });
  }

  private addTransaction(data: TransactionState<SupportedTransactionRequest>) {
    const transactions = recentTransactionsVar();
    recentTransactionsVar([data, ...transactions]);
  }

  private updateById(
    id: string,
    update: PartialTransactionStateUpdate<SupportedTransactionRequest>,
  ) {
    const transactions = recentTransactionsVar();

    recentTransactionsVar(
      transactions.map((data) => {
        if (id === data.id) {
          return {
            ...data,
            ...update,
          } as TransactionState<SupportedTransactionRequest>;
        }
        return data;
      }),
    );
  }
}
