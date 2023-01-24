import { invariant } from '@lens-protocol/shared-kernel';
import { GraphQLClient } from 'graphql-request';

import { getSdk, Sdk } from './graphql/auth.generated';

export type Credentials = { accessToken: string; refreshToken: string };

export class Authentication {
  private readonly sdk: Sdk;

  constructor(backendUrl: string) {
    const client = new GraphQLClient(backendUrl);
    this.sdk = getSdk(client);
  }

  async challenge(address: string): Promise<string> {
    const result = await this.sdk.AuthChallenge({ address });

    return result.data.result.text;
  }

  async verify(accessToken: string): Promise<boolean> {
    const result = await this.sdk.AuthVerify({ accessToken });

    return result.data.result;
  }

  async authenticate(address: string, signature: string): Promise<Credentials> {
    const result = await this.sdk.AuthAuthenticate({ address, signature });

    invariant(result.data, 'Not able to generate credentials. Credentials data not found.');

    return result.data.result;
  }

  async refresh(refreshToken: string): Promise<Credentials> {
    const result = await this.sdk.AuthRefresh({ refreshToken });

    invariant(result.data, 'Not able to refresh credentials. Credentials data not found.');

    return result.data.result;
  }
}
