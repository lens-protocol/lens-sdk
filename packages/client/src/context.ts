import type { EnvironmentConfig } from '@lens-protocol/env';
import { type Account, AccountFragment, PostFieldsFragment } from '@lens-protocol/graphql';
import type { FragmentDocumentFor, PostFields } from '@lens-protocol/graphql';
import { type IStorageProvider, InMemoryStorageProvider } from '@lens-protocol/storage';
import type { ClientConfig } from './config';

/**
 * @internal
 */
export type Context<
  TAccount extends Account = Account,
  TPostFields extends PostFields = PostFields,
> = {
  environment: EnvironmentConfig;
  cache: boolean;
  debug: boolean;
  origin?: string;
  storage: IStorageProvider;
  accountFragment: FragmentDocumentFor<TAccount, 'Account'>;
  postFieldsFragment: FragmentDocumentFor<TPostFields, 'Post', 'PostFields'>;
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
    postFieldsFragment: from.postFieldsFragment ?? PostFieldsFragment,
  } as ContextFrom<TConfig>;
}
