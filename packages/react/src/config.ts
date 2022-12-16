import { IStorageProvider } from '@lens-protocol/storage';

import { EnvironmentConfig } from './environments';
import { IProviderBinding } from './wallet/infrastructure/ProviderFactory';
import { ISignerBinding } from './wallet/infrastructure/SignerFactory';

export * from './environments';
export * from './sources';

export interface IBindings extends ISignerBinding, IProviderBinding {}

export type LensConfig = {
  environment: EnvironmentConfig;
  storage: IStorageProvider;
  sources?: string[];
  bindings: IBindings;
};
