import { makeVar, useReactiveVar } from '@apollo/client';
import {
  ProfileId,
  PublicationId,
  TransactionError,
  TransactionErrorReason,
  TransactionKind,
} from '@lens-protocol/domain/entities';
import { FollowRequest, UnfollowRequest } from '@lens-protocol/domain/use-cases/profile';
import { CollectRequest, CreateMirrorRequest } from '@lens-protocol/domain/use-cases/publications';
import { SupportedTransactionRequest } from '@lens-protocol/domain/use-cases/transactions';
import { DateUtils, EthereumAddress } from '@lens-protocol/shared-kernel';

export enum TxStatus {
  /**
   * @deprecated Use {@link TxStatus.PENDING} instead. It will be removed in the next major version.
   */
  BROADCASTING = 'pending',

  /**
   * @deprecated Use {@link TxStatus.PENDING} instead. It will be removed in the next major version.
   */
  MINING = 'pending',

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

const PENDING_STATUSES = [TxStatus.BROADCASTING, TxStatus.MINING];

/**
 * @deprecated Use {@link TransactionState} instead. It will be removed in the next major version.
 */
export type PendingTransactionState<T extends SupportedTransactionRequest> = {
  status: TxStatus.BROADCASTING | TxStatus.FAILED;
  id: string;
  request: T;
};

/**
 * @deprecated Use {@link TransactionState} instead. It will be removed in the next major version.
 */
export type BroadcastedTransactionState<T extends SupportedTransactionRequest> = {
  status: TxStatus.MINING | TxStatus.SETTLED | TxStatus.FAILED;
  id: string;
  request: T;
  txHash: string;
};

/**
 * Describe the state of a transaction and the originating request.
 */
export type TransactionState<T extends SupportedTransactionRequest> = {
  status: TxStatus;
  id: string;
  request: T;
  txHash?: string;
};

export const recentTransactionsVar = makeVar<TransactionState<SupportedTransactionRequest>[]>([]);

type TransactionStatusPredicate<T extends SupportedTransactionRequest> = (
  txState: TransactionState<SupportedTransactionRequest>,
) => txState is TransactionState<T>;

function hasTransactionWith<T extends SupportedTransactionRequest>(
  transactions: TransactionState<SupportedTransactionRequest>[],
  statuses: ReadonlyArray<TxStatus>,
  predicate: TransactionStatusPredicate<T>,
) {
  return transactions.some((txState) => statuses.includes(txState.status) && predicate(txState));
}

export function hasPendingTransactionWith<T extends SupportedTransactionRequest>(
  predicate: TransactionStatusPredicate<T>,
) {
  return hasTransactionWith(recentTransactionsVar(), PENDING_STATUSES, predicate);
}

export function hasSettledTransactionWith<T extends SupportedTransactionRequest>(
  predicate: TransactionStatusPredicate<T>,
) {
  return hasTransactionWith(recentTransactionsVar(), [TxStatus.SETTLED], predicate);
}

export function getAllPendingTransactions() {
  return recentTransactionsVar().filter((txState) => PENDING_STATUSES.includes(txState.status));
}

function delay(waitInMs: number) {
  return new Promise((resolve) => setTimeout(resolve, waitInMs));
}

export function useRecentTransactionsVar() {
  return useReactiveVar(recentTransactionsVar);
}

export function useHasPendingTransaction<T extends SupportedTransactionRequest>(
  predicate: TransactionStatusPredicate<T>,
) {
  const transactions = useRecentTransactionsVar();

  return hasTransactionWith(transactions, PENDING_STATUSES, predicate);
}

const FIFTEEN_SECONDS = DateUtils.secondsToMs(30);

export function useWaitUntilTransactionSettled(waitTimeInMs: number = FIFTEEN_SECONDS) {
  return async <T extends SupportedTransactionRequest>(
    predicate: TransactionStatusPredicate<T>,
  ) => {
    const resolveWhenNoPendingTransactions = new Promise<void>((resolve) => {
      const resolver = (value: TransactionState<SupportedTransactionRequest>[]) => {
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

export function isFollowTransactionFor({
  profileId,
  followerAddress,
}: {
  profileId: ProfileId;
  followerAddress: EthereumAddress;
}): TransactionStatusPredicate<FollowRequest> {
  return (transaction): transaction is TransactionState<FollowRequest> =>
    transaction.request.kind === TransactionKind.FOLLOW_PROFILES &&
    transaction.request.profileId === profileId &&
    transaction.request.followerAddress === followerAddress;
}

export function isUnfollowTransactionFor({
  profileId,
}: {
  profileId: ProfileId;
}): TransactionStatusPredicate<UnfollowRequest> {
  return (transaction): transaction is TransactionState<UnfollowRequest> =>
    transaction.request.kind === TransactionKind.UNFOLLOW_PROFILE &&
    transaction.request.profileId === profileId;
}

export function isCollectTransactionFor({
  publicationId,
  profileId,
}: {
  publicationId: PublicationId;
  profileId: ProfileId;
}): TransactionStatusPredicate<CollectRequest> {
  return (transaction): transaction is TransactionState<CollectRequest> =>
    transaction.request.kind === TransactionKind.COLLECT_PUBLICATION &&
    transaction.request.profileId === profileId &&
    transaction.request.publicationId === publicationId;
}

export function isMirrorTransactionFor({
  publicationId,
  profileId,
}: {
  publicationId: PublicationId;
  profileId: ProfileId;
}): TransactionStatusPredicate<CreateMirrorRequest> {
  return (transaction): transaction is TransactionState<CreateMirrorRequest> =>
    transaction.request.kind === TransactionKind.MIRROR_PUBLICATION &&
    transaction.request.profileId === profileId &&
    transaction.request.publicationId === publicationId;
}
