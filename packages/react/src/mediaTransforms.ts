import {
  Digit,
  ImageSizeTransform,
  MediaTransformParams,
  Percentage,
  Pixel,
} from '@lens-protocol/api-bindings';

export type { Digit, ImageSizeTransform, MediaTransformParams, Percentage, Pixel };

/**
 * The media transforms configuration.
 */
export type MediaTransformsConfig = {
  publication: {
    medium: MediaTransformParams;
  };
  profile: {
    thumbnail: MediaTransformParams;
    cover: MediaTransformParams;
  };
};

function buildMediaTransform(
  width: ImageSizeTransform,
  height: ImageSizeTransform = 'auto',
): MediaTransformParams {
  return {
    width,
    height,
    keepAspectRatio: true,
  };
}

export const defaultMediaTransformsConfig: MediaTransformsConfig = {
  publication: {
    medium: buildMediaTransform('700px'),
  },
  profile: {
    thumbnail: buildMediaTransform('256px'),
    cover: buildMediaTransform('1100px'),
  },
};

export function mediaTransformConfigToQueryVariables(config: MediaTransformsConfig) {
  return {
    publicationImageTransform: config.publication.medium,
    profileCoverTransform: config.profile.cover,
    profilePictureTransform: config.profile.thumbnail,
  };
}
