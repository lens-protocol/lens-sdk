import { createCollectRequest, PublicationFragment } from '@lens-protocol/api-bindings';
import {
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { invariant } from '@lens-protocol/shared-kernel';
import { useState } from 'react';

import { useActiveProfile } from '../profile';
import { FailedUploadError } from './adapters/MetadataUploadAdapter';
import { useCollectController } from './adapters/useCollectController';

export type UseCollectArgs = {
  publication: PublicationFragment;
};

export function useCollect({ publication }: UseCollectArgs) {
  const [error, setError] = useState<
    | PendingSigningRequestError
    | UserRejectedError
    | WalletConnectionError
    | FailedUploadError
    | null
  >(null);
  const [isPending, setIsPending] = useState(false);
  const collect = useCollectController();
  const { data: activeProfile } = useActiveProfile();

  return {
    collect: async () => {
      try {
        invariant(activeProfile, 'You must be logged in to collect');
        setError(null);
        setIsPending(true);

        const result = await collect(createCollectRequest(publication, activeProfile));

        if (result.isFailure()) {
          setError(result.error);
        }
      } finally {
        setIsPending(false);
      }
    },
    error,
    isPending,
  };
}
