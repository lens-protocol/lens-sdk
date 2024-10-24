import { accessToken, idToken, refreshToken } from '@lens-social/types';
import type { AccessToken, IdToken, RefreshToken } from '@lens-social/types';

import { z } from 'zod';

import { BaseStorageSchema, type IStorageItem } from './BaseStorageSchema';
import type { IStorageProvider } from './IStorage';
import { Storage } from './Storage';

export type Credentials = {
  accessToken: AccessToken;
  identityToken: IdToken;
  refreshToken: RefreshToken;
};

// TODO
const PersistedCredentialsSchema: z.ZodType<Credentials, z.ZodTypeDef, unknown> = z.object({
  accessToken: z.string().transform(accessToken),
  identityToken: z.string().transform(idToken),
  refreshToken: z.string().transform(refreshToken),
});

export class CredentialsStorageSchema extends BaseStorageSchema<typeof PersistedCredentialsSchema> {
  version = 3;

  constructor(key: string) {
    super(key, PersistedCredentialsSchema);
  }

  protected override async migrate(storageItem: IStorageItem<Credentials>): Promise<Credentials> {
    if (storageItem.metadata.version === 2) {
      // TODO: Migrate from version 2 to version 3
    }
    return this.parseData(storageItem.data);
  }
}

export function createCredentialsStorage(storageProvider: IStorageProvider, namespace: string) {
  const schema = new CredentialsStorageSchema(`lens.${namespace}.credentials`);
  return Storage.createForSchema(schema, storageProvider);
}
