import { Post, ProfileOwnedByMe } from '@lens-protocol/api-bindings';
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
  ContentWarning,
  CreatePostRequest,
  Locale,
  MediaObject,
  MetadataAttribute,
  MetadataImage,
  ReferencePolicyConfig,
  ReferencePolicyType,
} from '@lens-protocol/domain/use-cases/publications';
import { BroadcastingError } from '@lens-protocol/domain/use-cases/transactions';
import { failure, PromiseResult, Url } from '@lens-protocol/shared-kernel';

import { Operation, useOperation } from '../helpers/operations';
import { useSharedDependencies } from '../shared';
import { AsyncTransactionResult } from './adapters/AsyncTransactionResult';
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

/**
 * @alpha
 */
export type CreatePostBaseArgs = {
  /**
   * @deprecated This was exposed by mistake but was never used. See {@link LensConfig} instead.
   */
  appId?: AppId;
  /**
   * The publication collect policy. Determines the criteria that must be met for a user to be able to collect the publication.
   */
  collect?: CollectPolicyConfig;
  /**
   * Specifies a content warning for the publication.
   *
   * @defaultValue `{ type: CollectPolicyType.NO_COLLECT }`
   */
  contentWarning?: ContentWarning;
  /**
   * The language of the publication.
   *
   * It's a locale string in the format of `<language-tag>-<region-tag>` or just `<language-tag>`, where:
   * - `language-tag` is a two-letter ISO 639-1 language code, e.g. `en` or `it`
   * - `region-tag` is a two-letter ISO 3166-1 alpha-2 region code, e.g. `US` or `IT`
   *
   * You can just pass in the language tag if you do not know the region or don't need to be specific.
   */
  locale: Locale;
  /**
   * The publication reference policy. Determines the criteria that must be met for a user to be able to publication or mirror the publication.
   *
   * @defaultValue `{ type: ReferencePolicyType.ANYONE }`
   */
  reference?: ReferencePolicyConfig;
  /**
   * A list of tags for the publication. This can be used to categorize the publication.
   *
   * These are not the same as #hashtag in the publication content. Use these if you don't want to clutter the publication content with tags.
   */
  tags?: string[];
  /**
   * A list of attributes for the collect NFT.
   *
   * This is the NFT description visible on marketplaces like OpenSea.
   */
  attributes?: MetadataAttribute[];
  /**
   * The collect NFT image.
   *
   * This is the NFT image visible on marketplaces like OpenSea.
   *
   * DO NOT use this as primary storage for publication media. Use the `media` property instead.
   * In the case your publication has many media consider to use this field as a static representation
   * of the collect NFT. For example if the publication is an album of audio files this could be
   * used as album cover image. If the publication is a gallery of images, this could be the gallery
   * cover image.
   *
   * DO NOT use this as media cover image.
   * For individual media cover image (e.g. the video thumbnail image) use the `media[n].cover` (see {@link MediaObject}).
   */
  image?: MetadataImage;
};

export type CreateTextualPostArgs = CreatePostBaseArgs & {
  /**
   * The publication content as Markdown string.
   */
  content: string;
  /**
   * The publication focus.
   */
  contentFocus: ContentFocus.ARTICLE | ContentFocus.LINK | ContentFocus.TEXT_ONLY;
  /**
   * The publication media. An array of media objects.
   */
  media?: MediaObject[];
};

export type CreateMediaPostArgs = CreatePostBaseArgs & {
  /**
   * Contextual information as Markdown string.
   */
  content?: string;
  /**
   * The publication focus.
   */
  contentFocus: ContentFocus.AUDIO | ContentFocus.IMAGE | ContentFocus.VIDEO;
  /**
   * The publication media. An array of media objects.
   */
  media: MediaObject[];
};

export type CreateEmbedPostArgs = CreatePostBaseArgs & {
  /**
   * A URL to a multi-media attachment for the item. The file extensions GLTF, GLB, WEBM, MP4, M4V, OGV, and OGG are supported.
   * It also supports HTML pages, allowing you to build rich experiences and interactive NFTs using JavaScript canvas,
   * WebGL, and more. Scripts and relative paths within the HTML page are now supported. However, access to browser extensions is not supported.
   */
  animationUrl: Url;
  /**
   * Contextual information as Markdown string.
   */
  content?: string;
  /**
   * The publication focus.
   */
  contentFocus: ContentFocus.EMBED;
  /**
   * The publication media. An array of media objects.
   */
  media?: MediaObject[];
};

export type CreatePostArgs = CreateTextualPostArgs | CreateMediaPostArgs | CreateEmbedPostArgs;

export type CreatePostAsyncResult = AsyncTransactionResult<Post>;

export type CreatePostOperation = Operation<
  CreatePostAsyncResult,
  | BroadcastingError
  | PendingSigningRequestError
  | UserRejectedError
  | WalletConnectionError
  | FailedUploadError,
  [CreatePostArgs]
>;

/**
 * `useCreatePost` hook let you create a new post.
 *
 * You MUST be authenticated via {@link useWalletLogin} to use this hook.
 *
 * @category Publications
 * @group Hooks
 * @param args - {@link UseCreatePostArgs}
 *
 * @example
 * Create a short text-only post
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
 *       contentFocus: ContentFocus.TEXT_ONLY,
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
      CreatePostAsyncResult,
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
