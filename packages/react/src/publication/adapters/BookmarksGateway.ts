import {
  AddToMyBookmarksData,
  AddToMyBookmarksDocument,
  AddToMyBookmarksVariables,
  RemoveFromMyBookmarksData,
  RemoveFromMyBookmarksDocument,
  RemoveFromMyBookmarksVariables,
  SafeApolloClient,
} from '@lens-protocol/api-bindings';
import {
  ITogglablePropertyGateway,
  TogglePropertyRequest,
} from '@lens-protocol/domain/use-cases/publications';

export type BookmarkRequest = TogglePropertyRequest;

export class BookmarksGateway implements ITogglablePropertyGateway<BookmarkRequest> {
  constructor(private apolloClient: SafeApolloClient) {}

  async add({ publicationId, profileId }: BookmarkRequest): Promise<void> {
    await this.apolloClient.mutate<AddToMyBookmarksData, AddToMyBookmarksVariables>({
      mutation: AddToMyBookmarksDocument,
      variables: {
        request: {
          publicationId,
          profileId,
        },
      },
    });
  }

  async remove({ publicationId, profileId }: BookmarkRequest): Promise<void> {
    await this.apolloClient.mutate<RemoveFromMyBookmarksData, RemoveFromMyBookmarksVariables>({
      mutation: RemoveFromMyBookmarksDocument,
      variables: {
        request: {
          publicationId,
          profileId,
        },
      },
    });
  }
}
