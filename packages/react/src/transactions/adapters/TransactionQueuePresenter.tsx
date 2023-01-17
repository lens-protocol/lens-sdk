import { makeVar, useReactiveVar } from '@apollo/client';
import { TransactionError, TransactionErrorReason } from '@lens-protocol/domain/entities';
import {
  BroadcastedTransactionData,
  ITransactionQueuePresenter,
  PendingTransactionData,
  SupportedTransactionRequest,
  TransactionData,
} from '@lens-protocol/domain/use-cases/transactions';
import { CausedError } from '@lens-protocol/shared-kernel';

import { ErrorHandler } from '../../ErrorHandler';

export enum TxStatus {
  BROADCASTING = 'broadcasting',
  MINING = 'mining',
  SETTLED = 'settled',
  FAILED = 'failed',
}

type PendingTransactionState<T extends SupportedTransactionRequest> = {
  status: TxStatus.BROADCASTING | TxStatus.FAILED;
} & PendingTransactionData<T>;

type BroadcastedTransactionState<T extends SupportedTransactionRequest> = {
  status: TxStatus.MINING | TxStatus.SETTLED | TxStatus.FAILED;
} & BroadcastedTransactionData<T>;

export type TransactionState<T extends SupportedTransactionRequest> =
  | PendingTransactionState<T>
  | BroadcastedTransactionState<T>;

type PartialTransactionStateUpdate<T extends SupportedTransactionRequest> =
  | Partial<PendingTransactionState<T>>
  | Partial<BroadcastedTransactionState<T>>;

export const recentTransactions = makeVar<TransactionState<SupportedTransactionRequest>[]>([]);

export class FailedTransactionError extends CausedError {
  readonly data?: TransactionData<SupportedTransactionRequest>;

  constructor(cause: TransactionError, data: TransactionData<SupportedTransactionRequest>) {
    super(`Failed ${data.request.kind} transaction due to ${cause.reason}`, { cause });

    this.data = data;
  }
}

export class TransactionQueuePresenter<T extends SupportedTransactionRequest>
  implements ITransactionQueuePresenter<T>
{
  constructor(private readonly errorHandler: ErrorHandler<FailedTransactionError>) {}

  clearRecent(): void {
    const transactions = recentTransactions();
    const filteredTransactions = transactions.filter(
      (tx) => tx.status !== TxStatus.FAILED && tx.status !== TxStatus.SETTLED,
    );

    recentTransactions(filteredTransactions);
  }

  broadcasting(data: PendingTransactionData<T>): void {
    this.addTransaction({
      id: data.id,
      status: TxStatus.BROADCASTING,
      request: data.request,
    });
  }

  mining(data: BroadcastedTransactionData<T>): void {
    if (recentTransactions().find(({ id }) => id === data.id)) {
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
    const transactions = recentTransactions();
    recentTransactions([data, ...transactions]);
  }

  private updateById(
    id: string,
    update: PartialTransactionStateUpdate<SupportedTransactionRequest>,
  ) {
    const transactions = recentTransactions();

    recentTransactions(
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

export function useRecentTransactionsVar() {
  return useReactiveVar(recentTransactions);
}

type Predicate<T extends SupportedTransactionRequest> = (
  txState: TransactionState<SupportedTransactionRequest>,
) => txState is TransactionState<T>;

function hasTransactionWith<T extends SupportedTransactionRequest>(
  transactions: TransactionState<SupportedTransactionRequest>[],
  statuses: ReadonlyArray<TxStatus>,
  predicate: Predicate<T>,
) {
  return transactions.some((txState) => statuses.includes(txState.status) && predicate(txState));
}

function delay(waitInMs: number) {
  return new Promise((resolve) => setTimeout(resolve, waitInMs));
}

export function useHasPendingTransaction<T extends SupportedTransactionRequest>(
  predicate: Predicate<T>,
) {
  const transactions = useRecentTransactionsVar();
  return hasTransactionWith(transactions, [TxStatus.BROADCASTING, TxStatus.MINING], predicate);
}

const FIFTEEN_SECONDS = 1000 * 15; // ms

export function useWaitUntilTransactionSettled<T extends SupportedTransactionRequest>(
  waitTimeInMs: number = FIFTEEN_SECONDS,
) {
  return async (predicate: Predicate<T>) => {
    const resolveWhenNoPendingTransactions = new Promise<void>((resolve) => {
      const resolver = (value: TransactionState<SupportedTransactionRequest>[]) => {
        if (hasTransactionWith(value, [TxStatus.SETTLED], predicate)) {
          return resolve();
        }
        return recentTransactions.onNextChange(resolver);
      };
      recentTransactions.onNextChange(resolver);
    });
    const waitForSpecifiedTime = delay(waitTimeInMs).then(() => {
      throw new TransactionError(TransactionErrorReason.MINING_TIMEOUT);
    });
    await Promise.race([resolveWhenNoPendingTransactions, waitForSpecifiedTime]);
  };
}

export function useHasSettledTransaction<T extends SupportedTransactionRequest>(
  predicate: Predicate<T>,
) {
  const transactions = useRecentTransactionsVar();
  return hasTransactionWith(transactions, [TxStatus.SETTLED], predicate);
}
