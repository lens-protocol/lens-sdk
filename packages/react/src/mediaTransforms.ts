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
    small: MediaTransformParams;
    medium: MediaTransformParams;
  };
  profile: {
    thumbnail: MediaTransformParams;
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
    small: buildMediaTransform('350px'),
    medium: buildMediaTransform('700px'),
  },
  profile: {
    thumbnail: buildMediaTransform('256px'),
  },
};

export function mediaTransformConfigToQueryVariables(config: MediaTransformsConfig) {
  return {
    mediaTransformPublicationSmall: config.publication.small,
    mediaTransformPublicationMedium: config.publication.medium,
    mediaTransformProfileThumbnail: config.profile.thumbnail,
  };
}
