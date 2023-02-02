import {
  HidePublicationDocument,
  HidePublicationMutation,
  HidePublicationMutationVariables,
  LensApolloClient,
} from '@lens-protocol/api-bindings';
import {
  HidePublicationRequest,
  IHidePublicationGateway,
} from '@lens-protocol/domain/use-cases/publications';

export class HidePublicationGateway implements IHidePublicationGateway {
  constructor(private apolloClient: LensApolloClient) {}

  async hide(request: HidePublicationRequest) {
    await this.apolloClient.mutate<HidePublicationMutation, HidePublicationMutationVariables>({
      mutation: HidePublicationDocument,
      variables: {
        publicationId: request.publicationId,
      },
    });
  }
}
