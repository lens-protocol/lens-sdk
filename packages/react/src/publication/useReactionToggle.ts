import {
  PrimaryPublication,
  PublicationReactionType,
  isPrimaryPublication,
} from '@lens-protocol/api-bindings';
import { invariant, success } from '@lens-protocol/shared-kernel';

import { UseDeferredTask, useDeferredTask } from '../helpers/tasks';
import { useReactionToggleController } from './adapters/useReactionToggleController';

export type HasReactedArgs = {
  publication: PrimaryPublication;
  reaction: PublicationReactionType;
};

/**
 * A helper to check if a certain type of reaction has been added to a publication.
 *
 * @example
 * ```tsx
 * const hasUpvoted = hasReacted({
 *   publication,
 *   reaction: PublicationReactionType.Upvote,
 * });
 * ```
 *
 * @group Helpers
 */
export function hasReacted(args: HasReactedArgs): boolean {
  switch (args.reaction) {
    case PublicationReactionType.Upvote:
      return args.publication.operations.hasUpvoted;
    case PublicationReactionType.Downvote:
      return args.publication.operations.hasDownvoted;
  }
}

export type UseReactionToggleArgs = {
  publication: PrimaryPublication;
};

export type ReactionToggleArgs = {
  reaction: PublicationReactionType;
};

/**
 * `useReactionToggle` hook allows to add or remove a reaction to a publication.
 *
 * You MUST be authenticated via {@link useLogin} to use this hook.
 *
 * @example
 * ```tsx
 * const { execute: toggle, loading } = useReactionToggle({
 *   publication,
 * });
 *
 * const toggleReaction = async () => {
 *   await toggle({
 *     reaction: PublicationReactionType.Upvote,
 *   });
 * };
 *
 * <button onClick={toggleReaction} disabled={loading}>
 *   Toggle reaction
 * </button>
 * ```
 *
 * @category Publications
 * @group Hooks
 */
export function useReactionToggle(
  args: UseReactionToggleArgs,
): UseDeferredTask<void, never, ReactionToggleArgs> {
  const { add, remove } = useReactionToggleController();

  invariant(isPrimaryPublication(args.publication), 'Publication is not a primary publication');

  return useDeferredTask(async ({ reaction }) => {
    if (hasReacted({ publication: args.publication, reaction })) {
      await remove({
        publicationId: args.publication.id,
        reaction: reaction,
      });
    } else {
      await add({
        publicationId: args.publication.id,
        reaction: reaction,
      });
    }

    return success();
  });
}
