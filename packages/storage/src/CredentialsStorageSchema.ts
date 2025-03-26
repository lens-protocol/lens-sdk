import { accessToken, idToken, refreshToken } from '@lens-protocol/types';
import type { AccessToken, IdToken, RefreshToken } from '@lens-protocol/types';

import { z } from 'zod';

import { BaseStorageSchema, type IStorageItem } from './BaseStorageSchema';
import type { IStorageProvider } from './IStorage';
import { Storage } from './Storage';

export type Credentials = {
  accessToken: AccessToken;
  idToken: IdToken;
  refreshToken: RefreshToken;
};

const PersistedCredentialsSchema: z.ZodType<Credentials, z.ZodTypeDef, unknown> = z.object({
  accessToken: z.string().transform(accessToken),
  idToken: z.string().transform(idToken),
  refreshToken: z.string().transform(refreshToken),
});

class CredentialsStorageSchema extends BaseStorageSchema<typeof PersistedCredentialsSchema> {
  version = 3;

  constructor(key: string) {
    super(key, PersistedCredentialsSchema);
  }

  protected override async migrate(storageItem: IStorageItem<unknown>): Promise<Credentials> {
    if (storageItem.metadata.version === 2) {
      throw new Error('Migration from v2 to v3 is not supported');
    }
    return this.parseData(storageItem.data);
  }
}

export class CredentialsStorage extends Storage<Credentials> {
  protected constructor(provider: IStorageProvider) {
    const schema = new CredentialsStorageSchema('lens.credentials');
    super(schema, provider);
  }

  static from(provider: IStorageProvider): CredentialsStorage {
    return new CredentialsStorage(provider);
  }
}
