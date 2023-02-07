import { GraphQLClient } from 'graphql-request';

import { LensConfig } from '../../consts/config';
import { getSdk, Sdk } from '../graphql/auth.generated';
import { Credentials } from './Credentials';

export class AuthenticationApi {
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
    const { accessToken, refreshToken } = result.data.result;

    return new Credentials(accessToken, refreshToken);
  }

  async refresh(refreshToken: string): Promise<Credentials> {
    const result = await this.sdk.AuthRefresh({ refreshToken });
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = result.data.result;

    return new Credentials(newAccessToken, newRefreshToken);
  }
}
