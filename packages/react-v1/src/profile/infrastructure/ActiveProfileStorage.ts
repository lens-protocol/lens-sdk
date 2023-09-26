import { BaseStorageSchema, IStorageProvider, Storage } from '@lens-protocol/storage';

import { StoredActiveProfileData } from '../adapters/ActiveProfileGateway';

export function createActiveProfileStorage(storageProvider: IStorageProvider, namespace: string) {
  const ActiveProfileStorageDataSchema = new BaseStorageSchema(
    `lens.${namespace}.activeProfile`,
    StoredActiveProfileData,
  );
  return Storage.createForSchema(ActiveProfileStorageDataSchema, storageProvider);
}
