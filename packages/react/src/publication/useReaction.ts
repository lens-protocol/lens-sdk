import { NetworkError } from '@apollo/client/errors';
import { ReactionType } from '@lens-protocol/domain/entities';
import { useState } from 'react';

import { useReactionController } from './adapters/useReactionController';

export type UseReactionArgs = {
  profileId: string;
};

export type ReactionArgs = {
  publicationId: string;
  reactionType: ReactionType;
};

export function useReaction({ profileId }: UseReactionArgs) {
  const [error, setError] = useState<NetworkError | null>(null);
  const [isPending, setIsPending] = useState(false);
  const { add, remove } = useReactionController();

  const addReaction = async (args: ReactionArgs) => {
    setIsPending(true);

    try {
      const result = await add({
        ...args,
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
        ...args,
        profileId,
      });
      if (result.isFailure()) {
        setError(result.error);
      }
    } finally {
      setIsPending(false);
    }
  };

  return {
    addReaction,
    removeReaction,
    error,
    isPending,
  };
}
