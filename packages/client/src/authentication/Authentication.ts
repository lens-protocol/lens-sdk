import {
  failure,
  IEquatableError,
  PromiseResult,
  Result,
  success,
} from '@lens-protocol/shared-kernel';

import type { LensContext } from '../context';
import { CredentialsExpiredError, NotAuthenticatedError } from '../errors';
import type {
  ApprovedAuthenticationRequest,
  ChallengeRequest,
  RevokeAuthenticationRequest,
  SignedAuthChallenge,
  VerifyRequest,
  WalletAuthenticationToProfileAuthenticationRequest,
} from '../graphql/types.generated';
import { buildAuthorizationHeader } from '../helpers/buildAuthorizationHeader';
import { requireAuthHeaders } from '../helpers/requireAuthHeaders';
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

  /**
   * @internal
   */
  constructor(context: LensContext) {
    this.api = new AuthenticationApi(context);
    this.credentials = new CredentialsStorage(context.storage, context.environment.name);
  }

  async authenticateWith({ refreshToken }: { refreshToken: string }): Promise<void> {
    const credentials = new Credentials(undefined, undefined, refreshToken);
    await this.credentials.set(credentials);
  }

  async generateChallenge(request: ChallengeRequest): Promise<AuthChallengeFragment> {
    return this.api.challenge(request);
  }

  async authenticate(request: SignedAuthChallenge): Promise<void> {
    const credentials = await this.api.authenticate(request);
    await this.credentials.set(credentials);
  }

  async upgradeCredentials(request: WalletAuthenticationToProfileAuthenticationRequest) {
    return requireAuthHeaders(this, async (headers) => {
      const credentials = await this.api.upgrade(request, headers);
      await this.credentials.set(credentials);
    });
  }

  async verify(request: string | VerifyRequest): Promise<boolean> {
    const correctRequest = typeof request === 'string' ? { accessToken: request } : request;

    return this.api.verify(correctRequest);
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

  async getRefreshToken(): PromiseResult<string, CredentialsExpiredError | NotAuthenticatedError> {
    const credentials = await this.credentials.get();

    if (!credentials) {
      return failure(new NotAuthenticatedError());
    }

    if (!credentials.shouldRefresh()) {
      return success(credentials.refreshToken);
    }

    if (credentials.canRefresh()) {
      const newCredentials = await this.api.refresh(credentials.refreshToken);
      await this.credentials.set(newCredentials);

      if (!newCredentials.refreshToken) {
        return failure(new CredentialsExpiredError());
      }

      return success(newCredentials.refreshToken);
    }

    return failure(new CredentialsExpiredError());
  }

  async getIdentityToken(): PromiseResult<string, CredentialsExpiredError | NotAuthenticatedError> {
    const credentials = await this.credentials.get();

    if (!credentials) {
      return failure(new NotAuthenticatedError());
    }

    if (!credentials.shouldRefresh() && credentials.identityToken) {
      return success(credentials.identityToken);
    }

    if (credentials.canRefresh()) {
      const newCredentials = await this.api.refresh(credentials.refreshToken);
      await this.credentials.set(newCredentials);

      if (!newCredentials.identityToken) {
        return failure(new CredentialsExpiredError());
      }

      return success(newCredentials.identityToken);
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

  async getWalletAddress(): Promise<string | null> {
    const result = await this.getCredentials();

    if (result.isFailure()) {
      return null;
    }

    return result.value.getWalletAddress();
  }

  async getAuthorizationId(): Promise<string | null> {
    const result = await this.getCredentials();

    if (result.isFailure()) {
      return null;
    }

    return result.value.getAuthorizationId();
  }

  async logout(): Promise<void> {
    await this.credentials.reset();
  }

  async fetch() {
    return requireAuthHeaders(this, async (headers) => {
      return this.api.currentSession(headers);
    });
  }

  async fetchAll(request: ApprovedAuthenticationRequest = {}) {
    return requireAuthHeaders(this, async (headers) => {
      return this.api.approvedAuthentications(request, headers);
    });
  }

  async revoke(request: RevokeAuthenticationRequest) {
    return requireAuthHeaders(this, async (headers) => {
      await this.api.revoke(request, headers);
    });
  }

  /**
   * @internal
   */
  async requireAuthentication<
    TResult extends Result<TValue, TError>,
    TValue,
    TError extends IEquatableError,
  >(
    handler: (profileId: string) => Promise<TResult>,
  ): PromiseResult<TValue, TError | CredentialsExpiredError | NotAuthenticatedError> {
    const result = await this.getCredentials();

    if (result.isFailure()) {
      return result;
    }

    const profileId = result.value.getProfileId();

    if (!profileId) {
      return failure(new NotAuthenticatedError()); // authenticated with wallet only
    }

    return handler(profileId);
  }

  /**
   * @internal
   */
  async requireAtLeastWalletAuthentication<
    TResult extends Result<TValue, TError>,
    TValue,
    TError extends IEquatableError,
  >(
    handler: (profileId: string | null) => Promise<TResult>,
  ): PromiseResult<TValue, TError | CredentialsExpiredError | NotAuthenticatedError> {
    const result = await this.getCredentials();

    if (result.isFailure()) {
      return result;
    }

    return handler(result.value.getProfileId());
  }

  /**
   * @internal
   */
  async getRequestHeader(): PromiseResult<
    Record<string, string>,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    const credentials = await this.credentials.get();

    if (!credentials) {
      return failure(new NotAuthenticatedError());
    }

    if (!credentials.shouldRefresh()) {
      return success(buildAuthorizationHeader(credentials.accessToken));
    }

    if (credentials.canRefresh()) {
      const newCredentials = await this.api.refresh(credentials.refreshToken);
      await this.credentials.set(newCredentials);
      return success(buildAuthorizationHeader(newCredentials.accessToken));
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
}
