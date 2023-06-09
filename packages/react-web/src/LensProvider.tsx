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
   * The environment to use. See {@link production}, {@link development}, and {@link sandbox}.
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
export type LensProviderProps = {
  /**
   * The children to render
   */
  children: ReactNode;
  /**
   * The configuration for the Lens SDK
   */
  config: LensConfig;
  /**
   * A callback that is called when the user logs out
   *
   * @defaultValue no-op
   */
  onLogout?: LogoutHandler;
  /**
   * A callback that is called when a transaction fails
   *
   * @defaultValue no-op
   */
  onError?: ErrorHandler<FailedTransactionError>;
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
  const [resolvedConfig] = useState<LensConfigBase>(() => ({
    ...config,
    storage,
  }));

  return <LensProviderBase config={resolvedConfig} {...props} />;
}
