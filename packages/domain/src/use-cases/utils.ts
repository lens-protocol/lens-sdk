import { isInEnum } from '@lens-protocol/shared-kernel';

import { AudioType, FileType, ImageType, VideoType } from './types';

export const isImageMimeType = (mimeType: FileType): mimeType is ImageType =>
  isInEnum(ImageType, mimeType);

export const isVideoMimeType = (mimeType: FileType): mimeType is VideoType =>
  isInEnum(VideoType, mimeType);

export const isAudioMimeType = (mimeType: FileType): mimeType is VideoType =>
  isInEnum(AudioType, mimeType);
