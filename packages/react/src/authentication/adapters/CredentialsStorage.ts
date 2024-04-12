import { IAccessTokenStorage } from '@lens-protocol/api-bindings';
import {
  CredentialsExpiredError,
  Logout,
  LogoutReason,
} from '@lens-protocol/domain/use-cases/authentication';
import { PromiseResult, failure, success } from '@lens-protocol/shared-kernel';
import {
  IStorage,
  PersistedCredentials,
  StorageSubscriber,
  StorageSubscription,
} from '@lens-protocol/storage';

import { AuthApi } from './AuthApi';
import { JwtCredentials } from './JwtCredentials';
import { TimerId, clearSafeTimeout, setSafeTimeout } from './timeout';

export type Unsubscribe = () => void;

/**
 * Stores auth credentials.
 * Access token is kept in memory.
 * Identity token is kept in memory.
 * Refresh token is persisted permanently.
 */
export class CredentialsStorage implements IStorage<JwtCredentials>, IAccessTokenStorage {
  private refreshTimer: TimerId | null = null;

  private refreshPromise: PromiseResult<void, CredentialsExpiredError> | null = null;

  private subscribers: Set<StorageSubscriber<JwtCredentials>> = new Set();

  private accessToken: string | null = null;
  private identityToken: string | null = null;

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
    this.identityToken = newCredentials.identityToken;

    const oldCredentials = await this.get();

    await this.refreshTokenStorage.set({ refreshToken: newCredentials.refreshToken });

    this.refreshTimer = setSafeTimeout(
      this.refreshToken.bind(this),
      newCredentials.getTokenRefreshTime(),
    );
    this.notifySubscribers(newCredentials, oldCredentials);
  }

  async get(): Promise<JwtCredentials | null> {
    const refreshToken = await this.getRefreshToken();

    if (!refreshToken) {
      return null;
    }

    return new JwtCredentials(this.accessToken, this.identityToken, refreshToken);
  }

  async reset(): Promise<void> {
    this.accessToken = null;
    this.cancelScheduledRefresh();
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
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = this.refreshCredentials();
    const result = await this.refreshPromise;
    this.refreshPromise = null;
    return result;
  }

  private cancelScheduledRefresh() {
    if (this.refreshTimer) {
      clearSafeTimeout(this.refreshTimer);
    }
    this.refreshTimer = null;
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
      await this.logout?.execute(LogoutReason.CREDENTIALS_EXPIRED);
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
