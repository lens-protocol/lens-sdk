import { QueryParams } from '@lens-protocol/api-bindings/src/apollo/cache';
import { ILogger } from '@lens-protocol/shared-kernel';
import { IObservableStorageProvider, IStorageProvider } from '@lens-protocol/storage';

import { EnvironmentConfig } from './environments';
import { IProviderBinding, GetProvider } from './wallet/infrastructure/ProviderFactory';
import { ISignerBinding, GetSigner } from './wallet/infrastructure/SignerFactory';

export type { QueryParams };
export type { GetProvider, GetSigner };

export interface IBindings extends ISignerBinding, IProviderBinding {}

/**
 * `<LensProvider>` configuration
 */
export type LensConfig = {
  /**
   * Provides integration with the ethers.js Signer and Provider
   */
  bindings: IBindings;
  /**
   * The environment to use. See {@link production}, {@link development}, and {@link sandbox}
   */
  environment: EnvironmentConfig;
  /**
   * The logger interface to use when something worth logging happens
   *
   * @defaultValue `ConsoleLogger`, an internal implementation of {@link ILogger} that logs to the console
   */
  logger?: ILogger;
  /**
   * The storage provider to use.
   *
   * If a implementation of {@link IObservableStorageProvider} is provided,
   * the provider will be used to subscribe to changes in the storage.
   */
  storage: IStorageProvider | IObservableStorageProvider;
  /**
   * The common query params allows you customize some aspect of the returned data.
   *
   * @defaultValue {@link defaultQueryParams}
   */
  params?: QueryParams;
};
