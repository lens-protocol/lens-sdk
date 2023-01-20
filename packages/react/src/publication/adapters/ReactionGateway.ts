import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import {
  AddReactionDocument,
  AddReactionMutation,
  AddReactionMutationVariables,
  RemoveReactionDocument,
  RemoveReactionMutation,
  RemoveReactionMutationVariables,
  getApiReactionType,
  isGraphqlValidationError,
} from '@lens-protocol/api-bindings';
import {
  ReactionRequest,
  IReactionGateway,
  ReactionError,
} from '@lens-protocol/domain/use-cases/publications';
import { PromiseResult, success, failure, assertError } from '@lens-protocol/shared-kernel';

import { NetworkError } from './NetworkError';

export class ReactionGateway implements IReactionGateway {
  constructor(private apolloClient: ApolloClient<NormalizedCacheObject>) {}

  async add({
    profileId,
    publicationId,
    reactionType,
  }: ReactionRequest): PromiseResult<void, ReactionError> {
    try {
      await this.apolloClient.mutate<AddReactionMutation, AddReactionMutationVariables>({
        mutation: AddReactionDocument,
        variables: {
          publicationId,
          profileId,
          reaction: getApiReactionType(reactionType),
        },
      });

      return success();
    } catch (e) {
      assertError(e);
      if (isGraphqlValidationError(e)) {
        return failure(new ReactionError(e.message));
      }

      throw new NetworkError(e);
    }
  }

  async remove({
    profileId,
    publicationId,
    reactionType,
  }: ReactionRequest): PromiseResult<void, ReactionError> {
    try {
      await this.apolloClient.mutate<RemoveReactionMutation, RemoveReactionMutationVariables>({
        mutation: RemoveReactionDocument,
        variables: {
          publicationId,
          profileId,
          reaction: getApiReactionType(reactionType),
        },
      });

      return success();
    } catch (e) {
      assertError(e);

      if (isGraphqlValidationError(e)) {
        return failure(new ReactionError(e.message));
      }

      throw new NetworkError(e);
    }
  }
}
