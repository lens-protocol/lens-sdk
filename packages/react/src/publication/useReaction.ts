import { ContentPublication, ReactionTypes } from '@lens-protocol/api-bindings';
import { ProfileId } from '@lens-protocol/domain/entities';
import { useState } from 'react';

import { useReactionController } from './adapters/useReactionController';

export type UseReactionArgs = {
  profileId: ProfileId;
};

export type ReactionArgs = {
  publication: ContentPublication;
  reactionType: ReactionTypes;
};

/**
 * @category Publications
 * @group Hooks
 */
export function useReaction({ profileId }: UseReactionArgs) {
  const [isPending, setIsPending] = useState(false);
  const { add, remove } = useReactionController();

  const addReaction = async (args: ReactionArgs) => {
    setIsPending(true);

    try {
      await add({
        publicationId: args.publication.id,
        reactionType: args.reactionType,
        existingReactionType: args.publication.reaction,
        profileId,
      });
    } finally {
      setIsPending(false);
    }
  };

  const removeReaction = async (args: ReactionArgs) => {
    setIsPending(true);

    try {
      await remove({
        publicationId: args.publication.id,
        reactionType: args.reactionType,
        profileId,
      });
    } finally {
      setIsPending(false);
    }
  };

  const hasReaction = ({ publication, reactionType }: ReactionArgs) => {
    return publication.reaction === reactionType;
  };

  return {
    addReaction,
    removeReaction,
    hasReaction,
    isPending,
  };
}
