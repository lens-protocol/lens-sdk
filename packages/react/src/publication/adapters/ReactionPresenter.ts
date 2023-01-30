import { ApolloCache, NormalizedCacheObject } from '@apollo/client';
import { ReactionTypes } from '@lens-protocol/api-bindings';
import { ReactionType } from '@lens-protocol/domain/entities';
import {
  ReactionRequest,
  IReactionPresenter,
  ReactionError,
} from '@lens-protocol/domain/use-cases/publications';

import { PromiseResultPresenter } from '../../transactions/adapters/PromiseResultPresenter';
import { PublicationCacheManager } from '../../transactions/adapters/PublicationCacheManager';

export class ReactionPresenter
  extends PromiseResultPresenter<void, ReactionError>
  implements IReactionPresenter
{
  readonly publicationCacheManager: PublicationCacheManager;

  constructor(cache: ApolloCache<NormalizedCacheObject>) {
    super();

    this.publicationCacheManager = new PublicationCacheManager(cache);
  }

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
          this.publicationCacheManager.update(request.publicationId, (current) => ({
            ...current,
            stats: {
              ...current.stats,
              totalUpvotes: current.stats.totalUpvotes + 1,
            },
            reaction: ReactionTypes.Upvote,
          }));
        }
        break;

      case ReactionType.DOWNVOTE:
        throw new Error('Downvotes support not implemented');
      default:
        throw new Error('Unknown reaction type');
    }
  }

  private async removeReaction(request: ReactionRequest): Promise<void> {
    switch (request.reactionType) {
      case ReactionType.UPVOTE:
        {
          this.publicationCacheManager.update(request.publicationId, (current) => ({
            ...current,
            stats: {
              ...current.stats,
              totalUpvotes: current.stats.totalUpvotes - 1,
            },
            reaction: null,
          }));
        }
        break;

      case ReactionType.DOWNVOTE:
        throw new Error('Downvotes support not implemented');
      default:
        throw new Error('Unknown reaction type');
    }
  }
}
