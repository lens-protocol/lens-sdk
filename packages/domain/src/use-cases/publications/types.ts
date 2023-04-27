import { Amount, Erc20, EthereumAddress, Url } from '@lens-protocol/shared-kernel';

import { AudioType, ImageType, VideoType } from './config';

export type Locale = string;

export enum ContentFocus {
  /**
   * The primary objective of the publication is to provide a textual content.
   */
  TEXT = 'TextOnly',
  /**
   * The primary objective of the publication is to provide an image or a gallery of images.
   * The publication `content` field be used to add extra context to the image(s).
   */
  IMAGE = 'Image',
  /**
   * The primary objective of the publication is to provide a video or a collection of videos.
   * The publication `content` field be used to add extra context to the video(s).
   */
  VIDEO = 'Video',
  /**
   * The primary objective of the publication is to provide an audio or a playlist of audio files.
   * The publication `content` field be used to add extra context to the audio(s).
   */
  AUDIO = 'Audio',
  /**
   * The primary objective of the publication is to provide a document-like textual content.
   * It can be accompanied by images, videos, or audio files.
   */
  ARTICLE = 'Article',
}

export enum NftAttributeDisplayType {
  Number = 'Number',
  String = 'String',
  Date = 'Date',
}

export type NftAttribute =
  | {
      displayType: NftAttributeDisplayType.Date;
      value: Date;
      traitType: string;
    }
  | {
      displayType: NftAttributeDisplayType.Number;
      value: number;
      traitType: string;
    }
  | {
      displayType: NftAttributeDisplayType.String;
      value: string;
      traitType: string;
    };

export type NftMetadata = {
  name: string;
  description?: string;
  attributes: NftAttribute[];
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
  timeLimited: boolean;
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
