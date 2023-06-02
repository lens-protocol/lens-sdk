import * as GatedEnvironments from '@lens-protocol/gated-content/environments';
import { ChainType, Url } from '@lens-protocol/shared-kernel';

import { ChainConfigRegistry, goerli, mainnet, mumbai, polygon } from './chains';
import { TransactionObserverTimings } from './transactions/infrastructure/TransactionObserver';

export type { TransactionObserverTimings };

/**
 * A function that resolves a profile handle to a fully qualified profile handle
 *
 * @internal
 */
export type ProfileHandleResolver = (handle: string) => string;

/**
 * The environment configuration type
 *
 * @internal
 */
export type EnvironmentConfig = {
  name: 'production' | 'development' | 'sandbox' | string;
  backend: Url;
  chains: ChainConfigRegistry;
  timings: TransactionObserverTimings;
  handleResolver: ProfileHandleResolver;
  gated: GatedEnvironments.EnvironmentConfig;
};

/**
 * The production environment configuration
 *
 * This is the environment to be used in the live instance of your application (real users, real profiles, real data).
 *
 * - Endpoint: https://api.lens.dev
 * - Chain IDs: 137 (Polygon), 1 (Ethereum)
 * - Profile handle suffix: `.lens`
 * - Environment specific timings
 */
export const production: EnvironmentConfig = {
  name: 'production',
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
  gated: GatedEnvironments.production,
};

/**
 * The development environment configuration
 *
 * This is the environment to be used when you develop and test your application (test users, test profiles, test data)
 *
 * - Endpoint: https://api-mumbai.lens.dev
 * - Chain IDs: 80001 (Mumbai), 5 (Goerli)
 * - Profile handle suffix: `.test`
 * - Environment specific timings
 */
export const development: EnvironmentConfig = {
  name: 'development',
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
  gated: GatedEnvironments.development,
};

/**
 * The sandbox environment configuration
 *
 * This is the environment to be used when you develop and you need to experiment with custom collect/follow modules.
 * Although the Lens contract are also deployed on Mumbai this is a separate deployment so expect different test data, profiles, users, etc.
 *
 * - Endpoint: https://api-sandbox-mumbai.lens.dev
 * - Chain IDs: 80001 (Mumbai), 5 (Goerli)
 * - Profile handle suffix: `.test`
 * - Environment specific timings
 */
export const sandbox: EnvironmentConfig = {
  name: 'sandbox',
  backend: 'https://api-sandbox-mumbai.lens.dev',
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
  gated: GatedEnvironments.sandbox,
};

/**
 * The development environment configuration
 *
 * @deprecated Please use the {@link development} variable instead
 *
 * After extensive considerations, we have decided to rename the `staging` variable into `development`.
 * We find that the term `staging` is inflated with too many meanings and people have different expectations
 * depending on their past work experiences. So the term is not very intelligible for our purpose.
 *
 * Together with {@link production} the changes is meant to be more explicit about the intended usage of these variables.
 *
 * - `production` is the environment to be used in the live instance of your application (real users, real profiles, real data).
 * - `development` is the environment to be used when you develop and test your application (test users, test profiles, test data).
 *
 * We also aligned the naming in the `@lens-protocol/client` package to enable interoperability between the two packages.
 */
export const staging = development;
