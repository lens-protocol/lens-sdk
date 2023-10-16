import { makeVar, useReactiveVar } from '@apollo/client';
import {
  PublicationId,
  TransactionError,
  TransactionErrorReason,
  TransactionKind,
} from '@lens-protocol/domain/entities';
import { OpenActionRequest, AllOpenActionType } from '@lens-protocol/domain/use-cases/publications';
import { AnyTransactionRequest } from '@lens-protocol/domain/use-cases/transactions';
import { DateUtils } from '@lens-protocol/shared-kernel';

export enum TxStatus {
  /**
   * A pending transaction is a transaction that is either mining or it's mined but not indexed yet.
   */
  PENDING = 'pending',

  /**
   * A settled transaction is a transaction that is mined and indexed.
   */
  SETTLED = 'settled',

  /**
   * A failed transaction is a transaction that failed to be broadcasted or it failed to be mined.
   */
  FAILED = 'failed',
}

/**
 * Describe the state of a transaction and the originating request.
 */
export type TransactionState<T extends AnyTransactionRequest> =
  | {
      status: TxStatus.PENDING | TxStatus.SETTLED;
      id: string;
      request: T;
      txHash?: string;
    }
  | {
      status: TxStatus.FAILED;
      id: string;
      request: T;
      txHash?: string;
      error: TransactionError;
    };

export const recentTransactionsVar = makeVar<TransactionState<AnyTransactionRequest>[]>([]);

export type TransactionStatusPredicate<T extends AnyTransactionRequest> = (
  txState: TransactionState<AnyTransactionRequest>,
) => txState is TransactionState<T>;

function hasTransactionWith<T extends AnyTransactionRequest>(
  transactions: TransactionState<AnyTransactionRequest>[],
  statuses: ReadonlyArray<TxStatus>,
  predicate: TransactionStatusPredicate<T>,
) {
  return transactions.some((txState) => statuses.includes(txState.status) && predicate(txState));
}

function delay(waitInMs: number) {
  return new Promise((resolve) => setTimeout(resolve, waitInMs));
}

export function useRecentTransactionsVar() {
  return useReactiveVar(recentTransactionsVar);
}

/**
 * @deprecated use a FieldPolicy if possible
 */
export function useHasPendingTransaction<T extends AnyTransactionRequest>(
  predicate: TransactionStatusPredicate<T>,
) {
  const transactions = useRecentTransactionsVar();

  return hasTransactionWith(transactions, [TxStatus.PENDING], predicate);
}

const FIFTEEN_SECONDS = DateUtils.secondsToMs(30);

/**
 * @deprecated use AsyncTransactionResult instead
 */
export function useWaitUntilTransactionSettled(waitTimeInMs: number = FIFTEEN_SECONDS) {
  return async <T extends AnyTransactionRequest>(predicate: TransactionStatusPredicate<T>) => {
    const resolveWhenNoPendingTransactions = new Promise<void>((resolve) => {
      const resolver = (value: TransactionState<AnyTransactionRequest>[]) => {
        if (hasTransactionWith(value, [TxStatus.SETTLED], predicate)) {
          return resolve();
        }
        return recentTransactionsVar.onNextChange(resolver);
      };
      recentTransactionsVar.onNextChange(resolver);
    });
    const waitForSpecifiedTime = delay(waitTimeInMs).then(() => {
      throw new TransactionError(TransactionErrorReason.INDEXING_TIMEOUT);
    });
    await Promise.race([resolveWhenNoPendingTransactions, waitForSpecifiedTime]);
  };
}

function isCollectTransaction(
  transaction: TransactionState<AnyTransactionRequest>,
): transaction is TransactionState<OpenActionRequest> {
  return (
    transaction.request.kind === TransactionKind.ACT_ON_PUBLICATION &&
    [
      AllOpenActionType.LEGACY_COLLECT,
      AllOpenActionType.SIMPLE_COLLECT,
      AllOpenActionType.MULTIRECIPIENT_COLLECT,
    ].includes(transaction.request.type)
  );
}

export function countAnyPendingCollectFor(publicationId: PublicationId) {
  return recentTransactionsVar().reduce(
    (count, transaction) =>
      count +
      (isCollectTransaction(transaction) &&
      transaction.status === TxStatus.PENDING &&
      transaction.request.publicationId === publicationId
        ? 1
        : 0),
    0,
  );
}

export function countAnyPendingCollect() {
  return recentTransactionsVar().reduce(
    (count, transaction) =>
      count +
      (isCollectTransaction(transaction) && transaction.status === TxStatus.PENDING ? 1 : 0),
    0,
  );
}
