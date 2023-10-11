import { ChainType, PromiseResult } from '@lens-protocol/shared-kernel';

import { Signature } from './Signature';

export type Nonce = number;

export enum TransactionKind {
  APPROVE_MODULE = 'APPROVE_MODULE',
  COLLECT_PUBLICATION = 'COLLECT_PUBLICATION',
  CREATE_COMMENT = 'CREATE_COMMENT',
  CREATE_POST = 'CREATE_POST',
  CREATE_PROFILE = 'CREATE_PROFILE',
  FOLLOW_PROFILES = 'FOLLOW_PROFILES',
  MIRROR_PUBLICATION = 'MIRROR_PUBLICATION',
  UPDATE_PROFILE_IMAGE = 'UPDATE_PROFILE_IMAGE',
  UNFOLLOW_PROFILE = 'UNFOLLOW_PROFILE',
  UPDATE_PROFILE_DETAILS = 'UPDATE_PROFILE_DETAILS',
  UPDATE_FOLLOW_POLICY = 'UPDATE_FOLLOW_POLICY',
  UPDATE_PROFILE_MANAGERS = 'UPDATE_PROFILE_MANAGERS',
}

export const ProtocolTransactionKinds = [
  TransactionKind.COLLECT_PUBLICATION,
  TransactionKind.CREATE_COMMENT,
  TransactionKind.CREATE_POST,
  TransactionKind.CREATE_PROFILE,
  TransactionKind.FOLLOW_PROFILES,
  TransactionKind.MIRROR_PUBLICATION,
  TransactionKind.UPDATE_PROFILE_IMAGE,
  TransactionKind.UNFOLLOW_PROFILE,
  TransactionKind.UPDATE_PROFILE_DETAILS,
  TransactionKind.UPDATE_FOLLOW_POLICY,
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

export interface IUnsignedProtocolCall<T extends ProtocolTransactionRequestModel> {
  readonly id: string;

  readonly request: T;

  readonly nonce: Nonce;
}

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

/**
 * @deprecated delete this
 */
export enum ProxyActionStatus {
  MINTING = 'MINTING',
  TRANSFERRING = 'TRANSFERRING',
  COMPLETE = 'COMPLETE',
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
  abstract get hash(): string;

  abstract waitNextEvent(): PromiseResult<TransactionEvent, TransactionError>;
}

/**
 * @deprecated delete this
 */
export abstract class ProxyTransaction<T extends ProtocolTransactionRequestModel> {
  abstract get chainType(): ChainType;
  abstract get id(): string;
  abstract get request(): T;
  abstract get hash(): string | undefined;
  abstract get status(): ProxyActionStatus | undefined;

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
 * @deprecated delete this, not very used after all
 */
export enum TransactionErrorReason {
  /**
   * Failed to be broadcasted
   *
   * @deprecated {@link TransactionError} is not longer throw with this reason. See {@link BroadcastingError} instead.
   *
   * It will be removed in the next major version. Its value falls back to {@link TransactionErrorReason.UNKNOWN} so to not cause a breaking change in consumer's code.
   */
  CANNOT_EXECUTE = 'UNKNOWN',
  /**
   * The tx was broadcasted but it was not indexed within the expected timeout
   */
  INDEXING_TIMEOUT = 'INDEXING_TIMEOUT',
  /**
   * The tx was broadcasted but it was not mined within the expected timeout
   */
  MINING_TIMEOUT = 'MINING_TIMEOUT',
  /**
   * The gas-less broadcasting of the tx was rejected, probably due to reaching a quota limit
   *
   * @deprecated {@link TransactionError} is not longer throw with this reason. See {@link BroadcastingError} instead.
   *
   * It will be removed in the next major version. Its value falls back to {@link TransactionErrorReason.UNKNOWN} so to not cause a breaking change in consumer's code.
   */
  REJECTED = 'UNKNOWN',
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
export class TransactionError extends Error {
  name = 'TransactionError' as const;

  constructor(readonly reason: TransactionErrorReason) {
    super(`Transaction failed due to: ${reason}`);
  }
}
