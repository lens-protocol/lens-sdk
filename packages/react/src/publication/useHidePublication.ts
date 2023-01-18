import { PublicationOwnedByMeFragment } from '@lens-protocol/api-bindings';
import { invariant } from '@lens-protocol/shared-kernel';
import { useState } from 'react';

import { useHidePublicationController } from './adapters/useHidePublicationController';

export type PublicationArgs = {
  publication: PublicationOwnedByMeFragment;
};

export function useHidePublication() {
  const [isPending, setIsPending] = useState(false);
  const { hide: hidePublication } = useHidePublicationController();

  const hide = async ({ publication }: PublicationArgs) => {
    invariant(
      publication.ownedByMe,
      'Publication not owned by the active profile. Make sure that publication is owned by the active profile (for .e.g. by calling `isPublicationOwnedByMe`) before trying to hide it?',
    );

    setIsPending(true);

    try {
      await hidePublication({
        publicationId: publication.id,
      });
    } finally {
      setIsPending(false);
    }
  };

  return {
    hide,
    isPending,
  };
}
