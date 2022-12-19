import { BaseStorageSchema, IStorageProvider, Storage } from '@lens-protocol/storage';

import { TransactionStorageSchema } from '../adapters/PendingTransactionGateway';

const schema = new BaseStorageSchema('lens.transactions', TransactionStorageSchema);

export function createTransactionStorage(storageProvider: IStorageProvider) {
  return Storage.createForSchema(schema, storageProvider);
}
