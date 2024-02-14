import {
  CredentialsStorageSchema,
  IStorage,
  IStorageProvider,
  PersistedCredentials,
  Storage,
  StorageSubscriber,
  StorageSubscription,
} from '@lens-protocol/storage';

import { JwtCredentials } from './JwtCredentials';

/**
 * Stores auth credentials.
 * Access token is kept in memory.
 * Refresh token is persisted permanently.
 */
export class CredentialsStorage implements IStorage<JwtCredentials> {
  refreshTokenStorage: IStorage<PersistedCredentials>;
  accessToken: string | null = null;

  constructor(storageProvider: IStorageProvider, namespace: string) {
    const authStorageSchema = new CredentialsStorageSchema(`lens.${namespace}.credentials`);
    this.refreshTokenStorage = Storage.createForSchema(authStorageSchema, storageProvider);
  }

  async set({ accessToken, refreshToken }: JwtCredentials): Promise<void> {
    this.accessToken = accessToken;

    await this.refreshTokenStorage.set({ refreshToken });
  }

  async get(): Promise<JwtCredentials | null> {
    const refreshToken = await this.getRefreshToken();

    if (!refreshToken) {
      return null;
    }

    const accessToken = this.getAccessToken();

    return new JwtCredentials(accessToken, refreshToken);
  }

  async reset(): Promise<void> {
    this.accessToken = null;
    await this.refreshTokenStorage.reset();
  }

  subscribe(_: StorageSubscriber<JwtCredentials>): StorageSubscription {
    throw new Error('Method not implemented.');
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  private async getRefreshToken(): Promise<string | null> {
    const result = await this.refreshTokenStorage.get();

    return result?.refreshToken ?? null;
  }
}
