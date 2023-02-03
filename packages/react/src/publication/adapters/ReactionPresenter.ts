import { ReactionTypes } from '@lens-protocol/api-bindings';
import { ReactionType } from '@lens-protocol/domain/entities';
import { IReactionPresenter, ReactionRequest } from '@lens-protocol/domain/use-cases/publications';

import { PublicationCacheManager } from '../../transactions/adapters/PublicationCacheManager';

export class ReactionPresenter implements IReactionPresenter {
  constructor(private readonly publicationCacheManager: PublicationCacheManager) {}

  async add(request: ReactionRequest): Promise<void> {
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

  async remove(request: ReactionRequest): Promise<void> {
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
