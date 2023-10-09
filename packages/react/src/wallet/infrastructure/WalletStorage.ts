import { BaseStorageSchema, IStorageProvider, Storage } from '@lens-protocol/storage';

import { WalletStorageSchema } from '../adapters/WalletGateway';

export function createWalletStorage(storageProvider: IStorageProvider, namespace: string) {
  const walletStorageDataSchema = new BaseStorageSchema(
    `lens.${namespace}.wallets`,
    WalletStorageSchema,
  );
  return Storage.createForSchema(walletStorageDataSchema, storageProvider);
}
