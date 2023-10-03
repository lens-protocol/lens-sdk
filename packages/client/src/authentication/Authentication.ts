import {
  failure,
  IEquatableError,
  PromiseResult,
  Result,
  success,
} from '@lens-protocol/shared-kernel';

import type { LensContext } from '../context';
import { CredentialsExpiredError, NotAuthenticatedError } from '../errors';
import type { ChallengeRequest, SignedAuthChallenge } from '../graphql/types.generated';
import type { IAuthentication } from './IAuthentication';
import { AuthenticationApi } from './adapters/AuthenticationApi';
import { Credentials } from './adapters/Credentials';
import { CredentialsStorage } from './adapters/CredentialsStorage';
import type { AuthChallengeFragment } from './graphql/auth.generated';

/**
 * Authentication for Lens API. Request challenge, authenticate, manage credentials.
 */
export class Authentication implements IAuthentication {
  private readonly api: AuthenticationApi;
  private readonly credentials: CredentialsStorage;

  constructor(context: LensContext) {
    this.api = new AuthenticationApi(context);
    this.credentials = new CredentialsStorage(context.storage, context.environment.name);
  }

  async generateChallenge(request: ChallengeRequest): Promise<AuthChallengeFragment> {
    return this.api.challenge(request);
  }

  async authenticate(request: SignedAuthChallenge): Promise<void> {
    const credentials = await this.api.authenticate(request);
    await this.credentials.set(credentials);
  }

  async verify(accessToken: string): Promise<boolean> {
    return this.api.verify(accessToken);
  }

  async isAuthenticated(): Promise<boolean> {
    const credentials = await this.credentials.get();

    if (!credentials) {
      return false;
    }

    if (!credentials.shouldRefresh()) {
      return true;
    }

    if (credentials.canRefresh()) {
      const newCredentials = await this.api.refresh(credentials.refreshToken);
      await this.credentials.set(newCredentials);
      return true;
    }

    // credentials expired
    return false;
  }

  async getAccessToken(): PromiseResult<string, CredentialsExpiredError | NotAuthenticatedError> {
    const credentials = await this.credentials.get();

    if (!credentials) {
      return failure(new NotAuthenticatedError());
    }

    if (!credentials.shouldRefresh() && credentials.accessToken) {
      return success(credentials.accessToken);
    }

    if (credentials.canRefresh()) {
      const newCredentials = await this.api.refresh(credentials.refreshToken);
      await this.credentials.set(newCredentials);

      if (!newCredentials.accessToken) {
        return failure(new CredentialsExpiredError());
      }

      return success(newCredentials.accessToken);
    }

    return failure(new CredentialsExpiredError());
  }

  async getProfileId(): Promise<string | null> {
    const result = await this.getCredentials();

    if (result.isFailure()) {
      return null;
    }

    return result.value.getProfileId();
  }

  // privileged methods
  async requireAuthentication<
    TResult extends Result<TValue, TError>,
    TValue,
    TError extends IEquatableError,
  >(
    handler: (profileId: string) => Promise<TResult>,
  ): PromiseResult<TValue, TError | CredentialsExpiredError | NotAuthenticatedError> {
    const result = await this.getCredentials();

    if (result.isFailure()) {
      return failure(result.error);
    }

    return handler(result.value.getProfileId());
  }

  async getRequestHeader(): PromiseResult<
    Record<string, string>,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    const credentials = await this.credentials.get();

    if (!credentials) {
      return failure(new NotAuthenticatedError());
    }

    if (!credentials.shouldRefresh()) {
      return success(this.buildHeader(credentials.accessToken));
    }

    if (credentials.canRefresh()) {
      const newCredentials = await this.api.refresh(credentials.refreshToken);
      await this.credentials.set(newCredentials);
      return success(this.buildHeader(newCredentials.accessToken));
    }

    return failure(new CredentialsExpiredError());
  }

  private async getCredentials(): PromiseResult<
    Credentials,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    const credentials = await this.credentials.get();

    if (!credentials) {
      return failure(new NotAuthenticatedError());
    }

    if (!credentials.canRefresh()) {
      return failure(new CredentialsExpiredError());
    }
    return success(credentials);
  }

  private buildHeader(accessToken: string | undefined) {
    return { authorization: `Bearer ${accessToken || ''}` };
  }
}
