import type { EnvironmentConfig } from '@lens-protocol/env';
import { type IStorageProvider, InMemoryStorageProvider } from '@lens-protocol/storage';

import type { ClientConfig } from './config';
import { FragmentResolver } from './fragments';

/**
 * @internal
 */
export type Context = {
  environment: EnvironmentConfig;
  cache: boolean;
  debug: boolean;
  origin?: string;
  storage: IStorageProvider;
  apiKey?: string;
  fragments: FragmentResolver;
};

/**
 * @internal
 */
export function configureContext(from: ClientConfig): Context {
  return {
    environment: from.environment,
    cache: from.cache ?? false,
    debug: from.debug ?? false,
    origin: from.origin,
    storage: from.storage ?? new InMemoryStorageProvider(),
    apiKey: from.apiKey,
    fragments: FragmentResolver.from(from.fragments ?? []),
  };
}
