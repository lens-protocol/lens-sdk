import {
  AddReactionDocument,
  AddReactionData,
  AddReactionVariables,
  RemoveReactionDocument,
  RemoveReactionData,
  RemoveReactionVariables,
  resolveApiReactionType,
  ValidationError,
  LensApolloClient,
} from '@lens-protocol/api-bindings';
import { ReactionRequest, IReactionGateway } from '@lens-protocol/domain/use-cases/publications';
import { assertError } from '@lens-protocol/shared-kernel';

export class ReactionGateway implements IReactionGateway {
  constructor(private apolloClient: LensApolloClient) {}

  async add({ profileId, publicationId, reactionType }: ReactionRequest) {
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
