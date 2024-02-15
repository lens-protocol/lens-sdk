import {
  HideCommentData,
  HideCommentDocument,
  HideCommentVariables,
  SafeApolloClient,
  UnhideCommentData,
  UnhideCommentDocument,
  UnhideCommentVariables,
} from '@lens-protocol/api-bindings';
import {
  ITogglablePropertyGateway,
  TogglePropertyRequest,
} from '@lens-protocol/domain/use-cases/publications';

export type HideCommentRequest = TogglePropertyRequest;

export class HideCommentGateway implements ITogglablePropertyGateway<HideCommentRequest> {
  constructor(private apolloClient: SafeApolloClient) {}

  // hide
  async add({ publicationId }: HideCommentRequest): Promise<void> {
    await this.apolloClient.mutate<HideCommentData, HideCommentVariables>({
      mutation: HideCommentDocument,
      variables: {
        request: {
          for: publicationId,
        },
      },
    });
  }

  // unhide
  async remove({ publicationId }: HideCommentRequest): Promise<void> {
    await this.apolloClient.mutate<UnhideCommentData, UnhideCommentVariables>({
      mutation: UnhideCommentDocument,
      variables: {
        request: {
          for: publicationId,
        },
      },
    });
  }
}
