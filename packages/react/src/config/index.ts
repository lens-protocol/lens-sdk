import { IStorageProvider } from '@lens-protocol/storage';
import { providers } from 'ethers';

import { EnvironmentConfig } from './environments';

export * from './environments';
export * from './sources';

export type LensConfig = {
  environment: EnvironmentConfig;
  provider: providers.BaseProvider;
  storage: IStorageProvider;
  sources?: string[];
};
