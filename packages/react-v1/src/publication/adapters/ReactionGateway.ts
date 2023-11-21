import {
  AddReactionDocument,
  AddReactionData,
  AddReactionVariables,
  RemoveReactionDocument,
  RemoveReactionData,
  RemoveReactionVariables,
  ValidationError,
  SafeApolloClient,
  ReactionTypes,
} from '@lens-protocol/api-bindings';
import {
  TogglePropertyRequest,
  ITogglablePropertyGateway,
} from '@lens-protocol/domain/use-cases/publications';
import { assertError } from '@lens-protocol/shared-kernel';

export type ReactionRequest = TogglePropertyRequest & {
  reactionType: ReactionTypes;
  existingReactionType?: ReactionTypes | null;
};

export class ReactionGateway implements ITogglablePropertyGateway<ReactionRequest> {
  constructor(private apolloClient: SafeApolloClient) {}

  async add({
    profileId,
    publicationId,
    reactionType: reactionType,
    existingReactionType,
  }: ReactionRequest) {
    if (existingReactionType === reactionType) {
      return;
    }

    if (existingReactionType && existingReactionType !== reactionType) {
      await this.remove({ profileId, publicationId, reactionType: existingReactionType });
    }

    await this.apolloClient.mutate<AddReactionData, AddReactionVariables>({
      mutation: AddReactionDocument,
      variables: {
        publicationId,
        profileId,
        reaction: reactionType,
      },
    });
  }

  async remove({ profileId, publicationId, reactionType }: ReactionRequest) {
    try {
      await this.apolloClient.mutate<RemoveReactionData, RemoveReactionVariables>({
        mutation: RemoveReactionDocument,
        variables: {
          publicationId,
          profileId,
          reaction: reactionType,
        },
      });
    } catch (e) {
      assertError(e);

      if (e instanceof ValidationError) {
        return;
      }

      throw e;
    }
  }
}
