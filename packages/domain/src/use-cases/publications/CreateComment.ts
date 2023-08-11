import { Url, invariant } from '@lens-protocol/shared-kernel';

import {
  AppId,
  DecryptionCriteria,
  ProfileId,
  PublicationId,
  TransactionKind,
} from '../../entities';
import { DelegableSigning } from '../transactions/DelegableSigning';
import { ReferencePolicyConfig } from './ReferencePolicyConfig';
import {
  CollectPolicyConfig,
  ContentFocus,
  ContentWarning,
  Locale,
  MediaObject,
  MetadataAttribute,
  MetadataImage,
} from './types';

/**
 * @alpha
 */
export type BaseCommentRequest = {
  /**
   * The discriminator for the transaction kind.
   */
  kind: TransactionKind.CREATE_COMMENT;
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
   * The publication ID to which the publication is being posted.
   */
  publicationId: PublicationId;
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

export type CreateTextualCommentRequest = BaseCommentRequest & {
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

export type CreateMediaCommentRequest = BaseCommentRequest & {
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

export type CreateEmbedCommentRequest = BaseCommentRequest & {
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

export type CreateCommentRequest =
  | CreateTextualCommentRequest
  | CreateMediaCommentRequest
  | CreateEmbedCommentRequest;

export class CreateComment {
  constructor(
    private readonly createOnChainComment: DelegableSigning<CreateCommentRequest>,
    private readonly createOffChainComment: DelegableSigning<CreateCommentRequest>,
  ) {}

  async execute(request: CreateCommentRequest) {
    invariant(request.media || request.content, 'One of post media or content is required');

    if (request.offChain) {
      await this.createOffChainComment.execute(request);
    } else {
      await this.createOnChainComment.execute(request);
    }
  }
}
