import { ChainType, Url } from '@lens-protocol/shared-kernel';

import { ChainConfigRegistry, goerli, mainnet, mumbai, polygon } from './chains';
import { TransactionObserverTimings } from './transactions/infrastructure/TransactionObserver';

export type ProfileHandleResolver = (handle: string) => string;

export type EnvironmentConfig = {
  backend: Url;
  chains: ChainConfigRegistry;
  timings: TransactionObserverTimings;
  handleResolver: ProfileHandleResolver;
};

export const production: EnvironmentConfig = {
  backend: 'https://api.lens.dev',
  chains: {
    [ChainType.ETHEREUM]: mainnet,
    [ChainType.POLYGON]: polygon,
  },
  timings: {
    pollingInterval: 3000,
    maxIndexingWaitTime: 120000,
    maxMiningWaitTime: 60000,
  },
  handleResolver: (handle) => `${handle}.lens`,
};

export const staging: EnvironmentConfig = {
  backend: 'https://api-mumbai.lens.dev',
  chains: {
    [ChainType.ETHEREUM]: goerli,
    [ChainType.POLYGON]: mumbai,
  },
  timings: {
    pollingInterval: 3000,
    maxIndexingWaitTime: 240000,
    maxMiningWaitTime: 120000,
  },
  handleResolver: (handle) => `${handle}.test`,
};
