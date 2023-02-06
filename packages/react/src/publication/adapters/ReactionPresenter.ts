import { getApiReactionType, getDomainReactionType } from '@lens-protocol/api-bindings';
import { ReactionType } from '@lens-protocol/domain/entities';
import { ReactionRequest, IReactionPresenter } from '@lens-protocol/domain/use-cases/publications';
import { invariant, never } from '@lens-protocol/shared-kernel';

import { PublicationCacheManager } from '../../transactions/adapters/PublicationCacheManager';

const getReactionStatKey = (reactionType: ReactionType) => {
  if (reactionType === ReactionType.UPVOTE) {
    return 'totalUpvotes' as const;
  } else if (reactionType === ReactionType.DOWNVOTE) {
    return 'totalDownvotes' as const;
  }

  never('Unknown reaction type');
};

export class ReactionPresenter implements IReactionPresenter {
  constructor(private readonly publicationCacheManager: PublicationCacheManager) {}

  async add(request: ReactionRequest): Promise<void> {
    this.publicationCacheManager.update(request.publicationId, (current) => {
      const removedStatKey = current.reaction
        ? getReactionStatKey(getDomainReactionType(current.reaction))
        : undefined;

      const currentStatsValue = current.stats[getReactionStatKey(request.reactionType)];

      invariant(typeof currentStatsValue === 'number', 'Invalid stats value');

      return {
        ...current,
        stats: {
          ...current.stats,
          ...(removedStatKey && { [removedStatKey]: current.stats[removedStatKey] - 1 }),
          [getReactionStatKey(request.reactionType)]: currentStatsValue + 1,
        },
        reaction: getApiReactionType(request.reactionType),
      };
    });
  }

  async remove(request: ReactionRequest): Promise<void> {
    const statKey = getReactionStatKey(request.reactionType);

    this.publicationCacheManager.update(request.publicationId, (current) => ({
      ...current,
      stats: {
        ...current.stats,
        [statKey]: current.stats[statKey] - 1,
      },
      reaction: null,
    }));
  }
}
