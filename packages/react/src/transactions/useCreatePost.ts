import {
  PendingSigningRequestError,
  TransactionKind,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { CreatePostRequest } from '@lens-protocol/domain/use-cases/publications';
import { useState } from 'react';

import { ProfileFieldsFragment } from '../profile';
import { UploadHandler } from './adapters/UploadHandler';
import { useCreatePostController } from './adapters/useCreatePostController';

export type UseCreatePostArgs = {
  profile: ProfileFieldsFragment;
  upload: UploadHandler;
};

export type CreatePostArgs = Omit<CreatePostRequest, 'kind' | 'delegate'>;

export function useCreatePost({ profile, upload }: UseCreatePostArgs) {
  const [error, setError] = useState<
    PendingSigningRequestError | UserRejectedError | WalletConnectionError | null
  >(null);
  const [isPending, setIsPending] = useState(false);
  const createPost = useCreatePostController({ upload });

  return {
    create: (args: CreatePostArgs) => {
      setIsPending(true);

      void createPost({
        kind: TransactionKind.CREATE_POST,
        delegate: profile.dispatcher !== null,
        ...args,
      })
        .then((result) => {
          if (result.isFailure()) {
            setError(result.error);
          }
        })
        .finally(() => setIsPending(false));
    },
    error,
    isPending,
  };
}
