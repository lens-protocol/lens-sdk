import { type URL, url } from '@lens-protocol/types';

/**
 * The environment configuration type.
 */
export type EnvironmentConfig = {
  name: string;
  backend: URL;
  indexingTimeout: number;
  pollingInterval: number;
};

/**
 * The mainnet environment configuration.
 *
 * Use this environment for the live instance of your application, involving real users, real accounts, and real data.
 */
export const mainnet: EnvironmentConfig = {
  name: 'mainnet',
  backend: url('https://api.lens.xyz/graphql'),
  indexingTimeout: 10000,
  pollingInterval: 100,
};

/**
 * The testnet environment configuration.
 *
 * Use this environment to develop and test your application (test users, test accounts, test data).
 */
export const testnet: EnvironmentConfig = {
  name: 'testnet',
  backend: url('https://api.testnet.lens.xyz/graphql'),
  indexingTimeout: 10000,
  pollingInterval: 100,
};

/**
 * @internal
 */
export const staging: EnvironmentConfig = {
  name: 'staging',
  backend: url('https://api.staging.lens.dev/graphql'),
  indexingTimeout: 20000,
  pollingInterval: 100,
};

/**
 * @internal
 */
export const local: EnvironmentConfig = {
  name: 'local',
  backend: url('http://localhost:3000/graphql'),
  indexingTimeout: 60000,
  pollingInterval: 100,
};
