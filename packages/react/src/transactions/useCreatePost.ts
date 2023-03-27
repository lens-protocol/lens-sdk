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
import { failure, Prettify, PromiseResult } from '@lens-protocol/shared-kernel';

import { Operation, useOperation } from '../helpers/operations';
import { useSharedDependencies } from '../shared';
import { CreatePostController } from './adapters/CreatePostController';
import { FailedUploadError } from './adapters/IMetadataUploader';
import { MetadataUploadHandler } from './adapters/MetadataUploadHandler';
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
  PendingSigningRequestError | UserRejectedError | WalletConnectionError | FailedUploadError,
  [CreatePostArgs]
>;

/**
 * @category Publications
 * @group Hooks
 */
export function useCreatePost({ publisher, upload }: UseCreatePostArgs): CreatePostOperation {
  const {
    appId,
    activeWallet,
    apolloClient,
    protocolCallRelayer,
    transactionFactory,
    transactionGateway,
    transactionQueue,
  } = useSharedDependencies();

  return useOperation(
    async ({
      collect = { type: CollectPolicyType.NO_COLLECT },
      reference = { type: ReferencePolicyType.ANYONE },
      ...args
    }: CreatePostArgs): PromiseResult<
      void,
      PendingSigningRequestError | UserRejectedError | WalletConnectionError | FailedUploadError
    > => {
      const uploader = new PublicationMetadataUploader(upload);

      const controller = new CreatePostController<CreatePostRequest>({
        activeWallet,
        apolloClient,
        protocolCallRelayer,
        transactionFactory,
        transactionGateway,
        transactionQueue,
        uploader,
      });

      try {
        return await controller.execute({
          kind: TransactionKind.CREATE_POST,
          collect,
          delegate: publisher.dispatcher !== null,
          profileId: publisher.id,
          reference,
          appId,
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
