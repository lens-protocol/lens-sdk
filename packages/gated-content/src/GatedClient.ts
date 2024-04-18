/* eslint-disable no-case-declarations */
import { verifyMessage } from '@ethersproject/wallet';
import * as raw from '@lens-protocol/metadata';
import {
  assertError,
  assertNever,
  failure,
  PromiseResult,
  success,
} from '@lens-protocol/shared-kernel';
import { IStorage, IStorageProvider } from '@lens-protocol/storage';
import { NodeClient } from '@lit-protocol/node-client';
import {
  JsonAuthSig,
  JsonEncryptionRetrieveRequest,
  JsonSaveEncryptionKeyRequest,
} from '@lit-protocol/types';
import { SiweMessage } from 'siwe';

import { createAuthStorage } from './AuthStorage';
import { CannotDecryptError } from './CannotDecryptError';
import { ICipher, IEncryptionProvider } from './IEncryptionProvider';
import { transformFromGql, transformFromRaw, DecryptionContext } from './conditions';
import { PublicationMetadataDecryptor, PublicationMetadataEncryptor } from './encryption';
import { EnvironmentConfig } from './environments';
import * as gql from './graphql';
import { isLitError } from './types';

function isIncorrectAccessControlConditionsError(error: unknown): boolean {
  return isLitError(error) && error.errorCode === 'incorrect_access_control_conditions';
}

/**
 * As per [EIP-4361](https://eips.ethereum.org/EIPS/eip-4361) the information
 * provided will be used to create a SIWE message.
 *
 * @example
 * ```
 * ${domain} wants you to sign in with your Ethereum account:
 * ${address}
 *
 * ${statement}
 *
 * URI: ${uri}
 * ...
 * ```
 */
export type AuthenticationConfig = {
  /**
   * The domain that is requesting the signing.
   *
   * This will be displayed to the user as well as used by compliant wallets to
   * avoid phishing attacks.
   */
  domain: string;
  /**
   * A human-readable ASCII assertion that the user will sign which MUST NOT include `\n` (the byte `0x0a`).
   *
   * This will be displayed to the user if signed using the user's wallet.
   */
  statement?: string;
  /**
   * The subject of the signing claim.
   */
  uri: string;
};

/**
 * An object implementing basic signer functionality.
 *
 * This is structurally compatible with the `ethers` `Signer` interface.
 */
export interface ISigner {
  /**
   * Returns the address of the signer.
   */
  getAddress(): Promise<string>;
  /**
   * Signs a message.
   */
  signMessage(message: string): Promise<string>;
}

export type GatedClientConfig = {
  authentication: AuthenticationConfig;
  environment: EnvironmentConfig;
  signer: ISigner;
  storageProvider: IStorageProvider;
  encryptionProvider: IEncryptionProvider;
};

export interface ILitNodeClient {
  ready: boolean;
  connect(): Promise<void>;
  saveEncryptionKey(request: JsonSaveEncryptionKeyRequest): Promise<Uint8Array>;
  getEncryptionKey(request: JsonEncryptionRetrieveRequest): Promise<Uint8Array>;
}

export type { DecryptionContext };

function uint8arrayToHexString(buffer: Uint8Array): string {
  return buffer.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
}

export class GatedClient {
  private readonly authentication: AuthenticationConfig;

  private readonly environment: EnvironmentConfig;

  private readonly storage: IStorage<JsonAuthSig>;

  private readonly signer: ISigner;

