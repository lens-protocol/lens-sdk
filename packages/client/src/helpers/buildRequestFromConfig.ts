import { LensContext } from '../context';
import { ImageTransform } from '../graphql';

type RequestFromConfig = {
  publicationImageTransform?: ImageTransform;
  profileCoverTransform?: ImageTransform;
  profilePictureTransform?: ImageTransform;
};

export function buildRequestFromConfig(config: LensContext): RequestFromConfig {
  return {
    publicationImageTransform: config.mediaTransforms?.publication,
    profileCoverTransform: config.mediaTransforms?.profileCover,
    profilePictureTransform: config.mediaTransforms?.profilePicture,
  };
}
