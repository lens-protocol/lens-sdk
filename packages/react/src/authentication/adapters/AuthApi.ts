import {
  AuthAuthenticateData,
  AuthAuthenticateDocument,
  AuthAuthenticateVariables,
  AuthChallengeData,
  AuthChallengeDocument,
  AuthChallengeVariables,
  AuthRefreshData,
  AuthRefreshDocument,
  AuthRefreshVariables,
  ChallengeRequest,
  SafeApolloClient,
  SignedAuthChallenge,
} from '@lens-protocol/api-bindings';

import { JwtCredentials } from './JwtCredentials';

export type AuthChallenge = {
  id: string;
  text: string;
};

export class AuthApi {
  constructor(private apolloClient: SafeApolloClient) {}

  async generateChallenge(request: ChallengeRequest): Promise<AuthChallenge> {
    const result = await this.apolloClient.query<AuthChallengeData, AuthChallengeVariables>({
      query: AuthChallengeDocument,
      variables: { request },
      // challenge to sign should be always a new one
      fetchPolicy: 'network-only',
    });

    return {
      id: result.data.result.id,
      text: result.data.result.text,
    };
  }

  async generateCredentials(request: SignedAuthChallenge): Promise<JwtCredentials> {
    const result = await this.apolloClient.mutate<AuthAuthenticateData, AuthAuthenticateVariables>({
      mutation: AuthAuthenticateDocument,
      variables: { request },
    });

    const { accessToken, identityToken, refreshToken } = result.data.result;

    return new JwtCredentials(accessToken, identityToken, refreshToken);
  }

  async refreshCredentials(refreshToken: string): Promise<JwtCredentials> {
    const result = await this.apolloClient.mutate<AuthRefreshData, AuthRefreshVariables>({
      mutation: AuthRefreshDocument,
      variables: { request: { refreshToken } },
    });

    const {
      accessToken: newAccessToken,
      identityToken: newIdentityToken,
      refreshToken: newRefreshToken,
    } = result.data.result;

    return new JwtCredentials(newAccessToken, newIdentityToken, newRefreshToken);
  }
}
