import {
  AddReactionDocument,
  AddReactionMutation,
  AddReactionMutationVariables,
  RemoveReactionDocument,
  RemoveReactionMutation,
  RemoveReactionMutationVariables,
  getApiReactionType,
  ValidationError,
  LensApolloClient,
} from '@lens-protocol/api-bindings';
import { ReactionRequest, IReactionGateway } from '@lens-protocol/domain/use-cases/publications';
import { assertError } from '@lens-protocol/shared-kernel';

export class ReactionGateway implements IReactionGateway {
  constructor(private apolloClient: LensApolloClient) {}

  async add({ profileId, publicationId, reactionType }: ReactionRequest) {
    await this.apolloClient.mutate<AddReactionMutation, AddReactionMutationVariables>({
      mutation: AddReactionDocument,
      variables: {
        publicationId,
        profileId,
        reaction: getApiReactionType(reactionType),
      },
    });
  }

  async remove({ profileId, publicationId, reactionType }: ReactionRequest) {
    try {
      await this.apolloClient.mutate<RemoveReactionMutation, RemoveReactionMutationVariables>({
        mutation: RemoveReactionDocument,
        variables: {
          publicationId,
          profileId,
          reaction: getApiReactionType(reactionType),
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
