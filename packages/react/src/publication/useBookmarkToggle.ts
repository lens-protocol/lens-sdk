import { AnyPublication, isMirrorPublication } from '@lens-protocol/api-bindings';
import { success } from '@lens-protocol/shared-kernel';

import { UseDeferredTask, useDeferredTask } from '../helpers/tasks';
import { useBookmarkToggleController } from './adapters/useBookmarkToggleController';

export type UseBookmarkToggleArgs = {
  publication: AnyPublication;
};

export type BookmarkOperation = UseDeferredTask<void, never, UseBookmarkToggleArgs>;

/**
 * `useBookmarkToggle` hook lets the user save or remove a publication from their bookmarks.
 *
 * You MUST be authenticated via {@link useLogin} to use this hook.
 *
 * You can use the `primaryPublication.operations.hasBookmarked` property to determine
 * if the publication is bookmarked by the active profile.
 *
 * @category Publications
 * @group Hooks
 * @param args - {@link UseBookmarkToggleArgs}
 *
 * @example
 * ```tsx
 * import { AnyPublication, useBookmarkToggle } from '@lens-protocol/react-web';
 *
 * function Publication({ publication }: { publication: AnyPublication }) {
 *   const { execute: toggle, loading } = useBookmarkToggle();
 *
 *   return (
 *     <button onClick={() => toggle({ publication })} disabled={loading}>
 *       {publication.operations.hasBookmarked ? 'Bookmarked' : 'Not bookmarked'}
 *     </button>
 *   );
 * }
 * ```
 */
export function useBookmarkToggle(): UseDeferredTask<void, never, UseBookmarkToggleArgs> {
  const { add, remove } = useBookmarkToggleController();

  return useDeferredTask(async ({ publication }) => {
    const target = isMirrorPublication(publication) ? publication.mirrorOn : publication;

    if (target.operations.hasBookmarked) {
      await remove({
        publicationId: target.id,
      });
    } else {
      await add({
        publicationId: target.id,
      });
    }

    return success();
  });
}
