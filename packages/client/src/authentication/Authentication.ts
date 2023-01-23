import { GraphQLClient } from 'graphql-request';

import { getSdk, Sdk } from './graphql/auth.generated';
import { LensConfig } from '../consts/config';

export type Credentials = { accessToken: string; refreshToken: string };

export class Authentication {
  private readonly sdk: Sdk;

  constructor(config: LensConfig) {
    const client = new GraphQLClient(config.environment.gqlEndpoint);
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

    return result.data.result;
  }

  async refresh(refreshToken: string): Promise<Credentials> {
    const result = await this.sdk.AuthRefresh({ refreshToken });

    return result.data.result;
  }
}
