import { ContentInsightMatcher, demoSnapshotPoll, snapshotPoll } from '@lens-protocol/api-bindings';
import { ChainType, URL } from '@lens-protocol/shared-kernel';

import { ChainConfigRegistry, goerli, mainnet, mumbai, polygon } from './chains';

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
 * The Snapshot.org integration configuration
 *
 * @internal
 */
export type SnapshotConfig = {
  hub: URL;
  sequencer: URL;
  matcher: ContentInsightMatcher;
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
  handleResolver: ProfileHandleResolver;
  snapshot: SnapshotConfig;
  // gated: GatedEnvironments.EnvironmentConfig;
};

/**
 * The production environment configuration
 *
 * This is the environment to be used in the live instance of your application (real users, real profiles, real data).
 *
 * - Endpoint: https://api-v2.lens.dev
 * - Chain IDs: 137 (Polygon), 1 (Ethereum)
 * - Profile handle namespace: `lens/`
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
  handleResolver: (localName) => `lens/${localName}`,
  snapshot: {
    hub: 'https://hub.snapshot.org' as URL,
    matcher: snapshotPoll,
    sequencer: 'https://seq.snapshot.org' as URL,
  },
  // gated: GatedEnvironments.production,
};

/**
 * The development environment configuration
 *
 * This is the environment to be used when you develop and test your application (test users, test profiles, test data)
 *
 * - Endpoint: https://api-v2-mumbai-live.lens.dev
 * - Chain IDs: 80001 (Mumbai), 5 (Goerli)
 * - Profile handle namespace: `test/`
 * - Environment specific timings
 */
export const development: EnvironmentConfig = {
  name: 'development',
  backend: 'https://api-v2-mumbai-live.lens.dev' as URL,
  chains: {
    [ChainType.ETHEREUM]: goerli,
    [ChainType.POLYGON]: mumbai,
  },
  timings: {
    pollingInterval: 3000,
    maxIndexingWaitTime: 240000,
    maxMiningWaitTime: 120000,
  },
  handleResolver: (localName) => `test/${localName}`,
  snapshot: {
    hub: 'https://testnet.snapshot.org' as URL,
    matcher: demoSnapshotPoll,
    sequencer: 'https://testnet.seq.snapshot.org' as URL,
  },
  // gated: GatedEnvironments.development,
};
