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
  ITogglablePropertyGateway,
  TogglePropertyRequest,
} from '@lens-protocol/domain/use-cases/publications';

export type BookmarkRequest = TogglePropertyRequest;

export class BookmarksGateway implements ITogglablePropertyGateway<BookmarkRequest> {
  constructor(private apolloClient: SafeApolloClient) {}

  async add({ publicationId }: BookmarkRequest): Promise<void> {
    await this.apolloClient.mutate<AddPublicationBookmarkData, AddPublicationBookmarkVariables>({
      mutation: AddPublicationBookmarkDocument,
      variables: {
        request: {
          on: publicationId,
        },
      },
    });
  }

  async remove({ publicationId }: BookmarkRequest): Promise<void> {
    await this.apolloClient.mutate<
      RemovePublicationBookmarkData,
      RemovePublicationBookmarkVariables
    >({
      mutation: RemovePublicationBookmarkDocument,
      variables: {
        request: {
          on: publicationId,
        },
      },
    });
  }
}
