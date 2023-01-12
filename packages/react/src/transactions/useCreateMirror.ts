import { ProfileFieldsFragment, CommentFragment, PostFragment } from '@lens-protocol/api-bindings';
import {
  PendingSigningRequestError,
  TransactionKind,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { CreateMirrorRequest } from '@lens-protocol/domain/use-cases/publications';
import { useState } from 'react';

import { useCreateMirrorController } from './adapters/useCreateMirrorController';

export type CreateMirrorArgs = Pick<CreateMirrorRequest, 'reference'> & {
  publication: PostFragment | CommentFragment;
  profile: ProfileFieldsFragment;
};

export function useCreateMirror() {
  const [error, setError] = useState<
    PendingSigningRequestError | UserRejectedError | WalletConnectionError | null
  >(null);
  const [isPending, setIsPending] = useState(false);
  const createMirror = useCreateMirrorController();

  return {
    create: async ({ profile, publication, ...args }: CreateMirrorArgs) => {
      setError(null);
      setIsPending(true);

      try {
        const result = await createMirror({
          kind: TransactionKind.MIRROR_PUBLICATION,
          publicationId: publication.id,
          profileId: profile.id,
          delegate: profile.dispatcher !== null,
          ...args,
        });
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
