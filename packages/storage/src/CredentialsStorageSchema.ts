import { z } from 'zod';

import { BaseStorageSchema, type IStorageItem } from './BaseStorageSchema';

const PersistedCredentialsSchema = z.object({
  refreshToken: z.string(),
});

type PersistedCredentialsSchema = typeof PersistedCredentialsSchema;

export type PersistedCredentials = z.infer<PersistedCredentialsSchema>;

export class CredentialsStorageSchema extends BaseStorageSchema<PersistedCredentialsSchema> {
  version = 2;

  constructor(key: string) {
    super(key, PersistedCredentialsSchema);
  }

  protected override async migrate(
    storageItem: IStorageItem<PersistedCredentials>,
  ): Promise<PersistedCredentials> {
    return this.parseData(storageItem.data);
  }
}
