import { ProfileOwnedByMe } from '@lens-protocol/api-bindings';
import {
  AppId,
  PendingSigningRequestError,
  TransactionKind,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import {
  CollectPolicyConfig,
  CollectPolicyType,
  ContentFocus,
  CreatePostRequest,
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
import { useCreatePostController } from './adapters/useCreatePostController';

export type UseCreatePostArgs = {
  /**
   * The post author.
   *
   * **Poo-tip**: use the profile instance returned by {@link useActiveProfile} to create a post in behalf of the active profile.
   */
  publisher: ProfileOwnedByMe;
  /**
   * The handler that will be used to upload the post metadata.
   */
  upload: MetadataUploadHandler;
};

export type CreatePostArgs = {
  /**
   * @deprecated Use {@link LensConfig#appId} instead. This was exposed by mistake but was never used.
   */
  appId?: AppId;
  /**
   * The post collect policy. Determines the criteria that must be met for a user to be able to collect the post.
   */
  collect?: CollectPolicyConfig;
  /**
   * The post content as Markdown string.
   */
  content?: string;
  /**
   * The post content focus. Determines what is the primary objective of the post.
   */
  contentFocus: ContentFocus;
  /**
   * The post media. An array of media objects.
   */
  media?: MediaObject[];
  /**
   * The post reference policy. Determines the criteria that must be met for a user to be able to comment or mirror the post.
   */
  reference?: ReferencePolicyConfig;
  /**
   * The language of the post.
   *
   * It a locale string in the format of `<language-tag>-<region-tag>` or just `<language-tag>`, where:
   * - `language-tag` is a two-letter ISO 639-1 language code, e.g. `en` or `it`
   * - `region-tag` is a two-letter ISO 3166-1 alpha-2 region code, e.g. `US` or `IT`
   *
   * You can just pass in the language tag if you do not know the region or don't need to be specific.
   */
  locale: Locale;
};

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
 * Creates a new post.
 *
 * @category Publications
 * @group Hooks
 * @param args - {@link UseCreatePostArgs}
 *
 * @example Create a short text-only post
 * ```ts
 * import { uploadToIpfs } from './myIpfsUploader';
 * import { ContentFocus, ProfileOwnedByMe, useCreatePost } from '@lens-protocol/react-web';
 *
 * function PostComposer({ publisher }: { publisher: ProfileOwnedByMe }) {
 *   const { execute: post, error, isPending } = useCreatePost({ publisher, upload: uploadToIpfs });
 *
 *   const submit = async (event: React.FormEvent<HTMLFormElement>) => {
 *     event.preventDefault();
 *
 *     const form = event.currentTarget;
 *
 *     const formData = new FormData(form);
 *     const content = (formData.get('content') as string | null) ?? never();
 *
 *     let result = await post({
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
export function useCreatePost({ publisher, upload }: UseCreatePostArgs): CreatePostOperation {
  const { appId } = useSharedDependencies();
  const createPost = useCreatePostController({ upload });

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
          offChain: collect.type === CollectPolicyType.NO_COLLECT,
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
