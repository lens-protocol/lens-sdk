import {
  PendingSigningRequestError,
  TransactionKind,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import {
  CreateCommentRequest,
  ReferencePolicyType,
} from '@lens-protocol/domain/use-cases/publications';
import { useState } from 'react';

import { ProfileFragment } from '../profile';
import { FailedUploadError, MetadataUploadHandler } from './adapters/MetadataUploadAdapter';
import { useCreateCommentController } from './adapters/useCreateCommentController';

export type UseCreateCommentArgs = {
  profile: ProfileFragment;
  upload: MetadataUploadHandler;
};

export type CreateCommentArgs = Omit<CreateCommentRequest, 'kind' | 'delegate' | 'reference'> &
  Partial<Pick<CreateCommentRequest, 'reference'>>;

export function useCreateComment({ profile, upload }: UseCreateCommentArgs) {
  const [error, setError] = useState<
    | PendingSigningRequestError
    | UserRejectedError
    | WalletConnectionError
    | FailedUploadError
    | null
  >(null);
  const [isPending, setIsPending] = useState(false);
  const createComment = useCreateCommentController({ upload });

  return {
    create: async ({ reference, ...args }: CreateCommentArgs) => {
      setError(null);
      setIsPending(true);

      try {
        const result = await createComment({
          kind: TransactionKind.CREATE_COMMENT,
          delegate: profile.dispatcher !== null,
          reference: reference || { type: ReferencePolicyType.ANYONE },
          ...args,
        });
        if (result.isFailure()) {
          setError(result.error);
        }
      } catch (err: unknown) {
        if (err instanceof FailedUploadError) {
          setError(err);
          return;
        }
        throw err;
      } finally {
        setIsPending(false);
      }
    },
    error,
    isPending,
  };
}
