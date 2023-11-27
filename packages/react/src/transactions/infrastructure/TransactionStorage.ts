import { BaseStorageSchema, IStorageItem, IStorageProvider, Storage } from '@lens-protocol/storage';

import { TransactionListSchema, TransactionList } from '../adapters/schemas/transactions';

class TransactionStorageSchema extends BaseStorageSchema<TransactionListSchema> {
  version = 2;

  constructor(key: string) {
    super(key, TransactionListSchema);
  }

  protected override migrate(storageItem: IStorageItem<TransactionList>): TransactionList {
    const storageVersion = storageItem.metadata.version;

    if (this.version > storageVersion) {
      return this.parseData([]);
    }
    return this.parseData(storageItem.data);
  }
}

export function createTransactionStorage(storageProvider: IStorageProvider, namespace: string) {
  const schema = new TransactionStorageSchema(`lens.${namespace}.transactions`);
  return Storage.createForSchema(schema, storageProvider);
}
