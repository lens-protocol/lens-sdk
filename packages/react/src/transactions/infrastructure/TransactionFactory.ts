import {
  MetaTransaction,
  NativeTransaction,
  Nonce,
  ProxyActionStatus,
  ProxyTransaction,
  TransactionError,
  TransactionEvent,
} from '@lens-protocol/domain/entities';
import { SupportedTransactionRequest } from '@lens-protocol/domain/use-cases/transactions';
import {
  ChainType,
  failure,
  invariant,
  PromiseResult,
  success,
} from '@lens-protocol/shared-kernel';

import {
  DeferredMetaTransactionInit,
  DeferredNativeTransactionInit,
  ITransactionFactory,
  MetaTransactionData,
  NativeTransactionData,
  ProxyTransactionData,
} from '../adapters/ITransactionFactory';
import {
  ISerializableMetaTransaction,
  ISerializableNativeTransaction,
  ISerializableProxyTransaction,
  ISerializableTransactionFactory,
} from '../adapters/PendingTransactionGateway';

export type IndexingEvent = {
  indexed: boolean;
  txHash: string;
};

export type ProxyActionStatusEvent = {
  txHash: string;
  status: ProxyActionStatus;
};

export interface ITransactionObserver {
  waitForExecuted(txHash: string, chainType: ChainType): PromiseResult<void, TransactionError>;

  waitForNextIndexingEvent(indexingId: string): PromiseResult<IndexingEvent, TransactionError>;

  waitForProxyTransactionStatus(
    indexingId: string,
  ): PromiseResult<ProxyActionStatusEvent, TransactionError>;
}

type StateUpdate<T> = {
  event: TransactionEvent;
  state: T;
};

type StateReducer<T> = (state: T) => PromiseResult<StateUpdate<T>, TransactionError>;

type MetaTransactionState<T extends SupportedTransactionRequest> = {
  chainType: ChainType;
  id: string;
  indexingId?: string;
  nonce: Nonce;
  request: T;
  txHash?: string;
};

class SerializableMetaTransaction<T extends SupportedTransactionRequest>
  extends MetaTransaction<T>
  implements ISerializableMetaTransaction<T>
{
  constructor(
    private state: MetaTransactionState<T>,
    private readonly reduce: StateReducer<MetaTransactionState<T>>,
  ) {
    super();
  }

  toTransactionData(): MetaTransactionData<T> | null {
    if (this.state.txHash && this.state.indexingId) {
      return {
        chainType: this.state.chainType,
        id: this.state.id,
        indexingId: this.state.indexingId,
        nonce: this.state.nonce,
        request: this.state.request,
        txHash: this.state.txHash,
      };
    }
    return null;
  }

  get chainType(): ChainType {
    return this.state.chainType;
  }

  get id(): string {
    return this.state.id;
  }

  get request(): T {
    return this.state.request;
  }

  get nonce(): Nonce {
    return this.state.nonce;
  }

  get hash(): string | undefined {
    return this.state.txHash;
  }

  async waitNextEvent(): PromiseResult<TransactionEvent, TransactionError> {
    const result = await this.reduce(this.state);

    if (result.isSuccess()) {
      this.state = result.value.state;
      return success(result.value.event);
    }
    return failure(result.error);
  }
}

type ProxyTransactionState<T extends SupportedTransactionRequest> = {
  chainType: ChainType;
  id: string;
  proxyId?: string;
  request: T;
  txHash?: string;
  status?: ProxyActionStatus;
};

