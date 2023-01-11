import { ProfileFieldsFragment } from '@lens-protocol/api-bindings';
import {
  PendingSigningRequestError,
  TransactionKind,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { useState } from 'react';
import { useMirrorController } from './adapters/useMirrorController';
import { CreateMirrorRequest } from '@lens-protocol/domain/use-cases/publications';

type UseMirrorArgs = {
  profile: ProfileFieldsFragment;
};

export type CreateMirrorArgs = Omit<CreateMirrorRequest, 'kind' | 'delegate'>;

export function useMirror({ profile }: UseMirrorArgs) {
  const [error, setError] = useState<
    PendingSigningRequestError | UserRejectedError | WalletConnectionError | null
  >(null);
  const [isPending, setIsPending] = useState(false);
  const createMirror = useMirrorController();

  return {
    create: async (args: CreateMirrorArgs) => {
      setError(null);
      setIsPending(true);

      try {
        const result = await createMirror({
          kind: TransactionKind.MIRROR_PUBLICATION,
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
