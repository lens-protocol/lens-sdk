import {
  PendingSigningRequestError,
  TransactionKind,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import {
  CollectPolicyType,
  CreatePostRequest,
  ReferencePolicyType,
} from '@lens-protocol/domain/use-cases/publications';
import { failure, Prettify, PromiseResult } from '@lens-protocol/shared-kernel';

import { Operation, useOperation } from '../helpers';
import { ProfileFragment } from '../profile';
import { MetadataUploadHandler, FailedUploadError } from './adapters/MetadataUploadAdapter';
import { useCreatePostController } from './adapters/useCreatePostController';

export type UseCreatePostArgs = {
  profile: ProfileFragment;
  upload: MetadataUploadHandler;
};

export type CreatePostArg = Prettify<
  Omit<CreatePostRequest, 'kind' | 'delegate' | 'collect' | 'reference'> &
    Partial<Pick<CreatePostRequest, 'collect' | 'reference'>>
>;

export type CreatePostOperation = Operation<
  void,
  PendingSigningRequestError | UserRejectedError | WalletConnectionError | FailedUploadError,
  [CreatePostArg]
>;

export function useCreatePost({ profile, upload }: UseCreatePostArgs): CreatePostOperation {
  const createPost = useCreatePostController({ upload });

  return useOperation(
    async ({
      collect = { type: CollectPolicyType.NO_COLLECT },
      reference = { type: ReferencePolicyType.ANYONE },
      ...args
    }: CreatePostArg): PromiseResult<
      void,
      PendingSigningRequestError | UserRejectedError | WalletConnectionError | FailedUploadError
    > => {
      try {
        return await createPost({
          kind: TransactionKind.CREATE_POST,
          collect,
          reference,
          delegate: profile.dispatcher !== null,
          ...args,
        });
      } catch (err: unknown) {
        if (err instanceof FailedUploadError) {
          return failure(err);
        }
        throw err;
      }
    },
  );
}
