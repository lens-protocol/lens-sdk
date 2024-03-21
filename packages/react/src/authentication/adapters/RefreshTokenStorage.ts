import { CredentialsStorageSchema, IStorageProvider, Storage } from '@lens-protocol/storage';

export function createRefreshTokenStorage(storageProvider: IStorageProvider, namespace: string) {
  const schema = new CredentialsStorageSchema(`lens.${namespace}.credentials`);
  return Storage.createForSchema(schema, storageProvider);
}
