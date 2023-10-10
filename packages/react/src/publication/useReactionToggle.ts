import {
  PrimaryPublication,
  PublicationReactionType,
  isPrimaryPublication,
} from '@lens-protocol/api-bindings';
import { invariant, success } from '@lens-protocol/shared-kernel';

import { Operation, useOperation } from '../helpers/operations';
import { useReactionToggleController } from './adapters/useReactionToggleController';

export type UseReactionToggleArgs = {
  publication: PrimaryPublication;
};

export type ReactionToggleArgs = {
  reaction: PublicationReactionType;
};

export type ReactionOperation = Operation<void, never, [ReactionToggleArgs]>;

function getHasReacted(publication: PrimaryPublication, reaction: PublicationReactionType) {
  switch (reaction) {
    case PublicationReactionType.Upvote:
      return publication.operations.hasUpvoted;
    case PublicationReactionType.Downvote:
      return publication.operations.hasDownvoted;
  }
}

/**
 * `useReactionToggle` hook allows to add or remove a reaction to a publication.
 *
 * You MUST be authenticated via {@link useLogin} to use this hook.
 *
 * @example
 * ```tsx
 * const { execute: toggle, isPending } = useReactionToggle({
 *   publication,
 * });
 *
 * const toggleReaction = async () => {
 *   await toggle({
 *     reaction: PublicationReactionType.Upvote,
 *   });
 * };
 *
 * return (
 *   <button onClick={toggleReaction} disabled={isPending}>
 *     Toggle reaction
 *   </button>
 * );
 * ```
 */
export function useReactionToggle({ publication }: UseReactionToggleArgs): ReactionOperation {
  const { add, remove } = useReactionToggleController();

  invariant(isPrimaryPublication(publication), 'Publication is not a primary publication');

  return useOperation(async (args: ReactionToggleArgs) => {
    const hasReacted = getHasReacted(publication, args.reaction);

    if (hasReacted) {
      await remove({
        publicationId: publication.id,
        reaction: args.reaction,
      });
    } else {
      await add({
        publicationId: publication.id,
        reaction: args.reaction,
      });
    }

    return success();
  });
}
