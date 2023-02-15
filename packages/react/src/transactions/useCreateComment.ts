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

import { FailedUploadError, MetadataUploadHandler } from './adapters/MetadataUploadAdapter';
import { useCreateCommentController } from './adapters/useCreateCommentController';
import { Operation, useOperation } from '../helpers';

export type UseCreateCommentArg = {
  publisher: ProfileOwnedByMeFragment;
  upload: MetadataUploadHandler;
};

export type CreateCommentArgs = Prettify<
  Omit<CreateCommentRequest, 'kind' | 'delegate' | 'collect' | 'profileId' | 'reference'> &
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
  const createComment = useCreateCommentController({ upload });

  return useOperation(
    async ({
      collect = { type: CollectPolicyType.NO_COLLECT },
      reference = { type: ReferencePolicyType.ANYONE },
      ...args
    }: CreateCommentArgs): PromiseResult<
      void,
      PendingSigningRequestError | UserRejectedError | WalletConnectionError | FailedUploadError
    > => {
      try {
        return await createComment({
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
