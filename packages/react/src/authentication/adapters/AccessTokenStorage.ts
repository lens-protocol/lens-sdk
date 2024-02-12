import { IAccessTokenStorage } from '@lens-protocol/api-bindings';
import { CredentialsExpiredError } from '@lens-protocol/domain/use-cases/authentication';
import { PromiseResult, failure, invariant, success } from '@lens-protocol/shared-kernel';

import { AuthApi } from './AuthApi';
import { Callback, ICredentialsExpiryEmitter } from './CredentialsExpiryController';
import { CredentialsStorage } from './CredentialsStorage';
import { JwtCredentials } from './JwtCredentials';

export class AccessTokenStorage implements IAccessTokenStorage, ICredentialsExpiryEmitter {
  private isRefreshing = false;

  private listeners: Set<Callback> = new Set();

  constructor(
    private readonly authApi: AuthApi,
    private readonly credentialsStorage: CredentialsStorage,
  ) {}

  onExpiry(callback: Callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  getAccessToken(): string | null {
    return this.credentialsStorage.getAccessToken();
  }

  async refreshToken(): PromiseResult<void, CredentialsExpiredError> {
    invariant(this.isRefreshing === false, 'Cannot refresh token while refreshing');
    this.isRefreshing = true;
    const credentials = await this.credentialsStorage.get();

    if (credentials && credentials.canRefresh()) {
      await this.refreshCredentials(credentials);
      this.isRefreshing = false;
      return success();
    }
    this.isRefreshing = false;
    this.emitExpiryEvent();
    return failure(new CredentialsExpiredError());
  }

  private async refreshCredentials(credentials: JwtCredentials) {
    const newCredentials = await this.authApi.refreshCredentials(credentials.refreshToken);
    await this.credentialsStorage.set(newCredentials);
  }

  private emitExpiryEvent() {
    this.listeners.forEach((callback) => callback());
  }
}
