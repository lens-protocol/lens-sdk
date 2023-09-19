import { failure, PromiseResult, success } from '@lens-protocol/shared-kernel';
import { InMemoryStorageProvider } from '@lens-protocol/storage';

import type { LensConfig } from '../consts/config';
import { CredentialsExpiredError, NotAuthenticatedError } from '../consts/errors';
import type { ChallengeRequest, SignedAuthChallenge } from '../graphql/types.generated';
import type { IAuthentication } from './IAuthentication';
import { AuthenticationApi } from './adapters/AuthenticationApi';
import { CredentialsStorage } from './adapters/CredentialsStorage';
import type { AuthChallengeFragment } from './graphql/auth.generated';

/**
 * Authentication for Lens API. Request challenge, authenticate, manage credentials.
 */
export class Authentication implements IAuthentication {
  private readonly api: AuthenticationApi;
  private readonly storage: CredentialsStorage;

  constructor(config: LensConfig) {
    this.api = new AuthenticationApi(config);
    this.storage = new CredentialsStorage(
      config.storage || new InMemoryStorageProvider(),
      config.environment.name,
    );
  }

  async generateChallenge(request: ChallengeRequest): Promise<AuthChallengeFragment> {
    return this.api.challenge(request);
  }

  async authenticate(request: SignedAuthChallenge): Promise<void> {
    const credentials = await this.api.authenticate(request);
    await this.storage.set(credentials);
  }

  async verify(accessToken: string): Promise<boolean> {
    return this.api.verify(accessToken);
  }

  async isAuthenticated(): Promise<boolean> {
    const credentials = await this.storage.get();

    if (!credentials) {
      return false;
    }

    if (!credentials.shouldRefresh()) {
      return true;
    }

    if (credentials.canRefresh()) {
      const newCredentials = await this.api.refresh(credentials.refreshToken);
      await this.storage.set(newCredentials);
      return true;
    }

    // credentials expired
    return false;
  }

  async getAccessToken(): PromiseResult<string, CredentialsExpiredError | NotAuthenticatedError> {
    const credentials = await this.storage.get();

    if (!credentials) {
      return failure(new NotAuthenticatedError());
    }

    if (!credentials.shouldRefresh() && credentials.accessToken) {
      return success(credentials.accessToken);
    }

    if (credentials.canRefresh()) {
      const newCredentials = await this.api.refresh(credentials.refreshToken);
      await this.storage.set(newCredentials);

      if (!newCredentials.accessToken) {
        return failure(new CredentialsExpiredError());
      }

      return success(newCredentials.accessToken);
    }

    return failure(new CredentialsExpiredError());
  }

  async getProfileId(): PromiseResult<string, CredentialsExpiredError | NotAuthenticatedError> {
    const credentials = await this.storage.get();

    if (!credentials) {
      return failure(new NotAuthenticatedError());
    }

    if (!credentials.canRefresh()) {
      return failure(new CredentialsExpiredError());
    }

    return success(credentials.getProfileId());
  }

  // private methods
  async getRequestHeader(): PromiseResult<
    Record<string, string>,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    const credentials = await this.storage.get();

    if (!credentials) {
      return failure(new NotAuthenticatedError());
    }

    if (!credentials.shouldRefresh()) {
      return success(this.buildHeader(credentials.accessToken));
    }

    if (credentials.canRefresh()) {
      const newCredentials = await this.api.refresh(credentials.refreshToken);
      await this.storage.set(newCredentials);
      return success(this.buildHeader(newCredentials.accessToken));
    }

    return failure(new CredentialsExpiredError());
  }

  private buildHeader(accessToken: string | undefined) {
    return { authorization: `Bearer ${accessToken || ''}` };
  }
}
