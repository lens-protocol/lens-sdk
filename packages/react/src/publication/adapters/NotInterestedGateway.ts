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
  ITogglablePublicationPropertyGateway,
  TogglePublicationPropertyRequest,
} from '@lens-protocol/domain/use-cases/publications';

export type NotInterestedRequest = TogglePublicationPropertyRequest;

export class NotInterestedGateway implements ITogglablePublicationPropertyGateway {
  constructor(private apolloClient: SafeApolloClient) {}

  // add
  async on({ id }: NotInterestedRequest): Promise<void> {
    await this.apolloClient.mutate<
      AddPublicationNotInterestedData,
      AddPublicationNotInterestedVariables
    >({
      mutation: AddPublicationNotInterestedDocument,
      variables: {
        request: {
          on: id,
        },
      },
    });
  }

  // remove
  async off({ id }: NotInterestedRequest): Promise<void> {
    await this.apolloClient.mutate<
      UndoPublicationNotInterestedData,
      UndoPublicationNotInterestedVariables
    >({
      mutation: UndoPublicationNotInterestedDocument,
      variables: {
        request: {
          on: id,
        },
      },
    });
  }
}
