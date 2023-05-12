import { ProfileOwnedByMe } from '@lens-protocol/api-bindings';
import {
  DecryptionCriteria,
  PendingSigningRequestError,
  TransactionKind,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import {
  CollectPolicyType,
  ReferencePolicyType,
} from '@lens-protocol/domain/use-cases/publications';
import { BroadcastingError } from '@lens-protocol/domain/use-cases/transactions';
import { Distribute, failure, PromiseResult } from '@lens-protocol/shared-kernel';

import { EncryptionConfig } from '../config';
import { Operation, useOperation } from '../helpers/operations';
import { useSharedDependencies } from '../shared';
import { FailedUploadError } from './adapters/IMetadataUploader';
import { MetadataUploadHandler } from './adapters/MetadataUploadHandler';
import { useCreateEncryptedCommentController } from './adapters/useCreateEncryptedCommentController';
import { CreateCommentArgs } from './useCreateComment';

export type UseCreateEncryptedCommentArgs = {
  encryption: EncryptionConfig;
  publisher: ProfileOwnedByMe;
  upload: MetadataUploadHandler;
};

export type CreateEncryptedCommentArgs = Distribute<
  CreateCommentArgs,
  {
    /**
     * The criteria that must be met for a user to be able to decrypt the comment.
     */
    decryptionCriteria: DecryptionCriteria;
  }
>;

export type CreateEncryptedCommentOperation = Operation<
  void,
  | BroadcastingError
  | PendingSigningRequestError
  | UserRejectedError
  | WalletConnectionError
  | FailedUploadError,
  [CreateEncryptedCommentArgs]
>;

/**
 * @category Publications
 * @group Hooks
 * @param args - {@link UseCreateEncryptedCommentArgs}
 */
export function useCreateEncryptedComment({
  encryption,
  publisher,
  upload,
}: UseCreateEncryptedCommentArgs): CreateEncryptedCommentOperation {
  const { appId } = useSharedDependencies();
  const createComment = useCreateEncryptedCommentController({ encryption, upload });

  return useOperation(
    async ({
      collect = { type: CollectPolicyType.NO_COLLECT },
      reference = { type: ReferencePolicyType.ANYONE },
      ...args
    }: CreateEncryptedCommentArgs): PromiseResult<
      void,
      | BroadcastingError
      | PendingSigningRequestError
      | UserRejectedError
      | WalletConnectionError
      | FailedUploadError
    > => {
      try {
        return await createComment({
          kind: TransactionKind.CREATE_COMMENT,
          collect,
          delegate: publisher.dispatcher !== null,
          profileId: publisher.id,
          reference,
          appId,
          offChain: false, // For now, we only support on-chain token-gated comments
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