class SerializableProxyTransaction<T extends SupportedTransactionRequest>
  extends ProxyTransaction<T>
  implements ISerializableProxyTransaction<T>
{
  constructor(
    private state: ProxyTransactionState<T>,
    private readonly reduce: StateReducer<ProxyTransactionState<T>>,
  ) {
    super();
  }

  toTransactionData(): ProxyTransactionData<T> | null {
    if (this.state.proxyId) {
      return {
        chainType: this.state.chainType,
        id: this.state.id,
        proxyId: this.state.proxyId,
        request: this.state.request,
        txHash: this.state.txHash,
        status: this.state.status,
      };
    }
    return null;
  }

  get chainType(): ChainType {
    return this.state.chainType;
  }

  get id(): string {
    return this.state.id;
  }

  get request(): T {
    return this.state.request;
  }

  get hash(): string | undefined {
    return this.state.txHash;
  }

  get status(): ProxyActionStatus | undefined {
    return this.state.status;
  }

  async waitNextEvent(): PromiseResult<TransactionEvent, TransactionError> {
    const result = await this.reduce(this.state);

    if (result.isSuccess()) {
      this.state = result.value.state;
      return success(result.value.event);
    }
    return failure(result.error);
  }
}

type NativeTransactionState<T extends SupportedTransactionRequest> = {
  chainType: ChainType;
  id: string;
  indexingId?: string;
  request: T;
  txHash?: string;
};

class SerializableNativeTransaction<T extends SupportedTransactionRequest>
  extends NativeTransaction<T>
  implements ISerializableNativeTransaction<T>
{
  constructor(
    private state: NativeTransactionState<T>,
    private readonly reduce: StateReducer<NativeTransactionState<T>>,
  ) {
    super();
  }

  toTransactionData(): NativeTransactionData<T> | null {
    if (this.state.txHash) {
      return {
        chainType: this.state.chainType,
        id: this.state.id,
        indexingId: this.state.indexingId,
        request: this.state.request,
        txHash: this.state.txHash,
      };
    }
    return null;
  }

  get nonce(): number {
    throw new Error('Method not implemented.');
  }

  get chainType(): ChainType {
    return this.state.chainType;
  }

  get id(): string {
    return this.state.id;
  }

  get request(): T {
    return this.state.request;
  }

  get hash(): string | undefined {
    return this.state?.txHash;
  }

  async waitNextEvent(): PromiseResult<TransactionEvent, TransactionError> {
    const result = await this.reduce(this.state);

    if (result.isSuccess()) {
      this.state = result.value.state;
      return success(result.value.event);
    }
    return failure(result.error);
  }
}

