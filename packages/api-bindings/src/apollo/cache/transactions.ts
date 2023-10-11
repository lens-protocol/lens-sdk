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
import { AnyTransactionRequest } from '@lens-protocol/domain/use-cases/transactions';
import { DateUtils, EvmAddress } from '@lens-protocol/shared-kernel';

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

type TransactionStatusPredicate<T extends AnyTransactionRequest> = (
  txState: TransactionState<AnyTransactionRequest>,
) => txState is TransactionState<T>;

function hasTransactionWith<T extends AnyTransactionRequest>(
  transactions: TransactionState<AnyTransactionRequest>[],
  statuses: ReadonlyArray<TxStatus>,
  predicate: TransactionStatusPredicate<T>,
) {
  return transactions.some((txState) => statuses.includes(txState.status) && predicate(txState));
}

export function getAllPendingTransactions() {
  return recentTransactionsVar().filter((txState) => txState.status === TxStatus.PENDING);
}

function delay(waitInMs: number) {
  return new Promise((resolve) => setTimeout(resolve, waitInMs));
}

export function useRecentTransactionsVar() {
  return useReactiveVar(recentTransactionsVar);
}

export function useHasPendingTransaction<T extends AnyTransactionRequest>(
  predicate: TransactionStatusPredicate<T>,
) {
  const transactions = useRecentTransactionsVar();

  return hasTransactionWith(transactions, [TxStatus.PENDING], predicate);
}

const FIFTEEN_SECONDS = DateUtils.secondsToMs(30);

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

export function isFollowTransactionFor({
  profileId,
  followerAddress,
}: {
  profileId: ProfileId;
  followerAddress: EvmAddress;
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
    transaction.request.mirrorOn === publicationId;
}
