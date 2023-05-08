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
import { ImageType } from './config';
import { CollectPolicyConfig, ContentFocus, ContentWarning, Locale, MediaObject } from './types';

export type CreateCommentRequest = {
  collect: CollectPolicyConfig;
  decryptionCriteria?: DecryptionCriteria;
  offChain: boolean;
  delegate: boolean;
  kind: TransactionKind.CREATE_COMMENT;
  profileId: ProfileId;
  publicationId: PublicationId;
  reference: ReferencePolicyConfig;

  /**
   * The content of a publication. If this is blank then `media` must be defined
   */
  content?: string;
  /**
   * Main content focus for this publication
   */
  contentFocus: ContentFocus;
  /**
   * IOS 639-1 language code aka en or it and ISO 3166-1 alpha-2 region code
   * aka US or IT aka en-US or it-IT
   */
  locale: Locale;
  /**
   * Lens supported attached media items to the publication
   */
  media?: MediaObject[];
  /**
   * A URL to a multi-media attachment for the item. The file extensions GLTF, GLB, WEBM, MP4, M4V, OGV,
   * and OGG are supported, along with the audio-only extensions MP3, WAV, and OGA.
   * Animation_url also supports HTML pages, allowing you to build rich experiences and interactive NFTs using JavaScript canvas,
   * WebGL, and more. Scripts and relative paths within the HTML page are now supported. However, access to browser extensions is not supported.
   */
  animationUrl?: Url;
  /**
   * This is the appId the content belongs to
   */
  appId?: AppId;
  /**
   * Ability to add a content warning
   */
  contentWarning?: ContentWarning;
  /**
   * This is the URL that will appear below the asset's image on OpenSea and others
   * and will allow users to leave OpenSea and view the item on the site.
   */
  externalUrl?: Url;
  /**
   * Legacy to support OpenSea schema, store any NFT image here.
   */
  image?: Url;
  /**
   * This is the mime type of the image. This is used if you are uploading more advanced
   * cover images as sometimes ipfs does not emit the content header so this solves that
   */
  imageMimeType?: ImageType;
  /**
   * Tag the publication to be able to search for it later
   */
  tags?: string[];
};

export class CreateComment {
  constructor(
    private readonly createOnChainPost: DelegableSigning<CreateCommentRequest>,
    private readonly createOffChainPost: DelegableSigning<CreateCommentRequest>,
  ) {}

  async execute(request: CreateCommentRequest) {
    invariant(request.media || request.content, 'One of post media or content is required');

    if (request.offChain) {
      await this.createOffChainPost.execute(request);
    } else {
      await this.createOnChainPost.execute(request);
    }
  }
}
