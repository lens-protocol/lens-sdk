import { Sources } from '@lens-protocol/api-bindings';
import { AuthenticationConfig, IEncryptionProvider } from '@lens-protocol/gated-content';
import { ILogger } from '@lens-protocol/shared-kernel';
import { IStorageProvider, IObservableStorageProvider } from '@lens-protocol/storage';

import { EnvironmentConfig } from './environments';
import { IProviderBinding } from './wallet/infrastructure/ProviderFactory';
import { ISignerBinding } from './wallet/infrastructure/SignerFactory';

export * from './environments';
export * from './sources';

export type { ILogger };

export interface IBindings extends ISignerBinding, IProviderBinding {}

export type LensConfig = {
  bindings: IBindings;
  environment: EnvironmentConfig;
  logger?: ILogger;
  storage: IStorageProvider | IObservableStorageProvider;
  sources?: Sources;
};

export type EncryptionConfig = {
  authentication: AuthenticationConfig;
  provider: IEncryptionProvider;
};
