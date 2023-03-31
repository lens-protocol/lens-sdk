import { IStorageProvider } from '@lens-protocol/storage';

import { Environment } from './environments';

/**
 * LensClient configuration
 */
export type LensConfig = {
  /**
   * The environment to use. See {@link production} and {@link development}.
   */
  environment: Environment;
  /**
   * The storage provider to use.
   */
  storage?: IStorageProvider;
};
