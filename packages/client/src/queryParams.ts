import { ImageTransform, SupportedFiatType } from './graphql/types.generated';

export type AppId = string;

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
