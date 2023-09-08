import * as raw from '@lens-protocol/metadata';
import { invariant, never } from '@lens-protocol/shared-kernel';

import { ICipher } from './IEncryptionProvider';
import * as gql from './graphql';
import { resolvePathsToDecrypt, resolvePathsToEncrypt } from './paths';
import { Mutable } from './types';
import { update } from './update';

export type EncryptionResult<T extends raw.PublicationMetadata> = {
  encrypted: T;
  paths: raw.EncryptedPaths;
};

export class PublicationMetadataEncryptor {
  constructor(private readonly cipher: ICipher) {}

  async encrypt<T extends raw.PublicationMetadata>(metadata: T): Promise<EncryptionResult<T>> {
    const paths = resolvePathsToEncrypt(metadata);

    const encrypted = await update(metadata, paths, (value) => this.encryptString(value));

    return {
      encrypted,
      paths,
    };
  }

  private async encryptString(value: string): Promise<string> {
    return this.cipher.encrypt(value);
  }
}

export class PublicationMetadataDecryptor {
  constructor(private readonly cipher: ICipher) {}

  async decrypt<T extends gql.EncryptedFragmentOfPublicationMetadata>(encrypted: T): Promise<T> {
    const paths = resolvePathsToDecrypt(encrypted);
    return update(encrypted, paths, (value) => this.decryptString(value));
  }

  private async decryptString(value: string): Promise<string> {
    return this.cipher.decrypt(value);
  }
}

const PUBLICATION_METADATA_V2_ENCRYPTABLE_FIELDS = [
  'content',
  'image',
  'media',
  'animationUrl',
  'externalUrl',
] as const;

export class LegacyPublicationMetadataDecryptor {
  constructor(private readonly cipher: ICipher) {}

  async decrypt<T extends gql.EncryptedFragmentOfLegacyPublicationMetadata>(
    encrypted: T,
  ): Promise<T> {
    const decrypted: Mutable<T> = Object.assign({}, encrypted);

    for (const key of PUBLICATION_METADATA_V2_ENCRYPTABLE_FIELDS) {
      switch (key) {
        case 'animationUrl':
          if (
            encrypted.marketplace?.animationUrl &&
            encrypted.encryptedWith.encryptedFields.animationUrl
          ) {
            decrypted.marketplace = Object.assign({}, decrypted.marketplace, {
              animationUrl: await this.decryptString(
                encrypted.encryptedWith.encryptedFields.animationUrl,
              ),
            });
          }
          break;

        case 'content':
          if (encrypted.content && encrypted.encryptedWith.encryptedFields.content) {
            decrypted.content = await this.decryptString(
              encrypted.encryptedWith.encryptedFields.content,
            );
          }
          break;

        case 'externalUrl':
          if (
            encrypted.marketplace?.externalURL &&
            encrypted.encryptedWith.encryptedFields.externalUrl
          ) {
            decrypted.marketplace = Object.assign({}, decrypted.marketplace, {
              externalURL: await this.decryptString(
                encrypted.encryptedWith.encryptedFields.externalUrl,
              ),
            });
          }
          break;

        case 'image':
          if (
            encrypted.marketplace?.image?.raw?.uri &&
            encrypted.encryptedWith.encryptedFields.image
          ) {
            decrypted.marketplace = Object.assign({}, decrypted.marketplace, {
              image: await this.decryptMediaSet(
                encrypted.marketplace.image,
                encrypted.encryptedWith.encryptedFields.image,
              ),
            });
          }
          break;

        case 'media':
          if (encrypted.media && encrypted.encryptedWith.encryptedFields.media) {
            decrypted.media = await this.decryptLegacyMediaItemList(
              encrypted.media,
              encrypted.encryptedWith.encryptedFields.media,
            );
          }
          break;
      }
    }

    return decrypted;
  }

  private async decryptLegacyMediaItemList<T extends gql.FragmentOf<gql.LegacyMediaItem>>(
    items: readonly T[],
    encrypted: readonly gql.EncryptedMedia[],
  ): Promise<T[]> {
    invariant(
      items.length === encrypted.length,
      'Media and encrypted media must have the same length',
    );

    return Promise.all(
      items.map(async (item, index) => {
        const encryptedMediaSet = encrypted[index] ?? never();
        return this.decryptLegacyMediaItem(item, encryptedMediaSet);
      }),
    );
  }

  private async decryptLegacyMediaItem<T extends gql.FragmentOf<gql.LegacyMediaItem>>(
    item: T,
    encrypted: gql.EncryptedMedia,
  ): Promise<T> {
    switch (item.__typename) {
      case 'LegacyAudioItem':
        return this.decryptLegacyAudioItem(item, encrypted) as Promise<T>;

      case 'LegacyImageItem':
        return this.decryptLegacyImageItem(item, encrypted) as Promise<T>;

      case 'LegacyVideoItem':
        return this.decryptLegacyVideoItem(item, encrypted) as Promise<T>;
    }
  }

  private async decryptLegacyAudioItem<T extends gql.FragmentOf<gql.LegacyAudioItem>>(
    item: T,
    encrypted: gql.EncryptedMedia,
  ): Promise<T> {
    if (item?.audio) {
      return {
        ...item,
        audio: await this.decryptMediaSet(item.audio, encrypted.uri),
      };
    }
    return item; // fail-safe
  }

  private async decryptLegacyImageItem<T extends gql.FragmentOf<gql.LegacyImageItem>>(
    item: T,
    encrypted: gql.EncryptedMedia,
  ): Promise<T> {
    if (item?.image) {
      return {
        ...item,
        altTag: item.altTag && encrypted.altTag ? await this.decryptString(encrypted.altTag) : null, // fail-safe
        image: await this.decryptMediaSet(item.image, encrypted.uri),
      };
    }
    return item; // fail-safe
  }

  private async decryptLegacyVideoItem<T extends gql.FragmentOf<gql.LegacyVideoItem>>(
    item: T,
    encrypted: gql.EncryptedMedia,
  ): Promise<T> {
    if (item?.video) {
      return {
        ...item,
        altTag: item.altTag && encrypted.altTag ? await this.decryptString(encrypted.altTag) : null, // fail-safe
        video: await this.decryptMediaSet(item.video, encrypted.uri),
      };
    }
    return item; // fail-safe
  }

  private async decryptMediaSet<
    T extends gql.FragmentOf<gql.AudioSet | gql.ImageSet | gql.VideoSet>,
  >(mediaSet: T, encrypted: gql.Scalars['EncryptedValue']): Promise<T> {
    if (mediaSet?.raw?.uri && encrypted) {
      return {
        ...mediaSet,
        raw: await this.decryptMedia(mediaSet.raw, encrypted),
      };
    }
    return mediaSet; // fail-safe
  }

  private async decryptMedia<
    T extends gql.FragmentOf<gql.Audio | gql.Image | gql.Video> | undefined,
  >(media: T, encrypted: gql.Scalars['EncryptedValue']): Promise<T> {
    if (media?.uri && encrypted) {
      return {
        ...media,
        uri: await this.decryptString(encrypted),
      };
    }
    return media; // fail-safe
  }

  private async decryptString(value: string): Promise<string> {
    return this.cipher.decrypt(value);
  }
}
