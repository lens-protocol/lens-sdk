import { AppId } from '@lens-protocol/domain/entities';
import { ILogger } from '@lens-protocol/shared-kernel';
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
   * The `appId` identifies post and comment created from the SDK
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
