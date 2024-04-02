import { LensContext } from '../../context';
import { FetchGraphQLClient } from '../../graphql/FetchGraphQLClient';
import type {
  ApprovedAuthenticationRequest,
  ChallengeRequest,
  RevokeAuthenticationRequest,
  SignedAuthChallenge,
  VerifyRequest,
  WalletAuthenticationToProfileAuthenticationRequest,
} from '../../graphql/types.generated';
import {
  buildPaginatedQueryResult,
  type PaginatedResult,
} from '../../helpers/buildPaginatedQueryResult';
import {
  ApprovedAuthenticationFragment,
  AuthChallengeFragment,
  getSdk,
  Sdk,
} from '../graphql/auth.generated';
import { Credentials } from './Credentials';

export class AuthenticationApi {
  private readonly sdk: Sdk;

  constructor(context: LensContext) {
    const client = new FetchGraphQLClient(context);
    this.sdk = getSdk(client);
  }

  async challenge(request: ChallengeRequest): Promise<AuthChallengeFragment> {
    const result = await this.sdk.AuthChallenge({ request });

    return result.data.result;
  }

  async verify(request: VerifyRequest): Promise<boolean> {
    const result = await this.sdk.AuthVerify({ request });

    return result.data.result;
  }

  async authenticate(request: SignedAuthChallenge): Promise<Credentials> {
    const result = await this.sdk.AuthAuthenticate({ request });
    const { accessToken, identityToken, refreshToken } = result.data.result;

    const credentials = new Credentials(accessToken, identityToken, refreshToken);
    credentials.checkClock();

    return credentials;
  }

  async refresh(currentRefreshToken: string): Promise<Credentials> {
    const result = await this.sdk.AuthRefresh({ request: { refreshToken: currentRefreshToken } });
    const { accessToken, identityToken, refreshToken } = result.data.result;

    const credentials = new Credentials(accessToken, identityToken, refreshToken);
    credentials.checkClock();

    return credentials;
  }

  async upgrade(
    request: WalletAuthenticationToProfileAuthenticationRequest,
    headers?: Record<string, string>,
  ): Promise<Credentials> {
    const result = await this.sdk.WalletAuthenticationToProfileAuthentication({ request }, headers);
    const { accessToken, identityToken, refreshToken } = result.data.result;

    const credentials = new Credentials(accessToken, identityToken, refreshToken);

    return credentials;
  }

  async currentSession(headers?: Record<string, string>): Promise<ApprovedAuthenticationFragment> {
    const result = await this.sdk.CurrentSession({}, headers);

    return result.data.result;
  }

  async approvedAuthentications(
    request: ApprovedAuthenticationRequest,
    headers?: Record<string, string>,
  ): Promise<PaginatedResult<ApprovedAuthenticationFragment>> {
    return buildPaginatedQueryResult(async (currRequest) => {
      const result = await this.sdk.ApprovedAuthentications({ request: currRequest }, headers);

      return result.data.result;
    }, request);
  }

  async revoke(
    request: RevokeAuthenticationRequest,
    headers?: Record<string, string>,
  ): Promise<void> {
    await this.sdk.RevokeAuthentication({ request }, headers);
  }
}
