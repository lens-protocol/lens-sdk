import type { EnvironmentConfig } from '@lens-protocol/env';
import type { Account, PostFields } from '@lens-protocol/graphql';
import type { FragmentDocumentFor } from '@lens-protocol/graphql';
import type { IStorageProvider } from '@lens-protocol/storage';

/**
 * The client configuration.
 */
export type ClientConfig<
  TAccount extends Account = Account,
  TPostFields extends PostFields = PostFields,
> = {
  /**
   * The environment configuration to use (e.g. `mainnet`, `testnet`).
   */
  environment: EnvironmentConfig;
  /**
   * Whether to enable caching.
   *
   * @defaultValue `false`
   */
  cache?: boolean;
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
   * The storage provider to use.
   *
   * @defaultValue {@link InMemoryStorageProvider}
   */
  storage?: IStorageProvider;
  /**
   * The Account Fragment to use.
   *
   * @defaultValue {@link AccountFragment}
   */
  accountFragment?: FragmentDocumentFor<TAccount, 'Account'>;
  /**
   * The Post Fragment to use.
   *
   * @defaultValue {@link PostFragment}
   */
  postFieldsFragment?: FragmentDocumentFor<TPostFields, 'Post', 'PostFields'>;
};
