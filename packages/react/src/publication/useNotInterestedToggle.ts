import { AnyPublication, isMirrorPublication } from '@lens-protocol/api-bindings';
import { invariant, success } from '@lens-protocol/shared-kernel';

import { useSession } from '../authentication';
import { UseDeferredTask, useDeferredTask } from '../helpers/tasks';
import { useNotInterestedController } from './adapters/useNotInterestedController';

export type UseNotInterestedToggleArgs = {
  publication: AnyPublication;
};

export type NotInterestedOperation = UseDeferredTask<void, never, UseNotInterestedToggleArgs>;

/**
 * `useNotInterestedToggle` hook let's the active profile toggle the not interested status of a publication.
 *
 * You MUST be authenticated via {@link useLogin} to use this hook.
 *
 * You can use the `primaryPublication.operations.isNotInterested` property to determine
 * the active profile's interest with the provided publication.
 *
 * @category Publications
 * @group Hooks
 *
 * @example
 * ```tsx
 * import { PrimaryPublication, useNotInterestedToggle } from '@lens-protocol/react-web';
 *
 * function Publication({ profile, publication }: { publication: AnyPublication }) {
 *   const { execute: toggle, loading } = useNotInterestedToggle();
 *
 *   return (
 *     <button onClick={() => toggle({ publication })} disabled={loading}>
 *       {publication.operations.isNotInterested ? 'Not interested' : 'Interested'}
 *     </button>
 *   );
 * }
 * ```
 */
export function useNotInterestedToggle(): NotInterestedOperation {
  const { data: session } = useSession();
  const { add, remove } = useNotInterestedController();

  return useDeferredTask(async ({ publication }) => {
    invariant(
      session?.authenticated,
      'You must be authenticated to use this operation. Use `useLogin` hook to authenticate.',
    );

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
