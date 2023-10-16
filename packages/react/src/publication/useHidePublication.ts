import { AnyPublication } from '@lens-protocol/api-bindings';
import { invariant, success } from '@lens-protocol/shared-kernel';

import { useSession } from '../authentication';
import { UseDeferredTask, useDeferredTask } from '../helpers/tasks';
import { useHidePublicationController } from './adapters/useHidePublicationController';

export type UseHidePublicationArgs = {
  publication: AnyPublication;
};

/**
 * Hide a publication posted by the authenticated profile to prevent other profiles from seeing it.
 *
 * You MUST be authenticated via {@link useLogin} to use this hook.
 *
 * @example
 * ```tsx
 * import { useHidePublication, AnyPublication } from '@lens-protocol/react';
 *
 * function HidePublication({ publication }: { publication: AnyPublication }) {
 *   const { execute: hide, loading } = useHidePublication({ publication });
 *
 *   return (
 *     <button onClick={hide} disabled={loading}>
 *       Hide
 *     </button>
 *   );
 * }
 * ```
 *
 * @category Publications
 * @group Hooks
 * @param args - {@link UseHidePublicationArgs}
 */
export function useHidePublication({
  publication,
}: UseHidePublicationArgs): UseDeferredTask<void, never> {
  const { data } = useSession();

  const hide = useHidePublicationController();

  return useDeferredTask(async () => {
    invariant(data?.authenticated, 'Must be authenticated to hide a publication');
    invariant(
      publication.by.ownedBy.address === data.address,
      'Publication not owned by the active wallet. Make sure that publication is owned by the wallet before trying to hide it.',
    );

    await hide({
      publicationId: publication.id,
    });

    return success();
  });
}