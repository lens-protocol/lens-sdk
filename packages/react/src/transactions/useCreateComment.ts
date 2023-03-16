import { ProfileOwnedByMeFragment } from '@lens-protocol/api-bindings';
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
import { failure, Prettify, PromiseResult } from '@lens-protocol/shared-kernel';

import { Operation, useOperation } from '../helpers/operations';
import { useSharedDependencies } from '../shared';
import { FailedUploadError } from './adapters/IMetadataUploader';
import { MetadataUploadHandler } from './adapters/MetadataUploadHandler';
import { CreateCommentController } from './adapters/useCreateCommentController';
import { PublicationMetadataUploader } from './infrastructure/PublicationMetadataUploader';

export type UseCreateCommentArg = {
  publisher: ProfileOwnedByMeFragment;
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
  PendingSigningRequestError | UserRejectedError | WalletConnectionError | FailedUploadError,
  [CreateCommentArgs]
>;

export function useCreateComment({
  publisher,
  upload,
}: UseCreateCommentArg): CreateCommentOperation {
  const {
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
    }: CreateCommentArgs): PromiseResult<
      void,
      PendingSigningRequestError | UserRejectedError | WalletConnectionError | FailedUploadError
    > => {
      const uploader = new PublicationMetadataUploader(upload);

      const controller = new CreateCommentController<CreateCommentRequest>({
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
          kind: TransactionKind.CREATE_COMMENT,
          delegate: publisher.dispatcher !== null,
          collect,
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
