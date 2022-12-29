import { ApolloCache, NormalizedCacheObject } from '@apollo/client';
import { PublicationStats, ReactionTypes } from '@lens-protocol/api-bindings';
import { ReactionType } from '@lens-protocol/domain/entities';
import { ReactionRequest, IReactionPresenter } from '@lens-protocol/domain/use-cases/publications';

export class ReactionPresenter implements IReactionPresenter {
  constructor(private cache: ApolloCache<NormalizedCacheObject>) {}

  async presentOptimisticAdd(request: ReactionRequest): Promise<void> {
    await this.addReaction(request);
  }

  async presentOptimisticRemove(request: ReactionRequest): Promise<void> {
    await this.removeReaction(request);
  }

  async revertOptimisticAdd(request: ReactionRequest): Promise<void> {
    await this.removeReaction(request);
  }

  async revertOptimisticRemove(request: ReactionRequest): Promise<void> {
    await this.addReaction(request);
  }

  private async addReaction(request: ReactionRequest): Promise<void> {
    switch (request.reactionType) {
      case ReactionType.UPVOTE:
        {
          const id = this.cache.identify({
            // __typename: getPublicationTypename(request.publicationType),
            id: request.publicationId,
          });

          this.cache.modify({
            id,
            fields: {
              stats(oldStats: PublicationStats) {
                return {
                  ...oldStats,
                  totalUpvotes: oldStats.totalUpvotes + 1,
                };
              },
              reaction: () => ReactionTypes.Upvote,
            },
          });
        }

        break;
      case ReactionType.DOWNVOTE:
      default:
        throw new Error('Downvotes support not implemented');
    }
  }

  private async removeReaction(request: ReactionRequest): Promise<void> {
    switch (request.reactionType) {
      case ReactionType.UPVOTE:
        {
          const id = this.cache.identify({
            // __typename: getPublicationTypename(request.publicationType),
            id: request.publicationId,
          });

          this.cache.modify({
            id,
            fields: {
              stats(oldStats: PublicationStats) {
                return {
                  ...oldStats,
                  totalUpvotes: oldStats.totalUpvotes - 1,
                };
              },
              reaction: () => null,
            },
          });
        }

        break;
      case ReactionType.DOWNVOTE:
      default:
        throw new Error('Downvotes support not implemented');
    }
  }
}
