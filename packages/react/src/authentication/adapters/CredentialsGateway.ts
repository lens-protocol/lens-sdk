import {
  RevokeAuthenticationData,
  RevokeAuthenticationDocument,
  RevokeAuthenticationVariables,
  SafeApolloClient,
} from '@lens-protocol/api-bindings';
import {
  ICredentialsGateway,
  IResettableCredentialsGateway,
  LogoutReason,
} from '@lens-protocol/domain/use-cases/authentication';
import { never } from '@lens-protocol/shared-kernel';
import { IStorage } from '@lens-protocol/storage';

import { JwtCredentials } from './JwtCredentials';

type RevokeSessionRequest = {
  authorizationId: string;
};

export class CredentialsGateway implements ICredentialsGateway, IResettableCredentialsGateway {
  constructor(
    private readonly credentialsStorage: IStorage<JwtCredentials>,
    private apolloClient: SafeApolloClient,
  ) {}

  async getCredentials() {
    return this.credentialsStorage.get();
  }

  async save(credentials: JwtCredentials) {
    await this.credentialsStorage.set(credentials);
  }

  async invalidate(reason: LogoutReason) {
    const credentials = await this.getCredentials();

    if (!credentials) {
      never('User is not authenticated');
    }

    if (reason === LogoutReason.USER_INITIATED) {
      await this.revoke({ authorizationId: credentials.authorizationId });
    }

    await this.credentialsStorage.reset();
  }

  private async revoke(request: RevokeSessionRequest): Promise<void> {
    await this.apolloClient.mutate<RevokeAuthenticationData, RevokeAuthenticationVariables>({
      mutation: RevokeAuthenticationDocument,
      variables: {
        request,
      },
    });
  }
}
