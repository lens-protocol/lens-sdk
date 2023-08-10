import { MediaTransformsConfig } from '../consts/config';

export function buildImageTransformsFromConfig(config: MediaTransformsConfig = {}) {
  return {
    publicationImageTransform: config.publication,
    profileCoverTransform: config.profileCover,
    profilePictureTransform: config.profilePicture,
  };
}
