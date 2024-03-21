import { IAccessTokenStorage } from '@lens-protocol/api-bindings';
import {
  CredentialsExpiredError,
  Logout,
  LogoutReason,
} from '@lens-protocol/domain/use-cases/authentication';
import { PromiseResult, failure, invariant, success } from '@lens-protocol/shared-kernel';
import {
  IStorage,
  PersistedCredentials,
  StorageSubscriber,
  StorageSubscription,
} from '@lens-protocol/storage';

import { AuthApi } from './AuthApi';
import { JwtCredentials } from './JwtCredentials';

export type Unsubscribe = () => void;

/**
 * Stores auth credentials.
 * Access token is kept in memory.
 * Refresh token is persisted permanently.
 */
export class CredentialsStorage implements IStorage<JwtCredentials>, IAccessTokenStorage {
  private isRefreshing = false;

  private subscribers: Set<StorageSubscriber<JwtCredentials>> = new Set();

  private accessToken: string | null = null;

  private logout: Logout | null = null;

  constructor(
    private readonly refreshTokenStorage: IStorage<PersistedCredentials>,
    private readonly authApi: AuthApi,
  ) {}

  onExpiry(logout: Logout) {
    this.logout = logout;
  }

  async set(newCredentials: JwtCredentials): Promise<void> {
    this.accessToken = newCredentials.accessToken;

    const oldCredentials = await this.get();

    await this.refreshTokenStorage.set({ refreshToken: newCredentials.refreshToken });

    this.notifySubscribers(newCredentials, oldCredentials);
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

  subscribe(subscriber: StorageSubscriber<JwtCredentials>): StorageSubscription {
    this.subscribers.add(subscriber);

    return {
      unsubscribe: () => this.subscribers.delete(subscriber),
    };
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  async refreshToken(): PromiseResult<void, CredentialsExpiredError> {
    invariant(this.isRefreshing === false, 'Cannot refresh token while refreshing');
    this.isRefreshing = true;

    const result = await this.refreshCredentials();

    this.isRefreshing = false;

    if (result.isFailure()) {
      await this.logout?.execute(LogoutReason.CREDENTIALS_EXPIRED);
    }
    return result;
  }

  private async refreshCredentials(): PromiseResult<void, CredentialsExpiredError> {
    const credentials = await this.get();

    if (!credentials || !credentials.canRefresh()) {
      return failure(new CredentialsExpiredError());
    }
    try {
      const newCredentials = await this.authApi.refreshCredentials(credentials.refreshToken);
      await this.set(newCredentials);
      return success();
    } catch {
      return failure(new CredentialsExpiredError());
    }
  }

  private notifySubscribers(
    newCredentials: JwtCredentials | null,
    oldCredentials: JwtCredentials | null,
  ) {
    this.subscribers.forEach((callback) => callback(newCredentials, oldCredentials));
  }

  private async getRefreshToken(): Promise<string | null> {
    const result = await this.refreshTokenStorage.get();

    return result?.refreshToken ?? null;
  }
}
