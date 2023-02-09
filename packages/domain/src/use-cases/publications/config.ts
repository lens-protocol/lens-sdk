export enum ImageType {
  JPEG = 'image/jpeg',
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

export const SupportedFileType = { ...ImageType, ...VideoType, ...AudioType };
export type SupportedFileType = ImageType | VideoType | AudioType;

export const SUPPORTED_PUBLICATION_MEDIA_TYPES = [
  ImageType.PNG,
  ImageType.JPEG,
  ImageType.GIF,
  ImageType.WEBP,
  VideoType.MP4,
  AudioType.MP3,
  AudioType.OGG,
  AudioType.WAV,
] as const;
