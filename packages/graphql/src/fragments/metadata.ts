import type { FragmentOf } from 'gql.tada';
import { graphql } from '../graphql';
import {
  AnyMediaFragment,
  MediaAudioFragment,
  MediaImageFragment,
  MediaVideoFragment,
} from './media';

export const MetadataAttributeFragment = graphql(
  `fragment MetadataAttribute on MetadataAttribute {
    __typename
    type
    key
    value
  }`,
);
export type MetadataAttribute = FragmentOf<typeof MetadataAttributeFragment>;

export const EventLocationFragment = graphql(
  `fragment EventLocation on EventLocation {
    __typename
    physical
    virtual
  }`,
);
export type EventLocationFragment = FragmentOf<typeof EventLocationFragment>;

export const EventSchedulingAdjustmentsFragment = graphql(
  `fragment EventSchedulingAdjustments on EventSchedulingAdjustments {
    __typename
    timezoneId
    timezoneOffset
  }`,
);
export type EventSchedulingAdjustments = FragmentOf<typeof EventSchedulingAdjustmentsFragment>;

export const PhysicalAddressFragment = graphql(
  `fragment PhysicalAddress on PhysicalAddress {
    __typename
    country
    formatted
    locality
    postalCode
    region
    streetAddress
  }`,
);
export type PhysicalAddress = FragmentOf<typeof PhysicalAddressFragment>;

export const ThreeDAssetFragment = graphql(
  `fragment ThreeDAsset on ThreeDAsset {
    __typename
    format
    license
    playerUrl
    uri
    zipPath
  }`,
);
export interface ThreeDAsset extends FragmentOf<typeof ThreeDAssetFragment> {}

export const ArticleMetadataFragment = graphql(
  `fragment ArticleMetadata on ArticleMetadata {
    __typename
    attachments {
      ...AnyMedia
    }
    content
    contentWarning
    id
    locale
    mainContentFocus
    tags
    title
    attributes {
      ...MetadataAttribute
    }
  }`,
  [AnyMediaFragment, MetadataAttributeFragment],
);
export interface ArticleMetadata extends FragmentOf<typeof ArticleMetadataFragment> {}

export const AudioMetadataFragment = graphql(
  `fragment AudioMetadata on AudioMetadata {
    __typename
    attachments {
      ...AnyMedia
    }
    attributes {
      ...MetadataAttribute
    }
    audio {
      ...MediaAudio
    }
    contentWarning
    id
    locale
    mainContentFocus
    tags
    title
    content
  }`,
  [AnyMediaFragment, MetadataAttributeFragment, MediaAudioFragment],
);
export interface AudioMetadata extends FragmentOf<typeof AudioMetadataFragment> {}

export const TextOnlyMetadataFragment = graphql(
  `fragment TextOnlyMetadata on TextOnlyMetadata {
    __typename
    attributes {
      ...MetadataAttribute
    }
    content
    contentWarning
    id
    locale
    mainContentFocus
    tags
  }`,
  [MetadataAttributeFragment],
);
export interface TextOnlyMetadata extends FragmentOf<typeof TextOnlyMetadataFragment> {}

export const CheckingInMetadataFragment = graphql(
  `fragment CheckingInMetadata on CheckingInMetadata {
    __typename
    address {
      ...PhysicalAddress
    }
    attachments {
      ...AnyMedia
    }
    attributes {
      ...MetadataAttribute
    }
    contentWarning
    id
    locale
    location
    mainContentFocus
    position
    tags
    content
  }`,
  [AnyMediaFragment, MetadataAttributeFragment, PhysicalAddressFragment],
);
export interface CheckingInMetadata extends FragmentOf<typeof CheckingInMetadataFragment> {}

export const ImageMetadataFragment = graphql(
  `fragment ImageMetadata on ImageMetadata {
    __typename
    attachments {
      ...AnyMedia
    }
    attributes {
      ...MetadataAttribute
    }
    contentWarning
    id
    image {
      ...MediaImage
    }
    locale
    mainContentFocus
    tags
    title
    content
  }`,
  [AnyMediaFragment, MediaImageFragment, MetadataAttributeFragment],
);
export interface ImageMetadata extends FragmentOf<typeof ImageMetadataFragment> {}

export const VideoMetadataFragment = graphql(
  `fragment VideoMetadata on VideoMetadata {
    __typename
    attachments {
      ...AnyMedia
    }
    attributes {
      ...MetadataAttribute
    }
    contentWarning
    id
    locale
    mainContentFocus
    tags
    title
    video {
      ...MediaVideo
    }
    content
  }`,
  [AnyMediaFragment, MediaVideoFragment, MetadataAttributeFragment],
);
export interface VideoMetadata extends FragmentOf<typeof VideoMetadataFragment> {}

