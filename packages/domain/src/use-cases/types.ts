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

export const FileType = { ...ImageType, ...VideoType, ...AudioType };
export type FileType = ImageType | VideoType | AudioType;
