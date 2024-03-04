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
import { PublicationId } from '@lens-protocol/domain/entities';
import { ITogglablePublicationPropertyGateway } from '@lens-protocol/domain/use-cases/publications';

export type ReactionRequest = {
  id: PublicationId;
  reaction: PublicationReactionType;
};

export class ReactionGateway implements ITogglablePublicationPropertyGateway {
  constructor(private apolloClient: SafeApolloClient) {}

  // add
  async on(request: ReactionRequest): Promise<void> {
    await this.apolloClient.mutate<AddReactionData, AddReactionVariables>({
      mutation: AddReactionDocument,
      variables: {
        request: {
          for: request.id,
          reaction: request.reaction,
        },
      },
    });
  }

  // remove
  async off(request: ReactionRequest): Promise<void> {
    await this.apolloClient.mutate<RemoveReactionData, RemoveReactionVariables>({
      mutation: RemoveReactionDocument,
      variables: {
        request: {
          for: request.id,
          reaction: request.reaction,
        },
      },
    });
  }
}
