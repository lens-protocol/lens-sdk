import type { EnvironmentConfig } from '@lens-protocol/env';
import { type Account, AccountFragment } from '@lens-protocol/graphql';
import type { FragmentDocumentFor } from '@lens-protocol/graphql';
import { type IStorageProvider, InMemoryStorageProvider } from '@lens-protocol/storage';
import type { ClientConfig } from './config';

/**
 * @internal
 */
export type Context<TAccount extends Account = Account> = {
  environment: EnvironmentConfig;
  cache: boolean;
  debug: boolean;
  origin?: string;
  storage: IStorageProvider;
  accountFragment: FragmentDocumentFor<TAccount>;
};

/**
 * @internal
 */
export type ContextFrom<TConfig extends ClientConfig> = TConfig extends ClientConfig<infer TAccount>
  ? Context<TAccount>
  : never;

/**
 * @internal
 */
export function configureContext<TConfig extends ClientConfig>(
  from: TConfig,
): ContextFrom<TConfig> {
  return {
    environment: from.environment,
    cache: from.cache ?? false,
    debug: from.debug ?? false,
    origin: from.origin,
    storage: from.storage ?? new InMemoryStorageProvider(),
    accountFragment: from.accountFragment ?? AccountFragment,
  } as ContextFrom<TConfig>;
}
