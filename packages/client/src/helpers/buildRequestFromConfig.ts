import { LensConfig } from '../consts/config';
import { ImageTransform, ProfileStatsArg } from '../graphql/types.generated';

type RequestFromConfig = {
  publicationImageTransform?: ImageTransform;
  profileCoverTransform?: ImageTransform;
  profilePictureTransform?: ImageTransform;
  profileStatsArg?: ProfileStatsArg;
};

export function buildRequestFromConfig(config: LensConfig): RequestFromConfig {
  return {
    publicationImageTransform: config.mediaTransforms?.publication,
    profileCoverTransform: config.mediaTransforms?.profileCover,
    profilePictureTransform: config.mediaTransforms?.profilePicture,
    profileStatsArg: {
      forApps: config.forApps,
    },
  };
}
