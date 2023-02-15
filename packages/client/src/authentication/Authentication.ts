import { failure, PromiseResult, success } from '@lens-protocol/shared-kernel';

import { AuthenticationApi } from './adapters/AuthenticationApi';
import { CredentialsStorage } from './adapters/CredentialsStorage';
import { InMemoryStorageProvider } from './adapters/InMemoryStorageProvider';
import { LensConfig } from '../consts/config';
import { CredentialsExpiredError, NotAuthenticatedError } from '../consts/errors';

export interface IAuthentication {
  generateChallenge(address: string): Promise<string>;
  authenticate(address: string, signature: string): Promise<void>;
  isAuthenticated(): Promise<boolean>;
}

export class Authentication implements IAuthentication {
  private readonly api: AuthenticationApi;
  private readonly storage: CredentialsStorage;

  constructor(config: LensConfig) {
    this.api = new AuthenticationApi(config);
    this.storage = new CredentialsStorage(config.storage || new InMemoryStorageProvider());
  }

  async generateChallenge(address: string): Promise<string> {
    return this.api.challenge(address);
  }

  async authenticate(address: string, signature: string): Promise<void> {
    const credentials = await this.api.authenticate(address, signature);
    await this.storage.set(credentials);
  }

  async isAuthenticated(): Promise<boolean> {
    const credentials = await this.storage.get();
    return credentials ? !credentials.isExpired() : false;
  }

  async getRequestHeader(): PromiseResult<
    Record<string, string>,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    const credentials = await this.storage.get();

    if (!credentials) {
      return failure(new NotAuthenticatedError());
    }

    // if not expired
    if (!credentials.isExpired()) {
      return success(this.buildHeader(credentials.accessToken));
    }

    // if expired but can refresh
    if (credentials.canRefresh()) {
      const newCredentials = await this.api.refresh(credentials.refreshToken);
      await this.storage.set(newCredentials);
      return success(this.buildHeader(newCredentials.accessToken));
    }

    // otherwise
    return failure(new CredentialsExpiredError());
  }

  private buildHeader(accessToken: string | undefined) {
    return { authorization: `Bearer ${accessToken || ''}` };
  }
}
