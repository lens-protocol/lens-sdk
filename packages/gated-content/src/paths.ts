import * as raw from '@lens-protocol/metadata';
import { DistributiveOmit, UnknownObject } from '@lens-protocol/shared-kernel';

import * as gql from './graphql';
import { PathsOf } from './types';

type ExtractPathsOf<Target extends UnknownObject, By extends UnknownObject> = PathsOf<
  Extract<Target, By>
>;

type MapOfPaths<
  Target extends UnknownObject,
  Discriminant extends keyof Target = keyof Target,
  DiscriminantValue extends string = Target[Discriminant] extends string
    ? Target[Discriminant]
    : never,
> = {
  [P in DiscriminantValue]: ExtractPathsOf<Target, { [KK in Discriminant]: P }>[];
};

const ToEncryptPaths: MapOfPaths<raw.PublicationMetadata, '$schema'> = {
  [raw.PublicationSchemaId.ARTICLE_LATEST]: [
    'lens.content',
    'lens.attachments[n].item',
    'lens.attachments[n].altTag',
    'lens.attachments[n].cover',
    'lens.attachments[n].credits',
    'lens.attachments[n].artist',
    'lens.attachments[n].genre',
    'lens.attachments[n].recordLabel',
    'lens.attachments[n].lyrics',
  ],
  [raw.PublicationSchemaId.AUDIO_LATEST]: [
    'lens.content',
    'lens.audio.item',
    'lens.audio.cover',
    'lens.audio.credits',
    'lens.audio.artist',
    'lens.audio.genre',
    'lens.audio.recordLabel',
    'lens.audio.lyrics',
    'lens.attachments[n].item',
    'lens.attachments[n].altTag',
    'lens.attachments[n].cover',
    'lens.attachments[n].credits',
    'lens.attachments[n].artist',
    'lens.attachments[n].genre',
    'lens.attachments[n].recordLabel',
    'lens.attachments[n].lyrics',
  ],
  [raw.PublicationSchemaId.CHECKING_IN_LATEST]: [
    'lens.content',
    'lens.location',
    'lens.address.country',
    'lens.address.formatted',
    'lens.address.locality',
    'lens.address.postalCode',
    'lens.address.region',
    'lens.address.streetAddress',
    'lens.position',
    'lens.attachments[n].item',
    'lens.attachments[n].altTag',
    'lens.attachments[n].cover',
    'lens.attachments[n].credits',
    'lens.attachments[n].artist',
    'lens.attachments[n].genre',
    'lens.attachments[n].recordLabel',
    'lens.attachments[n].lyrics',
  ],
  [raw.PublicationSchemaId.EMBED_LATEST]: [
    'lens.content',
    'lens.embed',
    'lens.attachments[n].item',
    'lens.attachments[n].altTag',
    'lens.attachments[n].cover',
    'lens.attachments[n].credits',
    'lens.attachments[n].artist',
    'lens.attachments[n].genre',
    'lens.attachments[n].recordLabel',
    'lens.attachments[n].lyrics',
  ],
  [raw.PublicationSchemaId.EVENT_LATEST]: [
    'lens.content',
    'lens.location',
    'lens.address.country',
    'lens.address.formatted',
    'lens.address.locality',
    'lens.address.postalCode',
    'lens.address.region',
    'lens.address.streetAddress',
    'lens.position',
    'lens.startsAt',
    'lens.endsAt',
    'lens.links[n]',
    'lens.attachments[n].item',
    'lens.attachments[n].altTag',
    'lens.attachments[n].cover',
    'lens.attachments[n].credits',
    'lens.attachments[n].artist',
    'lens.attachments[n].genre',
    'lens.attachments[n].recordLabel',
    'lens.attachments[n].lyrics',
  ],
  [raw.PublicationSchemaId.IMAGE_LATEST]: [
    'lens.content',
    'lens.image.item',
    'lens.image.altTag',
    'lens.attachments[n].item',
    'lens.attachments[n].altTag',
    'lens.attachments[n].cover',
    'lens.attachments[n].credits',
    'lens.attachments[n].artist',
    'lens.attachments[n].genre',
    'lens.attachments[n].recordLabel',
    'lens.attachments[n].lyrics',
  ],

  [raw.PublicationSchemaId.LINK_LATEST]: [
    'lens.content',
    'lens.sharingLink',
    'lens.attachments[n].item',
    'lens.attachments[n].altTag',
    'lens.attachments[n].cover',
    'lens.attachments[n].credits',
    'lens.attachments[n].artist',
    'lens.attachments[n].genre',
    'lens.attachments[n].recordLabel',
    'lens.attachments[n].lyrics',
  ],

  [raw.PublicationSchemaId.LIVESTREAM_LATEST]: [
    'lens.content',
    'lens.startsAt',
    'lens.endsAt',
    'lens.playbackUrl',
    'lens.liveUrl',
    'lens.checkLiveAPI',
    'lens.attachments[n].item',
    'lens.attachments[n].altTag',
    'lens.attachments[n].cover',
    'lens.attachments[n].credits',
    'lens.attachments[n].artist',
    'lens.attachments[n].genre',
    'lens.attachments[n].recordLabel',
    'lens.attachments[n].lyrics',
  ],

  [raw.PublicationSchemaId.MINT_LATEST]: [
    'lens.content',
    'lens.mintLink',
    'lens.attachments[n].item',
    'lens.attachments[n].altTag',
    'lens.attachments[n].cover',
    'lens.attachments[n].credits',
    'lens.attachments[n].artist',
    'lens.attachments[n].genre',
    'lens.attachments[n].recordLabel',
    'lens.attachments[n].lyrics',
  ],

  [raw.PublicationSchemaId.SPACE_LATEST]: [
    'lens.content',
    'lens.link',
    'lens.startsAt',
    'lens.attachments[n].item',
    'lens.attachments[n].altTag',
    'lens.attachments[n].cover',
    'lens.attachments[n].credits',
    'lens.attachments[n].artist',
    'lens.attachments[n].genre',
    'lens.attachments[n].recordLabel',
    'lens.attachments[n].lyrics',
  ],

  [raw.PublicationSchemaId.STORY_LATEST]: [
    'lens.content',
    'lens.asset.item',
    'lens.asset.altTag',
    'lens.asset.cover',
    'lens.asset.credits',
    'lens.asset.artist',
    'lens.asset.genre',
    'lens.asset.recordLabel',
    'lens.asset.lyrics',
  ],

  [raw.PublicationSchemaId.TEXT_ONLY_LATEST]: ['lens.content'],

  [raw.PublicationSchemaId.THREE_D_LATEST]: [
    'lens.content',
    'lens.assets[n].uri',
    'lens.assets[n].playerUrl',
    'lens.attachments[n].item',
    'lens.attachments[n].altTag',
    'lens.attachments[n].cover',
    'lens.attachments[n].credits',
    'lens.attachments[n].artist',
    'lens.attachments[n].genre',
    'lens.attachments[n].recordLabel',
    'lens.attachments[n].lyrics',
  ],

  [raw.PublicationSchemaId.TRANSACTION_LATEST]: [
    'lens.content',
    'lens.txHash',
    'lens.attachments[n].item',
    'lens.attachments[n].altTag',
    'lens.attachments[n].cover',
    'lens.attachments[n].credits',
    'lens.attachments[n].artist',
    'lens.attachments[n].genre',
    'lens.attachments[n].recordLabel',
    'lens.attachments[n].lyrics',
  ],

  [raw.PublicationSchemaId.VIDEO_LATEST]: [
    'lens.content',
    'lens.video.item',
    'lens.video.altTag',
    'lens.video.cover',
    'lens.attachments[n].item',
    'lens.attachments[n].altTag',
    'lens.attachments[n].cover',
    'lens.attachments[n].credits',
    'lens.attachments[n].artist',
    'lens.attachments[n].genre',
    'lens.attachments[n].recordLabel',
    'lens.attachments[n].lyrics',
  ],
};

