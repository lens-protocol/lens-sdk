import {
  resolveApiReactionType,
  resolveDomainReactionType,
  isContentPublication,
  ReactionTypes,
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
  previousReactionType: ReactionTypes | null = null;

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

      this.previousReactionType = current.reaction;

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

  async revert(request: ReactionRequest): Promise<void> {
    const statKey = getReactionStatKey(request.reactionType);

    this.publicationCacheManager.update(request.publicationId, (current) => {
      invariant(
        isContentPublication(current),
        `Reactions are not supported on ${current.__typename}`,
      );

      const removedStatKey = this.previousReactionType
        ? getReactionStatKey(resolveDomainReactionType(this.previousReactionType))
        : undefined;

      return {
        ...current,
        stats: {
          ...current.stats,
          ...(removedStatKey && { [removedStatKey]: current.stats[removedStatKey] + 1 }),
          [statKey]: current.stats[statKey] - 1,
        },
        reaction: this.previousReactionType ? this.previousReactionType : null,
      };
    });

    this.previousReactionType = null;
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
