import * as GatedContent from '@lens-protocol/gated-content';
import { IStorageProvider } from '@lens-protocol/storage';
import { Signer } from 'ethers';

import { EnvironmentConfig } from '../../environments';

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
    environment: environment.gated,
    encryptionProvider,
    storageProvider,
  });
}
