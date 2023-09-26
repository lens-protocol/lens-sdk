import {
  AddNotInterestedData,
  AddNotInterestedDocument,
  AddNotInterestedVariables,
  RemoveNotInterestedData,
  RemoveNotInterestedDocument,
  RemoveNotInterestedVariables,
  SafeApolloClient,
} from '@lens-protocol/api-bindings';
import {
  ITogglablePropertyGateway,
  TogglePropertyRequest,
} from '@lens-protocol/domain/use-cases/publications';

export type NotInterestedRequest = TogglePropertyRequest;

export class NotInterestedGateway implements ITogglablePropertyGateway<NotInterestedRequest> {
  constructor(private apolloClient: SafeApolloClient) {}

  async add({ publicationId, profileId }: NotInterestedRequest): Promise<void> {
    await this.apolloClient.mutate<AddNotInterestedData, AddNotInterestedVariables>({
      mutation: AddNotInterestedDocument,
      variables: {
        request: {
          publicationId,
          profileId,
        },
      },
    });
  }

  async remove({ publicationId, profileId }: NotInterestedRequest): Promise<void> {
    await this.apolloClient.mutate<RemoveNotInterestedData, RemoveNotInterestedVariables>({
      mutation: RemoveNotInterestedDocument,
      variables: {
        request: {
          publicationId,
          profileId,
        },
      },
    });
  }
}
