import type { EnvironmentConfig } from '@lens-protocol/env';
import type { IStorageProvider } from '@lens-protocol/storage';
import type { Exchange, TypedDocumentNode } from '@urql/core';

/**
 * The client configuration.
 */
export type ClientConfig = {
  /**
   * The environment configuration to use (e.g. `mainnet`, `testnet`).
   */
  environment: EnvironmentConfig;
  /**
   * Whether to enable caching.
   *
   * @experimental This feature is experimental and may change in the future.
   */
  cache?: Exchange;
  /**
   * Whether to enable debug mode.
   *
   * @defaultValue `false`
   */
  debug?: boolean;
  /**
   * The URL origin of the client.
   *
   * Use this to set the `Origin` header for requests from non-browser environments.
   */
  origin?: string;

  /**
   * The storage provider to use for authentication state and other data.
   *
   * @defaultValue {@link InMemoryStorageProvider}
   */
  storage?: IStorageProvider;

  /**
   * The Server API Key for your Lens App.
   *
   * Use this with a Server API Key to not incur in rate limits when used on a server-to-server scenario.
   */
  apiKey?: string;

  /**
   * The custom fragments to use.
   */
  fragments?: TypedDocumentNode[];
};
