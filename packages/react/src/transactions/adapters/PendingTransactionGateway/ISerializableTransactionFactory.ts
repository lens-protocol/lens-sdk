import {
  MetaTransaction,
  NativeTransaction,
  ProxyTransaction,
} from '@lens-protocol/domain/entities';
import {
  ProtocolCallRequest,
  SupportedTransactionRequest,
} from '@lens-protocol/domain/use-cases/transactions';

import {
  ITransactionFactory,
  MetaTransactionData,
  NativeTransactionData,
  ProxyTransactionData,
} from '../ITransactionFactory';

export interface ISerializableMetaTransaction<T extends ProtocolCallRequest>
  extends MetaTransaction<T> {
  toTransactionData(): MetaTransactionData<T>;
}

export interface ISerializableNativeTransaction<T extends SupportedTransactionRequest>
  extends NativeTransaction<T> {
  toTransactionData(): NativeTransactionData<T>;
}

export interface ISerializableProxyTransaction<T extends ProtocolCallRequest>
  extends ProxyTransaction<T> {
  toTransactionData(): ProxyTransactionData<T>;
}

export interface ISerializableTransactionFactory
  extends ITransactionFactory<SupportedTransactionRequest> {
  createMetaTransaction<T extends ProtocolCallRequest>(
    init: MetaTransactionData<T>,
  ): ISerializableMetaTransaction<T>;

  createNativeTransaction<T extends SupportedTransactionRequest>(
    init: NativeTransactionData<T>,
  ): ISerializableNativeTransaction<T>;

  createProxyTransaction<T extends ProtocolCallRequest>(
    init: ProxyTransactionData<T>,
  ): ISerializableProxyTransaction<T>;
}
