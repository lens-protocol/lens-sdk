import { makeVar, useReactiveVar } from '@apollo/client';
import {
  ProfileId,
  PublicationId,
  TransactionError,
  TransactionErrorReason,
  TransactionKind,
} from '@lens-protocol/domain/entities';
import { FollowRequest, UnfollowRequest } from '@lens-protocol/domain/use-cases/profile';
import { CollectRequest } from '@lens-protocol/domain/use-cases/publications';
import {
  BroadcastedTransactionData,
  PendingTransactionData,
  SupportedTransactionRequest,
} from '@lens-protocol/domain/use-cases/transactions';
import { DateUtils, EthereumAddress } from '@lens-protocol/shared-kernel';

export enum TxStatus {
  BROADCASTING = 'broadcasting',
  MINING = 'mining',
  SETTLED = 'settled',
  FAILED = 'failed',
}

const PENDING_STATUSES = [TxStatus.BROADCASTING, TxStatus.MINING];

export type PendingTransactionState<T extends SupportedTransactionRequest> = {
  status: TxStatus.BROADCASTING | TxStatus.FAILED;
} & PendingTransactionData<T>;

export type BroadcastedTransactionState<T extends SupportedTransactionRequest> = {
  status: TxStatus.MINING | TxStatus.SETTLED | TxStatus.FAILED;
} & BroadcastedTransactionData<T>;

export type TransactionState<T extends SupportedTransactionRequest> =
  | PendingTransactionState<T>
  | BroadcastedTransactionState<T>;

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
      // Inaccurate error, moved code over here from `@lens-protocol/react` package
      // TODO: Fix this
      throw new TransactionError(TransactionErrorReason.MINING_TIMEOUT);
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
