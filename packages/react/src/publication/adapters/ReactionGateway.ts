import {
  AddReactionDocument,
  AddReactionData,
  AddReactionVariables,
  RemoveReactionDocument,
  RemoveReactionData,
  RemoveReactionVariables,
  SafeApolloClient,
  PublicationReactionType,
} from '@lens-protocol/api-bindings';
import {
  TogglePropertyRequest,
  ITogglablePropertyGateway,
} from '@lens-protocol/domain/use-cases/publications';
import { Prettify } from '@lens-protocol/shared-kernel';

export type ReactionRequest = Prettify<
  TogglePropertyRequest & {
    reaction: PublicationReactionType;
  }
>;

export class ReactionGateway implements ITogglablePropertyGateway<ReactionRequest> {
  constructor(private apolloClient: SafeApolloClient) {}

  async add(request: ReactionRequest): Promise<void> {
    await this.apolloClient.mutate<AddReactionData, AddReactionVariables>({
      mutation: AddReactionDocument,
      variables: {
        request: {
          for: request.publicationId,
          reaction: request.reaction,
        },
      },
    });
  }

  async remove(request: ReactionRequest): Promise<void> {
    await this.apolloClient.mutate<RemoveReactionData, RemoveReactionVariables>({
      mutation: RemoveReactionDocument,
      variables: {
        request: {
          for: request.publicationId,
          reaction: request.reaction,
        },
      },
    });
  }
}
