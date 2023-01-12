import { getPublicationType, ProfileFieldsFragment } from '@lens-protocol/api-bindings';
import {
  PendingSigningRequestError,
  TransactionKind,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { useState } from 'react';
import { useMirrorController } from './adapters/useMirrorController';
import { CreateMirrorRequest } from '@lens-protocol/domain/use-cases/publications';
import { CommentFragment, PostFragment } from '@lens-protocol/api-bindings';

export type CreateMirrorArgs = Omit<
  CreateMirrorRequest,
  'kind' | 'delegate' | 'profileId' | 'publicationId' | 'publicationType'
> & {
  publication: PostFragment | CommentFragment;
  profile: ProfileFieldsFragment;
};

export function useMirror() {
  const [error, setError] = useState<
    PendingSigningRequestError | UserRejectedError | WalletConnectionError | null
  >(null);
  const [isPending, setIsPending] = useState(false);
  const createMirror = useMirrorController();

  return {
    mirror: async ({ profile, publication, ...args }: CreateMirrorArgs) => {
      setError(null);
      setIsPending(true);

      try {
        const result = await createMirror({
          kind: TransactionKind.MIRROR_PUBLICATION,
          publicationType: getPublicationType(publication),
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
