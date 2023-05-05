import { ProfileOwnedByMe } from '@lens-protocol/api-bindings';
import {
  AppId,
  DecryptionCriteria,
  PendingSigningRequestError,
  PublicationId,
  TransactionKind,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import {
  CollectPolicyConfig,
  CollectPolicyType,
  ContentFocus,
  Locale,
  MediaObject,
  ReferencePolicyConfig,
  ReferencePolicyType,
} from '@lens-protocol/domain/use-cases/publications';
import { BroadcastingError } from '@lens-protocol/domain/use-cases/transactions';
import { failure, PromiseResult } from '@lens-protocol/shared-kernel';

import { EncryptionConfig } from '../config';
import { Operation, useOperation } from '../helpers/operations';
import { useSharedDependencies } from '../shared';
import { FailedUploadError } from './adapters/IMetadataUploader';
import { MetadataUploadHandler } from './adapters/MetadataUploadHandler';
import { useCreateEncryptedCommentController } from './adapters/useCreateEncryptedCommentController';

export type UseCreateEncryptedCommentArgs = {
  encryption: EncryptionConfig;
  publisher: ProfileOwnedByMe;
  upload: MetadataUploadHandler;
};

export type CreateEncryptedCommentArgs = {
  /**
   * @deprecated Use {@link LensConfig#appId} instead. This was exposed by mistake but was never used.
   */
  appId?: AppId;
  /**
   * The comment collect policy. Determines the criteria that must be met for a user to be able to collect the comment.
   */
  collect?: CollectPolicyConfig;
  /**
   * The comment content as Markdown string.
   */
  content?: string;
  /**
   * The comment content focus. Determines what is the primary objective of the comment.
   */
  contentFocus: ContentFocus;
  /**
   * The comment media. An array of media objects.
   */
  media?: MediaObject[];
  /**
   * The publication ID to which the comment is being posted.
   */
  publicationId: PublicationId;
  /**
   * The comment reference policy. Determines the criteria that must be met for a user to be able to comment or mirror the comment.
   */
  reference?: ReferencePolicyConfig;
  /**
   * The language of the comment.
   *
   * It a locale string in the format of `<language-tag>-<region-tag>` or just `<language-tag>`, where:
   * - `language-tag` is a two-letter ISO 639-1 language code, e.g. `en` or `it`
   * - `region-tag` is a two-letter ISO 3166-1 alpha-2 region code, e.g. `US` or `IT`
   *
   * You can just pass in the language tag if you do not know the region or don't need to be specific.
   */
  locale: Locale;
  /**
   * The criteria that must be met for a user to be able to decrypt the comment.
   */
  decryptionCriteria: DecryptionCriteria;
};

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