  protected litClient: ILitNodeClient;

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
    this.storage = createAuthStorage(storageProvider, environment.name);
    this.encryptionProvider = encryptionProvider;
    this.litClient = new NodeClient({ debug: false });
  }

  async encryptPublicationMetadata<T extends raw.PublicationMetadata>(
    metadata: T,
    accessCondition: raw.AccessCondition,
  ): PromiseResult<T, never> {
    await this.ensureLitConnection();

    const cipher = await this.encryptionProvider.createCipher();

    const encryptionKey = await this.saveEncryptionKey(cipher, accessCondition);

    const enc = new PublicationMetadataEncryptor(cipher);

    const { encrypted, paths } = await enc.encrypt(metadata);

    return success({
      ...encrypted,
      lens: {
        ...encrypted.lens,
        encryptedWith: {
          encryptionKey,
          accessCondition,
          provider: raw.EncryptionProvider.LIT_PROTOCOL,
          encryptedPaths: paths,
        },
      },
    });
  }

  async decryptPublicationMetadataFragment<T extends gql.EncryptedFragmentOfAnyPublicationMetadata>(
    encryptedMetadata: T,
    context: DecryptionContext,
  ): PromiseResult<T, CannotDecryptError> {
    await this.ensureLitConnection();

    try {
      const decrypted = await this.decrypt(encryptedMetadata, context);
      return success(decrypted);
    } catch (error: unknown) {
      if (isLitError(error)) {
        return failure(new CannotDecryptError(error.message, { cause: error }));
      }
      assertError(error);
      return failure(new CannotDecryptError('Cannot decrypt the metadata', { cause: error }));
    }
  }

  private async decrypt<T extends gql.EncryptedFragmentOfAnyPublicationMetadata>(
    encryptedMetadata: T,
    context: DecryptionContext,
  ): Promise<T> {
    const cipher = await this.retrieveCipher(encryptedMetadata, context);

    switch (encryptedMetadata.__typename) {
      case 'ArticleMetadataV3':
      case 'AudioMetadataV3':
      case 'CheckingInMetadataV3':
      case 'EmbedMetadataV3':
      case 'EventMetadataV3':
      case 'ImageMetadataV3':
      case 'LinkMetadataV3':
      case 'LiveStreamMetadataV3':
      case 'MintMetadataV3':
      case 'SpaceMetadataV3':
      case 'StoryMetadataV3':
      case 'TextOnlyMetadataV3':
      case 'ThreeDMetadataV3':
      case 'TransactionMetadataV3':
      case 'VideoMetadataV3':
        return new PublicationMetadataDecryptor(cipher).decrypt(encryptedMetadata);

      default:
        assertNever(encryptedMetadata, `Not supported metadata type`);
    }
  }

  private async getOrCreateAuthSig(): Promise<JsonAuthSig> {
    const authSig = await this.storage.get();

    if (authSig) {
      return authSig;
    }

    const siweMessage = await this.createSiweMessage();
    const messageToSign = siweMessage.prepareMessage();

    const signature = await this.signer.signMessage(messageToSign);

    const recoveredAddress = verifyMessage(messageToSign, signature);

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
    accessCondition: raw.AccessCondition,
  ): Promise<raw.LitEncryptionKey> {
    const symmetricKey = await cipher.exportKey();

    const authSig = await this.getOrCreateAuthSig();

    const encryptedSymmetricKey = await this.litClient.saveEncryptionKey({
      authSig,
      chain: this.environment.chainName,
      symmetricKey,
      unifiedAccessControlConditions: transformFromRaw(
        accessCondition,
        this.environment.accessControlContract,
      ),
    });

    return raw.toLitEncryptionKey(uint8arrayToHexString(encryptedSymmetricKey));
  }

  private async retrieveCipher<T extends gql.EncryptedFragmentOfAnyPublicationMetadata>(
    encryptedMetadata: T,
    context: DecryptionContext,
  ): Promise<ICipher> {
    const encryptionKey = await this.retrieveEncryptionKey(encryptedMetadata, context);

    return this.encryptionProvider.importCipher(encryptionKey);
  }

  private async retrieveEncryptionKey<T extends gql.EncryptedFragmentOfAnyPublicationMetadata>(
    encryptedMetadata: T,
    context: DecryptionContext,
  ): Promise<Uint8Array> {
    const authSig = await this.getOrCreateAuthSig();

    try {
      return await this.litClient.getEncryptionKey({
        authSig,
        chain: this.environment.chainName,
        toDecrypt: encryptedMetadata.encryptedWith.encryptionKey,
        unifiedAccessControlConditions: transformFromGql(
          encryptedMetadata.encryptedWith,
          this.environment.accessControlContract,
          context,
        ),
      });
    } catch (error: unknown) {
      if (isIncorrectAccessControlConditionsError(error) && this.environment.patches) {
        return await this.litClient.getEncryptionKey({
          authSig,
          chain: this.environment.chainName,
          toDecrypt: encryptedMetadata.encryptedWith.encryptionKey,
          unifiedAccessControlConditions: transformFromGql(
            encryptedMetadata.encryptedWith,
            this.environment.patches.accessControlContract,
            context,
          ),
        });
      }
      throw error;
    }
  }

  private async createSiweMessage() {
    return new SiweMessage({
      address: await this.signer.getAddress(),
      version: '1',
      chainId: this.environment.chainId,
      statement: 'Lens token-gated content needs you to log-in with the https://litprotocol.com/',
      ...this.authentication,
    });
  }
}

export type { JsonSaveEncryptionKeyRequest, JsonEncryptionRetrieveRequest };
