import { BaseStorageSchema, IStorageItem } from '@lens-protocol/storage';
import { TypeOf, z } from 'zod';

const AuthData = z.object({
  refreshToken: z.string(),
});

export type AuthData = z.infer<typeof AuthData>;

export class CredentialsStorageSchema extends BaseStorageSchema<typeof AuthData> {
  version = 2;

  constructor(key: string) {
    super(key, AuthData);
  }

  protected migrate(storageItem: IStorageItem<AuthData>): TypeOf<typeof AuthData> {
    const storageVersion = storageItem.metadata.version;

    if (this.version > storageVersion) {
      return this.parseData({
        refreshToken: '',
      });
    }
    return this.parseData(storageItem.data);
  }
}
