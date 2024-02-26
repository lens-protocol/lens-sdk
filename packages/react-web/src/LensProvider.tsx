import type { BaseConfig } from '@lens-protocol/react';
import { BaseProvider, EnvironmentConfig, IBindings, QueryParams } from '@lens-protocol/react';
import { ILogger } from '@lens-protocol/shared-kernel';
import { IObservableStorageProvider, IStorageProvider } from '@lens-protocol/storage';
import { ReactNode, useState } from 'react';

import { localStorage } from './storage';

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
   * If an implementation of {@link IObservableStorageProvider} is provided,
   * the provider will be used to subscribe to changes in the storage.
   *
   * @defaultValue an implementation based on `window.localStorage` and `StorageEvent`.
   */
  storage?: IStorageProvider | IObservableStorageProvider;
  /**
   * The common query params allow you to customize some aspect of the returned data.
   */
  params?: QueryParams;
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

const storage = localStorage();

/**
 * Manages the lifecycle and internal state of the Lens SDK
 *
 * @group Components
 * @param props - {@link LensProviderProps}
 *
 * @example
 * ```tsx
 * import { LensProvider, staging } from '@lens-protocol/react-web';
 * import { bindings as wagmiBindings } from '@lens-protocol/wagmi';
 *
 * const lensConfig: LensConfig = {
 *   bindings: wagmiBindings(),
 *   environment: staging,
 * };
 *
 * function App() {
 *   return (
 *     <LensProvider config={lensConfig}>
 *        // ...
 *     </LensProvider>
 *   );
 * }
 * ```
 */
export function LensProvider({ config, ...props }: LensProviderProps) {
  const [resolvedConfig] = useState<BaseConfig>(() => ({
    ...config,
    storage: config.storage ?? storage,
  }));

  return <BaseProvider config={resolvedConfig} {...props} />;
}
