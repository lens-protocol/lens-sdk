import {
  MetaTransaction,
  NativeTransaction,
  ProtocolCallOf,
  ProxyTransaction,
  TransactionKind,
} from '@lens-protocol/domain/entities';
import {
  IMetaTransactionNonceGateway,
  IPendingTransactionGateway,
  NewTransactionsSubscriber,
  SupportedTransactionRequest,
} from '@lens-protocol/domain/use-cases/transactions';
import { assertNever, invariant } from '@lens-protocol/shared-kernel';
import { IStorage } from '@lens-protocol/storage';
import differenceBy from 'lodash/differenceBy.js';

import {
  ISerializableMetaTransaction,
  ISerializableNativeTransaction,
  ISerializableProxyTransaction,
  ISerializableTransactionFactory,
} from './ISerializableTransactionFactory';
import { TransactionSchema, TransactionStorageSchema, TransactionType } from './schema';

const lensHubTransactionKinds = [
  TransactionKind.COLLECT_PUBLICATION,
  TransactionKind.CREATE_COMMENT,
  TransactionKind.CREATE_POST,
  TransactionKind.FOLLOW_PROFILES,
  TransactionKind.MIRROR_PUBLICATION,
  TransactionKind.UPDATE_DISPATCHER_CONFIG,
  TransactionKind.UPDATE_PROFILE_IMAGE,
  TransactionKind.UPDATE_FOLLOW_POLICY,
];

const lensPeripheryTransactionKinds = [TransactionKind.UPDATE_PROFILE_DETAILS];

const transactionKindToFilterGroup: { [k in TransactionKind]: TransactionKind[] } = {
  [TransactionKind.COLLECT_PUBLICATION]: lensHubTransactionKinds,
  [TransactionKind.CREATE_COMMENT]: lensHubTransactionKinds,
  [TransactionKind.CREATE_POST]: lensHubTransactionKinds,
  [TransactionKind.FOLLOW_PROFILES]: lensHubTransactionKinds,
  [TransactionKind.MIRROR_PUBLICATION]: lensHubTransactionKinds,
  [TransactionKind.UPDATE_DISPATCHER_CONFIG]: lensHubTransactionKinds,
  [TransactionKind.UPDATE_PROFILE_IMAGE]: lensHubTransactionKinds,
  [TransactionKind.UPDATE_FOLLOW_POLICY]: lensHubTransactionKinds,

  [TransactionKind.UPDATE_PROFILE_DETAILS]: lensPeripheryTransactionKinds,

  [TransactionKind.APPROVE_MODULE]: [],
  [TransactionKind.CREATE_PROFILE]: [],
  [TransactionKind.UNFOLLOW_PROFILE]: [],
};

function isSerializableMetaTransaction<T extends SupportedTransactionRequest>(
  tx: ISerializableTransaction<T>,
): tx is ISerializableMetaTransaction<ProtocolCallOf<T>> {
  return tx instanceof MetaTransaction;
}

type ISerializableTransaction<T extends SupportedTransactionRequest> =
  | ISerializableNativeTransaction<T>
  | ISerializableMetaTransaction<ProtocolCallOf<T>>
  | ISerializableProxyTransaction<ProtocolCallOf<T>>;

function toTransactionSchema(
  tx: ISerializableTransaction<SupportedTransactionRequest>,
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

  if (tx instanceof ProxyTransaction) {
    return {
      type: TransactionType.Proxy,
      ...tx.toTransactionData(),
    };
  }

  assertNever(tx, 'Transaction type not supported');
}

export class PendingTransactionGateway
  implements IPendingTransactionGateway<SupportedTransactionRequest>, IMetaTransactionNonceGateway
{
  private cache?: ISerializableTransaction<SupportedTransactionRequest>[];

  constructor(
    private readonly storage: IStorage<TransactionStorageSchema>,
    private readonly transactionFactory: ISerializableTransactionFactory,
  ) {}

  async save(tx: ISerializableTransaction<SupportedTransactionRequest>): Promise<void> {
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

  async getAll(): Promise<readonly ISerializableTransaction<SupportedTransactionRequest>[]> {
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

  subscribe(subscriber: NewTransactionsSubscriber<SupportedTransactionRequest>): void {
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
    transactions: ISerializableTransaction<SupportedTransactionRequest>[],
  ): Promise<void> {
    this.cache = transactions;
    const data = transactions.map(toTransactionSchema);
    await this.storage.set(data);
  }

  private toEntity(data: TransactionSchema): ISerializableTransaction<SupportedTransactionRequest> {
    switch (data.type) {
      case TransactionType.Meta:
        return this.transactionFactory.createMetaTransaction(data);
      case TransactionType.Native:
        return this.transactionFactory.createNativeTransaction(data);
      case TransactionType.Proxy:
        return this.transactionFactory.createProxyTransaction(data);
      default:
        assertNever(data, 'Transaction type not supported');
    }
  }
}
