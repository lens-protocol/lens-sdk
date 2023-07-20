import { isContentPublication, ReactionTypes } from '@lens-protocol/api-bindings';
import { ITogglablePropertyPresenter } from '@lens-protocol/domain/use-cases/publications';
import { assertNever, invariant } from '@lens-protocol/shared-kernel';

import { PublicationCacheManager } from '../../transactions/adapters/PublicationCacheManager';
import { ReactionRequest } from './ReactionGateway';

const getReactionStatKey = (reactionType: ReactionTypes) => {
  switch (reactionType) {
    case ReactionTypes.Upvote:
      return 'totalUpvotes' as const;
    case ReactionTypes.Downvote:
      return 'totalDownvotes' as const;
    default:
      assertNever(reactionType, 'Invalid reaction type');
  }
};

export class ReactionPresenter implements ITogglablePropertyPresenter<ReactionRequest> {
  constructor(private readonly publicationCacheManager: PublicationCacheManager) {}

  async add(request: ReactionRequest): Promise<void> {
    this.publicationCacheManager.update(request.publicationId, (current) => {
      invariant(
        isContentPublication(current),
        `Reactions are not supported on ${current.__typename}`,
      );

      const removedStatKey = current.reaction ? getReactionStatKey(current.reaction) : undefined;

      const currentStatsValue = current.stats[getReactionStatKey(request.reactionType)];

      invariant(typeof currentStatsValue === 'number', 'Invalid stats value');

      return {
        ...current,
        stats: {
          ...current.stats,
          ...(removedStatKey && { [removedStatKey]: current.stats[removedStatKey] - 1 }),
          [getReactionStatKey(request.reactionType)]: currentStatsValue + 1,
        },
        reaction: request.reactionType,
      };
    });
  }

  async remove(request: ReactionRequest): Promise<void> {
    const statKey = getReactionStatKey(request.reactionType);

    this.publicationCacheManager.update(request.publicationId, (current) => {
      invariant(
        isContentPublication(current),
        `Reactions are not supported on ${current.__typename}`,
      );

      return {
        ...current,
        stats: {
          ...current.stats,
          [statKey]: current.stats[statKey] - 1,
        },
        reaction: null,
      };
    });
  }
}
