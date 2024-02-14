import {
  AllFragmentVariables,
  ImageSizeTransform,
  ImageTransform,
  SupportedFiatType,
} from '@lens-protocol/api-bindings';
import { AppId } from '@lens-protocol/domain/entities';
import { ILogger } from '@lens-protocol/shared-kernel';
import { IObservableStorageProvider, IStorageProvider } from '@lens-protocol/storage';

import { ConsoleLogger } from './ConsoleLogger';
import { EnvironmentConfig } from './environments';
import { RequiredSigner } from './wallet/adapters/ConcreteWallet';
import { GetProvider, IProviderBinding } from './wallet/infrastructure/ProviderFactory';
import { GetSigner, ISignerBinding } from './wallet/infrastructure/SignerFactory';

export type {
  GetProvider,
  GetSigner,
  ILogger,
  IObservableStorageProvider,
  IStorageProvider,
  RequiredSigner,
};

/**
 * The common query parameters used across any query.
 */
export type QueryParams = {
  /**
   * The size of the publication image.
   *
   * @defaultValue see individual fields
   */
  image?: {
    /**
     * The size of the small publication image
     *
     * @defaultValue width: 400px, height: auto, keepAspectRatio: true
     */
    small?: ImageTransform;
    /**
     * The size of the medium publication image
     *
     * @defaultValue width: 700px, height: auto, keepAspectRatio: true
     */
    medium?: ImageTransform;
  };
  /**
   * Profile related fields parameters
   *
   * @defaultValue see individual fields
   */
  profile?: {
    /**
     * The size of optimized profile image
     *
     * @defaultValue width: 256px, height: auto, keepAspectRatio: true
     */
    thumbnail?: ImageTransform;
    /**
     * The size of the cover image
     *
     * @defaultValue width: 1100px, height: auto, keepAspectRatio: true
     */
    cover?: ImageTransform;
    /**
     * The source to use for fetching profile metadata details.
     *
     * If not provided, it will default to the global profile metadata for any profile fetched.
     *
     * If provided and a profile does not have bespoke profile metadata it will fallback to their global profile metadata.
     *
     * To know more about app specific profile metadata, see example with `appId` in {@link https://lens-protocol.github.io/metadata/functions/profile.html}.
     *
     * @defaultValue empty, global profile metadata
     */
    metadataSource?: AppId;
  };
  /**
   * The fiat currency to use for the fx rate
   *
   * @defaultValue USD
   */
  fxRateFor?: SupportedFiatType;
  /**
   * The App Ids for which to fetch Publication and Profile Stats for.
   *
   * Affects mainly comments, mirrors, and quotes counts.
   *
   * @defaultValue empty, all apps
   */
  statsFor?: AppId[];
};

export { SupportedFiatType } from '@lens-protocol/api-bindings';

/**
 * The interface used to access the `Signer` and `Provider` instances.
 */
export interface IBindings extends ISignerBinding, IProviderBinding {}

/**
 * `<BaseProvider>` configuration
 *
 * @internal
 */
export type BaseConfig = {
  bindings: IBindings;
  environment: EnvironmentConfig;
  logger?: ILogger;
  debug?: boolean;
  storage: IStorageProvider | IObservableStorageProvider;
  params?: QueryParams;
  origin?: string;
  sponsored?: boolean;
};

/**
 * Internal configuration
 *
 * @internal
 */
export type RequiredConfig = {
  bindings: IBindings;
  environment: EnvironmentConfig;
  logger: ILogger;
  debug: boolean;
  storage: IStorageProvider | IObservableStorageProvider;
  origin?: string;
  sponsored: boolean;
  fragmentVariables: AllFragmentVariables;
};

function buildImageTransform(
  width: ImageSizeTransform,
  height: ImageSizeTransform = 'auto',
): ImageTransform {
  return {
    width,
    height,
    keepAspectRatio: true,
  };
}

const defaultQueryParams = {
  image: {
    small: buildImageTransform('400px'),
    medium: buildImageTransform('700px'),
  },
  profile: {
    thumbnail: buildImageTransform('256px'),
    cover: buildImageTransform('1100px'),
  },
  fxRateFor: SupportedFiatType.Usd,
  statsFor: [],
};

function resolveFragmentVariables(params: QueryParams): AllFragmentVariables {
  return {
    fxRateFor: params.fxRateFor ?? defaultQueryParams.fxRateFor,
    imageMediumSize: params.image?.medium ?? defaultQueryParams.image.medium,
    imageSmallSize: params.image?.small ?? defaultQueryParams.image.small,
    profileCoverSize: params.profile?.cover ?? defaultQueryParams.profile.cover,
    profileMetadataSource: params.profile?.metadataSource ?? null,
    profilePictureSize: params.profile?.thumbnail ?? defaultQueryParams.profile.thumbnail,
    statsFor: params.statsFor ?? defaultQueryParams.statsFor,
  };
}

/**
 * @internal
 */
export function resolveConfig(config: BaseConfig): RequiredConfig {
  return {
    debug: config.debug ?? false,
    logger: config.logger ?? new ConsoleLogger(),
    storage: config.storage,
    environment: config.environment,
    bindings: config.bindings,
    origin: config.origin,
    sponsored: config.sponsored ?? true,
    fragmentVariables: resolveFragmentVariables(config.params ?? defaultQueryParams),
  };
}
