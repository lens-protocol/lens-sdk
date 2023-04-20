import { ChainType, PromiseResult } from '@lens-protocol/shared-kernel';

export type Challenge = string;

export type Signature = string;

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
  UPDATE_DISPATCHER_CONFIG = 'UPDATE_DISPATCHER_CONFIG',
}

export const ProtocolCallKinds = [
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
  TransactionKind.UPDATE_DISPATCHER_CONFIG,
] as const;

export type ProtocolCallKind = (typeof ProtocolCallKinds)[number];

export type ProtocolCallRequestModel = {
  kind: ProtocolCallKind;
};

export type TransactionRequestModel =
  | ProtocolCallRequestModel
  | {
      kind: TransactionKind.APPROVE_MODULE;
    };

export class UnsignedTransaction<T extends TransactionRequestModel> {
  constructor(readonly id: string, readonly chainType: ChainType, readonly request: T) {}
}

export interface IUnsignedProtocolCall<T extends TransactionRequestModel> {
  readonly id: string;

  readonly request: T;

  readonly nonce: Nonce;
}

export interface ISignedProtocolCall<T extends TransactionRequestModel> {
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

export enum ProxyActionStatus {
  MINTING = 'MINTING',
  TRANSFERRING = 'TRANSFERRING',
  COMPLETE = 'COMPLETE',
}

export abstract class MetaTransaction<T extends TransactionRequestModel> {
  abstract get chainType(): ChainType;
  abstract get id(): string;
  abstract get request(): T;
  abstract get nonce(): Nonce;
  abstract get hash(): string | undefined;

  abstract waitNextEvent(): PromiseResult<TransactionEvent, TransactionError>;
}

export abstract class NativeTransaction<T extends TransactionRequestModel> {
  abstract get chainType(): ChainType;
  abstract get id(): string;
  abstract get request(): T;
  abstract get hash(): string | undefined;

  abstract waitNextEvent(): PromiseResult<TransactionEvent, TransactionError>;
}

export abstract class ProxyTransaction<T extends TransactionRequestModel> {
  abstract get chainType(): ChainType;
  abstract get id(): string;
  abstract get request(): T;
  abstract get hash(): string | undefined;
  abstract get status(): ProxyActionStatus | undefined;

  abstract waitNextEvent(): PromiseResult<TransactionEvent, TransactionError>;
}

export type Transaction<T extends TransactionRequestModel> =
  | MetaTransaction<T>
  | NativeTransaction<T>
  | ProxyTransaction<T>;

/**
 * The reason why a transaction failed.
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
