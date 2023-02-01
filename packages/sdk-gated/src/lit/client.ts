import { Signer } from '@ethersproject/abstract-signer';
import { BaseProvider } from '@ethersproject/providers';
import { SiweMessage } from 'siwe';
import { transform, validate, wrapWithProfileCondition } from '../conditions';
import { populateCollects } from '../conditions/collect-condition';
import {
  APIError,
  BadRequestError,
  ConnectivityError,
  EncodingError,
  ProviderError,
  SignerError,
  UnmetAccessCriteriaError,
  UploadError,
} from '../error';
import {
  AccessConditionOutput as AccessConditionInput,
  EncryptedFieldsOutput,
  EncryptionParamsOutput as EncryptionParams,
  EncryptionProvider,
  Media,
  MetadataOutput,
  PublicationMetadataV2Input as MetadataV2,
} from '../graphql/types';
import LensAPIClient from '../lens/client';
import {
  AuthSig,
  DecryptMetadataResponse,
  EncryptedMetadata,
  EncryptMetadataResponse,
  LensEnvironment,
} from '../types';
import { chainIdToString, envToChainId } from '../utils';
import { validateAddress, validateAddressWithSigner, validateLensEnvironment } from '../validators';
import {
  base64StringToBlob,
  blobToBase64String,
  decryptWithSymmetricKey,
  encryptWithSymmetricKey,
  LitNodeClient,
  uint8arrayToString,
} from './lit-protocol-sdk';
import { getRandomSymmetricKey, importSymmetricKey } from './utils';

/**
 * LitProtocolClient is a wrapper around the Lit Protocol SDK. It enables
 * encrypting and decrypting metadata for Lens Protocol publications.
 */
export class LitProtocolClient {
  private static LOCAL_STORAGE_ENTRY = 'lens-lit-authsig';

  private _provider: BaseProvider;
  private readonly _signer: Signer;

  private _client: LitNodeClient;
  private readonly _api: LensAPIClient;

  private _env: LensEnvironment;
  private _connected: boolean;

  private _address: string;
  private _authSig?: AuthSig;

  private ENCRYPT_FIELDS: Array<keyof MetadataV2> = [
    'content',
    'image',
    'media',
    'animation_url',
    'external_url',
  ];

  ready: boolean;

  constructor(config: {
    provider: BaseProvider;
    signer: Signer;
    env: LensEnvironment;
    address: string;
  }) {
    if (!config.provider) {
      throw new ProviderError();
    }
    if (!config.signer) {
      throw new SignerError();
    }
    this._env = validateLensEnvironment(config.env);
    this._address = validateAddress(config.address);
    this.ready = false;
    this._connected = false;
    this._provider = config.provider;
    this._signer = config.signer;
    this._api = new LensAPIClient(config.env);
    this._client = new LitNodeClient({
      debug: false,
    });
  }

  /**
   * Initializes the client by connecting to the LIT network and signing a SIWE-compatible
   * message.
   */
  public async connect(params: { address: string; env: LensEnvironment }): Promise<void> {
    try {
      this._address = await validateAddressWithSigner(params.address, this._signer);
      this.env = params.env;
      if (!this._connected) {
        await this._client.connect();
        this._connected = true;
      }
      this._authSig = await this._getOrCreateAuthSig();
      this.ready = true;
    } catch (e: any) {
      this.disconnect();
      throw new ConnectivityError();
    }
  }

