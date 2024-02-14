import { IAccessTokenStorage } from '@lens-protocol/api-bindings';
import { CredentialsExpiredError } from '@lens-protocol/domain/use-cases/authentication';
import { PromiseResult, failure, invariant, success } from '@lens-protocol/shared-kernel';

import { AuthApi } from './AuthApi';
import { Callback, ICredentialsExpiryEmitter } from './CredentialsExpiryController';
import { CredentialsStorage } from './CredentialsStorage';

export type Unsubscribe = () => void;

export class AccessTokenStorage implements IAccessTokenStorage, ICredentialsExpiryEmitter {
  private isRefreshing = false;

  private expiryListeners: Set<Callback> = new Set();
  private refreshListeners: Set<Callback> = new Set();

  constructor(
    private readonly authApi: AuthApi,
    private readonly credentialsStorage: CredentialsStorage,
  ) {}

  onExpiry(callback: Callback): Unsubscribe {
    this.expiryListeners.add(callback);
    return () => this.expiryListeners.delete(callback);
  }

  onRefresh(callback: Callback): Unsubscribe {
    this.refreshListeners.add(callback);
    return () => this.refreshListeners.delete(callback);
  }

  getAccessToken(): string | null {
    return this.credentialsStorage.getAccessToken();
  }

  async refreshToken(): PromiseResult<void, CredentialsExpiredError> {
    invariant(this.isRefreshing === false, 'Cannot refresh token while refreshing');
    this.isRefreshing = true;

    const result = await this.refreshCredentials();

    this.isRefreshing = false;

    if (result.isSuccess()) {
      this.emitRefreshEvent();
    } else {
      this.emitExpiryEvent();
    }
    return result;
  }

  private async refreshCredentials(): PromiseResult<void, CredentialsExpiredError> {
    const credentials = await this.credentialsStorage.get();

    if (!credentials || !credentials.canRefresh()) {
      return failure(new CredentialsExpiredError());
    }
    try {
      const newCredentials = await this.authApi.refreshCredentials(credentials.refreshToken);
      await this.credentialsStorage.set(newCredentials);
      return success();
    } catch {
      return failure(new CredentialsExpiredError());
    }
  }

  private emitExpiryEvent() {
    this.expiryListeners.forEach((callback) => callback());
  }

  private emitRefreshEvent() {
    this.refreshListeners.forEach((callback) => callback());
  }
}
