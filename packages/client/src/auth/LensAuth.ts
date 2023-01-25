import { invariant } from '@lens-protocol/shared-kernel';

import { LensClient } from '../LensClient';
import { getSdk, Sdk } from './graphql/auth.generated';

export type CredentialsResult = { accessToken: string; refreshToken: string };

export class LensAuth {
  private readonly sdk: Sdk;

  private __accessToken: string | undefined = undefined;
  private __refreshToken: string | undefined = undefined;

  constructor(lensClient: LensClient) {
    this.sdk = getSdk(lensClient.client);
  }

  get accessToken(): string | undefined {
    return this.__accessToken;
  }

  get refreshToken(): string | undefined {
    return this.__refreshToken;
  }

  async generateChallenge(address: string): Promise<string> {
    const result = await this.sdk.AuthChallenge({ address });

    return result.data.result.text;
  }

  async generateCredentials(address: string, signature: string): Promise<CredentialsResult> {
    const result = await this.sdk.AuthAuthenticate({ address, signature });

    invariant(result.data, 'Not able to generate credentials. Credentials data not found.');

    const credentials = result.data.result;

    this.__accessToken = credentials.accessToken;
    this.__refreshToken = credentials.refreshToken;

    return credentials;
  }

  async refreshCredentials(refreshToken: string): Promise<CredentialsResult> {
    const result = await this.sdk.AuthRefresh({ refreshToken });

    invariant(result.data, 'Not able to refresh credentials. Credentials data not found.');

    const credentials = result.data.result;

    this.__accessToken = credentials.accessToken;
    this.__refreshToken = credentials.refreshToken;

    return credentials;
  }
}
