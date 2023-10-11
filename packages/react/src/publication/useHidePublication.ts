import { AnyPublication } from '@lens-protocol/api-bindings';
import { invariant, success } from '@lens-protocol/shared-kernel';

import { useSession } from '../authentication';
import { Operation, useOperation } from '../helpers/operations';
import { useHidePublicationController } from './adapters/useHidePublicationController';

export type UseHidePublicationArgs = {
  publication: AnyPublication;
};

export type HidePublicationOperation = Operation<void>;

/**
 * Hide a publication posted by the authenticated profile to prevent other profiles from seeing it.
 *
 * You MUST be authenticated via {@link useLogin} to use this hook.
 *
 * @category Publications
 * @group Hooks
 * @param args - {@link UseHidePublicationArgs}
 *
 * @example
 * ```tsx
 * import { useHidePublication, AnyPublication } from '@lens-protocol/react';
 *
 * function HidePublication({ publication }: { publication: AnyPublication }) {
 *  const { execute: hide, isPending } = useHidePublication({ publication });
 *
 *  return (
 *    <button onClick={hide} disabled={isPending}>
 *      Hide
 *    </button>
 * );
 *```
 */
export function useHidePublication({
  publication,
}: UseHidePublicationArgs): HidePublicationOperation {
  const { data } = useSession();

  const hide = useHidePublicationController();

  return useOperation(async () => {
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
