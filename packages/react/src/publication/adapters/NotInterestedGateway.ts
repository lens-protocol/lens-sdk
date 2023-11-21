import {
  SafeApolloClient,
  AddPublicationNotInterestedDocument,
  UndoPublicationNotInterestedDocument,
  UndoPublicationNotInterestedData,
  UndoPublicationNotInterestedVariables,
  AddPublicationNotInterestedData,
  AddPublicationNotInterestedVariables,
} from '@lens-protocol/api-bindings';
import {
  ITogglablePropertyGateway,
  TogglePropertyRequest,
} from '@lens-protocol/domain/use-cases/publications';

export type NotInterestedRequest = TogglePropertyRequest;

export class NotInterestedGateway implements ITogglablePropertyGateway<NotInterestedRequest> {
  constructor(private apolloClient: SafeApolloClient) {}

  async add({ publicationId }: NotInterestedRequest): Promise<void> {
    await this.apolloClient.mutate<
      AddPublicationNotInterestedData,
      AddPublicationNotInterestedVariables
    >({
      mutation: AddPublicationNotInterestedDocument,
      variables: {
        request: {
          on: publicationId,
        },
      },
    });
  }

  async remove({ publicationId }: NotInterestedRequest): Promise<void> {
    await this.apolloClient.mutate<
      UndoPublicationNotInterestedData,
      UndoPublicationNotInterestedVariables
    >({
      mutation: UndoPublicationNotInterestedDocument,
      variables: {
        request: {
          on: publicationId,
        },
      },
    });
  }
}
