import { ProfileOwnedByMe } from '@lens-protocol/api-bindings';
import {
  PendingSigningRequestError,
  TransactionKind,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import {
  CollectPolicyType,
  CreateCommentRequest,
  ReferencePolicyType,
} from '@lens-protocol/domain/use-cases/publications';
import { BroadcastingError } from '@lens-protocol/domain/use-cases/transactions';
import { failure, Prettify, PromiseResult } from '@lens-protocol/shared-kernel';

import { Operation, useOperation } from '../helpers/operations';
import { useSharedDependencies } from '../shared';
import { FailedUploadError } from './adapters/IMetadataUploader';
import { MetadataUploadHandler } from './adapters/MetadataUploadHandler';
import { CreateCommentController } from './adapters/useCreateCommentController';
import { PublicationMetadataUploader } from './infrastructure/PublicationMetadataUploader';

export type UseCreateCommentArg = {
  publisher: ProfileOwnedByMe;
  upload: MetadataUploadHandler;
};

export type CreateCommentArgs = Prettify<
  Omit<
    CreateCommentRequest,
    'kind' | 'delegate' | 'collect' | 'profileId' | 'reference' | 'decryptionCriteria'
  > &
    Partial<Pick<CreateCommentRequest, 'collect' | 'reference'>>
>;

export type CreateCommentOperation = Operation<
  void,
  | BroadcastingError
  | PendingSigningRequestError
  | UserRejectedError
  | WalletConnectionError
  | FailedUploadError,
  [CreateCommentArgs]
>;

/**
 * @category Publications
 * @group Hooks
 */
export function useCreateComment({
  publisher,
  upload,
}: UseCreateCommentArg): CreateCommentOperation {
  const {
    appId,
    activeWallet,
    apolloClient,
    onChainRelayer,
    transactionFactory,
    transactionGateway,
    transactionQueue,
  } = useSharedDependencies();

  return useOperation(
    async ({
      collect = { type: CollectPolicyType.NO_COLLECT },
      reference = { type: ReferencePolicyType.ANYONE },
      ...args
    }: CreateCommentArgs): PromiseResult<
      void,
      | BroadcastingError
      | PendingSigningRequestError
      | UserRejectedError
      | WalletConnectionError
      | FailedUploadError
    > => {
      const uploader = new PublicationMetadataUploader(upload);

      const controller = new CreateCommentController<CreateCommentRequest>({
        activeWallet,
        apolloClient,
        onChainRelayer,
        transactionFactory,
        transactionGateway,
        transactionQueue,
        uploader,
      });

      try {
        return await controller.execute({
          kind: TransactionKind.CREATE_COMMENT,
          delegate: publisher.dispatcher !== null,
          collect,
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
