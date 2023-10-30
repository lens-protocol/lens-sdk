import { makeVar, useReactiveVar } from '@apollo/client';
import {
  ProfileId,
  PublicationId,
  TransactionError,
  TransactionErrorReason,
  TransactionKind,
} from '@lens-protocol/domain/entities';
import {
  UnblockProfilesRequest,
  FollowRequest,
  UnfollowRequest,
} from '@lens-protocol/domain/use-cases/profile';
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

function isUnblockTransaction(
  transaction: TransactionState<AnyTransactionRequest>,
): transaction is TransactionState<UnblockProfilesRequest> {
  return transaction.request.kind === TransactionKind.UNBLOCK_PROFILE;
}

export function hasPendingUnblockForProfile(profileId: ProfileId) {
  return recentTransactionsVar().some((transaction) => {
    return (
      isUnblockTransaction(transaction) &&
      transaction.status === TxStatus.PENDING &&
      transaction.request.profileIds.includes(profileId)
    );
  });
}

function isBlockTransaction(
  transaction: TransactionState<AnyTransactionRequest>,
): transaction is TransactionState<UnblockProfilesRequest> {
  return transaction.request.kind === TransactionKind.BLOCK_PROFILE;
}

export function hasPendingBlockForProfile(profileId: ProfileId) {
  return recentTransactionsVar().some((transaction) => {
    return (
      isBlockTransaction(transaction) &&
      transaction.status === TxStatus.PENDING &&
      transaction.request.profileIds.includes(profileId)
    );
  });
}

function isFollowTransaction(
  transaction: TransactionState<AnyTransactionRequest>,
): transaction is TransactionState<FollowRequest> {
  return transaction.request.kind === TransactionKind.FOLLOW_PROFILE;
}

export function countPendingFollowFor(profileId: ProfileId) {
  return recentTransactionsVar().reduce(
    (count, transaction) =>
      count +
      (isFollowTransaction(transaction) &&
      transaction.request.profileId === profileId &&
      transaction.status === TxStatus.PENDING
        ? 1
        : 0),
    0,
  );
}

function isUnfollowTransaction(
  transaction: TransactionState<AnyTransactionRequest>,
): transaction is TransactionState<UnfollowRequest> {
  return transaction.request.kind === TransactionKind.UNFOLLOW_PROFILE;
}

export function countPendingUnfollowFor(profileId: ProfileId) {
  return recentTransactionsVar().reduce(
    (count, transaction) =>
      count +
      (isUnfollowTransaction(transaction) &&
      transaction.request.profileId === profileId &&
      transaction.status === TxStatus.PENDING
        ? 1
        : 0),
    0,
  );
}
