import {
  AnyTransactionRequestModel,
  MetaTransaction,
  NativeTransaction,
  Nonce,
  JustProtocolRequest,
  DataTransaction,
} from '@lens-protocol/domain/entities';
import { ChainType } from '@lens-protocol/shared-kernel';

export type NativeTransactionData<T extends AnyTransactionRequestModel> = {
  chainType: ChainType;
  id: string;
  relayerTxId?: string;
  request: T;
  txHash: string | null;
};

export type MetaTransactionData<T extends AnyTransactionRequestModel> = {
  chainType: ChainType;
  id: string;
  relayerTxId: string;
  nonce: Nonce;
  request: T;
  txHash: string | null;
};

export type DataTransactionData<T extends AnyTransactionRequestModel> = {
  id: string;
  request: T;
};

export interface ITransactionFactory<Supported extends AnyTransactionRequestModel> {
  createMetaTransaction<T extends JustProtocolRequest<Supported>>(
    init: MetaTransactionData<T>,
  ): MetaTransaction<T>;

  createNativeTransaction<T extends Supported>(
    init: NativeTransactionData<T>,
  ): NativeTransaction<T>;

  createDataTransaction<T extends JustProtocolRequest<Supported>>(
    init: DataTransactionData<T>,
  ): DataTransaction<T>;
}
