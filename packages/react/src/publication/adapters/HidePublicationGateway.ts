import {
  HidePublicationDocument,
  HidePublicationData,
  HidePublicationVariables,
  LensApolloClient,
} from '@lens-protocol/api-bindings';
import {
  HidePublicationRequest,
  IHidePublicationGateway,
} from '@lens-protocol/domain/use-cases/publications';

export class HidePublicationGateway implements IHidePublicationGateway {
  constructor(private apolloClient: LensApolloClient) {}

  async hide(request: HidePublicationRequest) {
    await this.apolloClient.mutate<HidePublicationData, HidePublicationVariables>({
      mutation: HidePublicationDocument,
      variables: {
        publicationId: request.publicationId,
      },
    });
  }
}
