// @ts-nocheck
import * as Types from './types.generated';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { print } from 'graphql';
import gql from 'graphql-tag';
export type FeeFollowModuleSettingsFragment = {
  __typename: 'FeeFollowModuleSettings';
  contractAddress: string;
  recipient: string;
  amount: ModuleFeeAmountFragment;
};

export type ProfileFollowModuleSettingsFragment = {
  __typename: 'ProfileFollowModuleSettings';
  contractAddress: string;
};

export type RevertFollowModuleSettingsFragment = {
  __typename: 'RevertFollowModuleSettings';
  contractAddress: string;
};

export type UnknownFollowModuleSettingsFragment = {
  __typename: 'UnknownFollowModuleSettings';
  contractAddress: string;
};

export type AttributeFragment = {
  __typename: 'Attribute';
  displayType: string | null;
  key: string;
  value: string;
};

export type ProfileFragment = {
  __typename: 'Profile';
  id: string;
  name: string | null;
  bio: string | null;
  handle: string;
  ownedBy: string;
  interests: Array<string> | null;
  isDefault: boolean;
  isFollowedByMe: boolean;
  isFollowing: boolean;
  picture:
    | MediaSetFragment
    | {
        __typename: 'NftImage';
        contractAddress: string;
        tokenId: string;
        uri: string;
        verified: boolean;
      }
    | null;
  coverPicture:
    | MediaSetFragment
    | {
        __typename: 'NftImage';
        contractAddress: string;
        tokenId: string;
        uri: string;
        verified: boolean;
      }
    | null;
  stats: {
    __typename: 'ProfileStats';
    totalFollowers: number;
    totalFollowing: number;
    totalPosts: number;
  };
  followModule:
    | FeeFollowModuleSettingsFragment
    | ProfileFollowModuleSettingsFragment
    | RevertFollowModuleSettingsFragment
    | UnknownFollowModuleSettingsFragment
    | null;
  attributes: Array<AttributeFragment> | null;
  dispatcher: { address: string; canUseRelay: boolean } | null;
};

export type Eip712TypedDataDomainFragment = {
  name: string;
  chainId: number;
  version: string;
  verifyingContract: string;
};

export type Erc20Fragment = {
  __typename: 'Erc20';
  name: string;
  symbol: string;
  decimals: number;
  address: string;
};

export type Erc20AmountFragment = {
  __typename: 'Erc20Amount';
  value: string;
  asset: Erc20Fragment;
};

export type ModuleFeeAmountFragment = {
  __typename: 'ModuleFeeAmount';
  value: string;
  asset: Erc20Fragment;
};

export type FreeCollectModuleSettingsFragment = {
  __typename: 'FreeCollectModuleSettings';
  contractAddress: string;
  followerOnly: boolean;
};

export type FeeCollectModuleSettingsFragment = {
  __typename: 'FeeCollectModuleSettings';
  contractAddress: string;
  followerOnly: boolean;
  recipient: string;
  referralFee: number;
  amount: ModuleFeeAmountFragment;
};

export type LimitedFeeCollectModuleSettingsFragment = {
  __typename: 'LimitedFeeCollectModuleSettings';
  collectLimit: string;
  contractAddress: string;
  followerOnly: boolean;
  recipient: string;
  referralFee: number;
  amount: ModuleFeeAmountFragment;
};

export type LimitedTimedFeeCollectModuleSettingsFragment = {
  __typename: 'LimitedTimedFeeCollectModuleSettings';
  collectLimit: string;
  contractAddress: string;
  followerOnly: boolean;
  endTimestamp: string;
  recipient: string;
  referralFee: number;
  amount: ModuleFeeAmountFragment;
};

export type RevertCollectModuleSettingsFragment = {
  __typename: 'RevertCollectModuleSettings';
  contractAddress: string;
};

export type TimedFeeCollectModuleSettingsFragment = {
  __typename: 'TimedFeeCollectModuleSettings';
  contractAddress: string;
  followerOnly: boolean;
  endTimestamp: string;
  recipient: string;
  referralFee: number;
  amount: ModuleFeeAmountFragment;
};

