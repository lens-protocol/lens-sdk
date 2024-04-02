import { Comment, isCommentPublication } from '@lens-protocol/api-bindings';
import { invariant, success } from '@lens-protocol/shared-kernel';

import { SessionType, useSession } from '../authentication';
import { UseDeferredTask, useDeferredTask } from '../helpers/tasks';
import { useHideCommentController } from './adapters/useHideCommentController';

export type UseHideCommentToggleArgs = {
  comment: Comment;
};

/**
 * This hook enables the author of a publication to toggle the visibility of a comment on their publication.
 *
 * You MUST be authenticated via {@link useLogin} to use this hook.
 *
 * @example
 * ```tsx
 * import { Comment, useHideCommentToggle } from '@lens-protocol/react-web';
 *
 * function HideableComment({ comment }: { comment: Comment }) {
 *   const { execute: toggle, loading } = useHideCommentToggle();
 *
 *   return (
 *     <button onClick={() => toggle({ comment })} disabled={loading}>
 *       {comment.hiddenByAuthor ? 'Unhide' : 'Hide'}
 *     </button>
 *   );
 * }
 * ```
 *
 * @category Publications
 * @group Hooks
 */
export function useHideCommentToggle(): UseDeferredTask<void, never, UseHideCommentToggleArgs> {
  const { data: session } = useSession();
  const { hide, unhide } = useHideCommentController();

  return useDeferredTask(async ({ comment }) => {
    invariant(
      session?.authenticated,
      'You must be authenticated to use this operation. Use `useLogin` hook to authenticate.',
    );
    invariant(
      session.type === SessionType.WithProfile,
      'You must be authenticated with a profile to use this query. Use `useLogin` hook to authenticate.',
    );
    invariant(isCommentPublication(comment), 'Publication is not a Comment.');
    invariant(
      comment.commentOn.by.id === session.profile.id,
      'You can only hide comments on publications that you have authored.',
    );

    if (comment.hiddenByAuthor) {
      await unhide({
        id: comment.id,
      });
    } else {
      await hide({
        id: comment.id,
      });
    }

    return success();
  });
}
