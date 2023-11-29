import {
  DataTransaction,
  MetaTransaction,
  NativeTransaction,
  Nonce,
  ProtocolTransactionKinds,
  TransactionError,
  TransactionEvent,
  TransactionKind,
} from '@lens-protocol/domain/entities';
import {
  ProtocolTransactionRequest,
  AnyTransactionRequest,
} from '@lens-protocol/domain/use-cases/transactions';
import { ChainType, never, PromiseResult, success, XOR } from '@lens-protocol/shared-kernel';

import {
  DataTransactionData,
  MetaTransactionData,
  NativeTransactionData,
} from '../adapters/ITransactionFactory';
import {
  ISerializableMetaTransaction,
  ISerializableNativeTransaction,
  ISerializableTransactionFactory,
} from '../adapters/PendingTransactionGateway';
import { ISerializableDataTransaction } from '../adapters/PendingTransactionGateway/ISerializableTransactionFactory';

export type IndexingEvent = {
  indexed: boolean;
  txHash: string;
};
export type ConfirmationRequest = {
  txHash: string;
  chainType: ChainType;
};

export type IndexingEventRequest = XOR<{ txHash: string }, { relayerTxId: string }>;

export interface ITransactionObserver {
  waitForConfirmation(request: ConfirmationRequest): PromiseResult<void, TransactionError>;

  waitForNextIndexingEvent(
    request: IndexingEventRequest,
  ): PromiseResult<IndexingEvent, TransactionError>;
}

type StateUpdate<T> = {
  event: TransactionEvent;
  state: T;
};

type StateReducer<T> = (state: T) => PromiseResult<StateUpdate<T>, TransactionError>;

class SerializableMetaTransaction<T extends ProtocolTransactionRequest>
  extends MetaTransaction<T>
  implements ISerializableMetaTransaction<T>
{
  constructor(
    private state: MetaTransactionData<T>,
    private readonly reduce: StateReducer<MetaTransactionData<T>>,
  ) {
    super();
  }

  toTransactionData(): MetaTransactionData<T> {
    return {
      chainType: this.state.chainType,
      id: this.state.id,
      relayerTxId: this.state.relayerTxId,
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

  get hash(): string | null {
    return this.state.txHash;
  }

  async waitNextEvent(): PromiseResult<TransactionEvent, TransactionError> {
    const result = await this.reduce(this.state);

    if (result.isSuccess()) {
      this.state = result.value.state;
      return success(result.value.event);
    }
    return result;
  }
}

class SerializableNativeTransaction<T extends AnyTransactionRequest>
  extends NativeTransaction<T>
  implements ISerializableNativeTransaction<T>
{
  constructor(
    private state: NativeTransactionData<T>,
    private readonly reduce: StateReducer<NativeTransactionData<T>>,
  ) {
    super();
  }

  toTransactionData(): NativeTransactionData<T> {
    return {
      chainType: this.state.chainType,
      id: this.state.id,
      relayerTxId: this.state.relayerTxId,
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

  get hash(): string | null {
    return this.state.txHash;
  }

  async waitNextEvent(): PromiseResult<TransactionEvent, TransactionError> {
    const result = await this.reduce(this.state);

    if (result.isSuccess()) {
      this.state = result.value.state;
      return success(result.value.event);
    }
    return result;
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
        relayerTxId: init.relayerTxId,
        nonce: init.nonce,
        request: init.request,
        txHash: init.txHash,
      },
      this.createProtocolCallStateReducer(),
    );
  }

  createNativeTransaction<T extends AnyTransactionRequest>(init: NativeTransactionData<T>) {
    if (init.relayerTxId) {
      return new SerializableNativeTransaction(
        {
          chainType: init.chainType,
          id: init.id,
          relayerTxId: init.relayerTxId,
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

  createDataTransaction<T extends ProtocolTransactionRequest>(
    init: DataTransactionData<T>,
  ): ISerializableDataTransaction<T> {
    return new SerializableDataTransaction(init.id, init.request);
  }

  private createProtocolCallStateReducer<
    T extends AnyTransactionRequest,
    S extends MetaTransactionData<T> | NativeTransactionData<T>,
  >(): StateReducer<S> {
    return async (state) => {
      const request = state.relayerTxId
        ? { relayerTxId: state.relayerTxId }
        : { txHash: state.txHash ?? never() };

      const indexingEventResult = await this.transactionObserver.waitForNextIndexingEvent(request);

      if (indexingEventResult.isFailure()) {
        return indexingEventResult;
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
    S extends NativeTransactionData<T>,
  >(): StateReducer<S> {
    return async (state) => {
      const result = await this.transactionObserver.waitForConfirmation({
        txHash:
          state.txHash ??
          never(`Cannot observe ${NativeTransaction.name} on-chain without a TX hash`),
        chainType: state.chainType,
      });

      if (result.isFailure()) {
        return result;
      }

      return success({
        event: TransactionEvent.SETTLED,
        state,
      });
    };
  }
}
