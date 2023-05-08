import {
  DataTransaction,
  MetaTransaction,
  NativeTransaction,
  Nonce,
  ProtocolTransactionKinds,
  ProxyActionStatus,
  ProxyTransaction,
  TransactionError,
  TransactionEvent,
  TransactionKind,
} from '@lens-protocol/domain/entities';
import {
  ProtocolTransactionRequest,
  AnyTransactionRequest,
} from '@lens-protocol/domain/use-cases/transactions';
import { ChainType, failure, PromiseResult, success, XOR } from '@lens-protocol/shared-kernel';

import {
  DataTransactionData,
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
import { ISerializableDataTransaction } from '../adapters/PendingTransactionGateway/ISerializableTransactionFactory';

export type IndexingEvent = {
  indexed: boolean;
  txHash: string;
};

export type ProxyActionStatusEvent = {
  txHash: string;
  status: ProxyActionStatus;
};

export type ConfirmationRequest = {
  txHash: string;
  chainType: ChainType;
};

export type IndexingEventRequest = XOR<{ txHash: string }, { indexingId: string }>;

export interface ITransactionObserver {
  waitForConfirmation(request: ConfirmationRequest): PromiseResult<void, TransactionError>;

  waitForNextIndexingEvent(
    request: IndexingEventRequest,
  ): PromiseResult<IndexingEvent, TransactionError>;

  waitForProxyTransactionStatus(
    proxyId: string,
  ): PromiseResult<ProxyActionStatusEvent, TransactionError>;
}

type StateUpdate<T> = {
  event: TransactionEvent;
  state: T;
};

type StateReducer<T> = (state: T) => PromiseResult<StateUpdate<T>, TransactionError>;

type MetaTransactionState<T extends AnyTransactionRequest> = {
  chainType: ChainType;
  id: string;
  indexingId: string;
  nonce: Nonce;
  request: T;
  txHash: string;
};

class SerializableMetaTransaction<T extends ProtocolTransactionRequest>
  extends MetaTransaction<T>
  implements ISerializableMetaTransaction<T>
{
  constructor(
    private state: MetaTransactionState<T>,
    private readonly reduce: StateReducer<MetaTransactionState<T>>,
  ) {
    super();
  }

  toTransactionData(): MetaTransactionData<T> {
    return {
      chainType: this.state.chainType,
      id: this.state.id,
      indexingId: this.state.indexingId,
      nonce: this.state.nonce,
      request: this.state.request,
      txHash: this.state.txHash,
    };
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

  get hash(): string {
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

type ProxyTransactionState<T extends AnyTransactionRequest> = {
  chainType: ChainType;
  id: string;
  proxyId: string;
  request: T;
  txHash?: string;
  status?: ProxyActionStatus;
};

class SerializableProxyTransaction<T extends ProtocolTransactionRequest>
  extends ProxyTransaction<T>
  implements ISerializableProxyTransaction<T>
{
  constructor(
    private state: ProxyTransactionState<T>,
    private readonly reduce: StateReducer<ProxyTransactionState<T>>,
  ) {
    super();
  }

  toTransactionData(): ProxyTransactionData<T> {
    return {
      chainType: this.state.chainType,
      id: this.state.id,
      proxyId: this.state.proxyId,
      request: this.state.request,
      txHash: this.state.txHash,
      status: this.state.status,
    };
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

type NativeTransactionState<T extends AnyTransactionRequest> = {
  chainType: ChainType;
  id: string;
  indexingId?: string;
  request: T;
  txHash: string;
};

class SerializableNativeTransaction<T extends AnyTransactionRequest>
  extends NativeTransaction<T>
  implements ISerializableNativeTransaction<T>
{
  constructor(
    private state: NativeTransactionState<T>,
    private readonly reduce: StateReducer<NativeTransactionState<T>>,
  ) {
    super();
  }

  toTransactionData(): NativeTransactionData<T> {
    return {
      chainType: this.state.chainType,
      id: this.state.id,
      indexingId: this.state.indexingId,
      request: this.state.request,
      txHash: this.state.txHash,
    };
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

  get hash(): string {
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

class SerializableDataTransaction<T extends ProtocolTransactionRequest>
  extends DataTransaction<T>
  implements ISerializableDataTransaction<T>
{
  constructor(readonly id: string, readonly request: T) {
    super();
  }

  async waitNextEvent(): PromiseResult<TransactionEvent, TransactionError> {
    return success(TransactionEvent.SETTLED);
  }

  toTransactionData(): DataTransactionData<T> {
    return {
      id: this.id,
      request: this.request,
    };
  }
}

export class TransactionFactory implements ISerializableTransactionFactory {
  constructor(private readonly transactionObserver: ITransactionObserver) {}

  createMetaTransaction<T extends ProtocolTransactionRequest>(init: MetaTransactionData<T>) {
    return new SerializableMetaTransaction(
      {
        chainType: init.chainType,
        id: init.id,
        indexingId: init.indexingId,
        nonce: init.nonce,
        request: init.request,
        txHash: init.txHash,
      },
      this.createProtocolCallStateReducer(),
    );
  }

  createNativeTransaction<T extends AnyTransactionRequest>(init: NativeTransactionData<T>) {
    if (init.indexingId) {
      return new SerializableNativeTransaction(
        {
          chainType: init.chainType,
          id: init.id,
          indexingId: init.indexingId,
          request: init.request,
          txHash: init.txHash,
        },
        this.createProtocolCallStateReducer(),
      );
    }

    if ((ProtocolTransactionKinds as ReadonlyArray<TransactionKind>).includes(init.request.kind)) {
      return new SerializableNativeTransaction(
        {
          chainType: init.chainType,
          id: init.id,
          request: init.request,
          txHash: init.txHash,
        },
        this.createProtocolCallStateReducer(),
      );
    }
    return new SerializableNativeTransaction(
      {
        chainType: init.chainType,
        id: init.id,
        request: init.request,
        txHash: init.txHash,
      },
      this.createPureBlockchainStateReducer(),
    );
  }

  createProxyTransaction<T extends ProtocolTransactionRequest>(
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
      this.createProxyActionStateReducer(),
    );
  }

  createDataTransaction<T extends ProtocolTransactionRequest>(
    init: DataTransactionData<T>,
  ): ISerializableDataTransaction<T> {
    return new SerializableDataTransaction(init.id, init.request);
  }

  private createProtocolCallStateReducer<
    T extends AnyTransactionRequest,
    S extends MetaTransactionState<T> | NativeTransactionState<T>,
  >(): StateReducer<S> {
    return async (state) => {
      const request = state.indexingId
        ? { indexingId: state.indexingId }
        : { txHash: state.txHash };

      const indexingEventResult = await this.transactionObserver.waitForNextIndexingEvent(request);

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
    T extends AnyTransactionRequest,
    S extends NativeTransactionState<T>,
  >(): StateReducer<S> {
    return async (state) => {
      const result = await this.transactionObserver.waitForConfirmation({
        txHash: state.txHash,
        chainType: state.chainType,
      });

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
    T extends AnyTransactionRequest,
    S extends ProxyTransactionState<T>,
  >(): StateReducer<S> {
    return async (state) => {
      const result = await this.transactionObserver.waitForProxyTransactionStatus(state.proxyId);

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