type EncryptablePath = PathsOf<DistributiveOmit<raw.PublicationMetadata, 'encryptedWith'>>;

export function resolvePathsToEncrypt({ $schema }: raw.PublicationMetadata): EncryptablePath[] {
  if ($schema in ToEncryptPaths) {
    return ToEncryptPaths[$schema];
  }
  // Fail-safe: do not encrypt if schema is not supported, this could happen if a
  // new schema is defined and the dev adopts it without updating the SDK first.
  return [];
}

type DecryptablePath = PathsOf<DistributiveOmit<gql.PublicationMetadata, 'encryptedWith'>>;

const DecryptablePathsMapping: { [key in EncryptablePath]?: DecryptablePath | DecryptablePath[] } =
  {
    'lens.address.country': 'address.country',
    'lens.address.formatted': 'address.formatted',
    'lens.address.locality': 'address.locality',
    'lens.address.postalCode': 'address.postalCode',
    'lens.address.region': 'address.region',
    'lens.address.streetAddress': 'address.streetAddress',
    'lens.asset.altTag': 'asset.altTag',
    'lens.asset.artist': 'asset.artist',
    'lens.asset.cover': 'asset.cover.raw.uri',
    'lens.asset.credits': 'asset.credits',
    'lens.asset.genre': 'asset.genre',
    'lens.asset.item': ['asset.audio.raw.uri', 'asset.image.raw.uri', 'asset.video.raw.uri'],
    'lens.asset.lyrics': 'asset.lyrics',
    'lens.asset.recordLabel': 'asset.recordLabel',
    'lens.assets[n].playerUrl': 'assets[n].playerURL',
    'lens.assets[n].uri': 'assets[n].uri',
    'lens.attachments[n].altTag': 'attachments[n].altTag',
    'lens.attachments[n].artist': 'attachments[n].artist',
    'lens.attachments[n].cover': 'attachments[n].cover.raw.uri',
    'lens.attachments[n].credits': 'attachments[n].credits',
    'lens.attachments[n].genre': 'attachments[n].genre',
    'lens.attachments[n].item': [
      'attachments[n].audio.raw.uri',
      'attachments[n].image.raw.uri',
      'attachments[n].video.raw.uri',
    ],
    'lens.attachments[n].lyrics': 'attachments[n].lyrics',
    'lens.attachments[n].recordLabel': 'attachments[n].recordLabel',
    'lens.audio.artist': 'asset.artist',
    'lens.audio.cover': 'asset.cover.raw.uri',
    'lens.audio.credits': 'asset.credits',
    'lens.audio.genre': 'asset.genre',
    'lens.audio.item': 'asset.audio.raw.uri',
    'lens.audio.lyrics': 'asset.lyrics',
    'lens.audio.recordLabel': 'asset.recordLabel',
    'lens.checkLiveAPI': 'checkLiveAPI',
    'lens.content': 'content',
    'lens.embed': 'embed',
    'lens.endsAt': 'endsAt',
    'lens.position': 'geographic.rawURI',
    'lens.image.altTag': 'asset.altTag',
    'lens.image.item': 'asset.image.raw.uri',
    'lens.link': 'link',
    'lens.links[n]': 'links[n]',
    'lens.liveUrl': 'liveURL',
    'lens.location': 'location',
    'lens.mintLink': 'mintLink',
    'lens.playbackUrl': 'playbackURL',
    'lens.sharingLink': 'sharingLink',
    'lens.startsAt': 'startsAt',
    'lens.txHash': 'txHash',
    'lens.video.altTag': 'asset.altTag',
    'lens.video.cover': 'asset.cover.raw.uri',
    'lens.video.item': 'asset.video.raw.uri',
  };

export function resolvePathsToDecrypt({
  encryptedWith,
}: gql.EncryptedFragmentOfAnyPublicationMetadata) {
  return encryptedWith.encryptedPaths
    .reduce((acc, path) => {
      if (path in DecryptablePathsMapping && DecryptablePathsMapping[path as EncryptablePath]) {
        acc.push(DecryptablePathsMapping[path as EncryptablePath] as DecryptablePath);
      }
      return acc;
    }, [] as DecryptablePath[])
    .flat();
}
