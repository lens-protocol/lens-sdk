import { BaseStorageSchema, IStorageProvider, Storage } from '@lens-protocol/storage';

import { StoredActiveProfileData } from '../adapters/ActiveProfileGateway';

const ActiveProfileStorageDataSchema = new BaseStorageSchema(
  'lens.activeProfile',
  StoredActiveProfileData,
);

export function createActiveProfileStorage(storageProvider: IStorageProvider) {
  return Storage.createForSchema(ActiveProfileStorageDataSchema, storageProvider);
}
