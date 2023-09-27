import { AppId } from '@lens-protocol/domain/entities';
import { ILogger, invariant } from '@lens-protocol/shared-kernel';
import { IObservableStorageProvider, IStorageProvider } from '@lens-protocol/storage';

import { EnvironmentConfig } from './environments';
import { MediaTransformsConfig } from './mediaTransforms';

/**
 * `<LensProvider>` configuration
 */
export type LensConfig = {
  /**
   * Provides integration with the ethers.js Signer and Provider
   */
  // bindings: IBindings;
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
   * The `sources` determines the sources of posts and comments that will be fetched
   *
   * It also determines some Profile related statistics, such as the number of posts and comments.
   *
   * @defaultValue any sources, not restricted
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

  /**
   * Media returned from the publication and profile queries can be transformed
   * to sizes needed by the SDK consuming application.
   * To overwrite default transformation values, provide a `mediaTransforms` object.
   *
   * @see {@link MediaTransformsConfig} for more information
   */
  mediaTransforms?: MediaTransformsConfig;
};

/** @internal */
export function validateConfig(config: LensConfig) {
  invariant(
    !(config.appId && config.sources && !config.sources?.includes(config.appId)),
    `LensProvider config: "sources" don't include your "appId"`,
  );
}
