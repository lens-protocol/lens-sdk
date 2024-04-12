import { ChainType, URL } from '@lens-protocol/shared-kernel';

import { ChainConfigRegistry, amoy, goerli, mainnet, polygon } from './chains';

/**
 * The transaction observer timings
 *
 * @internal
 */
export type TransactionObserverTimings = {
  pollingInterval: number; // ms
  maxMiningWaitTime: number; // ms
  maxIndexingWaitTime: number; // ms
};

/**
 * A function that resolves a profile localName to a fully qualified profile handle
 *
 * @internal
 */
export type ProfileHandleResolver = (localName: string) => string;

/**
 * The environment configuration type
 *
 * @internal
 */
export type EnvironmentConfig = {
  name: string;
  backend: URL;
  chains: ChainConfigRegistry;
  timings: TransactionObserverTimings;
  contracts: {
    permissionlessCreator: string;
  };
  handleResolver: ProfileHandleResolver;
};

/**
 * The production environment configuration
 *
 * This is the environment to be used in the live instance of your application (real users, real profiles, real data).
 *
 * - Endpoint: https://api-v2.lens.dev
 * - Chain IDs: 137 (Polygon), 1 (Ethereum)
 * - Environment specific timings
 */
export const production: EnvironmentConfig = {
  name: 'production',
  backend: 'https://api-v2.lens.dev' as URL,
  chains: {
    [ChainType.ETHEREUM]: mainnet,
    [ChainType.POLYGON]: polygon,
  },
  timings: {
    pollingInterval: 3000,
    maxIndexingWaitTime: 120000,
    maxMiningWaitTime: 60000,
  },
  contracts: {
    permissionlessCreator: '0x0b5e6100243f793e480DE6088dE6bA70aA9f3872',
  },
  handleResolver: (localName) => `lens/${localName}`,
};

/**
 * The development environment configuration
 *
 * This is the environment to be used when you develop and test your application (test users, test profiles, test data)
 *
 * - Endpoint: https://api-v2-amoy.lens.dev
 * - Chain IDs: 80002 (Amoy), 5 (Goerli)
 * - Environment specific timings
 */
export const development: EnvironmentConfig = {
  name: 'development',
  backend: 'https://api-v2-amoy.lens.dev' as URL,
  chains: {
    [ChainType.ETHEREUM]: goerli,
    [ChainType.POLYGON]: amoy,
  },
  timings: {
    pollingInterval: 3000,
    maxIndexingWaitTime: 240000,
    maxMiningWaitTime: 120000,
  },
  contracts: {
    permissionlessCreator: '0x36440da1D98FF46637f0b98AAA082bc77977B49B',
  },
  handleResolver: (localName) => `lens/${localName}`,
};

/**
 * @internal
 */
export const staging: EnvironmentConfig = {
  name: 'staging',
  backend: 'https://api-amoy.lens-v2.crtlkey.com' as URL,
  chains: {
    [ChainType.ETHEREUM]: goerli,
    [ChainType.POLYGON]: amoy,
  },
  timings: {
    pollingInterval: 5000,
    maxIndexingWaitTime: 240000,
    maxMiningWaitTime: 2400000,
  },
  contracts: {
    permissionlessCreator: '0x36440da1D98FF46637f0b98AAA082bc77977B49B',
  },
  handleResolver: (localName) => `lens/${localName}`,
};
