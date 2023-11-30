import {
  RevokeAuthenticationData,
  RevokeAuthenticationDocument,
  RevokeAuthenticationVariables,
  SafeApolloClient,
} from '@lens-protocol/api-bindings';
import {
  IRevokeSessionGateway,
  RevokeSessionRequest,
} from '@lens-protocol/domain/use-cases/authentication';

export class RevokeSessionGateway implements IRevokeSessionGateway {
  constructor(private apolloClient: SafeApolloClient) {}

  async revoke(request: RevokeSessionRequest): Promise<void> {
    await this.apolloClient.mutate<RevokeAuthenticationData, RevokeAuthenticationVariables>({
      mutation: RevokeAuthenticationDocument,
      variables: {
        request,
      },
    });
  }
}
