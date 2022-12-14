import {
  MetaTransaction,
  NativeTransaction,
  ProxyTransaction,
} from '@lens-protocol/domain/entities';
import { SupportedTransactionRequest } from '@lens-protocol/domain/use-cases/transactions';

import {
  MetaTransactionData,
  NativeTransactionData,
  ProxyTransactionData,
} from '../ITransactionFactory';

export interface ISerializableMetaTransaction<T extends SupportedTransactionRequest>
  extends MetaTransaction<T> {
  toTransactionData(): MetaTransactionData<T> | null;
}

export interface ISerializableNativeTransaction<T extends SupportedTransactionRequest>
  extends NativeTransaction<T> {
  toTransactionData(): NativeTransactionData<T> | null;
}

export interface ISerializableProxyTransaction<T extends SupportedTransactionRequest>
  extends ProxyTransaction<T> {
  toTransactionData(): ProxyTransactionData<T> | null;
}

export interface ISerializableTransactionFactory<T extends SupportedTransactionRequest> {
  createMetaTransaction(
    init: MetaTransactionData<SupportedTransactionRequest>,
  ): ISerializableMetaTransaction<T>;

  createNativeTransaction(
    init: NativeTransactionData<SupportedTransactionRequest>,
  ): ISerializableNativeTransaction<T>;

  createProxyTransaction(
    init: ProxyTransactionData<SupportedTransactionRequest>,
  ): ISerializableProxyTransaction<T>;
}
