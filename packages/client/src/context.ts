import { IStorageProvider } from '@lens-protocol/storage';

import { Environment } from './environments';
import { ImageTransform } from './graphql';

/**
 * The media transforms configuration.
 */
export type MediaTransformsConfig = {
  /**
   * The transforms for the publication images.
   */
  publication?: ImageTransform;

  /**
   * The transforms for the profile images.
   */
  profilePicture?: ImageTransform;

  /**
   * The transforms for the profile cover images.
   */
  profileCover?: ImageTransform;
};

/**
 * The LensClient context.
 *
 * @internal
 */
export type LensContext = {
  environment: Environment;
  storage: IStorageProvider;
  mediaTransforms: MediaTransformsConfig;
  origin?: string;
  headers?: Record<string, string>;
};
