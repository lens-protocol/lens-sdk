import { IStorageProvider } from '@lens-protocol/storage';

import { Environment } from './environments';

export type LensConfig = {
  environment: Environment;
  storage?: IStorageProvider;
};
