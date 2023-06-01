import { BaseStorageSchema, IStorageProvider, Storage } from '@lens-protocol/storage';

import { TransactionStorageSchema } from '../adapters/schemas';

export function createTransactionStorage(storageProvider: IStorageProvider, namespace: string) {
  const schema = new BaseStorageSchema(`lens.${namespace}.transactions`, TransactionStorageSchema);
  return Storage.createForSchema(schema, storageProvider);
}
