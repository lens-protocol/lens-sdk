import { BaseStorageSchema, IStorageProvider, Storage } from '@lens-protocol/storage';

import { WalletStorageSchema } from '../adapters/WalletGateway';

const walletStorageDataSchema = new BaseStorageSchema('lens.wallets', WalletStorageSchema);

export function createWalletStorage(storageProvider: IStorageProvider) {
  return Storage.createForSchema(walletStorageDataSchema, storageProvider);
}
