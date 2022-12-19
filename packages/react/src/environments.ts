import { ChainType } from '@lens-protocol/shared-kernel';

import { ChainConfigRegistry, goerli, mainnet, mumbai, polygon } from './chains';
import { Timings } from './transactions/infrastructure/TransactionObserver';

export type EnvironmentConfig = {
  backend: string;
  chains: ChainConfigRegistry;
  timings: Timings;
};

export const production: EnvironmentConfig = {
  backend: 'https://api.lens.dev',
  chains: {
    [ChainType.ETHEREUM]: mainnet,
    [ChainType.POLYGON]: polygon,
  },
  timings: {
    pollingPeriod: 3000,
    maxIndexingWaitTime: 120000,
    maxMiningWaitTime: 60000,
  },
};

export const staging: EnvironmentConfig = {
  backend: 'https://api-mumbai.lens.dev',
  chains: {
    [ChainType.ETHEREUM]: goerli,
    [ChainType.POLYGON]: mumbai,
  },
  timings: {
    pollingPeriod: 3000,
    maxIndexingWaitTime: 240000,
    maxMiningWaitTime: 120000,
  },
};
