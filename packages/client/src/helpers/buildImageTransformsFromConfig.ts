import { MediaTransformsConfig } from '../context';

export function buildImageTransformsFromConfig(config: MediaTransformsConfig = {}) {
  return {
    publicationImageTransform: config.publication,
    profileCoverTransform: config.profileCover,
    profilePictureTransform: config.profilePicture,
  };
}
