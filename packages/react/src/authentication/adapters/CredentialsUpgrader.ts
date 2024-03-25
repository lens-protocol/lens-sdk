import {
  SafeApolloClient,
  WalletAuthenticationToProfileAuthenticationData,
  WalletAuthenticationToProfileAuthenticationDocument,
  WalletAuthenticationToProfileAuthenticationVariables,
} from '@lens-protocol/api-bindings';
import { ProfileId } from '@lens-protocol/domain/entities';
import { ICredentialsUpgrader } from '@lens-protocol/domain/use-cases/authentication';

import { JwtCredentials } from './JwtCredentials';

export class CredentialsUpgrader implements ICredentialsUpgrader {
  constructor(private apolloClient: SafeApolloClient) {}

  async upgradeCredentials(profileId: ProfileId): Promise<JwtCredentials> {
    const result = await this.apolloClient.mutate<
      WalletAuthenticationToProfileAuthenticationData,
      WalletAuthenticationToProfileAuthenticationVariables
    >({
      mutation: WalletAuthenticationToProfileAuthenticationDocument,
      variables: {
        request: {
          profileId,
        },
      },
    });

    const { accessToken, identityToken, refreshToken } = result.data.result;

    return new JwtCredentials(accessToken, identityToken, refreshToken);
  }
}
