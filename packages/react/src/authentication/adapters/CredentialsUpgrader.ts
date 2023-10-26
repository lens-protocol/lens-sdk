import {
  SafeApolloClient,
  WalletAuthenticationToProfileAuthenticationData,
  WalletAuthenticationToProfileAuthenticationDocument,
  WalletAuthenticationToProfileAuthenticationVariables,
} from '@lens-protocol/api-bindings';
import { ProfileId } from '@lens-protocol/domain/entities';
import { ICredentialsUpgrader } from '@lens-protocol/domain/use-cases/authentication';

import { Credentials } from './Credentials';

export class CredentialsUpgrader implements ICredentialsUpgrader {
  constructor(private apolloClient: SafeApolloClient) {}

  async upgradeCredentials(profileId: ProfileId): Promise<Credentials> {
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

    const { accessToken, refreshToken } = result.data.result;

    return new Credentials(accessToken, refreshToken);
  }
}
