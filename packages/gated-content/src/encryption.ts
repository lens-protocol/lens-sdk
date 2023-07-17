import {
  DeepOmitTypename,
  EncryptedFields,
  EncryptedFieldsOutput,
  EncryptedMediaSet,
  PublicationMediaSet,
  MetadataOutput,
  PublicationMetadata,
  PublicationMetadataMediaInput,
} from '@lens-protocol/api-bindings';
import { invariant, isNonNullable, never, UnknownObject, Url } from '@lens-protocol/shared-kernel';

import { ICipher } from './IEncryptionProvider';
import { Entries, ExtractFields } from './types';

const SUPPORTED_FIELDS = ['content', 'image', 'media', 'animation_url', 'external_url'] as const;

const MEDIA_PLACEHOLDER_URL = 'ipfs://QmZq4ozZ4ZAoPuPnujgyhQmpmsQTJnBS36KfijUCqmnhQa';
const STRING_PLACEHOLDER = 'This publication is gated.';

type SupportedFieldKeys = (typeof SUPPORTED_FIELDS)[number];

type ExtractSupportedFields<T extends UnknownObject> = ExtractFields<T, SupportedFieldKeys>;

function supportedFields<T extends UnknownObject, R extends ExtractSupportedFields<T>>(
  metadata: T,
): Entries<R> {
  return SUPPORTED_FIELDS.reduce((acc, key) => {
    if (key in metadata && isNonNullable(metadata[key])) {
      acc.push([key, metadata[key]]);
    }
    return acc;
  }, [] as unknown[] as Entries<R>);
}

export type EncryptResultValue = {
  obfuscated: PublicationMetadata;
  encryptedFields: Partial<EncryptedFields>;
};

export class PublicationMetadataEncryptor {
  constructor(private readonly cipher: ICipher) {}

  async encrypt(metadata: PublicationMetadata): Promise<EncryptResultValue> {
    const fields = supportedFields(metadata);
    const obfuscated = Object.assign({}, metadata);
    const encryptedFields: Partial<EncryptedFields> = {};

    for (const [key, value] of fields) {
      switch (key) {
        case 'content':
          obfuscated[key] = this.obfuscateText(value);
          encryptedFields[key] = await this.encryptString(value);
          break;

        case 'media':
          obfuscated[key] = this.obfuscateMedia(value);
          encryptedFields[key] = await this.encryptMedia(value);
          break;

        case 'image':
          obfuscated[key] = this.obfuscateUrl(value);
          encryptedFields[key] = await this.encryptString(value);
          break;

        case 'animation_url':
          obfuscated[key] = this.obfuscateUrl(value);
          encryptedFields[key] = await this.encryptString(value);
          break;

        case 'external_url':
          obfuscated[key] = this.obfuscateUrl(value);
          encryptedFields[key] = await this.encryptString(value);
          break;
      }
    }

    return {
      obfuscated,
      encryptedFields,
    };
  }

  private async encryptString(value: string): Promise<string> {
    return this.cipher.encrypt(value);
  }

  private async encryptMedia(
    media: PublicationMetadataMediaInput[],
  ): Promise<NonNullable<EncryptedFields['media']>> {
    return Promise.all(
      media.map(async ({ altTag, cover, item, type }) => ({
        altTag: altTag ? await this.encryptString(altTag) : null,
        cover: cover ? await this.encryptString(cover) : null,
        item: await this.encryptString(item),
        type: type, // keep mime-type unencrypted so consumers have a chance to show something meaningful
      })),
    );
  }

  private obfuscateMedia(media: PublicationMetadataMediaInput[]): PublicationMetadataMediaInput[] {
    return media.map(({ altTag, cover, item, type }) => ({
      altTag: altTag ? this.obfuscateText(altTag) : null,
      cover: cover ? this.obfuscateUrl(cover) : null,
      item: this.obfuscateUrl(item),
      type: type, // mime-type is not encrypted
    }));
  }

  private obfuscateText(_: string): string {
    return STRING_PLACEHOLDER;
  }

  private obfuscateUrl(_: Url): Url {
    return MEDIA_PLACEHOLDER_URL;
  }
}

type SupportedMetadataOutputFields = 'animatedUrl' | keyof EncryptedFieldsOutput;

export type EncryptedPublicationMetadata = Partial<
  ExtractFields<MetadataOutput, SupportedMetadataOutputFields>
>;

export type IndexedEncryptedFields = Partial<ExtractSupportedFields<EncryptedFieldsOutput>>;

export class PublicationMetadataDecryptor {
  constructor(private readonly cipher: ICipher) {}

  async decrypt<T extends EncryptedPublicationMetadata>(
    encrypted: T,
    using: IndexedEncryptedFields,
  ): Promise<T> {
    const fields = supportedFields(using);
    const decrypted = Object.assign({}, encrypted);

    for (const [key, value] of fields) {
      switch (key) {
        case 'content':
        case 'image':
          decrypted[key] = await this.decryptString(value);
          break;
        case 'animation_url':
          // notice discrepancy between MetadataOutput and PublicationMetadata naming
          decrypted['animatedUrl'] = await this.decryptString(value);
          break;

        case 'media':
          decrypted[key] = await this.decryptMedia(
            encrypted[key] ??
              never(
                `Cannot find "media" in encrypted metadata. It appears to be a discrepancy between the provided encrypted metadata and the encrypted fields in the decryption parameters.`,
              ),
            value,
          );
          break;

        case 'external_url':
        // not supported in MetadataOutput ¯\_(ツ)_/¯
      }
    }

    return decrypted;
  }

  private async decryptMedia<T extends PublicationMediaSet>(
    media: T[],
    encrypted: DeepOmitTypename<EncryptedMediaSet>[],
  ): Promise<T[]> {
    invariant(
      media.length === encrypted.length,
      'Media and encrypted media must have the same length',
    );

    return Promise.all(
      media.map(async (obfuscated, index) => {
        const encryptedMediaSet = encrypted[index] ?? never();

        return {
          ...obfuscated,
          original: {
            ...obfuscated.original,
            altTag:
              obfuscated.original.altTag && encryptedMediaSet.original.altTag
                ? await this.decryptString(encryptedMediaSet.original.altTag ?? never())
                : null,
            cover:
              obfuscated.original.cover && encryptedMediaSet.original.cover
                ? await this.decryptString(encryptedMediaSet.original.cover ?? never())
                : null,
            url: await this.decryptString(encryptedMediaSet.original.url),
          },
        };
      }),
    );
  }

  private async decryptString(value: string): Promise<string> {
    return this.cipher.decrypt(value);
  }
}
