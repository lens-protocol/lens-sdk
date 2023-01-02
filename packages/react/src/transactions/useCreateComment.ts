import {
  PendingSigningRequestError,
  TransactionKind,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { CreateCommentRequest } from '@lens-protocol/domain/use-cases/publications';
import { useState } from 'react';

import { ProfileFieldsFragment } from '../profile';
import { UploadHandler } from './adapters/UploadHandler';
import { useCreateCommentController } from './adapters/useCreateCommentController';

export type UseCreateCommentArgs = {
  profile: ProfileFieldsFragment;
  upload: UploadHandler;
};

export type CreateCommentArgs = Omit<CreateCommentRequest, 'kind' | 'delegate'>;

export function useCreateComment({ profile, upload }: UseCreateCommentArgs) {
  const [error, setError] = useState<
    PendingSigningRequestError | UserRejectedError | WalletConnectionError | null
  >(null);
  const [isPending, setIsPending] = useState(false);
  const createComment = useCreateCommentController({ upload });

  return {
    create: async (args: CreateCommentArgs) => {
      setIsPending(true);

      try {
        const result = await createComment({
          kind: TransactionKind.CREATE_COMMENT,
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
