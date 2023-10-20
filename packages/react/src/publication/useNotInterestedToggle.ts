import { AnyPublication, isMirrorPublication } from '@lens-protocol/api-bindings';
import { success } from '@lens-protocol/shared-kernel';

import { UseDeferredTask, useDeferredTask } from '../helpers/tasks';
import { useNotInterestedController } from './adapters/useNotInterestedController';

/**
 * @deprecated Use {@link useNotInterestedToggle} instead.
 */
export const useNotInterested = useNotInterestedToggle;

export type UseNotInterestedToggleArgs = {
  publication: AnyPublication;
};

export type NotInterestedOperation = UseDeferredTask<void, never, UseNotInterestedToggleArgs>;

/**
 * `useNotInterestedToggle` hook let's the active profile toggle the not
 *
 * You MUST be authenticated via {@link useWalletLogin} to use this hook.
 *
 * You can use the `Post.notInterested` (or  `Comment.notInterested`) property to determine
 * the interest associated with the provided publication observer.
 *
 * The `profile` argument MUST be the {@link ProfileOwnedByMe} instance that was used as observer when the publication got fetched.
 * For the vast majority of the users this corresponds to the Profile returned by the {@link useActiveProfile} hook.
 *
 * In the rare occasions you provided an `observerId` to the hook used to fetch the publication, then you MUST provide
 * the corresponding profile here. The profile MUST be owned by the authenticated wallet (i.e. instance of {@link ProfileOwnedByMe}).
 *
 * @category Publications
 * @group Hooks
 * @param args - {@link UseNotInterestedToggleArgs}
 *
 * @example
 * ```tsx
 * import { AnyPublication, ProfileOwnedByMe, useNotInterested } from '@lens-protocol/react-web';
 *
 * function Publication({ profile, publication }: { profile: ProfileOwnedByMe, publication: AnyPublication }) {
 *   const { execute: toggle, isPending } = useNotInterested({ profile, publication });
 *
 *   return (
 *     <button onClick={toggle} disabled={isPending}>
 *       {publication.notInterested ? 'Not interested' : 'Interested'}
 *     </button>
 *   );
 * }
 * ```
 */
export function useNotInterestedToggle(): NotInterestedOperation {
  const { add, remove } = useNotInterestedController();

  return useDeferredTask(async ({ publication }) => {
    const {
      id: publicationId,
      operations: { isNotInterested },
    } = isMirrorPublication(publication) ? publication.mirrorOn : publication;

    if (isNotInterested) {
      await remove({
        publicationId,
      });
    } else {
      await add({
        publicationId,
      });
    }

    return success();
  });
}
