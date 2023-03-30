import { InvariantError } from '@apollo/client/utilities/globals';
import * as GatedContent from '@lens-protocol/gated-content';
import { IStorageProvider } from '@lens-protocol/storage';
import { Signer } from 'ethers';

import { EnvironmentConfig } from '../../environments';

function resolveGatedEnvironment(environment: EnvironmentConfig): GatedContent.EnvironmentConfig {
  switch (environment.name) {
    case 'production':
      return GatedContent.production;
    case 'development':
      return GatedContent.development;
  }
  throw new InvariantError(`Unknown new environment`);
}

export type GateClientInit = {
  config: GatedContent.AuthenticationConfig;
  encryptionProvider: GatedContent.IEncryptionProvider;
  environment: EnvironmentConfig;
  signer: Signer;
  storageProvider: IStorageProvider;
};

export function createGatedClient({
  config,
  signer,
  environment,
  encryptionProvider,
  storageProvider,
}: GateClientInit) {
  return new GatedContent.GatedClient({
    authentication: config,
    signer,
    environment: resolveGatedEnvironment(environment),
    encryptionProvider,
    storageProvider,
  });
}
