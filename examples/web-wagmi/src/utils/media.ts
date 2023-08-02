import {
  AudioType,
  ImageType,
  Media,
  Overwrite,
  SupportedFileType,
  VideoType,
} from '@lens-protocol/react-web';

import { resolveFullResourceUrl } from './resolveFullResourceUrl';

export const isInEnum = <TEnumValue extends string | number>(
  enumVariables: { [key: string]: TEnumValue },
  value: string | number,
): value is TEnumValue => {
  return Object.values<string | number>(enumVariables).includes(value);
};

type NarrowedMedia<T extends SupportedFileType> = Overwrite<Media, { mimeType: T }>;

export type ImageMedia = NarrowedMedia<ImageType>;

export function isSupportedImageMedia(media: Media): media is ImageMedia {
  if (media.mimeType === null) {
    return false;
  }

  return isInEnum(ImageType, media.mimeType) && resolveFullResourceUrl(media.url) !== null;
}

export type VideoMedia = NarrowedMedia<VideoType>;

export function isSupportedVideoMedia(media: Media): media is VideoMedia {
  if (media.mimeType === null) {
    return false;
  }

  return isInEnum(VideoType, media.mimeType) && resolveFullResourceUrl(media.url) !== null;
}

export type AudioMedia = NarrowedMedia<AudioType>;

export function isSupportedAudioMedia(media: Media): media is AudioMedia {
  if (media.mimeType === null) {
    return false;
  }

  return isInEnum(AudioType, media.mimeType) && resolveFullResourceUrl(media.url) !== null;
}
