import {
  AppId,
  EnvironmentConfig,
  ErrorHandler,
  FailedTransactionError,
  IBindings,
  LensProvider as LensProviderBase,
  LogoutHandler,
} from '@lens-protocol/react';
import type { LensConfig as LensConfigBase } from '@lens-protocol/react';
import { ILogger } from '@lens-protocol/shared-kernel';
import { PropsWithChildren, useState } from 'react';

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
   * The environment to use. See {@link production} and {@link staging}.
   */
  environment: EnvironmentConfig;
  /**
   * The logger interface to use when something worth logging happens
   *
   * @defaultValue `ConsoleLogger`, an internal implementation of {@link ILogger} that logs to the console
   */
  logger?: ILogger;
  /**
   * The `sources` determines the sources of posts and comments that will be fetched
   *
   * It also determines some Profile related statistics, such as the number of posts and comments
   *
   * @defaultValue any sources, not restricted.
   */
  sources?: AppId[];
  /**
   * The `appId` identifies post and comment created from the SDK
   *
   * The `appId`, if provided, MUST be included in the `sources` array.
   *
   * @defaultValue not set
   *
   * @see {@link appId} helper
   */
  appId?: AppId;
};

/**
 * <LensProvider> props
 */
export type LensProviderProps = PropsWithChildren<{
  config: LensConfig;
  /**
   * @defaultValue no-op
   */
  onLogout?: LogoutHandler;
  /**
   * @defaultValue no-op
   */
  onError?: ErrorHandler<FailedTransactionError>;
}>;

const storage = localStorage();

/**
 * Given {@link LensConfig} it manages the lifecycle and internal state management of the Lens SDK
 *
 * @group Components
 * @param props - {@link LensProviderProps}
 */
export function LensProvider({ config, ...props }: LensProviderProps) {
  const [resolvedConfig] = useState<LensConfigBase>(() => ({
    ...config,
    storage,
  }));

  return <LensProviderBase config={resolvedConfig} {...props} />;
}
