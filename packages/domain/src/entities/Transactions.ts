import { ChainType, PromiseResult } from '@lens-protocol/shared-kernel';

// TODO brand these aliases?

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
  UPDATE_COVER_IMAGE = 'UPDATE_COVER_IMAGE',
  UPDATE_PROFILE_DETAILS = 'UPDATE_PROFILE_DETAILS',
  UPDATE_FOLLOW_POLICY = 'UPDATE_FOLLOW_POLICY',
  UPDATE_DISPATCHER_CONFIG = 'UPDATE_DISPATCHER_CONFIG',
}

export type TransactionRequestModel = {
  kind: TransactionKind;
};

export class UnsignedTransaction<T extends TransactionRequestModel> {
  constructor(readonly id: string, readonly chainType: ChainType, readonly request: T) {}
}

export interface IUnsignedProtocolCall<T extends TransactionRequestModel> {
  readonly id: string;

  readonly request: T;

  readonly nonce: Nonce;
}

export class SignedProtocolCall<T extends TransactionRequestModel> {
  private constructor(
    readonly id: string,
    readonly signature: Signature,
    readonly request: T,
    readonly nonce: Nonce,
  ) {}

  static create<T extends TransactionRequestModel>({
    id,
    signature,
    request,
    nonce,
  }: {
    id: string;
    signature: Signature;
    request: T;
    nonce: Nonce;
  }) {
    return new SignedProtocolCall(id, signature, request, nonce);
  }
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

export enum TransactionErrorReason {
  CANNOT_EXECUTE = 'CANNOT_EXECUTE',
  INDEXING_TIMEOUT = 'INDEXING_TIMEOUT',
  MINING_TIMEOUT = 'MINING_TIMEOUT',
  REJECTED = 'REJECTED',
  REVERTED = 'REVERTED',
  UNKNOWN = 'UNKNOWN',
}

export class TransactionError extends Error {
  name = 'TransactionError' as const;

  constructor(readonly reason: TransactionErrorReason, readonly txHash?: string) {
    super(`Transaction "${txHash as string}" failed due to: ${reason}`);
  }
}
