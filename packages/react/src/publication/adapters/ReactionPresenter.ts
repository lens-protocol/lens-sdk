import {
  PublicationReactionType,
  PublicationStats,
  isPrimaryPublication,
} from '@lens-protocol/api-bindings';
import { ITogglablePropertyPresenter } from '@lens-protocol/domain/use-cases/publications';

import { IPublicationCacheManager } from './IPublicationCacheManager';
import { ReactionRequest } from './ReactionGateway';

function updateOperationsOnAdd(reaction: PublicationReactionType) {
  switch (reaction) {
    case PublicationReactionType.Upvote:
      return {
        hasUpvoted: true,
      };
    case PublicationReactionType.Downvote:
      return {
        hasDownvoted: true,
      };
  }
}

function updateOperationsOnRemove(reaction: PublicationReactionType) {
  switch (reaction) {
    case PublicationReactionType.Upvote:
      return {
        hasUpvoted: false,
      };
    case PublicationReactionType.Downvote:
      return {
        hasDownvoted: false,
      };
  }
}

function updateStatsOnAdd(stats: PublicationStats, reaction: PublicationReactionType) {
  switch (reaction) {
    case PublicationReactionType.Upvote:
      return {
        upvotes: stats.upvotes + 1,
      };
    case PublicationReactionType.Downvote:
      return {
        downvotes: stats.downvotes + 1,
      };
  }
}

function updateStatsOnRemove(stats: PublicationStats, reaction: PublicationReactionType) {
  switch (reaction) {
    case PublicationReactionType.Upvote:
      return {
        upvotes: stats.upvotes - 1,
      };
    case PublicationReactionType.Downvote:
      return {
        downvotes: stats.downvotes - 1,
      };
  }
}

export class ReactionPresenter implements ITogglablePropertyPresenter<ReactionRequest> {
  constructor(private readonly publicationCacheManager: IPublicationCacheManager) {}

  async add(request: ReactionRequest): Promise<void> {
    this.publicationCacheManager.update(request.publicationId, (current) => {
      if (isPrimaryPublication(current)) {
        return {
          ...current,
          stats: {
            ...current.stats,
            ...updateStatsOnAdd(current.stats, request.reaction),
          },
          operations: {
            ...current.operations,
            ...updateOperationsOnAdd(request.reaction),
          },
        };
      }

      return current;
    });
  }

  async remove(request: ReactionRequest): Promise<void> {
    this.publicationCacheManager.update(request.publicationId, (current) => {
      if (isPrimaryPublication(current)) {
        return {
          ...current,
          stats: {
            ...current.stats,
            ...updateStatsOnRemove(current.stats, request.reaction),
          },
          operations: {
            ...current.operations,
            ...updateOperationsOnRemove(request.reaction),
          },
        };
      }

      return current;
    });
  }
}
