import {
  ArticleMetadataV3,
  AudioMetadataV3,
  CheckingInMetadataV3,
  Comment,
  EmbedMetadataV3,
  EventMetadataV3,
  ImageMetadataV3,
  LinkMetadataV3,
  LiveStreamMetadataV3,
  MintMetadataV3,
  Mirror,
  Post,
  PublicationMetadataMediaAudio,
  PublicationMetadataMediaImage,
  PublicationMetadataMediaVideo,
  Quote,
  SpaceMetadataV3,
  StoryMetadataV3,
  TextOnlyMetadataV3,
  ThreeDMetadataV3,
  TransactionMetadataV3,
  VideoMetadataV3,
} from './graphql/generated';

/**
 * Convenience type for any publication type.
 */
export type AnyPublication = Comment | Mirror | Post | Quote;

/**
 * Convenience type for publication with metadata content.
 */
export type PrimaryPublication = Post | Comment | Quote;

/**
 * Convenience type for all supported open action module settings.
 */
export type OpenActionModuleSettings = NonNullable<PrimaryPublication['openActionModules']>[number];

/**
 * Convenience type for publication metadata types.
 */
export type PublicationMetadata =
  | ArticleMetadataV3
  | AudioMetadataV3
  | CheckingInMetadataV3
  | EmbedMetadataV3
  | EventMetadataV3
  | ImageMetadataV3
  | LinkMetadataV3
  | LiveStreamMetadataV3
  | MintMetadataV3
  | SpaceMetadataV3
  | StoryMetadataV3
  | TextOnlyMetadataV3
  | ThreeDMetadataV3
  | TransactionMetadataV3
  | VideoMetadataV3;

/**
 * Convenience type for publication media types.
 */
export type PublicationMetadataMedia =
  | PublicationMetadataMediaAudio
  | PublicationMetadataMediaImage
  | PublicationMetadataMediaVideo;
