import { EncryptedFragmentOf } from '@lens-protocol/gated-content';

import {
  CommentFragment,
  MirrorFragment,
  PostFragment,
  QuoteFragment,
  ArticleMetadataV3Fragment,
  AudioMetadataV3Fragment,
  CheckingInMetadataV3Fragment,
  EmbedMetadataV3Fragment,
  EventMetadataV3Fragment,
  ImageMetadataV3Fragment,
  LinkMetadataV3Fragment,
  LiveStreamMetadataV3Fragment,
  MintMetadataV3Fragment,
  SpaceMetadataV3Fragment,
  StoryMetadataV3Fragment,
  TextOnlyMetadataV3Fragment,
  ThreeDMetadataV3Fragment,
  TransactionMetadataV3Fragment,
  VideoMetadataV3Fragment,
  MetadataBooleanAttributeFragment,
  MetadataDateAttributeFragment,
  MetadataJsonAttributeFragment,
  MetadataNumberAttributeFragment,
  MetadataStringAttributeFragment,
} from './fragments.generated';

export type AnyPublicationFragment =
  | CommentFragment
  | MirrorFragment
  | PostFragment
  | QuoteFragment;

export type PrimaryPublicationFragment = PostFragment | CommentFragment | QuoteFragment;

export type AnyPublicationMetadataFragment =
  | ArticleMetadataV3Fragment
  | AudioMetadataV3Fragment
  | CheckingInMetadataV3Fragment
  | EmbedMetadataV3Fragment
  | EventMetadataV3Fragment
  | ImageMetadataV3Fragment
  | LinkMetadataV3Fragment
  | LiveStreamMetadataV3Fragment
  | MintMetadataV3Fragment
  | SpaceMetadataV3Fragment
  | StoryMetadataV3Fragment
  | TextOnlyMetadataV3Fragment
  | ThreeDMetadataV3Fragment
  | TransactionMetadataV3Fragment
  | VideoMetadataV3Fragment;

/**
 * Any metadata attribute
 */
export type AnyMetadataAttributeFragment =
  | MetadataBooleanAttributeFragment
  | MetadataDateAttributeFragment
  | MetadataJsonAttributeFragment
  | MetadataNumberAttributeFragment
  | MetadataStringAttributeFragment;

/**
 * Any encrypted publication metadata regardless of its type, or capabilities
 */
export type AnyEncryptablePublicationMetadataFragment =
  EncryptedFragmentOf<AnyPublicationMetadataFragment>;
