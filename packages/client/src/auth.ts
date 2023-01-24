import { invariant } from '@lens-protocol/shared-kernel';

import { Sdk } from './graphql/generated';

export type CredentialsResult = { accessToken: string; refreshToken: string };

export class Auth {
  constructor(private readonly sdk: Sdk) {}

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