export const EmbedMetadataFragment = graphql(
  `fragment EmbedMetadata on EmbedMetadata {
    __typename
    contentWarning
    embed
    id
    locale
    mainContentFocus
    tags
    content
    attachments {
      ...AnyMedia
    }
    attributes {
      ...MetadataAttribute
    }
  }`,
  [AnyMediaFragment, MetadataAttributeFragment],
);
export interface EmbedMetadata extends FragmentOf<typeof EmbedMetadataFragment> {}

export const EventMetadataFragment = graphql(
  `fragment EventMetadata on EventMetadata {
    __typename
    contentWarning
    endsAt
    id
    links
    locale
    location {
      ...EventLocation
    }
    mainContentFocus
    position
    schedulingAdjustments {
      ...EventSchedulingAdjustments
    }
    startsAt
    tags
    title
    content
    address {
      ...PhysicalAddress
    }
    attachments {
      ...AnyMedia
    }
    attributes {
      ...MetadataAttribute
    }
  }`,
  [
    AnyMediaFragment,
    MetadataAttributeFragment,
    PhysicalAddressFragment,
    EventLocationFragment,
    EventSchedulingAdjustmentsFragment,
  ],
);
export interface EventMetadata extends FragmentOf<typeof EventMetadataFragment> {}

export const LinkMetadataFragment = graphql(
  `fragment LinkMetadata on LinkMetadata {
    __typename
    contentWarning
    id
    locale
    mainContentFocus
    sharingLink
    tags
    content
    attachments {
      ...AnyMedia
    }
    attributes {
      ...MetadataAttribute
    }
  }`,
  [AnyMediaFragment, MetadataAttributeFragment],
);
export interface LinkMetadata extends FragmentOf<typeof LinkMetadataFragment> {}

export const LivestreamMetadataFragment = graphql(
  `fragment LivestreamMetadata on LivestreamMetadata {
    __typename
    checkLiveApi
    contentWarning
    endsAt
    id
    liveUrl
    locale
    mainContentFocus
    playbackUrl
    startsAt
    tags
    title
    content
    attachments {
      ...AnyMedia
    }
    attributes {
      ...MetadataAttribute
    }
  }`,
  [AnyMediaFragment, MetadataAttributeFragment],
);
export interface LivestreamMetadata extends FragmentOf<typeof LivestreamMetadataFragment> {}

export const MintMetadataFragment = graphql(
  `fragment MintMetadata on MintMetadata {
    __typename
    contentWarning
    id
    locale
    mainContentFocus
    mintLink
    tags
    content
    attachments {
      ...AnyMedia
    }
    attributes {
      ...MetadataAttribute
    }
  }`,
  [MetadataAttributeFragment, AnyMediaFragment],
);
export interface MintMetadata extends FragmentOf<typeof MintMetadataFragment> {}

export const SpaceMetadataFragment = graphql(
  `fragment SpaceMetadata on SpaceMetadata {
    __typename
    contentWarning
    id
    link
    locale
    mainContentFocus
    startsAt
    tags
    title
    content
    attachments {
      ...AnyMedia
    }
    attributes {
      ...MetadataAttribute
    }
  }`,
  [AnyMediaFragment, MetadataAttributeFragment],
);
export interface SpaceMetadata extends FragmentOf<typeof SpaceMetadataFragment> {}

export const StoryMetadataFragment = graphql(
  `fragment StoryMetadata on StoryMetadata {
    __typename
    asset {
      ...AnyMedia
    }
    contentWarning
    id
    locale
    mainContentFocus
    tags
    content
    attributes {
      ...MetadataAttribute
    }
  }`,
  [AnyMediaFragment, MetadataAttributeFragment],
);
export interface StoryMetadata extends FragmentOf<typeof StoryMetadataFragment> {}

export const ThreeDMetadataFragment = graphql(
  `fragment ThreeDMetadata on ThreeDMetadata {
    __typename
    assets {
      ...ThreeDAsset
    }
    contentWarning
    id
    locale
    mainContentFocus
    tags
    content
    attributes {
      ...MetadataAttribute
    }
    attachments {
      ...AnyMedia
    }
  }`,
  [AnyMediaFragment, MetadataAttributeFragment, ThreeDAssetFragment],
);
export interface ThreeDMetadata extends FragmentOf<typeof ThreeDMetadataFragment> {}

export const TransactionMetadataFragment = graphql(
  `fragment TransactionMetadata on TransactionMetadata {
    __typename
    chainId
    contentWarning
    id
    locale
    mainContentFocus
    tags
    txHash
    type
    content
    attachments {
      ...AnyMedia
    }
    attributes {
      ...MetadataAttribute
    }
  }`,
  [MetadataAttributeFragment, AnyMediaFragment],
);
export interface TransactionMetadata extends FragmentOf<typeof TransactionMetadataFragment> {}

export const UnknownPostMetadataFragment = graphql(
  `fragment UnknownPostMetadata on UnknownPostMetadata {
    __typename
    raw
  }`,
);
export interface UnknownPostMetadata extends FragmentOf<typeof UnknownPostMetadataFragment> {}