export class TransactionFactory
  implements
    ITransactionFactory<SupportedTransactionRequest>,
    ISerializableTransactionFactory<SupportedTransactionRequest>
{
  constructor(private readonly transactionObserver: ITransactionObserver) {}

  createMetaTransaction<T extends SupportedTransactionRequest>(
    init: DeferredMetaTransactionInit<T> | MetaTransactionData<T>,
  ) {
    if ('asyncRelayReceipt' in init) {
      return new SerializableMetaTransaction(
        {
          chainType: init.chainType,
          id: init.signedCall.id,
          nonce: init.signedCall.nonce,
          request: init.signedCall.request,
        },
        this.createProtocolCallStateReducer(init),
      );
    }
    return new SerializableMetaTransaction(
      {
        chainType: init.chainType,
        id: init.id,
        indexingId: init.indexingId,
        nonce: init.nonce,
        request: init.request,
        txHash: init.txHash,
      },
      this.createProtocolCallStateReducer(init),
    );
  }

  createNativeTransaction<T extends SupportedTransactionRequest>(
    init: DeferredNativeTransactionInit<T> | NativeTransactionData<T>,
  ) {
    if ('asyncRelayReceipt' in init) {
      return new SerializableNativeTransaction(
        {
          chainType: init.chainType,
          id: init.id,
          request: init.request,
        },
        this.createProtocolCallStateReducer(init),
      );
    }
    if (init.indexingId) {
      return new SerializableNativeTransaction(
        {
          chainType: init.chainType,
          id: init.id,
          indexingId: init.indexingId,
          request: init.request,
          txHash: init.txHash,
        },
        this.createProtocolCallStateReducer(init),
      );
    }
    return new SerializableNativeTransaction(
      {
        chainType: init.chainType,
        id: init.id,
        request: init.request,
        txHash: init.txHash,
      },
      this.createPureBlockchainStateReducer(init),
    );
  }

  createProxyTransaction<T extends SupportedTransactionRequest>(
    init: ProxyTransactionData<T>,
  ): ISerializableProxyTransaction<T> {
    return new SerializableProxyTransaction(
      {
        chainType: init.chainType,
        id: init.id,
        proxyId: init.proxyId,
        request: init.request,
        txHash: init.txHash,
        status: init.status,
      },
      this.createProxyActionStateReducer(init),
    );
  }

  private createProtocolCallStateReducer<
    T extends SupportedTransactionRequest,
    S extends MetaTransactionState<T> | NativeTransactionState<T>,
  >(
    init:
      | DeferredMetaTransactionInit<T>
      | DeferredNativeTransactionInit<T>
      | MetaTransactionData<T>
      | NativeTransactionData<T>
      | ProxyTransactionData<T>,
  ): StateReducer<S> {
    return async (state) => {
      if ('asyncRelayReceipt' in init) {
        const relayReceiptResult = await init.asyncRelayReceipt;

        if (relayReceiptResult.isFailure()) {
          return failure(relayReceiptResult.error);
        }

        if (state.txHash === undefined) {
          return success({
            event: TransactionEvent.BROADCASTED,
            state: {
              ...state,
              txHash: relayReceiptResult.value.txHash,
              indexingId: relayReceiptResult.value.indexingId,
            },
          });
        }
      }

      invariant(state.indexingId, 'indexingId is required');

      const indexingEventResult = await this.transactionObserver.waitForNextIndexingEvent(
        state.indexingId,
      );

      if (indexingEventResult.isFailure()) {
        return failure(indexingEventResult.error);
      }

      if (indexingEventResult.value.indexed) {
        return success({
          event: TransactionEvent.SETTLED,
          state: {
            ...state,
            txHash: indexingEventResult.value.txHash,
          },
        });
      }
      return success({
        event: TransactionEvent.UPGRADED,
        state: {
          ...state,
          txHash: indexingEventResult.value.txHash,
        },
      });
    };
  }

  private createPureBlockchainStateReducer<
    T extends SupportedTransactionRequest,
    S extends NativeTransactionState<T>,
  >(init: NativeTransactionData<T>): StateReducer<S> {
    return async (state) => {
      const result = await this.transactionObserver.waitForExecuted(init.txHash, init.chainType);

      if (result.isFailure()) {
        return failure(result.error);
      }

      return success({
        event: TransactionEvent.SETTLED,
        state,
      });
    };
  }

  private createProxyActionStateReducer<
    T extends SupportedTransactionRequest,
    S extends ProxyTransactionState<T>,
  >(init: ProxyTransactionData<T>): StateReducer<S> {
    return async (state) => {
      const result = await this.transactionObserver.waitForProxyTransactionStatus(init.proxyId);

      if (result.isFailure()) {
        return failure(result.error);
      }

      switch (result.value.status) {
        case ProxyActionStatus.MINTING:
          return success({
            event:
              state.status === ProxyActionStatus.MINTING
                ? TransactionEvent.UPGRADED
                : TransactionEvent.BROADCASTED,
            state: {
              ...state,
              status: ProxyActionStatus.MINTING,
              txHash: result.value.txHash,
            },
          });
        case ProxyActionStatus.TRANSFERRING:
          return success({
            event:
              state.status === ProxyActionStatus.TRANSFERRING
                ? TransactionEvent.UPGRADED
                : TransactionEvent.BROADCASTED,
            state: {
              ...state,
              status: ProxyActionStatus.TRANSFERRING,
              txHash: result.value.txHash,
            },
          });
        case ProxyActionStatus.COMPLETE:
          return success({
            event: TransactionEvent.SETTLED,
            state: {
              ...state,
              status: ProxyActionStatus.COMPLETE,
              txHash: result.value.txHash,
            },
          });
      }
    };
  }
}