export type MultirecipientFeeCollectModuleSettingsFragment = {
  __typename: 'MultirecipientFeeCollectModuleSettings';
  contractAddress: string;
  followerOnly: boolean;
  referralFee: number;
  collectLimitOptional: string | null;
  endTimestampOptional: string | null;
  amount: ModuleFeeAmountFragment;
  recipients: Array<{ recipient: string; split: number }>;
};

export type Erc4626FeeCollectModuleSettingsFragment = {
  __typename: 'ERC4626FeeCollectModuleSettings';
  contractAddress: string;
  followerOnly: boolean;
  recipient: string;
  referralFee: number;
  vault: string;
  collectLimitOptional: string | null;
  endTimestampOptional: string | null;
  amount: ModuleFeeAmountFragment;
};

export type AaveFeeCollectModuleSettingsFragment = {
  __typename: 'AaveFeeCollectModuleSettings';
  contractAddress: string;
  followerOnly: boolean;
  recipient: string;
  referralFee: number;
  collectLimitOptional: string | null;
  endTimestampOptional: string | null;
  amount: ModuleFeeAmountFragment;
};

export type SimpleCollectModuleSettingsFragment = {
  __typename: 'SimpleCollectModuleSettings';
  contractAddress: string;
  followerOnly: boolean;
  collectLimitOptional: string | null;
  endTimestampOptional: string | null;
  feeOptional: { referralFee: number; recipient: string; amount: ModuleFeeAmountFragment } | null;
};

export type WalletFragment = {
  __typename: 'Wallet';
  address: string;
  defaultProfile: ProfileFragment | null;
};

export type MediaFragment = {
  __typename: 'Media';
  altTag: string | null;
  cover: string | null;
  mimeType: string | null;
  url: string;
};

export type MediaSetFragment = { __typename: 'MediaSet'; original: MediaFragment };

export type MetadataFragment = {
  __typename: 'MetadataOutput';
  animatedUrl: string | null;
  content: string | null;
  contentWarning: Types.PublicationContentWarning | null;
  description: string | null;
  image: string | null;
  locale: string | null;
  mainContentFocus: Types.PublicationMainFocus;
  name: string | null;
  tags: Array<string>;
  media: Array<MediaSetFragment>;
  attributes: Array<MetadataAttributeOutputFragment>;
};

export type MetadataAttributeOutputFragment = {
  __typename: 'MetadataAttributeOutput';
  traitType: string | null;
  value: string | null;
};

export type SimplePublicationStatsFragment = {
  __typename: 'PublicationStats';
  totalAmountOfMirrors: number;
  totalAmountOfCollects: number;
  totalAmountOfComments: number;
  totalUpvotes: number;
  totalDownvotes: number;
};

export type MirrorBaseFragment = {
  __typename: 'Mirror';
  id: string;
  createdAt: string;
  isDataAvailability: boolean;
  dataAvailabilityProofs: string | null;
  hidden: boolean;
  profile: ProfileFragment;
};

export type MirrorFragment = {
  __typename: 'Mirror';
  mirrorOf: CommentFragment | PostFragment;
} & MirrorBaseFragment;

export type CommentBaseFragment = {
  __typename: 'Comment';
  id: string;
  collectNftAddress: string | null;
  createdAt: string;
  hidden: boolean;
  isGated: boolean;
  isDataAvailability: boolean;
  dataAvailabilityProofs: string | null;
  reaction: Types.ReactionTypes | null;
  hasCollectedByMe: boolean;
  mirrors: Array<string>;
  stats: SimplePublicationStatsFragment;
  metadata: MetadataFragment;
  profile: ProfileFragment;
  collectedBy: WalletFragment | null;
  collectModule:
    | ({ __typename: 'AaveFeeCollectModuleSettings' } & AaveFeeCollectModuleSettingsFragment)
    | ({ __typename: 'ERC4626FeeCollectModuleSettings' } & Erc4626FeeCollectModuleSettingsFragment)
    | ({ __typename: 'FeeCollectModuleSettings' } & FeeCollectModuleSettingsFragment)
    | ({ __typename: 'FreeCollectModuleSettings' } & FreeCollectModuleSettingsFragment)
    | ({ __typename: 'LimitedFeeCollectModuleSettings' } & LimitedFeeCollectModuleSettingsFragment)
    | ({
        __typename: 'LimitedTimedFeeCollectModuleSettings';
      } & LimitedTimedFeeCollectModuleSettingsFragment)
    | ({
        __typename: 'MultirecipientFeeCollectModuleSettings';
      } & MultirecipientFeeCollectModuleSettingsFragment)
    | ({ __typename: 'RevertCollectModuleSettings' } & RevertCollectModuleSettingsFragment)
    | ({ __typename: 'SimpleCollectModuleSettings' } & SimpleCollectModuleSettingsFragment)
    | ({ __typename: 'TimedFeeCollectModuleSettings' } & TimedFeeCollectModuleSettingsFragment)
    | { __typename: 'UnknownCollectModuleSettings' };
  referenceModule:
    | { __typename: 'DegreesOfSeparationReferenceModuleSettings' }
    | { __typename: 'FollowOnlyReferenceModuleSettings'; contractAddress: string }
    | { __typename: 'UnknownReferenceModuleSettings' }
    | null;
  canComment: { result: boolean };
  canMirror: { result: boolean };
};

