import {
  MetaTransaction,
  NativeTransaction,
  JustProtocolRequest,
  TransactionKind,
  DataTransaction,
} from '@lens-protocol/domain/entities';
import { IResettableTransactionGateway } from '@lens-protocol/domain/use-cases/authentication';
import {
  IMetaTransactionNonceGateway,
  IPendingTransactionGateway,
  NewTransactionsSubscriber,
  AnyTransactionRequest,
} from '@lens-protocol/domain/use-cases/transactions';
import { assertNever, invariant } from '@lens-protocol/shared-kernel';
import { IStorage } from '@lens-protocol/storage';
import differenceBy from 'lodash/differenceBy.js';

import { TransactionList, TransactionSchema, TransactionType } from '../schemas/transactions';
import {
  ISerializableDataTransaction,
  ISerializableMetaTransaction,
  ISerializableNativeTransaction,
  ISerializableTransactionFactory,
} from './ISerializableTransactionFactory';

const lensHubTransactionKinds = [
  TransactionKind.ACT_ON_PUBLICATION,
  TransactionKind.CREATE_COMMENT,
  TransactionKind.CREATE_POST,
  TransactionKind.CREATE_QUOTE,
  TransactionKind.FOLLOW_PROFILE,
  TransactionKind.MIRROR_PUBLICATION,
  TransactionKind.UNFOLLOW_PROFILE,
  TransactionKind.UPDATE_FOLLOW_POLICY,
  TransactionKind.UPDATE_PROFILE_DETAILS,
  TransactionKind.UPDATE_PROFILE_MANAGERS,
];

const tokenHandleRegistryTransactionKinds = [
  TransactionKind.LINK_HANDLE,
  TransactionKind.UNLINK_HANDLE,
];

const transactionKindToFilterGroup: { [k in TransactionKind]: TransactionKind[] } = {
  [TransactionKind.ACT_ON_PUBLICATION]: lensHubTransactionKinds,
  [TransactionKind.BLOCK_PROFILE]: lensHubTransactionKinds,
  [TransactionKind.CREATE_COMMENT]: lensHubTransactionKinds,
  [TransactionKind.CREATE_POST]: lensHubTransactionKinds,
  [TransactionKind.CREATE_QUOTE]: lensHubTransactionKinds,
  [TransactionKind.FOLLOW_PROFILE]: lensHubTransactionKinds,
  [TransactionKind.MIRROR_PUBLICATION]: lensHubTransactionKinds,
  [TransactionKind.UNBLOCK_PROFILE]: lensHubTransactionKinds,
  [TransactionKind.UNFOLLOW_PROFILE]: lensHubTransactionKinds,
  [TransactionKind.UPDATE_FOLLOW_POLICY]: lensHubTransactionKinds,
  [TransactionKind.UPDATE_PROFILE_DETAILS]: lensHubTransactionKinds,
  [TransactionKind.UPDATE_PROFILE_MANAGERS]: lensHubTransactionKinds,

  [TransactionKind.LINK_HANDLE]: tokenHandleRegistryTransactionKinds,
  [TransactionKind.UNLINK_HANDLE]: tokenHandleRegistryTransactionKinds,

  [TransactionKind.CLAIM_HANDLE]: [],
  [TransactionKind.APPROVE_MODULE]: [],
  [TransactionKind.CREATE_PROFILE]: [],
};

function isSerializableMetaTransaction<T extends AnyTransactionRequest>(
  tx: ISerializableTransaction<T>,
): tx is ISerializableMetaTransaction<JustProtocolRequest<T>> {
  return tx instanceof MetaTransaction;
}

type ISerializableTransaction<T extends AnyTransactionRequest> =
  | ISerializableNativeTransaction<T>
  | ISerializableMetaTransaction<JustProtocolRequest<T>>
  | ISerializableDataTransaction<JustProtocolRequest<T>>;

