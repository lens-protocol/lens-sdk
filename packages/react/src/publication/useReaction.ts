import { getApiReactionType, getPublicationType } from '@lens-protocol/api-bindings';
import { ReactionType } from '@lens-protocol/domain/entities';
import { useState } from 'react';

import { useReactionController } from './adapters/useReactionController';
import { Publication } from './types';

export type UseReactionArgs = {
  profileId: string;
};

export type ReactionArgs = {
  publication: Publication;
  reactionType: ReactionType;
};

export function useReaction({ profileId }: UseReactionArgs) {
  const [error, setError] = useState<Error | null>(null);
  const [isPending, setIsPending] = useState(false);
  const { add, remove } = useReactionController();

  const addReaction = async (args: ReactionArgs) => {
    setIsPending(true);

    try {
      const result = await add({
        publicationId: args.publication.id,
        publicationType: getPublicationType(args.publication),
        reactionType: args.reactionType,
        profileId,
      });
      if (result.isFailure()) {
        setError(result.error);
      }
    } finally {
      setIsPending(false);
    }
  };

  const removeReaction = async (args: ReactionArgs) => {
    try {
      const result = await remove({
        publicationId: args.publication.id,
        publicationType: getPublicationType(args.publication),
        reactionType: args.reactionType,
        profileId,
      });
      if (result.isFailure()) {
        setError(result.error);
      }
    } finally {
      setIsPending(false);
    }
  };

  const hasReaction = ({ publication, reactionType }: ReactionArgs) => {
    return publication.reaction === getApiReactionType(reactionType);
  };

  return {
    addReaction,
    removeReaction,
    hasReaction,
    error,
    isPending,
  };
}
