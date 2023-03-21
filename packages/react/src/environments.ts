import { ChainType, Url } from '@lens-protocol/shared-kernel';

import { ChainConfigRegistry, goerli, mainnet, mumbai, polygon } from './chains';
import { TransactionObserverTimings } from './transactions/infrastructure/TransactionObserver';

export type { TransactionObserverTimings };

/**
 * A function that resolves a profile handle to a fully qualified profile handle
 */
export type ProfileHandleResolver = (handle: string) => string;

/**
 * The environment configuration type
 *
 * @group General Configuration
 */
export type EnvironmentConfig = {
  backend: Url;
  chains: ChainConfigRegistry;
  timings: TransactionObserverTimings;
  handleResolver: ProfileHandleResolver;
};

/**
 * The production environment configuration
 *
 * - Endpoint: https://api.lens.dev
 * - Chain IDs: 137 (Polygon), 1 (Ethereum)
 * - Profile handle suffix: `.lens`
 * - Environment specific timings
 *
 * @group General Configuration
 */
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

/**
 * The staging environment configuration
 *
 * - Endpoint: https://api-mumbai.lens.dev
 * - Chain IDs: 80001 (Mumbai), 5 (Goerli)
 * - Profile handle suffix: `.test`
 * - Environment specific timings
 *
 * @group General Configuration
 */
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
