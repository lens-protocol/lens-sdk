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
  ITogglablePublicationPropertyGateway,
  TogglePublicationPropertyRequest,
} from '@lens-protocol/domain/use-cases/publications';

export type HideCommentRequest = TogglePublicationPropertyRequest;

export class HideCommentGateway implements ITogglablePublicationPropertyGateway {
  constructor(private apolloClient: SafeApolloClient) {}

  // hide
  async on({ id }: HideCommentRequest): Promise<void> {
    await this.apolloClient.mutate<HideCommentData, HideCommentVariables>({
      mutation: HideCommentDocument,
      variables: {
        request: {
          for: id,
        },
      },
    });
  }

  // unhide
  async off({ id }: HideCommentRequest): Promise<void> {
    await this.apolloClient.mutate<UnhideCommentData, UnhideCommentVariables>({
      mutation: UnhideCommentDocument,
      variables: {
        request: {
          for: id,
        },
      },
    });
  }
}
