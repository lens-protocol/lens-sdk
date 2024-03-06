import { makeVar, useReactiveVar } from '@apollo/client';
import {
  ProfileId,
  PublicationId,
  TransactionError,
  TransactionKind,
} from '@lens-protocol/domain/entities';
import {
  FollowRequest,
  LinkHandleRequest,
  UnblockProfilesRequest,
  UnfollowRequest,
  UnlinkHandleRequest,
} from '@lens-protocol/domain/use-cases/profile';
import {
  OpenActionRequest,
  AllOpenActionType,
  CreateQuoteRequest,
  CreateMirrorRequest,
  CreateCommentRequest,
} from '@lens-protocol/domain/use-cases/publications';
import { AnyTransactionRequest } from '@lens-protocol/domain/use-cases/transactions';

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

export function useRecentTransactionsVar() {
  return useReactiveVar(recentTransactionsVar);
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

function isCreateCommentTransaction(
  transaction: TransactionState<AnyTransactionRequest>,
): transaction is TransactionState<CreateCommentRequest> {
  return transaction.request.kind === TransactionKind.CREATE_COMMENT;
}

export function countAnyPendingCreateCommentFor(publicationId: PublicationId) {
  return recentTransactionsVar().reduce(
    (count, transaction) =>
      count +
      (isCreateCommentTransaction(transaction) &&
      transaction.status === TxStatus.PENDING &&
      transaction.request.commentOn === publicationId
        ? 1
        : 0),
    0,
  );
}

function isCreateMirrorTransaction(
  transaction: TransactionState<AnyTransactionRequest>,
): transaction is TransactionState<CreateMirrorRequest> {
  return transaction.request.kind === TransactionKind.MIRROR_PUBLICATION;
}

export function countAnyPendingCreateMirrorFor(publicationId: PublicationId) {
  return recentTransactionsVar().reduce(
    (count, transaction) =>
      count +
      (isCreateMirrorTransaction(transaction) &&
      transaction.status === TxStatus.PENDING &&
      transaction.request.mirrorOn === publicationId
        ? 1
        : 0),
    0,
  );
}

function isCreateQuoteTransaction(
  transaction: TransactionState<AnyTransactionRequest>,
): transaction is TransactionState<CreateQuoteRequest> {
  return transaction.request.kind === TransactionKind.CREATE_QUOTE;
}

export function countAnyPendingCreateQuoteFor(publicationId: PublicationId) {
  return recentTransactionsVar().reduce(
    (count, transaction) =>
      count +
      (isCreateQuoteTransaction(transaction) &&
      transaction.status === TxStatus.PENDING &&
      transaction.request.quoteOn === publicationId
        ? 1
        : 0),
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

function isPendingLinkHandleTransaction(
  transaction: TransactionState<AnyTransactionRequest>,
): transaction is TransactionState<LinkHandleRequest> {
  return (
    transaction.request.kind === TransactionKind.LINK_HANDLE &&
    transaction.status === TxStatus.PENDING
  );
}

export function getPendingLinkHandleTxFor(profileId: ProfileId) {
  return recentTransactionsVar().find((transaction) => {
    return (
      isPendingLinkHandleTransaction(transaction) && transaction.request.profileId === profileId
    );
  }) as TransactionState<LinkHandleRequest> | undefined;
}

function isPendingUnlinkHandleTransaction(
  transaction: TransactionState<AnyTransactionRequest>,
): transaction is TransactionState<UnlinkHandleRequest> {
  return (
    transaction.request.kind === TransactionKind.UNLINK_HANDLE &&
    transaction.status === TxStatus.PENDING
  );
}

export function getPendingUnlinkHandleTxFor(profileId: ProfileId) {
  return recentTransactionsVar().find((transaction) => {
    return (
      isPendingUnlinkHandleTransaction(transaction) && transaction.request.profileId === profileId
    );
  }) as TransactionState<UnlinkHandleRequest> | undefined;
}
