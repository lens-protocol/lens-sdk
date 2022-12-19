import { IAccessTokenStorage } from '@lens-protocol/api';
import { CredentialsExpiredError } from '@lens-protocol/domain/use-cases/lifecycle';
import { Deferred } from '@lens-protocol/shared-kernel';

import { Credentials } from '../adapters/Credentials';
import { Callback, ICredentialsExpiryEmitter } from '../adapters/CredentialsExpiryController';
import { AuthApi } from './AuthApi';
import { CredentialsStorage } from './CredentialsStorage';

export class AccessTokenStorage implements IAccessTokenStorage, ICredentialsExpiryEmitter {
  private isRefreshing = false;
  private pendingRequests: Deferred<void>[] = [];

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

  async refreshToken(): Promise<void> {
    if (this.isRefreshing) {
      const deferredPromise = new Deferred<void>();
      this.pendingRequests.push(deferredPromise);
      return deferredPromise.promise;
    }

    this.isRefreshing = true;
    const credentials = await this.credentialsStorage.get();

    if (credentials && credentials.canRefresh()) {
      await this.refreshCredentials(credentials);
      this.isRefreshing = false;
      return;
    }

    this.rejectPendingRequests();
    this.isRefreshing = false;
    this.emitExpiryEvent();
    throw new CredentialsExpiredError();
  }

  private async refreshCredentials(credentials: Credentials) {
    const newCredentials = await this.authApi.refreshCredentials(credentials.refreshToken);
    await this.credentialsStorage.set(newCredentials);
    this.pendingRequests.map((request) => request.resolve());
    this.pendingRequests = [];
  }

  private rejectPendingRequests() {
    this.pendingRequests.map((request) => request.reject(new CredentialsExpiredError()));
    this.pendingRequests = [];
  }

  private emitExpiryEvent() {
    this.listeners.forEach((callback) => callback());
  }
}
