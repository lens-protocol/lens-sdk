import { url, type URL, never } from '@lens-social/types';

/**
 * The environment configuration type.
 */
export type EnvironmentConfig = {
  name: string;
  backend: URL;
};

/**
 * The mainnet environment configuration.
 *
 * Use this environment for the live instance of your application, involving real users, real accounts, and real data.
 */
export const mainnet: EnvironmentConfig = new Proxy(
  {
    name: 'mainnet',
    backend: url('https://example.com'),
  },
  {
    get: (_target, _prop) => {
      never('Mainnet is not supported at this time');
    },
  },
);

/**
 * The testnet environment configuration.
 *
 * Use this environment to develop and test your application (test users, test accounts, test data).
 */
export const testnet: EnvironmentConfig = new Proxy(
  {
    name: 'mainnet',
    backend: url('https://example.com'),
  },
  {
    get: (_target, _prop) => {
      never('Testnet is not supported at this time');
    },
  },
);

/**
 * @internal
 */
export const staging: EnvironmentConfig = {
  name: 'staging',
  backend: url('https://api.staging.lens.dev/graphql'),
};

/**
 * @internal
 */
export const local: EnvironmentConfig = {
  name: 'local',
  backend: url('http://localhost:3000/graphql'),
};
