import { IStorageProvider } from '@lens-protocol/storage';

import { ImageTransform } from '../graphql/types.generated';
import { Environment } from './environments';

/**
 * The media transforms configuration.
 */
export type MediaTransformsConfig = {
  publication?: ImageTransform;
  profilePicture?: ImageTransform;
  profileCover?: ImageTransform;
};

/**
 * LensClient configuration
 */
export type LensConfig = {
  /**
   * The environment to use. See {@link production}, {@link development}, and {@link sandbox}.
   */
  environment: Environment;
  /**
   * The storage provider to use.
   */
  storage?: IStorageProvider;

  /**
   * Media returned from the publication and profile queries can be transformed
   * to sizes needed by the SDK consuming application.
   * To overwrite default transformation values, provide a `mediaTransforms` object.
   *
   * @see {@link MediaTransformsConfig} for more information
   */
  mediaTransforms?: MediaTransformsConfig;
};
