import { ImageSizeTransform, MediaTransform } from '@lens-protocol/api-bindings';

/**
 * The media transforms configuration.
 */
export type MediaTransformsConfig = {
  publication: {
    small: MediaTransform;
    medium: MediaTransform;
  };
  profile: {
    thumbnail: MediaTransform;
  };
};

function buildMediaTransform(
  width: ImageSizeTransform,
  height: ImageSizeTransform = 'auto',
): MediaTransform {
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
