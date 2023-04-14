import { ProfileOwnedByMe } from '@lens-protocol/api-bindings';
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
import { BroadcastingError } from '@lens-protocol/domain/use-cases/transactions';
import { failure, Prettify, PromiseResult } from '@lens-protocol/shared-kernel';

import { Operation, useOperation } from '../helpers/operations';
import { useSharedDependencies } from '../shared';
import { FailedUploadError } from './adapters/IMetadataUploader';
import { MetadataUploadHandler } from './adapters/MetadataUploadHandler';
import { useCreatePostController } from './adapters/useCreatePostController';
import { PublicationMetadataUploader } from './infrastructure/PublicationMetadataUploader';

export type UseCreatePostArgs = {
  publisher: ProfileOwnedByMe;
  upload: MetadataUploadHandler;
};

export type CreatePostArgs = Prettify<
  Omit<
    CreatePostRequest,
    'kind' | 'delegate' | 'collect' | 'profileId' | 'reference' | 'decryptionCriteria'
  > &
    Partial<Pick<CreatePostRequest, 'collect' | 'reference'>>
>;

export type CreatePostOperation = Operation<
  void,
  | BroadcastingError
  | PendingSigningRequestError
  | UserRejectedError
  | WalletConnectionError
  | FailedUploadError,
  [CreatePostArgs]
>;

/**
 * @category Publications
 * @group Hooks
 */
export function useCreatePost({ publisher, upload }: UseCreatePostArgs): CreatePostOperation {
  const { appId } = useSharedDependencies();

  const uploader = new PublicationMetadataUploader(upload);
  const createPost = useCreatePostController({ uploader });

  return useOperation(
    async ({
      collect = { type: CollectPolicyType.NO_COLLECT },
      reference = { type: ReferencePolicyType.ANYONE },
      ...args
    }: CreatePostArgs): PromiseResult<
      void,
      | BroadcastingError
      | PendingSigningRequestError
      | UserRejectedError
      | WalletConnectionError
      | FailedUploadError
    > => {
      try {
        const request: CreatePostRequest = {
          kind: TransactionKind.CREATE_POST,
          collect,
          delegate: publisher.dispatcher !== null,
          profileId: publisher.id,
          reference,
          appId,
          ...args,
        };
        return await createPost(request);
      } catch (err: unknown) {
        if (err instanceof FailedUploadError) {
          return failure(err);
        }
        throw err;
      }
    },
  );
}
