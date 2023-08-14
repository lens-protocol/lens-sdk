import type { LensConfig } from '../../consts/config';
import { FetchGraphQLClient } from '../../graphql/FetchGraphQLClient';
import type { ChallengeRequest, SignedAuthChallenge } from '../../graphql/types.generated';
import { AuthChallengeFragment, getSdk, Sdk } from '../graphql/auth.generated';
import { Credentials } from './Credentials';

export class AuthenticationApi {
  private readonly sdk: Sdk;

  constructor(config: LensConfig) {
    const client = new FetchGraphQLClient(config.environment.gqlEndpoint);
    this.sdk = getSdk(client);
  }

  async challenge(request: ChallengeRequest): Promise<AuthChallengeFragment> {
    const result = await this.sdk.AuthChallenge({ request });

    return result.data.result;
  }

  async verify(accessToken: string): Promise<boolean> {
    const result = await this.sdk.AuthVerify({ request: { accessToken } });

    return result.data.result;
  }

  async authenticate(request: SignedAuthChallenge): Promise<Credentials> {
    const result = await this.sdk.AuthAuthenticate({ request });
    const { accessToken, refreshToken } = result.data.result;

    const credentials = new Credentials(accessToken, refreshToken);
    credentials.checkClock();

    return credentials;
  }

  async refresh(refreshToken: string): Promise<Credentials> {
    const result = await this.sdk.AuthRefresh({ request: { refreshToken } });
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = result.data.result;

    const credentials = new Credentials(newAccessToken, newRefreshToken);
    credentials.checkClock();

    return credentials;
  }
}
