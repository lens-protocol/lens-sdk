import { Url, invariant } from '@lens-protocol/shared-kernel';

import { AppId, DecryptionCriteria, ProfileId, TransactionKind } from '../../entities';
import { DelegableSigning } from '../transactions/DelegableSigning';
import { ReferencePolicyConfig } from './ReferencePolicyConfig';
import { CollectPolicyConfig, ContentFocus, ContentWarning, Locale, MediaObject } from './types';

type BasePostRequest = {
  /**
   * The discriminator for the transaction kind.
   */
  kind: TransactionKind.CREATE_POST;
  /**
   * This is the appId the post belongs to.
   */
  appId?: AppId;
  /**
   * The publication collect policy. Determines the criteria that must be met for a user to be able to collect the publication.
   */
  collect: CollectPolicyConfig;
  /**
   * Specifies a content warning for the publication.
   */
  contentWarning?: ContentWarning;
  /**
   * The criteria that must be met for a user to be able to decrypt the publication.
   */
  decryptionCriteria?: DecryptionCriteria;
  /**
   * Whether is possible to delegate the publication signing to the profile's dispatcher.
   */
  delegate: boolean;
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
   * Whether the publication should be published off-chain (i.e. Momoka DA layer) or not.
   */
  offChain: boolean;
  /**
   * The publication author profile id.
   */
  profileId: ProfileId;
  /**
   * The publication reference policy. Determines the criteria that must be met for a user to be able to publication or mirror the publication.
   */
  reference: ReferencePolicyConfig;
  /**
   * A list of tags for the publication. This can be used to categorize the publication.
   *
   * These are not the same as #hashtag in the publication content. Use these if you don't want to clutter the publication content with tags.
   */
  tags?: string[];
};

export type CreateTextualPostRequest = BasePostRequest & {
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

export type CreateMediaPostRequest = BasePostRequest & {
  /**
   * The publication content as Markdown string.
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

export type CreateEmbedPostRequest = BasePostRequest & {
  /**
   * A URL to a multi-media attachment for the item. The file extensions GLTF, GLB, WEBM, MP4, M4V, OGV,
   * and OGG are supported.
   * Animation_url also supports HTML pages, allowing you to build rich experiences and interactive NFTs using JavaScript canvas,
   * WebGL, and more. Scripts and relative paths within the HTML page are now supported. However, access to browser extensions is not supported.
   */
  animationUrl: Url;
  /**
   * The publication content as Markdown string.
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

export type CreatePostRequest =
  | CreateTextualPostRequest
  | CreateMediaPostRequest
  | CreateEmbedPostRequest;

export class CreatePost {
  constructor(
    private readonly createOnChainPost: DelegableSigning<CreatePostRequest>,
    private readonly createOffChainPost: DelegableSigning<CreatePostRequest>,
  ) {}

  async execute(request: CreatePostRequest) {
    invariant(request.media || request.content, 'One of post media or content is required');

    if (request.offChain) {
      await this.createOffChainPost.execute(request);
    } else {
      await this.createOnChainPost.execute(request);
    }
  }
}
