import { QueryParams } from '@lens-protocol/api-bindings';
import { ILogger } from '@lens-protocol/shared-kernel';
import { IObservableStorageProvider, IStorageProvider } from '@lens-protocol/storage';

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
  QueryParams,
  RequiredSigner,
};

export { SupportedFiatType } from '@lens-protocol/api-bindings';

export interface IBindings extends ISignerBinding, IProviderBinding {}

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

  params: QueryParams;

  origin?: string;
};

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
};