  /**
   * Encrypts the given metadata with the given access condition and uploads it to some
   * storage with the provided `uploadFunction`. This will also add explicit access to the profile
   * owner.
   * @param metadata The metadata must be valid Lens Metadata V2.
   * @param profileId Your profile ID. Required in cases where same wallet has multiple profiles, and also
   * to verify and calculate that you are not encrypting data on behalf of someone else.
   * @param accessCondition The access condition based on which the metadata will be encrypted.
   * @param uploadMetadataHandler The function that will be used to upload the encrypted metadata.
   */
  public async encryptMetadata(
    metadata: MetadataV2,
    profileId: string,
    accessCondition: AccessConditionInput,
    uploadMetadataHandler: (data: EncryptedMetadata) => Promise<string>
  ): Promise<EncryptMetadataResponse> {
    if (!profileId) {
      throw new BadRequestError('Profile ID must be provided');
    }

    if (!uploadMetadataHandler || typeof uploadMetadataHandler !== 'function') {
      throw new BadRequestError('No upload function provided');
    }

    await Promise.all([
      this._api.validateAddressOwnsProfile(this._address, profileId),
      this._api.validateMetadata(metadata),
    ]);

    // validation
    validate(accessCondition);

    // find any collect conditions with thisPublication = true, guess the next publication id
    accessCondition = await populateCollects(accessCondition, profileId, this._api);

    // wrap with profile condition to make sure profile owner has access
    const wrappedCondition = wrapWithProfileCondition(accessCondition, profileId);

    // convert to lit compatible condition
    const unifiedAccessControlConditions = await transform(wrappedCondition, this._api.env);

    try {
      const symmetricKey = await getRandomSymmetricKey();

      if (!this.ready) {
        await this.connect({
          address: this._address!,
          env: this._env,
        });
      }

      const encryptedSymmetricKey = await this._client.saveEncryptionKey({
        unifiedAccessControlConditions,
        symmetricKey,
        authSig: await this._getOrCreateAuthSig(),
        chain: chainIdToString(envToChainId(this._env)),
        permanent: false,
      });
      const encryptionParams: Omit<EncryptionParams, 'encryptedFields'> = {
        providerSpecificParams: {
          encryptionKey: uint8arrayToString(encryptedSymmetricKey, 'base16'),
        },
        encryptionProvider: EncryptionProvider.LitProtocol,
        accessCondition: wrappedCondition,
      };
      const encryptedMetadata = await this._internalEncryptMetadata(
        metadata,
        symmetricKey,
        encryptionParams
      );

      let contentURI;
      try {
        contentURI = await uploadMetadataHandler(encryptedMetadata);
      } catch (e: any) {
        throw new UploadError(e.message);
      }

      return { contentURI, encryptedMetadata };
    } catch (e: any) {
      if (e.code) {
        return {
          error: e,
        };
      } else {
        return {
          error: e.errorCode ? new EncodingError(e.message) : new BadRequestError(e.message),
        };
      }
    }
  }

  /**
   * Decrypts the given encrypted metadata only if the signer fulfills the criteria
   * @param encryptedMetadata The encrypted metadata object that will be decrypted.
   */
  public async decryptMetadata(
    encryptedMetadata: EncryptedMetadata | MetadataOutput
  ): Promise<DecryptMetadataResponse> {
    if (!encryptedMetadata) {
      throw new BadRequestError('Metadata missing!');
    }

    if (!encryptedMetadata.encryptionParams) {
      throw new BadRequestError('No encryption params provided');
    }

    if (!encryptedMetadata.encryptionParams.accessCondition) {
      throw new BadRequestError('Access condition missing from metadata');
    }

    if (!encryptedMetadata.encryptionParams.encryptedFields) {
      throw new BadRequestError('Encrypted fields missing from metadata');
    }

    if (!this.ready) {
      await this.connect({
        address: this._address,
        env: this._env,
      });
    }

    const profileId = await this._getProfileId();
    if (!profileId) {
      throw new APIError(`No profile ID found for address ${this._address}`);
    }

    try {
      const unifiedAccessControlConditions = await transform(
        encryptedMetadata.encryptionParams.accessCondition,
        this._api.env
      );
      const symmetricKey = await this._client.getEncryptionKey({
        unifiedAccessControlConditions,
        toDecrypt: encryptedMetadata.encryptionParams.providerSpecificParams.encryptionKey,
        chain: chainIdToString(envToChainId(this._env)),
        authSig: this._authSig,
      });

      const decrypted = await this._internalDecryptMetadata(encryptedMetadata, symmetricKey);
      return { decrypted };
    } catch (e: any) {
      return {
        error: e.errorCode === 'not_authorized' ? new UnmetAccessCriteriaError() : e,
      };
    }
  }

  /**
   * Encrypts all string values of the metadata object with the given symmetric key.
   * Strings are converted to base64 -> Blob -> AES-256-GCM Blob using the key -> base64 string.
   * @param data The metadata to encrypt. Should be a valid Metadata V2 object.
   * @param symmetricKey The LIT symmetric key to use for encryption.
   * @param encryption The encryption parameters to use.
   */
  private async _internalEncryptMetadata(
    data: MetadataV2,
    symmetricKey: Uint8Array,
    encryption: Omit<EncryptionParams, 'encryptedFields'>
  ): Promise<EncryptedMetadata> {
    // encrypting only metadata that contains actual content
    const entriesToEncrypt = Object.entries(data).filter(([key, _]: [string, any]) =>
      this.ENCRYPT_FIELDS.includes(key as keyof MetadataV2)
    );

    let accumulator: MetadataV2 = Object.assign({}, data);
    const cryptoKey = await importSymmetricKey(symmetricKey);

    const encoder = new TextEncoder();
    const encryptionParams: EncryptionParams = Object.assign(
      {
        encryptedFields: {},
      },
      encryption
    );
    for (let [key, value] of entriesToEncrypt) {
      accumulator[key as keyof MetadataV2] = this._createPlaceholderForProperty(
        key as keyof MetadataV2,
        value
      );
      encryptionParams.encryptedFields[key as keyof EncryptedFieldsOutput] =
        await this._encryptProperty(key as keyof MetadataV2, value, cryptoKey, encoder);
    }

    return {
      ...accumulator,
      encryptionParams,
    };
  }

