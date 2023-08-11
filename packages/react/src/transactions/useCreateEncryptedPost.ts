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
import { AsyncTransactionResult } from './adapters/AsyncTransactionResult';
import { FailedUploadError } from './adapters/IMetadataUploader';
import { MetadataUploadHandler } from './adapters/MetadataUploadHandler';
import { useCreateEncryptedPostController } from './adapters/useCreateEncryptedPostController';
import { CreatePostArgs } from './useCreatePost';

export type UseCreateEncryptedPostArgs = {
  /**
   * The encryption configuration.
   */
  encryption: EncryptionConfig;
  /**
   * The publisher profile.
   */
  publisher: ProfileOwnedByMe;
  /**
   * The metadata upload handler.
   */
  upload: MetadataUploadHandler;
};

export type CreateEncryptedPostArgs = Distribute<
  CreatePostArgs,
  {
    /**
     * The criteria that must be met for a user to be able to decrypt the post.
     */
    decryptionCriteria: DecryptionCriteria;
  }
>;

export type CreateEncryptedPostOperation = Operation<
  AsyncTransactionResult<void>,
  | BroadcastingError
  | PendingSigningRequestError
  | UserRejectedError
  | WalletConnectionError
  | FailedUploadError,
  [CreateEncryptedPostArgs]
>;

/**
 * @category Publications
 * @group Hooks
 * @param args - {@link UseCreateEncryptedPostArgs}
 */
export function useCreateEncryptedPost({
  encryption,
  publisher,
  upload,
}: UseCreateEncryptedPostArgs): CreateEncryptedPostOperation {
  const { appId } = useSharedDependencies();
  const createPost = useCreateEncryptedPostController({ encryption, upload });

  return useOperation(
    async ({
      collect = { type: CollectPolicyType.NO_COLLECT },
      reference = { type: ReferencePolicyType.ANYONE },
      ...args
    }: CreateEncryptedPostArgs): PromiseResult<
      AsyncTransactionResult<void>,
      | BroadcastingError
      | PendingSigningRequestError
      | UserRejectedError
      | WalletConnectionError
      | FailedUploadError
    > => {
      try {
        return await createPost({
          kind: TransactionKind.CREATE_POST,
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
