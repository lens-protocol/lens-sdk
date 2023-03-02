import {
  PublicationMetadata,
  GatedPublicationMetadata,
  EncryptionProvider,
  ContentEncryptionKey,
  AccessCondition,
  EncryptionParamsFragment,
  OmitTypename,
} from '@lens-protocol/api-bindings';
import { PromiseResult, success } from '@lens-protocol/shared-kernel';
import { IStorage, IStorageProvider } from '@lens-protocol/storage';
import * as LitJsSdk from '@lit-protocol/lit-node-client';
import { Signer, utils } from 'ethers';
import { SiweMessage } from 'siwe';

import { AuthSig, createAuthStorage } from './AuthStorage';
import { ICipher, IEncryptionProvider } from './IEncryptionProvider';
import { transform } from './conditions';
import {
  EncryptedPublicationMetadata,
  PublicationMetadataDecryptor,
  PublicationMetadataEncryptor,
} from './encryption';
import { EnvironmentConfig } from './environments';

type AuthenticationConfig = {
  domain: string;
  statement?: string;
  uri: string;
};

export type GatedClientConfig = {
  authentication: AuthenticationConfig;
  environment: EnvironmentConfig;
  signer: Signer;
  storageProvider: IStorageProvider;
  encryptionProvider: IEncryptionProvider;
};

function uint8arrayToHexString(buffer: Uint8Array): string {
  return buffer.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
}

export type EncryptionParams = OmitTypename<EncryptionParamsFragment>;

export class GatedClient {
  private readonly authentication: AuthenticationConfig;

  private readonly environment: EnvironmentConfig;

  private readonly storage: IStorage<AuthSig>;

  private readonly signer: Signer;

  private readonly litClient = new LitJsSdk.LitNodeClient({ debug: false });

  private readonly encryptionProvider: IEncryptionProvider;

  constructor({
    authentication,
    environment,
    signer,
    storageProvider,
    encryptionProvider,
  }: GatedClientConfig) {
    this.authentication = authentication;
    this.environment = environment;
    this.signer = signer;
    this.storage = createAuthStorage(environment, storageProvider);
    this.encryptionProvider = encryptionProvider;
  }

  async encryptPublication(
    metadata: PublicationMetadata,
    accessCondition: AccessCondition,
  ): PromiseResult<GatedPublicationMetadata, never> {
    await this.ensureLitConnection();

    const cipher = await this.encryptionProvider.createCipher();

    const encryptionKey = await this.saveEncryptionKey(cipher, accessCondition);

    const enc = new PublicationMetadataEncryptor(cipher);

    const { obfuscated, encryptedFields } = await enc.encrypt(metadata);

    const encryptedMetadata: GatedPublicationMetadata = {
      ...obfuscated,
      encryptionParams: {
        providerSpecificParams: {
          encryptionKey,
        },
        encryptionProvider: EncryptionProvider.LitProtocol,
        accessCondition,
        encryptedFields,
      },
    };

    return success(encryptedMetadata);
  }

  async decryptPublication<T extends EncryptedPublicationMetadata>(
    encrypted: T,
    using: EncryptionParams,
  ): PromiseResult<T, never> {
    await this.ensureLitConnection();

    const cipher = await this.retrieveEncryptionKey(
      using.providerSpecificParams.encryptionKey,
      using.accessCondition,
    );

    const enc = new PublicationMetadataDecryptor(cipher);

    const decrypted = await enc.decrypt(encrypted, using.encryptedFields);

    return success(decrypted);
  }

  private async getOrCreateAuthSig(): Promise<AuthSig> {
    const authSig = await this.storage.get();

    if (authSig) {
      return authSig;
    }

    const siweMessage = await this.createSiweMessage();
    const messageToSign = siweMessage.prepareMessage();

    const signature = await this.signer.signMessage(messageToSign);

    const recoveredAddress = utils.verifyMessage(messageToSign, signature);

    const newAuthSig = {
      sig: signature,
      derivedVia: 'web3.eth.personal.sign',
      signedMessage: messageToSign,
      address: recoveredAddress,
    };

    await this.storage.set(newAuthSig);

    return newAuthSig;
  }

  private async ensureLitConnection() {
    if (!this.litClient.ready) {
      await this.litClient.connect();
    }
  }

  private async saveEncryptionKey(
    cipher: ICipher,
    accessCondition: AccessCondition,
  ): Promise<ContentEncryptionKey> {
    const symmetricKey = await cipher.exportKey();

    const authSig = await this.getOrCreateAuthSig();

    const encryptedSymmetricKey = await this.litClient.saveEncryptionKey({
      authSig,
      chain: this.environment.chainName,
      symmetricKey,
      unifiedAccessControlConditions: transform(accessCondition, this.environment),
    });

    return uint8arrayToHexString(encryptedSymmetricKey);
  }

  private async retrieveEncryptionKey(
    encryptedEncryptionKey: ContentEncryptionKey,
    accessCondition: AccessCondition,
  ): Promise<ICipher> {
    const authSig = await this.getOrCreateAuthSig();

    const encryptionKey = await this.litClient.getEncryptionKey({
      authSig,
      chain: this.environment.chainName,
      toDecrypt: encryptedEncryptionKey,
      unifiedAccessControlConditions: transform(accessCondition, this.environment),
    });

    return this.encryptionProvider.importCipher(encryptionKey);
  }

  private async createSiweMessage() {
    return new SiweMessage({
      address: await this.signer.getAddress(),
      version: '1',
      chainId: this.environment.chainId,
      ...this.authentication,
    });
  }
}
