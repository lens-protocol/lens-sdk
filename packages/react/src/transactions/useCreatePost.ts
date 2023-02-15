import { ProfileOwnedByMeFragment } from '@lens-protocol/api-bindings';
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

import { MetadataUploadHandler, FailedUploadError } from './adapters/MetadataUploadAdapter';
import { useCreatePostController } from './adapters/useCreatePostController';
import { Operation, useOperation } from '../helpers';

export type UseCreatePostArgs = {
  publisher: ProfileOwnedByMeFragment;
  upload: MetadataUploadHandler;
};

export type CreatePostArgs = Prettify<
  Omit<CreatePostRequest, 'kind' | 'delegate' | 'collect' | 'profileId' | 'reference'> &
    Partial<Pick<CreatePostRequest, 'collect' | 'reference'>>
>;

export type CreatePostOperation = Operation<
  void,
  PendingSigningRequestError | UserRejectedError | WalletConnectionError | FailedUploadError,
  [CreatePostArgs]
>;

export function useCreatePost({ publisher, upload }: UseCreatePostArgs): CreatePostOperation {
  const createPost = useCreatePostController({ upload });

  return useOperation(
    async ({
      collect = { type: CollectPolicyType.NO_COLLECT },
      reference = { type: ReferencePolicyType.ANYONE },
      ...args
    }: CreatePostArgs): PromiseResult<
      void,
      PendingSigningRequestError | UserRejectedError | WalletConnectionError | FailedUploadError
    > => {
      try {
        return await createPost({
          kind: TransactionKind.CREATE_POST,
          collect,
          delegate: publisher.dispatcher !== null,
          profileId: publisher.id,
          reference,
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
