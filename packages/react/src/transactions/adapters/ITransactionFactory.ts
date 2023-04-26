import {
  TransactionRequestModel,
  MetaTransaction,
  NativeTransaction,
  Nonce,
  ProxyTransaction,
  ProxyActionStatus,
  ProtocolCallOf,
} from '@lens-protocol/domain/entities';
import { ChainType } from '@lens-protocol/shared-kernel';

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

export interface ITransactionFactory<Supported extends TransactionRequestModel> {
  createMetaTransaction<T extends ProtocolCallOf<Supported>>(
    init: MetaTransactionData<T>,
  ): MetaTransaction<T>;

  createNativeTransaction<T extends Supported>(
    init: NativeTransactionData<T>,
  ): NativeTransaction<T>;

  createProxyTransaction<T extends ProtocolCallOf<Supported>>(
    init: ProxyTransactionData<T>,
  ): ProxyTransaction<T>;
}
