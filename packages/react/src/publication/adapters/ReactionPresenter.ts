import {
  resolveApiReactionType,
  resolveDomainReactionType,
  isContentPublication,
} from '@lens-protocol/api-bindings';
import { ReactionType } from '@lens-protocol/domain/entities';
import { ReactionRequest, IReactionPresenter } from '@lens-protocol/domain/use-cases/publications';
import { assertNever, invariant } from '@lens-protocol/shared-kernel';

import { PublicationCacheManager } from '../../transactions/adapters/PublicationCacheManager';

const getReactionStatKey = (reactionType: ReactionType) => {
  switch (reactionType) {
    case ReactionType.UPVOTE:
      return 'totalUpvotes' as const;
    case ReactionType.DOWNVOTE:
      return 'totalDownvotes' as const;
    default:
      assertNever(reactionType, 'Invalid reaction type');
  }
};

export class ReactionPresenter implements IReactionPresenter {
  constructor(private readonly publicationCacheManager: PublicationCacheManager) {}

  async add(request: ReactionRequest): Promise<void> {
    this.publicationCacheManager.update(request.publicationId, (current) => {
      invariant(
        isContentPublication(current),
        `Reactions are not supported on ${current.__typename}`,
      );

      const removedStatKey = current.reaction
        ? getReactionStatKey(resolveDomainReactionType(current.reaction))
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
        reaction: resolveApiReactionType(request.reactionType),
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
