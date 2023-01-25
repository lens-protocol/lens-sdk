import { invariant } from '@lens-protocol/shared-kernel';
import { GraphQLClient } from 'graphql-request';

import { getSdk, Sdk } from './graphql/auth.generated';

export type CredentialsResult = { accessToken: string; refreshToken: string };

export class Auth {
  private readonly sdk: Sdk;

  constructor(gqlClient: GraphQLClient) {
    this.sdk = getSdk(gqlClient);
  }

  async generateChallenge(address: string): Promise<string> {
    const result = await this.sdk.AuthChallenge({ address });

    return result.data.result.text;
  }

  async generateCredentials(address: string, signature: string): Promise<CredentialsResult> {
    const result = await this.sdk.AuthAuthenticate({ address, signature });

    invariant(result.data, 'Not able to generate credentials. Credentials data not found.');

    return result.data.result;
  }

  async refreshCredentials(refreshToken: string): Promise<CredentialsResult> {
    const result = await this.sdk.AuthRefresh({ refreshToken });

    invariant(result.data, 'Not able to refresh credentials. Credentials data not found.');

    return result.data.result;
  }
}
