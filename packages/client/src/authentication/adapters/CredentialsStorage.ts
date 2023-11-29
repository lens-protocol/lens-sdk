import {
  CredentialsStorageSchema,
  IStorage,
  IStorageProvider,
  PersistedCredentials,
  Storage,
  StorageSubscriber,
  StorageSubscription,
} from '@lens-protocol/storage';

import { Credentials } from './Credentials';

/**
 * Stores auth credentials.
 * Access token is kept in memory.
 * Refresh token is persisted permanently.
 */
export class CredentialsStorage implements IStorage<Credentials> {
  private refreshTokenStorage: IStorage<PersistedCredentials>;
  private accessToken: string | undefined;

  constructor(storageProvider: IStorageProvider, namespace: string) {
    const authStorageSchema = new CredentialsStorageSchema(`lens.${namespace}.credentials`);
    this.refreshTokenStorage = Storage.createForSchema(authStorageSchema, storageProvider);
  }

  async set({ accessToken, refreshToken }: Credentials): Promise<void> {
    this.accessToken = accessToken;

    await this.refreshTokenStorage.set({ refreshToken });
  }

  async get(): Promise<Credentials | null> {
    const refreshToken = await this.getRefreshToken();

    if (!refreshToken) {
      return null;
    }

    const accessToken = this.accessToken;

    return new Credentials(accessToken, refreshToken);
  }

  async reset(): Promise<void> {
    this.accessToken = undefined;
    await this.refreshTokenStorage.reset();
  }

  subscribe(_: StorageSubscriber<Credentials>): StorageSubscription {
    throw new Error('Method not implemented.');
  }

  private async getRefreshToken(): Promise<string | null> {
    const result = await this.refreshTokenStorage.get();

    return result?.refreshToken ?? null;
  }
}
