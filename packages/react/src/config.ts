import { Sources } from '@lens-protocol/api-bindings';
import { AppId } from '@lens-protocol/domain/entities';
import { AuthenticationConfig, IEncryptionProvider } from '@lens-protocol/gated-content';
import { ILogger, invariant } from '@lens-protocol/shared-kernel';
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
  appId?: AppId;
};

export type EncryptionConfig = {
  authentication: AuthenticationConfig;
  provider: IEncryptionProvider;
};

export function validateConfig(config: LensConfig) {
  invariant(
    !(config.appId && config.sources && !config.sources?.includes(config.appId)),
    `LensProvider config: "sources" don't include your "appId"`,
  );
}
