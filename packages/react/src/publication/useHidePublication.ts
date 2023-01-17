import { PublicationFragment } from '@lens-protocol/api-bindings';
import { useState } from 'react';

import { useHidePublicationController } from './adapters/useHidePublicationController';

export type PublicationArgs = {
  publication: PublicationFragment;
};

export function useHidePublication() {
  const [isPending, setIsPending] = useState(false);
  const { hide: hidePublication } = useHidePublicationController();

  const hide = async ({ publication }: PublicationArgs) => {
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
