import {
  MetaTransaction,
  NativeTransaction,
  ProxyTransaction,
} from '@lens-protocol/domain/entities';
import {
  ProtocolTransactionRequest,
  AnyTransactionRequest,
} from '@lens-protocol/domain/use-cases/transactions';

import {
  ITransactionFactory,
  MetaTransactionData,
  NativeTransactionData,
  ProxyTransactionData,
} from '../ITransactionFactory';

export interface ISerializableMetaTransaction<T extends ProtocolTransactionRequest>
  extends MetaTransaction<T> {
  toTransactionData(): MetaTransactionData<T>;
}

export interface ISerializableNativeTransaction<T extends AnyTransactionRequest>
  extends NativeTransaction<T> {
  toTransactionData(): NativeTransactionData<T>;
}

export interface ISerializableProxyTransaction<T extends ProtocolTransactionRequest>
  extends ProxyTransaction<T> {
  toTransactionData(): ProxyTransactionData<T>;
}

export interface ISerializableTransactionFactory
  extends ITransactionFactory<AnyTransactionRequest> {
  createMetaTransaction<T extends ProtocolTransactionRequest>(
    init: MetaTransactionData<T>,
  ): ISerializableMetaTransaction<T>;

  createNativeTransaction<T extends AnyTransactionRequest>(
    init: NativeTransactionData<T>,
  ): ISerializableNativeTransaction<T>;

  createProxyTransaction<T extends ProtocolTransactionRequest>(
    init: ProxyTransactionData<T>,
  ): ISerializableProxyTransaction<T>;
}
