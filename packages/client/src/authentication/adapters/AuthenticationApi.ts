import { GraphQLClient } from 'graphql-request';

import { Credentials } from './Credentials';
import { LensConfig } from '../../consts/config';
import { getSdk, Sdk } from '../graphql/auth.generated';

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

    const credentials = new Credentials(accessToken, refreshToken);
    credentials.checkClock();

    return credentials;
  }

  async refresh(refreshToken: string): Promise<Credentials> {
    const result = await this.sdk.AuthRefresh({ refreshToken });
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = result.data.result;

    const credentials = new Credentials(newAccessToken, newRefreshToken);
    credentials.checkClock();

    return credentials;
  }
}
