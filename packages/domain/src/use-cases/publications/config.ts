import { AudioType, ImageType, VideoType } from '../types';

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
