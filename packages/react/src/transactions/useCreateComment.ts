import { isDataAvailabilityPublicationId, ProfileOwnedByMe } from '@lens-protocol/api-bindings';
import {
  AppId,
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

import { Operation, useOperation } from '../helpers/operations';
import { useSharedDependencies } from '../shared';
import { FailedUploadError } from './adapters/IMetadataUploader';
import { MetadataUploadHandler } from './adapters/MetadataUploadHandler';
import { useCreateCommentController } from './adapters/useCreateCommentController';
import { PublicationMetadataUploader } from './infrastructure/PublicationMetadataUploader';

export type UseCreateCommentArg = {
  publisher: ProfileOwnedByMe;
  upload: MetadataUploadHandler;
};

export type CreateCommentArgs = {
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
};

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
 * Comment on a post or comment.
 *
 * @category Publications
 * @group Hooks
 * @param args - {@link UseCreateCommentArg}
 *
 * @example Create a text-only comment
 * ```ts
 * import { uploadToIpfs } from './myIpfsUploader';
 * import { ContentFocus, ContentPublication, ProfileOwnedByMe, useCreateComment } from '@lens-protocol/react-web';
 *
 * function CommentComposer({ commentOn: ContentPublication, publisher }: { publisher: ProfileOwnedByMe }) {
 *   const { execute: comment, error, isPending } = useCreateComment({ publisher, upload: uploadToIpfs });
 *
 *   const submit = async (event: React.FormEvent<HTMLFormElement>) => {
 *     event.preventDefault();
 *
 *     const form = event.currentTarget;
 *
 *     const formData = new FormData(form);
 *     const content = (formData.get('content') as string | null) ?? never();
 *
 *     let result = await comment({
 *       content,
 *       contentFocus: ContentFocus.TEXT,
 *       locale: 'en',
 *     });
 *
 *     if (result.isSuccess()) {
 *       form.reset();
 *     }
 *   };
 *
 *   return (
 *     <form onSubmit={submit}>
 *       <textarea
 *         name="content"
 *         minLength={1}
 *         required
 *         rows={3}
 *         placeholder="What's happening?"
 *         style={{ resize: 'none' }}
 *         disabled={isPending}
 *       ></textarea>
 *
 *       <button type="submit" disabled={isPending}>
 *         Post
 *       </button>
 *
 *       {error && <pre>{error.message}</pre>}
 *     </form>
 *   );
 * }
 * ```
 */
export function useCreateComment({
  publisher,
  upload,
}: UseCreateCommentArg): CreateCommentOperation {
  const { appId } = useSharedDependencies();
  const uploader = new PublicationMetadataUploader(upload);
  const createComment = useCreateCommentController({ uploader });

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
      try {
        return await createComment({
          kind: TransactionKind.CREATE_COMMENT,
          delegate: publisher.dispatcher !== null,
          collect,
          profileId: publisher.id,
          reference,
          appId,
          offChain: isDataAvailabilityPublicationId(args.publicationId),
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
