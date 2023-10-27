import { ChainType, IEquatableError, PromiseResult } from '@lens-protocol/shared-kernel';

import { Signature } from './Signature';

export type Nonce = number;

export enum TransactionKind {
  APPROVE_MODULE = 'APPROVE_MODULE',
  ACT_ON_PUBLICATION = 'ACT_ON_PUBLICATION',
  BLOCK_PROFILE = 'BLOCK_PROFILE',
  CREATE_COMMENT = 'CREATE_COMMENT',
  CREATE_POST = 'CREATE_POST',
  CREATE_PROFILE = 'CREATE_PROFILE',
  CLAIM_HANDLE = 'CLAIM_HANDLE',
  CREATE_QUOTE = 'CREATE_QUOTE',
  FOLLOW_PROFILE = 'FOLLOW_PROFILE',
  LINK_HANDLE = 'LINK_HANDLE',
  MIRROR_PUBLICATION = 'MIRROR_PUBLICATION',
  UNBLOCK_PROFILE = 'UNBLOCK_PROFILE',
  UNFOLLOW_PROFILE = 'UNFOLLOW_PROFILE',
  UNLINK_HANDLE = 'UNLINK_HANDLE',
  UPDATE_FOLLOW_POLICY = 'UPDATE_FOLLOW_POLICY',
  UPDATE_PROFILE_DETAILS = 'UPDATE_PROFILE_DETAILS',
  UPDATE_PROFILE_MANAGERS = 'UPDATE_PROFILE_MANAGERS',
}

export const ProtocolTransactionKinds = [
  TransactionKind.ACT_ON_PUBLICATION,
  TransactionKind.BLOCK_PROFILE,
  TransactionKind.UNFOLLOW_PROFILE,
  TransactionKind.CLAIM_HANDLE,
  TransactionKind.CREATE_COMMENT,
  TransactionKind.CREATE_POST,
  TransactionKind.CREATE_PROFILE,
  TransactionKind.CREATE_QUOTE,
  TransactionKind.FOLLOW_PROFILE,
  TransactionKind.LINK_HANDLE,
  TransactionKind.MIRROR_PUBLICATION,
  TransactionKind.UNBLOCK_PROFILE,
  TransactionKind.UNFOLLOW_PROFILE,
  TransactionKind.UNLINK_HANDLE,
  TransactionKind.UPDATE_FOLLOW_POLICY,
  TransactionKind.UPDATE_PROFILE_DETAILS,
  TransactionKind.UPDATE_PROFILE_MANAGERS,
] as const;

export type ProtocolTransactionKind = (typeof ProtocolTransactionKinds)[number];

export type ProtocolTransactionRequestModel = {
  kind: ProtocolTransactionKind;
};

export type AnyTransactionRequestModel = {
  kind: TransactionKind;
};

/**
 * @internal
 */
export type PickByKind<T extends AnyTransactionRequestModel, K> = T extends {
  kind: K;
}
  ? T
  : never;

/**
 * @internal
 */
export type JustProtocolRequest<T extends AnyTransactionRequestModel> = PickByKind<
  T,
  ProtocolTransactionKind
>;

export class UnsignedTransaction<T extends AnyTransactionRequestModel> {
  constructor(readonly id: string, readonly chainType: ChainType, readonly request: T) {}
}

// TODO rename to UnsignedOperation
export interface IUnsignedProtocolCall<T extends ProtocolTransactionRequestModel> {
  readonly id: string;

  readonly request: T;

  readonly nonce: Nonce;
}

// TODO rename to SignedOperation
export interface ISignedProtocolCall<T extends ProtocolTransactionRequestModel> {
  readonly id: string;

  readonly signature: Signature;

  readonly request: T;

  readonly nonce: Nonce;
}

export enum TransactionEvent {
  BROADCASTED = 'BROADCASTED',
  UPGRADED = 'UPGRADED',
  SETTLED = 'SETTLED',
}

export abstract class MetaTransaction<T extends ProtocolTransactionRequestModel> {
  abstract get chainType(): ChainType;
  abstract get id(): string;
  abstract get request(): T;
  abstract get nonce(): Nonce;
  abstract get hash(): string | null;

  abstract waitNextEvent(): PromiseResult<TransactionEvent, TransactionError>;
}

export abstract class NativeTransaction<T extends AnyTransactionRequestModel> {
  abstract get chainType(): ChainType;
  abstract get id(): string;
  abstract get request(): T;
  abstract get hash(): string | null;

  abstract waitNextEvent(): PromiseResult<TransactionEvent, TransactionError>;
}

export abstract class DataTransaction<T extends ProtocolTransactionRequestModel> {
  abstract get id(): string;
  abstract get request(): T;

  abstract waitNextEvent(): PromiseResult<TransactionEvent, TransactionError>;
}

// TODO: move, this type might be a convenience type but not an entity per se
export type Transaction<T extends AnyTransactionRequestModel> =
  | DataTransaction<JustProtocolRequest<T>>
  | MetaTransaction<JustProtocolRequest<T>>
  | NativeTransaction<T>;

/**
 * The reason why a transaction failed.
 */
export enum TransactionErrorReason {
  /**
   * The tx was broadcasted but it was not indexed within the expected timeout
   */
  INDEXING_TIMEOUT = 'INDEXING_TIMEOUT',
  /**
   * The tx was broadcasted but it was not mined within the expected timeout
   */
  MINING_TIMEOUT = 'MINING_TIMEOUT',
  /**
   * The tx was reverted
   */
  REVERTED = 'REVERTED',
  /**
   * A not recognized failure
   */
  UNKNOWN = 'UNKNOWN',
}

/**
 * An error that occurs when a transaction fails.
 */
export class TransactionError extends Error implements IEquatableError {
  name = 'TransactionError' as const;

  constructor(readonly reason: TransactionErrorReason) {
    super(`Transaction failed due to: ${reason}`);
  }
}
