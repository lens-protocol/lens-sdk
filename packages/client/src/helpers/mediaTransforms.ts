import { MediaTransformsConfig } from '../consts/config';

export function buildMediaTransformsFromConfig(config: MediaTransformsConfig = {}) {
  return {
    mediaTransformPublication: config.publication,
    mediaTransformProfilePicture: config.profilePicture,
    mediaTransformProfileCover: config.profileCover,
  };
}
