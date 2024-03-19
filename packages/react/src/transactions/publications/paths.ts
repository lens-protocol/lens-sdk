import { PublicationMetadata, PublicationSchemaId } from '@lens-protocol/metadata';
import { UnknownObject, Primitive } from '@lens-protocol/shared-kernel';

type UnionOf<A> = A extends Array<unknown> ? A[number] : A[keyof A];

// Adapted from ts-toolbelt: https://github.com/millsp/ts-toolbelt/blob/master/sources/Object/Paths.ts#L21
export type PathsOf<Target, Root extends string = ''> = UnionOf<{
  [Key in keyof Target]-?: Key extends string
    ? `${Root}${Target[Key] extends Primitive | undefined | null
        ? Key
        : Target[Key] extends ReadonlyArray<infer ItemType> | null | undefined
        ? ItemType extends Primitive // acts also to distribute over union ItemType
          ? `${Key}[n]`
          : PathsOf<ItemType, `${Key}[n].`>
        : PathsOf<Target[Key], `${Key}.`>}`
    : never;
}>;

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

const LinkedResourcesPaths: MapOfPaths<PublicationMetadata, '$schema'> = {
  [PublicationSchemaId.ARTICLE_LATEST]: ['lens.attachments[n].item', 'lens.attachments[n].cover'],
  [PublicationSchemaId.AUDIO_LATEST]: [
    'lens.audio.item',
    'lens.audio.cover',
    'lens.attachments[n].item',
    'lens.attachments[n].cover',
  ],
  [PublicationSchemaId.CHECKING_IN_LATEST]: [
    'lens.attachments[n].item',
    'lens.attachments[n].cover',
  ],
  [PublicationSchemaId.EMBED_LATEST]: ['lens.attachments[n].item', 'lens.attachments[n].cover'],
  [PublicationSchemaId.EVENT_LATEST]: ['lens.attachments[n].item', 'lens.attachments[n].cover'],
  [PublicationSchemaId.IMAGE_LATEST]: [
    'lens.image.item',
    'lens.attachments[n].item',
    'lens.attachments[n].cover',
  ],

  [PublicationSchemaId.LINK_LATEST]: ['lens.attachments[n].item', 'lens.attachments[n].cover'],

  [PublicationSchemaId.LIVESTREAM_LATEST]: [
    'lens.attachments[n].item',
    'lens.attachments[n].cover',
  ],

  [PublicationSchemaId.MINT_LATEST]: ['lens.attachments[n].item', 'lens.attachments[n].cover'],

  [PublicationSchemaId.SPACE_LATEST]: ['lens.attachments[n].item', 'lens.attachments[n].cover'],

  [PublicationSchemaId.STORY_LATEST]: ['lens.asset.item', 'lens.asset.cover'],

  [PublicationSchemaId.TEXT_ONLY_LATEST]: [],

  [PublicationSchemaId.THREE_D_LATEST]: [
    'lens.assets[n].uri',
    'lens.attachments[n].item',
    'lens.attachments[n].cover',
  ],

  [PublicationSchemaId.TRANSACTION_LATEST]: [
    'lens.attachments[n].item',
    'lens.attachments[n].cover',
  ],

  [PublicationSchemaId.VIDEO_LATEST]: [
    'lens.video.item',
    'lens.video.cover',
    'lens.attachments[n].item',
    'lens.attachments[n].cover',
  ],
};

type URLPath = PathsOf<PublicationMetadata>;

export function resolveResourcePaths({ $schema }: PublicationMetadata): URLPath[] {
  if ($schema in LinkedResourcesPaths) {
    return LinkedResourcesPaths[$schema];
  }
  // Fail-safe: do not encrypt if schema is not supported, this could happen if a
  // new schema is defined and the dev adopts it without updating the SDK first.
  return [];
}