function toTransactionSchema(
  tx: ISerializableTransaction<AnyTransactionRequest>,
): TransactionSchema {
  if (tx instanceof MetaTransaction) {
    return {
      type: TransactionType.Meta,
      ...tx.toTransactionData(),
    };
  }

  if (tx instanceof NativeTransaction) {
    return {
      type: TransactionType.Native,
      ...tx.toTransactionData(),
    };
  }

  if (tx instanceof DataTransaction) {
    return {
      type: TransactionType.Data,
      ...tx.toTransactionData(),
    };
  }

  assertNever(tx, 'Transaction type not supported');
}

export class PendingTransactionGateway
  implements
    IPendingTransactionGateway<AnyTransactionRequest>,
    IMetaTransactionNonceGateway,
    IResettableTransactionGateway
{
  private cache?: ISerializableTransaction<AnyTransactionRequest>[];

  constructor(
    private readonly storage: IStorage<TransactionList>,
    private readonly transactionFactory: ISerializableTransactionFactory,
  ) {}

  async save(tx: ISerializableTransaction<AnyTransactionRequest>): Promise<void> {
    const transactions = await this.getAll();
    const newTransactions = [...transactions];

    const idx = transactions.findIndex((entry) => entry.id === tx.id);
    if (idx > -1) {
      newTransactions.splice(idx, 1, tx);
      await this.update(newTransactions);
      return;
    }

    if (tx instanceof MetaTransaction) {
      const expectedNonce = await this.getNextMetaTransactionNonceFor(tx.request.kind);

      if (expectedNonce) {
        invariant(
          expectedNonce === tx.nonce,
          `Nonce mismatch, was expecting ${expectedNonce}, got ${tx.nonce}`,
        );
      }
    }

    newTransactions.unshift(tx);
    await this.update(newTransactions);
  }

  async remove(id: string): Promise<void> {
    const transactions = await this.getAll();
    await this.update(transactions.filter((tx) => tx.id !== id));
  }

  async reset(): Promise<void> {
    void this.storage.reset();
  }

  async getAll(): Promise<readonly ISerializableTransaction<AnyTransactionRequest>[]> {
    if (this.cache) {
      return this.cache.slice();
    }
    const data = await this.storage.get();

    if (data === null) {
      return [];
    }

    return data.map((entry) => this.toEntity(entry));
  }

  async getNextMetaTransactionNonceFor(kind: TransactionKind) {
    const all = await this.getAll();

    if (all.length === 0) {
      return undefined;
    }

    const metaTransactions = all.filter(isSerializableMetaTransaction);
    if (metaTransactions.length === 0) {
      return undefined;
    }

    if (kind in transactionKindToFilterGroup) {
      const filter = transactionKindToFilterGroup[kind];
      const firstOfKind = metaTransactions.find((tx) => filter.includes(tx.request.kind));

      return firstOfKind ? firstOfKind.nonce + 1 : undefined;
    }
    return undefined;
  }

  subscribe(subscriber: NewTransactionsSubscriber<AnyTransactionRequest>): void {
    this.storage.subscribe(async (newData, oldData) => {
      if (newData === null) {
        return;
      }
      const updatedTransactions = newData.map((entry) => this.toEntity(entry));
      const previousTransactions = oldData?.map((entry) => this.toEntity(entry)) ?? [];

      const newTransaction = differenceBy(updatedTransactions, previousTransactions, (tx) => tx.id);

      if (newTransaction.length > 0) {
        subscriber(newTransaction);
      }
    });
  }

  private async update(
    transactions: ISerializableTransaction<AnyTransactionRequest>[],
  ): Promise<void> {
    this.cache = transactions;
    const data = transactions.map(toTransactionSchema);
    await this.storage.set(data);
  }

  private toEntity(data: TransactionSchema): ISerializableTransaction<AnyTransactionRequest> {
    switch (data.type) {
      case TransactionType.Meta:
        return this.transactionFactory.createMetaTransaction(data);
      case TransactionType.Native:
        return this.transactionFactory.createNativeTransaction(data);
      case TransactionType.Data:
        return this.transactionFactory.createDataTransaction(data);
      default:
        assertNever(data, 'Transaction type not supported');
    }
  }
}
