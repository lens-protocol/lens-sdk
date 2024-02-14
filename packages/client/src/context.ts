import { IStorageProvider } from '@lens-protocol/storage';

import { Environment } from './environments';
import { MediaTransformsConfig, QueryParams } from './queryParams';

/**
 * The LensClient context.
 *
 * @internal
 */
export type LensContext = {
  environment: Environment;
  storage: IStorageProvider;
  origin?: string;
  headers?: Record<string, string>;
  mediaTransforms: MediaTransformsConfig;
  params: QueryParams;
};