export type CommentFragment = {
  __typename: 'Comment';
  commentOn: CommentBaseFragment | MirrorBaseFragment | PostFragment | null;
  mainPost: MirrorBaseFragment | PostFragment;
} & CommentBaseFragment;

export type PostFragment = {
  __typename: 'Post';
  id: string;
  collectNftAddress: string | null;
  createdAt: string;
  hidden: boolean;
  isGated: boolean;
  isDataAvailability: boolean;
  dataAvailabilityProofs: string | null;
  reaction: Types.ReactionTypes | null;
  hasCollectedByMe: boolean;
  mirrors: Array<string>;
  stats: SimplePublicationStatsFragment;
  metadata: MetadataFragment;
  profile: ProfileFragment;
  collectedBy: WalletFragment | null;
  collectModule:
    | ({ __typename: 'AaveFeeCollectModuleSettings' } & AaveFeeCollectModuleSettingsFragment)
    | ({ __typename: 'ERC4626FeeCollectModuleSettings' } & Erc4626FeeCollectModuleSettingsFragment)
    | ({ __typename: 'FeeCollectModuleSettings' } & FeeCollectModuleSettingsFragment)
    | ({ __typename: 'FreeCollectModuleSettings' } & FreeCollectModuleSettingsFragment)
    | ({ __typename: 'LimitedFeeCollectModuleSettings' } & LimitedFeeCollectModuleSettingsFragment)
    | ({
        __typename: 'LimitedTimedFeeCollectModuleSettings';
      } & LimitedTimedFeeCollectModuleSettingsFragment)
    | ({
        __typename: 'MultirecipientFeeCollectModuleSettings';
      } & MultirecipientFeeCollectModuleSettingsFragment)
    | ({ __typename: 'RevertCollectModuleSettings' } & RevertCollectModuleSettingsFragment)
    | ({ __typename: 'SimpleCollectModuleSettings' } & SimpleCollectModuleSettingsFragment)
    | ({ __typename: 'TimedFeeCollectModuleSettings' } & TimedFeeCollectModuleSettingsFragment)
    | { __typename: 'UnknownCollectModuleSettings' };
  referenceModule:
    | { __typename: 'DegreesOfSeparationReferenceModuleSettings' }
    | { __typename: 'FollowOnlyReferenceModuleSettings'; contractAddress: string }
    | { __typename: 'UnknownReferenceModuleSettings' }
    | null;
  canComment: { result: boolean };
  canMirror: { result: boolean };
};

export type CommonPaginatedResultInfoFragment = {
  __typename: 'PaginatedResultInfo';
  prev: string | null;
  next: string | null;
  totalCount: number | null;
};

export type FollowingFragment = { __typename: 'Following'; profile: ProfileFragment };

export type FollowerFragment = { __typename: 'Follower'; wallet: WalletFragment };

export type RelayerResultFragment = { __typename: 'RelayerResult'; txHash: string; txId: string };

export type RelayErrorFragment = { __typename: 'RelayError'; reason: Types.RelayErrorReasons };

export type CreateDataAvailabilityPublicationResultFragment = {
  __typename: 'CreateDataAvailabilityPublicationResult';
  id: string;
  proofs: string;
  dataAvailabilityId: string;
};

