import {
  PendingSigningRequestError,
  TransactionKind,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { CreatePostRequest } from '@lens-protocol/domain/use-cases/publications';
import { useState } from 'react';

import { ProfileFieldsFragment } from '../profile';
import { MetadataUploadHandler, FailedUploadError } from './adapters/MetadataUploadAdapter';
import { useCreatePostController } from './adapters/useCreatePostController';

export type UseCreatePostArgs = {
  profile: ProfileFieldsFragment;
  upload: MetadataUploadHandler;
};

export type CreatePostArgs = Omit<CreatePostRequest, 'kind' | 'delegate'>;

export function useCreatePost({ profile, upload }: UseCreatePostArgs) {
  const [error, setError] = useState<
    | PendingSigningRequestError
    | UserRejectedError
    | WalletConnectionError
    | FailedUploadError
    | null
  >(null);
  const [isPending, setIsPending] = useState(false);
  const createPost = useCreatePostController({ upload });

  return {
    create: async (args: CreatePostArgs) => {
      setError(null);
      setIsPending(true);

      try {
        const result = await createPost({
          kind: TransactionKind.CREATE_POST,
          delegate: profile.dispatcher !== null,
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
