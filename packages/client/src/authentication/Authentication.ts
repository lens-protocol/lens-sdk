import {
  EthereumAddress,
  failure,
  invariant,
  PromiseResult,
  success,
} from '@lens-protocol/shared-kernel';
import { InMemoryStorageProvider } from '@lens-protocol/storage';

import { LensConfig } from '../consts/config';
import { CredentialsExpiredError, NotAuthenticatedError } from '../consts/errors';
import { AuthenticationApi } from './adapters/AuthenticationApi';
import { CredentialsStorage } from './adapters/CredentialsStorage';

/**
 * Authentication for Lens API.
 *
 * @group LensClient Modules
 */
export interface IAuthentication {
  /**
   * Generate a challenge string for the wallet to sign.
   *
   * @param address - The wallet address
   * @returns A challenge string
   */
  generateChallenge(address: EthereumAddress): Promise<string>;

  /**
   * Authenticate the user with the wallet address and signature of the challenge.
   *
   * @param address - The wallet address
   * @param signature - The signature of the challenge
   */
  authenticate(address: EthereumAddress, signature: string): Promise<void>;

  /**
   * Check if the user is authenticated. If the credentials are expired, try to refresh them.
   *
   * @returns Whether the user is authenticated
   */
  isAuthenticated(): Promise<boolean>;

  /**
   * Verify that the access token is signed by the server and the user.
   *
   * @param accessToken - The access token to verify
   * @returns Whether the access token is valid
   */
  verify(accessToken: string): Promise<boolean>;

  /**
   * Get the access token. If it expired, try to refresh it.
   *
   * @returns The access token
   */
  getAccessToken(): PromiseResult<string, CredentialsExpiredError | NotAuthenticatedError>;
}

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

  async generateChallenge(address: EthereumAddress): Promise<string> {
    return this.api.challenge(address);
  }

  async authenticate(address: EthereumAddress, signature: string): Promise<void> {
    const credentials = await this.api.authenticate(address, signature);
    await this.storage.set(credentials);
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

  async verify(accessToken: string): Promise<boolean> {
    return this.api.verify(accessToken);
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

      invariant(newCredentials.accessToken, 'Access token should be defined');
      return success(newCredentials.accessToken);
    }

    // otherwise
    return failure(new CredentialsExpiredError());
  }

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

    // otherwise
    return failure(new CredentialsExpiredError());
  }

  private buildHeader(accessToken: string | undefined) {
    return { authorization: `Bearer ${accessToken || ''}` };
  }
}
