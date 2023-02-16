import { Amount, Erc20, EthereumAddress } from '@lens-protocol/shared-kernel';

import { AudioType, ImageType, VideoType } from './config';

export type Locale = string;

export enum ContentFocus {
  TEXT = 'TextOnly',
  IMAGE = 'Image',
  VIDEO = 'Video',
  AUDIO = 'Audio',
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

export enum CollectPolicyType {
  CHARGE = 'CHARGE',
  FREE = 'FREE',
  NO_COLLECT = 'NO_COLLECT',
}

export type ChargeCollectPolicy = {
  type: CollectPolicyType.CHARGE;
  fee: Amount<Erc20>;
  recipient: EthereumAddress;
  metadata: NftMetadata;
  mirrorReward: number;
  collectLimit?: number;
  timeLimited: boolean;
  followersOnly: boolean;
};

export type FreeCollectPolicy = {
  type: CollectPolicyType.FREE;
  metadata: NftMetadata;
  followersOnly: boolean;
};

export type NoCollectPolicy = {
  type: CollectPolicyType.NO_COLLECT;
};

export type CollectPolicyConfig = ChargeCollectPolicy | FreeCollectPolicy | NoCollectPolicy;

export type SupportedPublicationMediaType =
  | ImageType.PNG
  | ImageType.JPEG
  | ImageType.GIF
  | ImageType.WEBP
  | VideoType.MP4
  | AudioType.MP3
  | AudioType.OGG
  | AudioType.WAV;

export type Media = {
  url: string;
  mimeType: SupportedPublicationMediaType;
};
