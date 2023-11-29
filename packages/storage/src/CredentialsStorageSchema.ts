import { z } from 'zod';

import { BaseStorageSchema, IStorageItem } from './BaseStorageSchema';

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

  protected override migrate(
    storageItem: IStorageItem<PersistedCredentials>,
  ): PersistedCredentials {
    const storageVersion = storageItem.metadata.version;

    if (this.version > storageVersion) {
      return this.parseData({
        refreshToken: '',
      });
    }
    return this.parseData(storageItem.data);
  }
}
