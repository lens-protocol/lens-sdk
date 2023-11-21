import {
  AuthAuthenticateDocument,
  AuthAuthenticateData,
  AuthAuthenticateVariables,
  AuthChallengeDocument,
  AuthChallengeData,
  AuthChallengeVariables,
  AuthRefreshDocument,
  AuthRefreshData,
  AuthRefreshVariables,
  SafeApolloClient,
  ChallengeRequest,
  SignedAuthChallenge,
} from '@lens-protocol/api-bindings';

import { Credentials } from './Credentials';

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

  async generateCredentials(request: SignedAuthChallenge): Promise<Credentials> {
    const result = await this.apolloClient.mutate<AuthAuthenticateData, AuthAuthenticateVariables>({
      mutation: AuthAuthenticateDocument,
      variables: { request },
    });

    const { accessToken, refreshToken } = result.data.result;

    return new Credentials(accessToken, refreshToken);
  }

  async refreshCredentials(refreshToken: string): Promise<Credentials> {
    const result = await this.apolloClient.mutate<AuthRefreshData, AuthRefreshVariables>({
      mutation: AuthRefreshDocument,
      variables: { request: { refreshToken } },
    });

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = result.data.result;

    return new Credentials(newAccessToken, newRefreshToken);
  }
}
