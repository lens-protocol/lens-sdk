import {
  RevokeAuthenticationData,
  RevokeAuthenticationDocument,
  RevokeAuthenticationVariables,
  SafeApolloClient,
} from '@lens-protocol/api-bindings';
import {
  ICredentialsWriter,
  ICredentialsReader,
  IResettableCredentialsGateway,
} from '@lens-protocol/domain/use-cases/authentication';
import { never } from '@lens-protocol/shared-kernel';
import { IStorage } from '@lens-protocol/storage';

import { Credentials } from './Credentials';

type RevokeSessionRequest = {
  authorizationId: string;
};

export class CredentialsGateway
  implements ICredentialsWriter, ICredentialsReader, IResettableCredentialsGateway
{
  constructor(
    private readonly credentialsStorage: IStorage<Credentials>,
    private apolloClient: SafeApolloClient,
  ) {}

  async getCredentials() {
    return this.credentialsStorage.get();
  }

  async save(credentials: Credentials) {
    await this.credentialsStorage.set(credentials);
  }

  async invalidate() {
    const credentials = await this.getCredentials();

    if (!credentials) {
      never('User is not authenticated');
    }

    await this.revoke({ authorizationId: credentials.authorizationId });
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