  /**
   * Decrypts all string values of the metadata object with the given symmetric key.
   * @param data The encrypted metadata
   * @param symmetricKey The LIT symmetric key to use for decryption.
   */
  private async _internalDecryptMetadata(
    data: EncryptedMetadata | MetadataOutput,
    symmetricKey: Uint8Array
  ): Promise<MetadataV2> {
    const entriesToDecrypt = Object.entries(data.encryptionParams!.encryptedFields).filter(
      ([key, value]: [string, any]) =>
        this.ENCRYPT_FIELDS.includes(key as keyof MetadataV2) && value
    );

    // strip accumulator from encrypt params
    let accumulator = this._stripEncryptionParams(data);

    const cryptoKey = await importSymmetricKey(symmetricKey);

    for (let [key, value] of entriesToDecrypt) {
      accumulator[key as keyof MetadataV2] = await this._decryptProperty(
        key as keyof MetadataV2,
        value,
        cryptoKey
      );
    }

    return accumulator;
  }

  /** Disconnects the client from the LIT node. Clears signatures from LocalStorage if necessary. */
  public disconnect() {
    this.ready = false;
    this._connected = false;
    this._authSig = undefined;
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(LitProtocolClient.LOCAL_STORAGE_ENTRY);
    }
  }

  public set address(address: string) {
    this._address = validateAddress(address);
  }

  public set env(env: LensEnvironment) {
    this._env = validateLensEnvironment(env);
    this._api.env = env;
  }

  private async _getOrCreateAuthSig(): Promise<AuthSig> {
    const address = await this._signer.getAddress();

    const location = globalThis.location;
    const body: Partial<SiweMessage> = {
      address, // convert to EIP-55 format or else SIWE complains
      domain: location ? location.host : 'localhost',
      uri: location ? location.origin : 'http://localhost',
      version: '1',
      chainId: envToChainId(this._env),
    };

    const message = new SiweMessage(body);

    let existingAuthSig: AuthSig | undefined;

    if (typeof localStorage !== 'undefined') {
      let storageEntry = localStorage.getItem(LitProtocolClient.LOCAL_STORAGE_ENTRY);
      if (storageEntry) {
        existingAuthSig = JSON.parse(storageEntry);
      }
    } else if (this._authSig) {
      existingAuthSig = this._authSig;
    }

    if (existingAuthSig && existingAuthSig.address === address) {
      return existingAuthSig;
    } else {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(LitProtocolClient.LOCAL_STORAGE_ENTRY);
      }

      this._authSig = undefined;
    }

    let signature;
    const preparedMessage = message.prepareMessage();
    try {
      signature = await this._signer.signMessage(preparedMessage);
    } catch (e: any) {
      throw new SignerError(e.message);
    }

    const authSig = {
      sig: signature,
      derivedVia: 'web3.eth.personal.sign',
      signedMessage: preparedMessage,
      address,
    };

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(LitProtocolClient.LOCAL_STORAGE_ENTRY, JSON.stringify(authSig));
    }
    this._authSig = authSig;

    return authSig;
  }

  private _stripEncryptionParams(data: EncryptedMetadata | MetadataOutput): MetadataV2 {
    const result: any = Object.assign({}, data);
    delete result.encryptionParams;
    return result;
  }

  private async _encryptProperty<T>(
    key: keyof MetadataV2,
    property: T,
    cryptoKey: CryptoKey,
    encoder: TextEncoder
  ): Promise<T> {
    if (!property) {
      return property;
    }
    const encryptString = async (str: string, cryptoKey: CryptoKey, encoder: TextEncoder) => {
      const arrayBuffer = encoder.encode(str);
      const encryptedBlob = await encryptWithSymmetricKey(cryptoKey, arrayBuffer.buffer);
      // due to different implementations of Blob between nodejs and browser
      // @ts-ignore
      return (await blobToBase64String(encryptedBlob)) as string;
    };

    const encryptObject = async <T extends object>(
      key: keyof MetadataV2,
      obj: T,
      cryptoKey: CryptoKey,
      encoder: TextEncoder
    ): Promise<T> => {
      let result: T = Object.assign({}, obj);

      await Promise.all(
        Object.entries(result).map(async ([prop, value]: [string, any]) => {
          // dont encrypt the media type
          if (key === 'media' && prop === 'type') {
            return value;
          }
          result[prop as keyof T] =
            typeof value === 'string' ? await encryptString(value, cryptoKey, encoder) : value;
        })
      );

      return result;
    };

    const encryptArray = async <T>(
      arr: Array<T>,
      cryptoKey: CryptoKey,
      encoder: TextEncoder
    ): Promise<Array<T>> => {
      const results = await Promise.all(
        arr.map(async (value: T) => {
          if (typeof value === 'string') {
            return await encryptString(value, cryptoKey, encoder);
          } else if (value && typeof value === 'object') {
            return await encryptObject(key, value as unknown as object, cryptoKey, encoder);
          } else {
            return value;
          }
        })
      );
      return results as Array<T>;
    };

    let result;
    if (typeof property === 'string') {
      result = await encryptString(property, cryptoKey, encoder);
    } else if (Array.isArray(property)) {
      result = await encryptArray(property, cryptoKey, encoder);
    } else if (typeof property === 'object') {
      result = await encryptObject(key, property as unknown as object, cryptoKey, encoder);
    } else {
      result = property;
    }
    return result as T;
  }

  private async _decryptProperty<T>(
    key: keyof MetadataV2,
    propValue: T,
    cryptoKey: CryptoKey
  ): Promise<T> {
    const decryptString = async (str: string, cryptoKey: CryptoKey): Promise<string> => {
      const encryptedBlob = await base64StringToBlob(str);
      const decryptedArrayBuffer = await decryptWithSymmetricKey(encryptedBlob, cryptoKey);
      return uint8arrayToString(new Uint8Array(decryptedArrayBuffer), 'utf-8');
    };

    const decryptObjectRecursive = async (
      key: string,
      value: Record<string, any>,
      cryptoKey: CryptoKey
    ): Promise<Record<string, any>> => {
      let result: Record<string, any> = {};

      await Promise.all(
        Object.entries(value).map(async ([prop, val]: [string, any]) => {
          if (!val || prop === '__typename' || (key === 'media' && prop === 'type')) {
            // dont decrypt the media type or the __typename
            result[prop] = val;
          } else if (typeof val === 'string') {
            result[prop] = await decryptString(val, cryptoKey);
          } else if (typeof val === 'object') {
            result[prop] = await decryptObjectRecursive(prop, val, cryptoKey);
          } else {
            result[prop] = val;
          }
        })
      );

      return result;
    };

    const decryptArray = async <T>(arr: Array<T>, cryptoKey: CryptoKey): Promise<Array<T>> => {
      const results = await Promise.all(
        arr.map(async (value: T) => {
          if (typeof value === 'string') {
            return await decryptString(value, cryptoKey);
          } else if (value && typeof value === 'object') {
            return await decryptObjectRecursive(key, value as unknown as object, cryptoKey);
          } else {
            return value;
          }
        })
      );
      return results as Array<T>;
    };

    let result;
    if (!propValue) {
      return propValue;
    } else if (typeof propValue === 'string') {
      result = await decryptString(propValue, cryptoKey);
    } else if (Array.isArray(propValue)) {
      result = await decryptArray(propValue, cryptoKey);
    } else if (typeof propValue === 'object') {
      result = await decryptObjectRecursive(key, propValue as unknown as object, cryptoKey);
    } else {
      result = propValue;
    }
    return result as T;
  }

  private _createPlaceholderForProperty<T>(key: keyof MetadataV2, property: T): T | string {
    if (!property) {
      return property;
    }
    const placeholderString = (key?: keyof MetadataV2 | keyof Media) => {
      if (key === 'image' || key === 'url' || key === 'cover') {
        return 'ipfs://QmZq4ozZ4ZAoPuPnujgyhQmpmsQTJnBS36KfijUCqmnhQa';
      }
      return 'This publication is gated.';
    };

    const placeholderObject = <T extends object>(key: keyof MetadataV2, obj: T): T => {
      let result: T = Object.assign({}, obj);

      Object.entries(result).forEach(([prop, value]: [string, any]) => {
        // dont encrypt the media type
        if (key === 'media' && prop === 'type') {
          return value;
        }
        if (key)
          result[prop as keyof T] = typeof value === 'string' ? placeholderString(key) : value;
      });
      return result;
    };

    const placeholderArray = <T>(arr: Array<T>): Array<T> => {
      const results = arr.map((value: T) => {
        if (typeof value === 'string') {
          return placeholderString();
        } else if (value && typeof value === 'object') {
          return placeholderObject(key, value as unknown as object);
        } else {
          return value;
        }
      });
      return results as Array<T>;
    };

    let result;
    if (typeof property === 'string') {
      result = placeholderString(key);
    } else if (Array.isArray(property)) {
      result = placeholderArray(property);
    } else if (typeof property === 'object') {
      result = placeholderObject(key, property as unknown as object);
    } else {
      result = property;
    }
    return result as T;
  }

  private async _getProfileId(): Promise<string | null> {
    const authSig = await this._getOrCreateAuthSig();
    const profiles = await this._api.getProfilesForAddress(authSig.address);

    if (!profiles) {
      return null;
    }

    return profiles[0].id as string;
  }
}
