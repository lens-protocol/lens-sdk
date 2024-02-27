import {
  AddPublicationBookmarkData,
  AddPublicationBookmarkDocument,
  AddPublicationBookmarkVariables,
  RemovePublicationBookmarkData,
  RemovePublicationBookmarkDocument,
  RemovePublicationBookmarkVariables,
  SafeApolloClient,
} from '@lens-protocol/api-bindings';
import {
  ITogglablePublicationPropertyGateway,
  TogglePublicationPropertyRequest,
} from '@lens-protocol/domain/use-cases/publications';

export type BookmarkRequest = TogglePublicationPropertyRequest;

export class BookmarksGateway implements ITogglablePublicationPropertyGateway {
  constructor(private apolloClient: SafeApolloClient) {}

  // add
  async on({ id }: BookmarkRequest): Promise<void> {
    await this.apolloClient.mutate<AddPublicationBookmarkData, AddPublicationBookmarkVariables>({
      mutation: AddPublicationBookmarkDocument,
      variables: {
        request: {
          on: id,
        },
      },
    });
  }

  // remove
  async off({ id }: BookmarkRequest): Promise<void> {
    await this.apolloClient.mutate<
      RemovePublicationBookmarkData,
      RemovePublicationBookmarkVariables
    >({
      mutation: RemovePublicationBookmarkDocument,
      variables: {
        request: {
          on: id,
        },
      },
    });
  }
}
