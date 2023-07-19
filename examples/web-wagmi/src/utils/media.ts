import { ContentPublication, Overwrite } from '@lens-protocol/react-web';

import { resolveFullResourceUrl } from './resolveFullResourceUrl';

export const isInEnum = <TEnumValue extends string | number>(
  enumVariables: { [key: string]: TEnumValue },
  value: string | number,
): value is TEnumValue => {
  return Object.values<string | number>(enumVariables).includes(value);
};

export enum ImageType {
  JPEG = 'image/jpeg',
  JPG = 'image/jpg',
  PNG = 'image/png',
  WEBP = 'image/webp',
  GIF = 'image/gif',
}

export enum VideoType {
  MP4 = 'video/mp4',
}

export enum AudioType {
  WAV = 'audio/wav',
  MP3 = 'audio/mpeg',
  OGG = 'audio/ogg',
}

export const FileType = { ...ImageType, ...VideoType, ...AudioType };
export type FileType = ImageType | VideoType | AudioType;

type Media = ContentPublication['metadata']['media'][number]['original'];

type NarrowedMedia<T extends FileType> = Overwrite<Media, { mimeType: T }>;

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
