import type { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import {
  AuthAuthenticateDocument,
  AuthAuthenticateMutation,
  AuthAuthenticateMutationVariables,
  AuthChallengeDocument,
  AuthChallengeQuery,
  AuthChallengeQueryVariables,
  AuthRefreshDocument,
  AuthRefreshMutation,
  AuthRefreshMutationVariables,
} from '@lens-protocol/api-bindings';
import { invariant } from '@lens-protocol/shared-kernel';

import { Credentials } from '../adapters/Credentials';

export class AuthApi {
  constructor(private apolloClient: ApolloClient<NormalizedCacheObject>) {}

  async generateChallenge(address: string): Promise<string> {
    const result = await this.apolloClient.query<AuthChallengeQuery, AuthChallengeQueryVariables>({
      query: AuthChallengeDocument,
      variables: { address },
      // challenge to sign should be always a new one
      fetchPolicy: 'network-only',
    });

    return result.data.result.text;
  }

  async generateCredentials(address: string, signature: string): Promise<Credentials> {
    const result = await this.apolloClient.mutate<
      AuthAuthenticateMutation,
      AuthAuthenticateMutationVariables
    >({ mutation: AuthAuthenticateDocument, variables: { address, signature } });

    invariant(result.data, 'Not able to generate credentials. Credentials data not found.');

    const { accessToken, refreshToken } = result.data.result;

    return new Credentials(accessToken, refreshToken);
  }

  async refreshCredentials(refreshToken: string): Promise<Credentials> {
    const result = await this.apolloClient.mutate<
      AuthRefreshMutation,
      AuthRefreshMutationVariables
    >({ mutation: AuthRefreshDocument, variables: { refreshToken } });

    invariant(result.data, 'Not able to refresh credentials. Credentials data not found.');

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = result.data.result;

    return new Credentials(newAccessToken, newRefreshToken);
  }
}
