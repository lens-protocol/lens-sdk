import { PublicationOwnedByMe } from '@lens-protocol/api-bindings';
import { invariant, success } from '@lens-protocol/shared-kernel';

import { Operation, useOperation } from '../helpers/operations';
import { useHidePublicationController } from './adapters/useHidePublicationController';

export type UseHidePublicationArgs = {
  publication: PublicationOwnedByMe;
};

export type HidePublicationOperation = Operation<void>;

export function useHidePublication({
  publication,
}: UseHidePublicationArgs): HidePublicationOperation {
  const hide = useHidePublicationController();

  return useOperation(async () => {
    invariant(
      publication.profile.ownedByMe,
      'Publication not owned by the active wallet. Make sure that publication is owned by the wallet (for .e.g. by calling `isPublicationOwnedByMe`) before trying to hide it?',
    );

    await hide({
      publicationId: publication.id,
    });
    return success();
  });
}
