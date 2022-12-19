import { BaseStorageSchema, IStorageProvider, Storage } from '@lens-protocol/storage';

import { StoredActiveProfileData } from '../adapters/ActiveProfileGateway';

const ActiveProfileStorageDataSchema = new BaseStorageSchema(
  'LENS_ACTIVE_PROFILE',
  StoredActiveProfileData,
);

export function createActiveProfileStorage(storageProvider: IStorageProvider) {
  return Storage.createForSchema(ActiveProfileStorageDataSchema, storageProvider);
}
