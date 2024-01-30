import { FieldFunctionOptions, FieldReadFunction } from '@apollo/client';
import { AppId } from '@lens-protocol/domain/entities';
import { UnknownObject } from '@lens-protocol/shared-kernel';

import { ImageSizeTransform, ImageTransform, SupportedFiatType } from '../../lens';

/**
 * The common query parameters used across any query.
 */
export type QueryParams = {
  /**
   * The size of the publication image.
   *
   * @defaultValue see individual fields
   */
  image?: {
    /**
     * The size of the small publication image
     *
     * @defaultValue width: 400px, height: auto, keepAspectRatio: true
     */
    small?: ImageTransform;
    /**
     * The size of the medium publication image
     *
     * @defaultValue width: 700px, height: auto, keepAspectRatio: true
     */
    medium?: ImageTransform;
  };
  /**
   * Profile related fields parameters
   *
   * @defaultValue see individual fields
   */
  profile?: {
    /**
     * The size of optimized profile image
     *
     * @defaultValue width: 256px, height: auto, keepAspectRatio: true
     */
    thumbnail?: ImageTransform;
    /**
     * The size of the cover image
     *
     * @defaultValue width: 1100px, height: auto, keepAspectRatio: true
     */
    cover?: ImageTransform;
    /**
     * The source to use for fetching profile metadata details.
     *
     * If not provided, it will default to the global profile metadata for any profile fetched.
     *
     * If provided and a profile does not have bespoke profile metadata it will fallback to their global profile metadata.
     *
     * To know more about app specific profile metadata, see example with `appId` in {@link https://lens-protocol.github.io/metadata/functions/profile.html}.
     *
     * @defaultValue empty, global profile metadata
     */
    metadataSource?: AppId;
  };
  /**
   * The fiat currency to use for the fx rate
   *
   * @defaultValue USD
   */
  fxRateFor?: SupportedFiatType;
  /**
   * The App Ids for which to fetch Publication and Profile Stats for.
   *
   * Affects mainly comments, mirrors, and quotes counts.
   *
   * @defaultValue empty, all apps
   */
  statsFor?: AppId[];
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
 *
 * A default configuration that should be good as a starting point.
 *
 * @internal
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
type WithStatsForVariable = UnknownObject & {
  statsFor?: AppId[];
};

/**
 * @internal
 */
export type LocalOnlyFieldPolicies = {
  queryParams: FieldReadFunction<QueryParams>;
};

/**
 * @internal
 */
export function createQueryParamsLocalFields({
  fxRateFor,
  image,
  profile,
  statsFor,
}: QueryParams = {}): LocalOnlyFieldPolicies {
  return {
    queryParams(_, { variables }: FieldFunctionOptions<UnknownObject, WithStatsForVariable>) {
      return {
        image: Object.assign({}, defaultQueryParams.image, image),
        profile: Object.assign(
          {
            metadataSource: null,
          },
          defaultQueryParams.profile,
          profile,
        ),
        statsFor: variables?.statsFor ?? statsFor ?? defaultQueryParams.statsFor,
        fxRateFor: fxRateFor ?? defaultQueryParams.fxRateFor,
      };
    },
  };
}
