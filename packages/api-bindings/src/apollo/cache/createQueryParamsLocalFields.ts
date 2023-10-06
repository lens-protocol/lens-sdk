import { FieldReadFunction } from '@apollo/client';

import { ImageSizeTransform, ImageTransform, SupportedFiatType } from '../../lens';

/**
 * The common query parameters used across any query.
 */
export type QueryParams = {
  image: {
    /**
     * The size of the small publication image
     */
    small: ImageTransform;
    /**
     * The size of the medium publication image
     */
    medium: ImageTransform;
  };
  profile: {
    /**
     * The size of optimized profile image
     */
    thumbnail: ImageTransform;
    /**
     * The size of the cover image
     */
    cover: ImageTransform;
  };
  /**
   * The fiat currency to use for the fx rate
   */
  fxRateFor: SupportedFiatType;
};

function buildImageTransform(
  width: ImageSizeTransform,
  height: ImageSizeTransform = 'auto',
): ImageTransform {
  return {
    width,
    height,
    keepAspectRatio: true,
  };
}

/**
 * The default query parameters.
 */
export const defaultQueryParams: QueryParams = {
  image: {
    small: buildImageTransform('400px'),
    medium: buildImageTransform('700px'),
  },
  profile: {
    thumbnail: buildImageTransform('256px'),
    cover: buildImageTransform('1100px'),
  },
  fxRateFor: SupportedFiatType.Usd,
};

/**
 * @internal
 */
export type LocalOnlyFieldPolicies = {
  fxRateFor: FieldReadFunction<SupportedFiatType>;

  profileCoverSize: FieldReadFunction<ImageTransform>;

  profilePictureSize: FieldReadFunction<ImageTransform>;

  imageSmallSize: FieldReadFunction<ImageTransform>;

  imageMediumSize: FieldReadFunction<ImageTransform>;
};

/**
 * @internal
 */
export function createQueryParamsLocalFields(
  params: QueryParams = defaultQueryParams,
): LocalOnlyFieldPolicies {
  return {
    fxRateFor() {
      return params.fxRateFor;
    },

    profileCoverSize() {
      return params.profile.cover;
    },

    profilePictureSize() {
      return params.profile.thumbnail;
    },

    imageSmallSize() {
      return params.image.small;
    },

    imageMediumSize() {
      return params.image.medium;
    },
  };
}
