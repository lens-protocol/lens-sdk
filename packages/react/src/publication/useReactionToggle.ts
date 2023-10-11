import {
  PrimaryPublication,
  PublicationReactionType,
  isPrimaryPublication,
} from '@lens-protocol/api-bindings';
import { invariant, success } from '@lens-protocol/shared-kernel';

import { Operation, useOperation } from '../helpers/operations';
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

export type ReactionOperation = Operation<void, never, [ReactionToggleArgs]>;

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
    if (hasReacted({ publication, reaction: args.reaction })) {
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