export const Eip712TypedDataDomainFragmentDoc = gql`
  fragment EIP712TypedDataDomain on EIP712TypedDataDomain {
    name
    chainId
    version
    verifyingContract
  }
`;
export const Erc20FragmentDoc = gql`
  fragment Erc20 on Erc20 {
    __typename
    name
    symbol
    decimals
    address
  }
`;
export const Erc20AmountFragmentDoc = gql`
  fragment Erc20Amount on Erc20Amount {
    __typename
    asset {
      ...Erc20
    }
    value
  }
  ${Erc20FragmentDoc}
`;
export const MediaFragmentDoc = gql`
  fragment Media on Media {
    __typename
    altTag
    cover
    mimeType
    url
  }
`;
export const MediaSetFragmentDoc = gql`
  fragment MediaSet on MediaSet {
    __typename
    original {
      ...Media
    }
  }
  ${MediaFragmentDoc}
`;
export const ModuleFeeAmountFragmentDoc = gql`
  fragment ModuleFeeAmount on ModuleFeeAmount {
    __typename
    asset {
      ...Erc20
    }
    value
  }
  ${Erc20FragmentDoc}
`;
export const FeeFollowModuleSettingsFragmentDoc = gql`
  fragment FeeFollowModuleSettings on FeeFollowModuleSettings {
    __typename
    amount {
      ...ModuleFeeAmount
    }
    contractAddress
    recipient
  }
  ${ModuleFeeAmountFragmentDoc}
`;
export const ProfileFollowModuleSettingsFragmentDoc = gql`
  fragment ProfileFollowModuleSettings on ProfileFollowModuleSettings {
    __typename
    contractAddress
  }
`;
export const RevertFollowModuleSettingsFragmentDoc = gql`
  fragment RevertFollowModuleSettings on RevertFollowModuleSettings {
    __typename
    contractAddress
  }
`;
export const UnknownFollowModuleSettingsFragmentDoc = gql`
  fragment UnknownFollowModuleSettings on UnknownFollowModuleSettings {
    __typename
    contractAddress
  }
`;
export const AttributeFragmentDoc = gql`
  fragment Attribute on Attribute {
    __typename
    displayType
    key
    value
  }
`;
export const ProfileFragmentDoc = gql`
  fragment Profile on Profile {
    __typename
    id
    name
    bio
    handle
    ownedBy
    interests
    picture {
      ... on NftImage {
        __typename
        contractAddress
        tokenId
        uri
        verified
      }
      ... on MediaSet {
        ...MediaSet
      }
    }
    coverPicture {
      ... on NftImage {
        __typename
        contractAddress
        tokenId
        uri
        verified
      }
      ... on MediaSet {
        ...MediaSet
      }
    }
    stats {
      __typename
      totalFollowers
      totalFollowing
      totalPosts
    }
    followModule {
      ... on FeeFollowModuleSettings {
        ...FeeFollowModuleSettings
      }
      ... on ProfileFollowModuleSettings {
        ...ProfileFollowModuleSettings
      }
      ... on RevertFollowModuleSettings {
        ...RevertFollowModuleSettings
      }
      ... on UnknownFollowModuleSettings {
        ...UnknownFollowModuleSettings
      }
    }
    attributes {
      ...Attribute
    }
    dispatcher {
      address
      canUseRelay
    }
    isDefault
    isFollowedByMe(isFinalisedOnChain: true)
    isFollowing(who: $observerId)
  }
  ${MediaSetFragmentDoc}
  ${FeeFollowModuleSettingsFragmentDoc}
  ${ProfileFollowModuleSettingsFragmentDoc}
  ${RevertFollowModuleSettingsFragmentDoc}
  ${UnknownFollowModuleSettingsFragmentDoc}
  ${AttributeFragmentDoc}
`;
export const MirrorBaseFragmentDoc = gql`
  fragment MirrorBase on Mirror {
    __typename
    id
    createdAt
    isDataAvailability
    dataAvailabilityProofs
    profile {
      ...Profile
    }
    hidden
  }
  ${ProfileFragmentDoc}
`;
export const SimplePublicationStatsFragmentDoc = gql`
  fragment SimplePublicationStats on PublicationStats {
    __typename
    totalAmountOfMirrors
    totalAmountOfCollects
    totalAmountOfComments
    totalUpvotes
    totalDownvotes
  }
`;
export const MetadataAttributeOutputFragmentDoc = gql`
  fragment MetadataAttributeOutput on MetadataAttributeOutput {
    __typename
    traitType
    value
  }
`;
export const MetadataFragmentDoc = gql`
  fragment Metadata on MetadataOutput {
    __typename
    animatedUrl
    content
    contentWarning
    description
    image
    locale
    mainContentFocus
    name
    media {
      ...MediaSet
    }
    attributes {
      ...MetadataAttributeOutput
    }
    tags
  }
  ${MediaSetFragmentDoc}
  ${MetadataAttributeOutputFragmentDoc}
`;
export const WalletFragmentDoc = gql`
  fragment Wallet on Wallet {
    __typename
    address
    defaultProfile {
      ...Profile
    }
  }
  ${ProfileFragmentDoc}
`;
export const FreeCollectModuleSettingsFragmentDoc = gql`
  fragment FreeCollectModuleSettings on FreeCollectModuleSettings {
    __typename
    contractAddress
    followerOnly
  }
`;
export const FeeCollectModuleSettingsFragmentDoc = gql`
  fragment FeeCollectModuleSettings on FeeCollectModuleSettings {
    __typename
    amount {
      ...ModuleFeeAmount
    }
    contractAddress
    followerOnly
    recipient
    referralFee
  }
  ${ModuleFeeAmountFragmentDoc}
`;
export const LimitedFeeCollectModuleSettingsFragmentDoc = gql`
  fragment LimitedFeeCollectModuleSettings on LimitedFeeCollectModuleSettings {
    __typename
    amount {
      ...ModuleFeeAmount
    }
    collectLimit
    contractAddress
    followerOnly
    recipient
    referralFee
  }
  ${ModuleFeeAmountFragmentDoc}
`;
export const LimitedTimedFeeCollectModuleSettingsFragmentDoc = gql`
  fragment LimitedTimedFeeCollectModuleSettings on LimitedTimedFeeCollectModuleSettings {
    __typename
    amount {
      ...ModuleFeeAmount
    }
    collectLimit
    contractAddress
    followerOnly
    endTimestamp
    recipient
    referralFee
  }
  ${ModuleFeeAmountFragmentDoc}
`;
export const RevertCollectModuleSettingsFragmentDoc = gql`
  fragment RevertCollectModuleSettings on RevertCollectModuleSettings {
    __typename
    contractAddress
  }
`;
export const TimedFeeCollectModuleSettingsFragmentDoc = gql`
  fragment TimedFeeCollectModuleSettings on TimedFeeCollectModuleSettings {
    __typename
    amount {
      ...ModuleFeeAmount
    }
    contractAddress
    followerOnly
    endTimestamp
    recipient
    referralFee
  }
  ${ModuleFeeAmountFragmentDoc}
`;
export const MultirecipientFeeCollectModuleSettingsFragmentDoc = gql`
  fragment MultirecipientFeeCollectModuleSettings on MultirecipientFeeCollectModuleSettings {
    __typename
    amount {
      ...ModuleFeeAmount
    }
    collectLimitOptional: collectLimit
    contractAddress
    followerOnly
    endTimestampOptional: endTimestamp
    recipients {
      recipient
      split
    }
    referralFee
  }
  ${ModuleFeeAmountFragmentDoc}
`;
export const Erc4626FeeCollectModuleSettingsFragmentDoc = gql`
  fragment ERC4626FeeCollectModuleSettings on ERC4626FeeCollectModuleSettings {
    __typename
    amount {
      ...ModuleFeeAmount
    }
    collectLimitOptional: collectLimit
    contractAddress
    followerOnly
    endTimestampOptional: endTimestamp
    recipient
    referralFee
    vault
  }
  ${ModuleFeeAmountFragmentDoc}
`;
export const AaveFeeCollectModuleSettingsFragmentDoc = gql`
  fragment AaveFeeCollectModuleSettings on AaveFeeCollectModuleSettings {
    __typename
    amount {
      ...ModuleFeeAmount
    }
    collectLimitOptional: collectLimit
    contractAddress
    followerOnly
    endTimestampOptional: endTimestamp
    recipient
    referralFee
  }
  ${ModuleFeeAmountFragmentDoc}
`;
export const SimpleCollectModuleSettingsFragmentDoc = gql`
  fragment SimpleCollectModuleSettings on SimpleCollectModuleSettings {
    __typename
    contractAddress
    followerOnly
    feeOptional: fee {
      amount {
        ...ModuleFeeAmount
      }
      referralFee
      recipient
    }
    collectLimitOptional: collectLimit
    endTimestampOptional: endTimestamp
  }
  ${ModuleFeeAmountFragmentDoc}
`;
export const PostFragmentDoc = gql`
  fragment Post on Post {
    __typename
    id
    stats {
      ...SimplePublicationStats
    }
    metadata {
      ...Metadata
    }
    profile {
      ...Profile
    }
    collectedBy {
      ...Wallet
    }
    collectModule {
      __typename
      ... on FreeCollectModuleSettings {
        ...FreeCollectModuleSettings
      }
      ... on FeeCollectModuleSettings {
        ...FeeCollectModuleSettings
      }
      ... on LimitedFeeCollectModuleSettings {
        ...LimitedFeeCollectModuleSettings
      }
      ... on LimitedTimedFeeCollectModuleSettings {
        ...LimitedTimedFeeCollectModuleSettings
      }
      ... on RevertCollectModuleSettings {
        ...RevertCollectModuleSettings
      }
      ... on TimedFeeCollectModuleSettings {
        ...TimedFeeCollectModuleSettings
      }
      ... on MultirecipientFeeCollectModuleSettings {
        ...MultirecipientFeeCollectModuleSettings
      }
      ... on ERC4626FeeCollectModuleSettings {
        ...ERC4626FeeCollectModuleSettings
      }
      ... on AaveFeeCollectModuleSettings {
        ...AaveFeeCollectModuleSettings
      }
      ... on SimpleCollectModuleSettings {
        ...SimpleCollectModuleSettings
      }
    }
    referenceModule {
      __typename
      ... on FollowOnlyReferenceModuleSettings {
        contractAddress
      }
    }
    collectNftAddress
    createdAt
    hidden
    isGated
    isDataAvailability
    dataAvailabilityProofs
    reaction(request: { profileId: $observerId })
    hasCollectedByMe(isFinalisedOnChain: true)
    canComment(profileId: $observerId) {
      result
    }
    canMirror(profileId: $observerId) {
      result
    }
    mirrors(by: $observerId)
  }
  ${SimplePublicationStatsFragmentDoc}
  ${MetadataFragmentDoc}
  ${ProfileFragmentDoc}
  ${WalletFragmentDoc}
  ${FreeCollectModuleSettingsFragmentDoc}
  ${FeeCollectModuleSettingsFragmentDoc}
  ${LimitedFeeCollectModuleSettingsFragmentDoc}
  ${LimitedTimedFeeCollectModuleSettingsFragmentDoc}
  ${RevertCollectModuleSettingsFragmentDoc}
  ${TimedFeeCollectModuleSettingsFragmentDoc}
  ${MultirecipientFeeCollectModuleSettingsFragmentDoc}
  ${Erc4626FeeCollectModuleSettingsFragmentDoc}
  ${AaveFeeCollectModuleSettingsFragmentDoc}
  ${SimpleCollectModuleSettingsFragmentDoc}
`;
export const CommentBaseFragmentDoc = gql`
  fragment CommentBase on Comment {
    __typename
    id
    stats {
      ...SimplePublicationStats
    }
    metadata {
      ...Metadata
    }
    profile {
      ...Profile
    }
    collectedBy {
      ...Wallet
    }
    collectModule {
      __typename
      ... on FreeCollectModuleSettings {
        ...FreeCollectModuleSettings
      }
      ... on FeeCollectModuleSettings {
        ...FeeCollectModuleSettings
      }
      ... on LimitedFeeCollectModuleSettings {
        ...LimitedFeeCollectModuleSettings
      }
      ... on LimitedTimedFeeCollectModuleSettings {
        ...LimitedTimedFeeCollectModuleSettings
      }
      ... on RevertCollectModuleSettings {
        ...RevertCollectModuleSettings
      }
      ... on TimedFeeCollectModuleSettings {
        ...TimedFeeCollectModuleSettings
      }
      ... on MultirecipientFeeCollectModuleSettings {
        ...MultirecipientFeeCollectModuleSettings
      }
      ... on ERC4626FeeCollectModuleSettings {
        ...ERC4626FeeCollectModuleSettings
      }
      ... on AaveFeeCollectModuleSettings {
        ...AaveFeeCollectModuleSettings
      }
      ... on SimpleCollectModuleSettings {
        ...SimpleCollectModuleSettings
      }
    }
    referenceModule {
      __typename
      ... on FollowOnlyReferenceModuleSettings {
        contractAddress
      }
    }
    collectNftAddress
    createdAt
    hidden
    isGated
    isDataAvailability
    dataAvailabilityProofs
    reaction(request: { profileId: $observerId })
    hasCollectedByMe(isFinalisedOnChain: true)
    canComment(profileId: $observerId) {
      result
    }
    canMirror(profileId: $observerId) {
      result
    }
    mirrors(by: $observerId)
  }
  ${SimplePublicationStatsFragmentDoc}
  ${MetadataFragmentDoc}
  ${ProfileFragmentDoc}
  ${WalletFragmentDoc}
  ${FreeCollectModuleSettingsFragmentDoc}
  ${FeeCollectModuleSettingsFragmentDoc}
  ${LimitedFeeCollectModuleSettingsFragmentDoc}
  ${LimitedTimedFeeCollectModuleSettingsFragmentDoc}
  ${RevertCollectModuleSettingsFragmentDoc}
  ${TimedFeeCollectModuleSettingsFragmentDoc}
  ${MultirecipientFeeCollectModuleSettingsFragmentDoc}
  ${Erc4626FeeCollectModuleSettingsFragmentDoc}
  ${AaveFeeCollectModuleSettingsFragmentDoc}
  ${SimpleCollectModuleSettingsFragmentDoc}
`;
export const CommentFragmentDoc = gql`
  fragment Comment on Comment {
    __typename
    ...CommentBase
    commentOn {
      ... on Post {
        ...Post
      }
      ... on Mirror {
        ...MirrorBase
      }
      ... on Comment {
        ...CommentBase
      }
    }
    mainPost {
      ... on Post {
        ...Post
      }
      ... on Mirror {
        ...MirrorBase
      }
    }
  }
  ${CommentBaseFragmentDoc}
  ${PostFragmentDoc}
  ${MirrorBaseFragmentDoc}
`;
export const MirrorFragmentDoc = gql`
  fragment Mirror on Mirror {
    __typename
    ...MirrorBase
    mirrorOf {
      ... on Post {
        ...Post
      }
      ... on Comment {
        ...Comment
      }
    }
  }
  ${MirrorBaseFragmentDoc}
  ${PostFragmentDoc}
  ${CommentFragmentDoc}
`;
export const CommonPaginatedResultInfoFragmentDoc = gql`
  fragment PaginatedResultInfo on PaginatedResultInfo {
    __typename
    prev
    next
    totalCount
  }
`;
export const FollowingFragmentDoc = gql`
  fragment Following on Following {
    __typename
    profile {
      ...Profile
    }
  }
  ${ProfileFragmentDoc}
`;
export const FollowerFragmentDoc = gql`
  fragment Follower on Follower {
    __typename
    wallet {
      ...Wallet
    }
  }
  ${WalletFragmentDoc}
`;
export const RelayerResultFragmentDoc = gql`
  fragment RelayerResult on RelayerResult {
    __typename
    txHash
    txId
  }
`;
export const RelayErrorFragmentDoc = gql`
  fragment RelayError on RelayError {
    __typename
    reason
  }
`;
export const CreateDataAvailabilityPublicationResultFragmentDoc = gql`
  fragment CreateDataAvailabilityPublicationResult on CreateDataAvailabilityPublicationResult {
    __typename
    id
    proofs
    dataAvailabilityId
  }
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {};
}
export type Sdk = ReturnType<typeof getSdk>;
