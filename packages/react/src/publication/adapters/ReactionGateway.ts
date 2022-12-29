import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import {
  AddReactionDocument,
  AddReactionMutation,
  AddReactionMutationVariables,
  RemoveReactionDocument,
  RemoveReactionMutation,
  RemoveReactionMutationVariables,
  ReactionTypes,
} from '@lens-protocol/api-bindings';
import { ReactionType } from '@lens-protocol/domain/entities';
import {
  ReactionRequest,
  IReactionGateway,
  NetworkError,
} from '@lens-protocol/domain/use-cases/publications';
import { PromiseResult, success, failure, assertError } from '@lens-protocol/shared-kernel';

const reactionTypeMap: Record<ReactionType, ReactionTypes> = {
  [ReactionType.UPVOTE]: ReactionTypes.Upvote,
  [ReactionType.DOWNVOTE]: ReactionTypes.Downvote,
};

export class ReactionGateway implements IReactionGateway {
  constructor(private apolloClient: ApolloClient<NormalizedCacheObject>) {}

  async add({
    profileId,
    publicationId,
    reactionType,
  }: ReactionRequest): PromiseResult<void, NetworkError> {
    try {
      const { data } = await this.apolloClient.mutate<
        AddReactionMutation,
        AddReactionMutationVariables
      >({
        mutation: AddReactionDocument,
        variables: {
          publicationId,
          profileId,
          reaction: reactionTypeMap[reactionType],
        },
      });

      if (!data) {
        return failure(
          new NetworkError(
            new Error(`Failed to add reaction to a publication with id "${publicationId}"`),
          ),
        );
      }

      return success();
    } catch (e) {
      assertError(e);

      return failure(new NetworkError(e));
    }
  }

  async remove({
    profileId,
    publicationId,
    reactionType,
  }: ReactionRequest): PromiseResult<void, NetworkError> {
    try {
      const { data } = await this.apolloClient.mutate<
        RemoveReactionMutation,
        RemoveReactionMutationVariables
      >({
        mutation: RemoveReactionDocument,
        variables: {
          publicationId,
          profileId,
          reaction: reactionTypeMap[reactionType],
        },
      });

      if (!data) {
        return failure(
          new NetworkError(
            new Error(`Failed to remove reaction to a publication with id "${publicationId}"`),
          ),
        );
      }

      return success();
    } catch (e) {
      assertError(e);

      return failure(new NetworkError(e));
    }
  }
}
