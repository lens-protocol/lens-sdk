import { Amount, Erc20, EthereumAddress, Url } from '@lens-protocol/shared-kernel';

import { AudioType, ImageType, VideoType } from './config';

export type Locale = string;

export enum ContentFocus {
  /**
   * The primary objective of the publication is to provide a document-like textual content.
   * It can be accompanied by images, videos, or audio files.
   */
  ARTICLE = 'Article',
  /**
   * The primary objective of the publication is to provide an audio or a playlist of audio files.
   * The publication `content` field can be used to add extra context to the audio(s).
   */
  AUDIO = 'Audio',
  /**
   * The primary objective of the publication is to provide an embedded, possibly animated or interactive content.
   * The publication `content` and `media` fields can be used to add extra context to the embed.
   */
  EMBED = 'Embed',
  /**
   * The primary objective of the publication is to provide an image or a gallery of images.
   * The publication `content` field can be used to add extra context to the image(s).
   */
  IMAGE = 'Image',
  /**
   * The primary objective of the publication is to provide a link to an external resource.
   * The link URL must be provided in the `content` field.
   */
  LINK = 'Link',
  /**
   * @deprecated use {@link ContentFocus.TEXT_ONLY} instead.
   */
  TEXT = 'TextOnly',
  /**
   * The primary objective of the publication is to provide short textual content.
   *
   * If you want to provide a longer text, use {@link ContentFocus.ARTICLE} instead.
   */
  TEXT_ONLY = 'TextOnly',
  /**
   * The primary objective of the publication is to provide a video or a collection of videos.
   * The publication `content` field can be used to add extra context to the video(s).
   */
  VIDEO = 'Video',
}

export enum ContentWarning {
  NSFW = 'Nsfw',
  SENSITIVE = 'Sensitive',
  SPOILER = 'Spoiler',
}

export enum MetadataAttributeDisplayType {
  Number = 'Number',
  String = 'String',
  Date = 'Date',
}

export type MetadataAttribute =
  | {
      displayType: MetadataAttributeDisplayType.Date;
      value: Date;
      traitType: string;
    }
  | {
      displayType: MetadataAttributeDisplayType.Number;
      value: number;
      traitType: string;
    }
  | {
      displayType: MetadataAttributeDisplayType.String;
      value: string;
      traitType: string;
    };

export type MetadataImage = {
  url: Url;
  mimeType: ImageType;
};

export type NftMetadata = {
  /**
   * The name of the collect NFT.
   *
   * This is the NFT name visible on marketplaces like OpenSea.
   */
  name: string;
  /**
   * The description of the collect NFT.
   *
   * This is the NFT description visible on marketplaces like OpenSea.
   */
  description?: string;
  /**
   * A list of attributes for the NFT.
   *
   * @deprecated Use the `attributes` field at the request object top level.
   */
  attributes?: MetadataAttribute[];
  /**
   * This is the URL that will appear below the asset's image on OpenSea and other marketplaces.
   * It will allow users to leave OpenSea and view the item on the external site.
   */
  externalUrl?: Url;
  /**
   * Legacy to support OpenSea schema, store any NFT image here.
   *
   * @deprecated Use the `image` field at the request object top level.
   */
  image?: Url;
  /**
   * This is the mime type of the image. This is used if you are uploading more advanced
   * cover images as sometimes IPFS does not emit the content header so this solves that.
   *
   * @deprecated Use the `image` field at the request object top level.
   */
  imageMimeType?: ImageType;
};

export type RecipientWithSplit = {
  recipient: EthereumAddress;
  split: number;
};

export enum CollectPolicyType {
  CHARGE = 'CHARGE',
  FREE = 'FREE',
  NO_COLLECT = 'NO_COLLECT',
}

export type AaveChargeCollectPolicyConfig = {
  type: CollectPolicyType.CHARGE;
  fee: Amount<Erc20>;
  followersOnly: boolean;
  metadata: NftMetadata;
  mirrorReward: number;
  collectLimit?: number;

  recipient: EthereumAddress;
  depositToAave: true;
  endTimestamp?: number;
};

export type VaultChargeCollectPolicyConfig = {
  type: CollectPolicyType.CHARGE;
  fee: Amount<Erc20>;
  followersOnly: boolean;
  metadata: NftMetadata;
  mirrorReward: number;
  collectLimit?: number;

  recipient: EthereumAddress;
  vault: EthereumAddress;
  endTimestamp?: number;
};

export type MultirecipientChargeCollectPolicyConfig = {
  type: CollectPolicyType.CHARGE;
  fee: Amount<Erc20>;
  followersOnly: boolean;
  metadata: NftMetadata;
  mirrorReward: number;
  collectLimit?: number;

  recipients: RecipientWithSplit[];
  endTimestamp?: number;
};

export type SimpleChargeCollectPolicyConfig = {
  type: CollectPolicyType.CHARGE;
  fee: Amount<Erc20>;
  followersOnly: boolean;
  metadata: NftMetadata;
  mirrorReward: number;
  collectLimit?: number;
  recipient: EthereumAddress;
  endTimestamp?: number;
  /**
   * If `true` it will set `endTimestamp` to the current timestamp + 24 hours.
   *
   * @deprecated use `endTimestamp` instead.
   */
  timeLimited?: boolean;
};

export type ChargeCollectPolicyConfig =
  | SimpleChargeCollectPolicyConfig
  | MultirecipientChargeCollectPolicyConfig
  | VaultChargeCollectPolicyConfig
  | AaveChargeCollectPolicyConfig;

export type FreeCollectPolicyConfig = {
  type: CollectPolicyType.FREE;
  metadata: NftMetadata;
  followersOnly: boolean;
  collectLimit?: number;
  endTimestamp?: number;
};

export type NoCollectPolicyConfig = {
  type: CollectPolicyType.NO_COLLECT;
};

export type CollectablePolicyConfig = ChargeCollectPolicyConfig | FreeCollectPolicyConfig;

export type CollectPolicyConfig = CollectablePolicyConfig | NoCollectPolicyConfig;

export type SupportedPublicationMediaType =
  | ImageType.PNG
  | ImageType.JPEG
  | ImageType.GIF
  | ImageType.WEBP
  | VideoType.MP4
  | AudioType.MP3
  | AudioType.OGG
  | AudioType.WAV;

export type MediaObject = {
  altTag?: string;
  cover?: Url;
  url: Url;
  mimeType: SupportedPublicationMediaType;
};
