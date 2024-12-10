import type { EnvironmentConfig } from '@lens-protocol/env';
import { AccountFragment } from '@lens-protocol/graphql';
import type { Account, FragmentDocumentFor } from '@lens-protocol/graphql';
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
export function configureContext<TAccount extends Account>(
  from: ClientConfig<TAccount>,
): Context<TAccount> {
  return {
    environment: from.environment,
    cache: from.cache ?? false,
    debug: from.debug ?? false,
    origin: from.origin,
    storage: from.storage ?? new InMemoryStorageProvider(),
    accountFragment: from.accountFragment ?? (AccountFragment as FragmentDocumentFor<TAccount>),
  };
}
