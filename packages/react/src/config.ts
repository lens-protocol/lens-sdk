import { QueryParams } from '@lens-protocol/api-bindings';
import { ILogger } from '@lens-protocol/shared-kernel';
import { IObservableStorageProvider, IStorageProvider } from '@lens-protocol/storage';

import { EnvironmentConfig } from './environments';
import { RequiredSigner } from './wallet/adapters/ConcreteWallet';
import { IProviderBinding, GetProvider } from './wallet/infrastructure/ProviderFactory';
import { ISignerBinding, GetSigner } from './wallet/infrastructure/SignerFactory';

export type {
  QueryParams,
  ILogger,
  GetProvider,
  GetSigner,
  RequiredSigner,
  IObservableStorageProvider,
  IStorageProvider,
};

export { SupportedFiatType } from '@lens-protocol/api-bindings';

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
   * The environment to use. See {@link production} or {@link development}.
   */
  environment: EnvironmentConfig;
  /**
   * The logger interface to use when something worth logging happens
   *
   * @defaultValue `ConsoleLogger`, an internal implementation of `ILogger` interface that logs to the console
   */
  logger?: ILogger;
  /**
   * Enable debug mode. Disable gas estimation on self-funded transactions.
   *
   * @defaultValue `false`
   */
  debug?: boolean;
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
   * @defaultValue see individual fields of {@link QueryParams}
   */
  params?: QueryParams;
};
