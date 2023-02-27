import {
  AccessConditionInput,
  PublicationMetadata,
  EncryptedPublicationMetadata,
} from '@lens-protocol/api-bindings';
import { PromiseResult } from '@lens-protocol/shared-kernel';
import { IStorage, IStorageProvider } from '@lens-protocol/storage';
import { Signer } from 'ethers';

import { AuthSig, createAuthStorage } from './AuthStorage';
import { EnvironmentConfig } from './environments';

export type GatedClientConfig = {
  environment: EnvironmentConfig;
  signer: Signer;
  storageProvider: IStorageProvider;
};

export class GatedClient {
  private readonly environment: EnvironmentConfig;
  private readonly storage: IStorage<AuthSig>;
  private readonly signer: Signer;

  constructor({ environment, signer, storageProvider }: GatedClientConfig) {
    this.environment = environment;
    this.signer = signer;
    this.storage = createAuthStorage(environment, storageProvider);
  }

  async encryptPublication(
    _metadata: PublicationMetadata,
    _accessCondition: AccessConditionInput,
  ): PromiseResult<EncryptedPublicationMetadata, never> {
    throw new Error('Method not implemented.');
  }

  async decryptPublication(
    _metadata: EncryptedPublicationMetadata,
    _accessCondition: AccessConditionInput,
  ): PromiseResult<PublicationMetadata, never> {
    throw new Error('Method not implemented.');
  }
}
