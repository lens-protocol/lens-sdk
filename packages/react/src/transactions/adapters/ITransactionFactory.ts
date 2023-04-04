import {
  SignedProtocolCall,
  TransactionRequestModel,
  MetaTransaction,
  NativeTransaction,
  TransactionError,
  Nonce,
  ProxyTransaction,
  ProxyActionStatus,
} from '@lens-protocol/domain/entities';
import { ChainType, PromiseResult } from '@lens-protocol/shared-kernel';

// TODO move if no longer relevant here
export type RelayReceipt = {
  indexingId: string;
  txHash: string;
};

/**
 * @deprecated
 */
export type AsyncRelayReceipt = PromiseResult<RelayReceipt, TransactionError>;

// TODO move if no longer relevant here
export type ProxyReceipt = {
  proxyId: string;
};

/**
 * @deprecated
 */
export type DeferredNativeTransactionInit<T extends TransactionRequestModel> = {
  chainType: ChainType;
  request: T;
  id: string;
  asyncRelayReceipt: AsyncRelayReceipt;
};

/**
 * @deprecated
 */
export type DeferredMetaTransactionInit<T extends TransactionRequestModel> = {
  chainType: ChainType;
  signedCall: SignedProtocolCall<T>;
  asyncRelayReceipt: AsyncRelayReceipt;
};

export type NativeTransactionData<T extends TransactionRequestModel> = {
  chainType: ChainType;
  id: string;
  indexingId?: string;
  request: T;
  txHash: string;
};

export type MetaTransactionData<T extends TransactionRequestModel> = {
  chainType: ChainType;
  id: string;
  indexingId: string;
  nonce: Nonce;
  request: T;
  txHash: string;
};

export type ProxyTransactionData<T extends TransactionRequestModel> = {
  chainType: ChainType;
  id: string;
  request: T;
  proxyId: string;
  txHash?: string;
  status?: ProxyActionStatus;
};

export type TransactionInit<T extends TransactionRequestModel> =
  | DeferredNativeTransactionInit<T>
  | DeferredMetaTransactionInit<T>
  | NativeTransactionData<T>;

export interface ITransactionFactory<Supported extends TransactionRequestModel> {
  createMetaTransaction<T extends Supported>(
    init: DeferredMetaTransactionInit<T> | MetaTransactionData<T>,
  ): MetaTransaction<T>;

  createNativeTransaction<T extends Supported>(
    init: DeferredNativeTransactionInit<T> | NativeTransactionData<T>,
  ): NativeTransaction<T>;

  createProxyTransaction<T extends Supported>(init: ProxyTransactionData<T>): ProxyTransaction<T>;
}
