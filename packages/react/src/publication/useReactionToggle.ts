import {
  PrimaryPublication,
  PublicationReactionType,
  isPrimaryPublication,
} from '@lens-protocol/api-bindings';
import { invariant, success } from '@lens-protocol/shared-kernel';

import { useSession } from '../authentication';
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

export type ReactionToggleArgs = {
  publication: PrimaryPublication;
  reaction: PublicationReactionType;
};

/**
 * `useReactionToggle` hook allows to add or remove a reaction to a publication.
 *
 * You MUST be authenticated via {@link useLogin} to use this hook.
 *
 * @example
 * ```tsx
 * import { PrimaryPublication, useReactionToggle } from '@lens-protocol/react-web';
 *
 * function Publication({ publication }: { publication: PrimaryPublication }) {
 *  const { execute: toggle, loading, error } = useReactionToggle();
 *
 *  const toggleReaction = async () => {
 *    await toggle({
 *      reaction: PublicationReactionType.Upvote,
 *      publication,
 *    });
 *  };
 *
 *  if (error) {
 *   return <p>Error reacting to publication: {error.message}</p>;
 *  }
 *
 *  return (
 *    <div>
 *      // render publication details
 *      <button onClick={toggleReaction} disabled={loading}>
 *        Toggle reaction
 *      </button>
 *    </div>
 *  );
 * }
 * ```
 *
 * @category Publications
 * @group Hooks
 */
export function useReactionToggle(): UseDeferredTask<void, never, ReactionToggleArgs> {
  const { data: session } = useSession();
  const { add, remove } = useReactionToggleController();

  return useDeferredTask(async ({ reaction, publication }) => {
    invariant(isPrimaryPublication(publication), 'Publication is not a primary publication');

    invariant(
      session?.authenticated,
      'You must be authenticated to use this operation. Use `useLogin` hook to authenticate.',
    );

    if (hasReacted({ publication, reaction })) {
      await remove({
        id: publication.id,
        reaction: reaction,
      });
    } else {
      await add({
        id: publication.id,
        reaction: reaction,
      });
    }

    return success();
  });
}
