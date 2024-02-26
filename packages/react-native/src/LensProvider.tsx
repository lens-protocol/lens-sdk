import { BaseProvider, EnvironmentConfig, IBindings, QueryParams } from '@lens-protocol/react';
import { ILogger } from '@lens-protocol/shared-kernel';
import { IObservableStorageProvider, IStorageProvider } from '@lens-protocol/storage';
import { ReactNode } from 'react';

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
   * The common query params allow you customize some aspect of the returned data.
   */
  params?: QueryParams;
  /**
   * The value of the `Origin` HTTP header to use when making requests to the Lens API.
   *
   * @example
   * ```md
   * https://example.xyz
   * ```
   *
   * @defaultValue if not provided, the requests will be made without the `Origin` header.
   */
  origin?: string;
  /**
   * Overwrite all onchain transactions to be self-funded if set to `false`.
   *
   * @defaultValue `true`
   */
  sponsored?: boolean;
};

/**
 * <LensProvider> props
 */
export type LensProviderProps = {
  /**
   * The children to render
   */
  children: ReactNode;
  /**
   * The configuration for the Lens SDK
   */
  config: LensConfig;
};

/**
 * Manages the lifecycle and internal state of the Lens SDK
 *
 * @group Components
 * @param props - {@link LensProviderProps}
 */
export const LensProvider = BaseProvider<LensConfig>;
