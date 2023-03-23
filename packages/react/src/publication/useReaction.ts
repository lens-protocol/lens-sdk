import { resolveApiReactionType, ContentPublicationFragment } from '@lens-protocol/api-bindings';
import { ReactionType } from '@lens-protocol/domain/entities';
import { useState } from 'react';

import { useReactionController } from './adapters/useReactionController';

export type UseReactionArgs = {
  profileId: string;
};

export type ReactionArgs = {
  publication: ContentPublicationFragment;
  reactionType: ReactionType;
};

export function useReaction({ profileId }: UseReactionArgs) {
  const [isPending, setIsPending] = useState(false);
  const { add, remove } = useReactionController();

  const addReaction = async (args: ReactionArgs) => {
    setIsPending(true);

    try {
      await add({
        publicationId: args.publication.id,
        reactionType: args.reactionType,
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
    return publication.reaction === resolveApiReactionType(reactionType);
  };

  return {
    addReaction,
    removeReaction,
    hasReaction,
    isPending,
  };
}
