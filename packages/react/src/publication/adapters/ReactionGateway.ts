import {
  AddReactionDocument,
  AddReactionData,
  AddReactionVariables,
  RemoveReactionDocument,
  RemoveReactionData,
  RemoveReactionVariables,
  resolveApiReactionType,
  ValidationError,
  SafeApolloClient,
} from '@lens-protocol/api-bindings';
import { ReactionRequest, IReactionGateway } from '@lens-protocol/domain/use-cases/publications';
import { assertError } from '@lens-protocol/shared-kernel';

export type ExtendedReactionRequest = ReactionRequest & {
  existingReactionType: ReactionRequest['reactionType'] | undefined;
};

export class ReactionGateway implements IReactionGateway<ReactionRequest> {
  constructor(private apolloClient: SafeApolloClient) {}

  async add({
    profileId,
    publicationId,
    reactionType,
    existingReactionType,
  }: ExtendedReactionRequest) {
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
        reaction: resolveApiReactionType(reactionType),
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
          reaction: resolveApiReactionType(reactionType),
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
