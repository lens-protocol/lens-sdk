import { EthereumAddress } from '@lens-protocol/shared-kernel';

import { LensConfig } from '../../consts/config';
import { FetchGraphQLClient } from '../../graphql/FetchGraphQLClient';
import { getSdk, Sdk } from '../graphql/auth.generated';
import { Credentials } from './Credentials';

export class AuthenticationApi {
  private readonly sdk: Sdk;

  constructor(config: LensConfig) {
    const client = new FetchGraphQLClient(config.environment.gqlEndpoint);
    this.sdk = getSdk(client);
  }

  async challenge(address: EthereumAddress): Promise<string> {
    const result = await this.sdk.AuthChallenge({ address });

    return result.data.result.text;
  }

  async verify(accessToken: string): Promise<boolean> {
    const result = await this.sdk.AuthVerify({ accessToken });

    return result.data.result;
  }

  async authenticate(address: EthereumAddress, signature: string): Promise<Credentials> {
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
