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
import { useMemo } from 'react';

import { Operation, useOperation } from '../helpers/operations';
import { FailedUploadError } from './adapters/IMetadataUploader';
import { MetadataUploadHandler } from './adapters/MetadataUploadHandler';
import { useCreatePostController } from './adapters/useCreatePostController';
import { PublicationMetadataUploader } from './infrastructure/PublicationMetadataUploader';

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
  const uploader = useMemo(() => new PublicationMetadataUploader(upload), [upload]);
  const createPost = useCreatePostController({ uploader });

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
