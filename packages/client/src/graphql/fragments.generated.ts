import * as Types from './types.generated.js';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { print } from 'graphql';
import gql from 'graphql-tag';
export type FeeFollowModuleSettingsFragment = { __typename: 'FeeFollowModuleSettings' } & Pick<
  Types.FeeFollowModuleSettings,
  'contractAddress' | 'recipient'
> & { amount: ModuleFeeAmountFragment };

export type ProfileFollowModuleSettingsFragment = {
  __typename: 'ProfileFollowModuleSettings';
} & Pick<Types.ProfileFollowModuleSettings, 'contractAddress'>;

export type RevertFollowModuleSettingsFragment = {
  __typename: 'RevertFollowModuleSettings';
} & Pick<Types.RevertFollowModuleSettings, 'contractAddress'>;

export type UnknownFollowModuleSettingsFragment = {
  __typename: 'UnknownFollowModuleSettings';
} & Pick<Types.UnknownFollowModuleSettings, 'contractAddress'>;

export type ProfileMedia_NftImage_Fragment = { __typename: 'NftImage' } & Pick<
  Types.NftImage,
  'contractAddress' | 'tokenId' | 'uri' | 'verified'
>;

export type ProfileMedia_MediaSet_Fragment = MediaSetFragment;

export type ProfileMediaFragment = ProfileMedia_NftImage_Fragment | ProfileMedia_MediaSet_Fragment;

export type AttributeFragment = { __typename: 'Attribute' } & Pick<
  Types.Attribute,
  'displayType' | 'key' | 'value'
>;

export type ProfileFragment = { __typename: 'Profile' } & Pick<
  Types.Profile,
  'id' | 'name' | 'bio' | 'handle' | 'ownedBy' | 'isFollowedByMe' | 'isFollowing'
> & {
    picture: Types.Maybe<ProfileMedia_NftImage_Fragment | ProfileMedia_MediaSet_Fragment>;
    coverPicture: Types.Maybe<ProfileMedia_NftImage_Fragment | ProfileMedia_MediaSet_Fragment>;
    stats: { __typename: 'ProfileStats' } & Pick<
      Types.ProfileStats,
      'totalFollowers' | 'totalFollowing' | 'totalPosts'
    >;
    followModule: Types.Maybe<
      | FeeFollowModuleSettingsFragment
      | ProfileFollowModuleSettingsFragment
      | RevertFollowModuleSettingsFragment
      | UnknownFollowModuleSettingsFragment
    >;
    attributes: Types.Maybe<Array<AttributeFragment>>;
    dispatcher: Types.Maybe<Pick<Types.Dispatcher, 'address' | 'canUseRelay'>>;
  };

export type Eip712TypedDataDomainFragment = { __typename: 'EIP712TypedDataDomain' } & Pick<
  Types.Eip712TypedDataDomain,
  'name' | 'chainId' | 'version' | 'verifyingContract'
>;

export type Erc20Fragment = { __typename: 'Erc20' } & Pick<
  Types.Erc20,
  'name' | 'symbol' | 'decimals' | 'address'
>;

export type Erc20AmountFragment = { __typename: 'Erc20Amount' } & Pick<
  Types.Erc20Amount,
  'value'
> & { asset: Erc20Fragment };

export type ModuleFeeAmountFragment = { __typename: 'ModuleFeeAmount' } & Pick<
  Types.ModuleFeeAmount,
  'value'
> & { asset: Erc20Fragment };

export type ReferenceModule_FollowOnlyReferenceModuleSettings_Fragment = {
  __typename: 'FollowOnlyReferenceModuleSettings';
} & Pick<Types.FollowOnlyReferenceModuleSettings, 'contractAddress'>;

export type ReferenceModule_UnknownReferenceModuleSettings_Fragment = {
  __typename: 'UnknownReferenceModuleSettings';
};

export type ReferenceModule_DegreesOfSeparationReferenceModuleSettings_Fragment = {
  __typename: 'DegreesOfSeparationReferenceModuleSettings';
};

export type ReferenceModuleFragment =
  | ReferenceModule_FollowOnlyReferenceModuleSettings_Fragment
  | ReferenceModule_UnknownReferenceModuleSettings_Fragment
  | ReferenceModule_DegreesOfSeparationReferenceModuleSettings_Fragment;

export type FreeCollectModuleSettingsFragment = { __typename: 'FreeCollectModuleSettings' } & Pick<
  Types.FreeCollectModuleSettings,
  'contractAddress' | 'followerOnly'
>;

export type FeeCollectModuleSettingsFragment = { __typename: 'FeeCollectModuleSettings' } & Pick<
  Types.FeeCollectModuleSettings,
  'contractAddress' | 'followerOnly' | 'recipient' | 'referralFee'
> & { amount: ModuleFeeAmountFragment };

export type LimitedFeeCollectModuleSettingsFragment = {
  __typename: 'LimitedFeeCollectModuleSettings';
} & Pick<
  Types.LimitedFeeCollectModuleSettings,
  'collectLimit' | 'contractAddress' | 'followerOnly' | 'recipient' | 'referralFee'
> & { amount: ModuleFeeAmountFragment };

export type LimitedTimedFeeCollectModuleSettingsFragment = {
  __typename: 'LimitedTimedFeeCollectModuleSettings';
} & Pick<
  Types.LimitedTimedFeeCollectModuleSettings,
  'collectLimit' | 'contractAddress' | 'followerOnly' | 'endTimestamp' | 'recipient' | 'referralFee'
> & { amount: ModuleFeeAmountFragment };

export type RevertCollectModuleSettingsFragment = {
  __typename: 'RevertCollectModuleSettings';
} & Pick<Types.RevertCollectModuleSettings, 'contractAddress'>;

export type TimedFeeCollectModuleSettingsFragment = {
  __typename: 'TimedFeeCollectModuleSettings';
} & Pick<
  Types.TimedFeeCollectModuleSettings,
  'contractAddress' | 'followerOnly' | 'endTimestamp' | 'recipient' | 'referralFee'
> & { amount: ModuleFeeAmountFragment };

export type CollectModule_FreeCollectModuleSettings_Fragment = {
  __typename: 'FreeCollectModuleSettings';
} & FreeCollectModuleSettingsFragment;

export type CollectModule_FeeCollectModuleSettings_Fragment = {
  __typename: 'FeeCollectModuleSettings';
} & FeeCollectModuleSettingsFragment;

export type CollectModule_LimitedFeeCollectModuleSettings_Fragment = {
  __typename: 'LimitedFeeCollectModuleSettings';
} & LimitedFeeCollectModuleSettingsFragment;

export type CollectModule_LimitedTimedFeeCollectModuleSettings_Fragment = {
  __typename: 'LimitedTimedFeeCollectModuleSettings';
} & LimitedTimedFeeCollectModuleSettingsFragment;

export type CollectModule_RevertCollectModuleSettings_Fragment = {
  __typename: 'RevertCollectModuleSettings';
} & RevertCollectModuleSettingsFragment;

export type CollectModule_TimedFeeCollectModuleSettings_Fragment = {
  __typename: 'TimedFeeCollectModuleSettings';
} & TimedFeeCollectModuleSettingsFragment;

export type CollectModule_UnknownCollectModuleSettings_Fragment = {
  __typename: 'UnknownCollectModuleSettings';
};

export type CollectModuleFragment =
  | CollectModule_FreeCollectModuleSettings_Fragment
  | CollectModule_FeeCollectModuleSettings_Fragment
  | CollectModule_LimitedFeeCollectModuleSettings_Fragment
  | CollectModule_LimitedTimedFeeCollectModuleSettings_Fragment
  | CollectModule_RevertCollectModuleSettings_Fragment
  | CollectModule_TimedFeeCollectModuleSettings_Fragment
  | CollectModule_UnknownCollectModuleSettings_Fragment;

export type WalletFragment = { __typename: 'Wallet' } & Pick<Types.Wallet, 'address'> & {
    defaultProfile: Types.Maybe<ProfileFragment>;
  };

export type MediaFragment = { __typename: 'Media' } & Pick<Types.Media, 'url' | 'mimeType'>;

export type MediaSetFragment = { __typename: 'MediaSet' } & { original: MediaFragment };

export type MetadataFragment = { __typename: 'MetadataOutput' } & Pick<
  Types.MetadataOutput,
  'name' | 'description' | 'mainContentFocus' | 'content'
> & { media: Array<MediaSetFragment>; attributes: Array<MetadataAttributeOutputFragment> };

export type MetadataAttributeOutputFragment = { __typename: 'MetadataAttributeOutput' } & Pick<
  Types.MetadataAttributeOutput,
  'traitType' | 'value'
>;

export type PublicationStatsFragment = { __typename: 'PublicationStats' } & Pick<
  Types.PublicationStats,
  'totalAmountOfMirrors' | 'totalUpvotes' | 'totalAmountOfCollects' | 'totalAmountOfComments'
>;

export type MirrorBaseFragment = { __typename: 'Mirror' } & Pick<
  Types.Mirror,
  'id' | 'createdAt' | 'hidden' | 'isGated' | 'reaction' | 'hasCollectedByMe'
> & {
    stats: PublicationStatsFragment;
    metadata: MetadataFragment;
    profile: ProfileFragment;
    collectModule:
      | CollectModule_FreeCollectModuleSettings_Fragment
      | CollectModule_FeeCollectModuleSettings_Fragment
      | CollectModule_LimitedFeeCollectModuleSettings_Fragment
      | CollectModule_LimitedTimedFeeCollectModuleSettings_Fragment
      | CollectModule_RevertCollectModuleSettings_Fragment
      | CollectModule_TimedFeeCollectModuleSettings_Fragment
      | CollectModule_UnknownCollectModuleSettings_Fragment;
    referenceModule: Types.Maybe<
      | ReferenceModule_FollowOnlyReferenceModuleSettings_Fragment
      | ReferenceModule_UnknownReferenceModuleSettings_Fragment
      | ReferenceModule_DegreesOfSeparationReferenceModuleSettings_Fragment
    >;
    canComment: Pick<Types.CanCommentResponse, 'result'>;
    canMirror: Pick<Types.CanMirrorResponse, 'result'>;
  };

export type MirrorFragment = { __typename: 'Mirror' } & {
  mirrorOf: PostFragment | CommentFragment;
} & MirrorBaseFragment;

export type CommentBaseFragment = { __typename: 'Comment' } & Pick<
  Types.Comment,
  'id' | 'createdAt' | 'hidden' | 'isGated' | 'reaction' | 'hasCollectedByMe' | 'mirrors'
> & {
    stats: PublicationStatsFragment;
    metadata: MetadataFragment;
    profile: ProfileFragment;
    collectedBy: Types.Maybe<WalletFragment>;
    collectModule:
      | CollectModule_FreeCollectModuleSettings_Fragment
      | CollectModule_FeeCollectModuleSettings_Fragment
      | CollectModule_LimitedFeeCollectModuleSettings_Fragment
      | CollectModule_LimitedTimedFeeCollectModuleSettings_Fragment
      | CollectModule_RevertCollectModuleSettings_Fragment
      | CollectModule_TimedFeeCollectModuleSettings_Fragment
      | CollectModule_UnknownCollectModuleSettings_Fragment;
    referenceModule: Types.Maybe<
      | ReferenceModule_FollowOnlyReferenceModuleSettings_Fragment
      | ReferenceModule_UnknownReferenceModuleSettings_Fragment
      | ReferenceModule_DegreesOfSeparationReferenceModuleSettings_Fragment
    >;
    canComment: Pick<Types.CanCommentResponse, 'result'>;
    canMirror: Pick<Types.CanMirrorResponse, 'result'>;
  };

export type CommentFragment = { __typename: 'Comment' } & {
  commentOn: Types.Maybe<PostFragment | CommentBaseFragment | MirrorBaseFragment>;
  mainPost: PostFragment | MirrorBaseFragment;
} & CommentBaseFragment;

export type PostFragment = { __typename: 'Post' } & Pick<
  Types.Post,
  'id' | 'createdAt' | 'hidden' | 'isGated' | 'reaction' | 'hasCollectedByMe' | 'mirrors'
> & {
    stats: PublicationStatsFragment;
    metadata: MetadataFragment;
    profile: ProfileFragment;
    collectedBy: Types.Maybe<WalletFragment>;
    collectModule:
      | CollectModule_FreeCollectModuleSettings_Fragment
      | CollectModule_FeeCollectModuleSettings_Fragment
      | CollectModule_LimitedFeeCollectModuleSettings_Fragment
      | CollectModule_LimitedTimedFeeCollectModuleSettings_Fragment
      | CollectModule_RevertCollectModuleSettings_Fragment
      | CollectModule_TimedFeeCollectModuleSettings_Fragment
      | CollectModule_UnknownCollectModuleSettings_Fragment;
    referenceModule: Types.Maybe<
      | ReferenceModule_FollowOnlyReferenceModuleSettings_Fragment
      | ReferenceModule_UnknownReferenceModuleSettings_Fragment
      | ReferenceModule_DegreesOfSeparationReferenceModuleSettings_Fragment
    >;
    canComment: Pick<Types.CanCommentResponse, 'result'>;
    canMirror: Pick<Types.CanMirrorResponse, 'result'>;
  };

export const Eip712TypedDataDomainFragmentDoc = gql`
  fragment EIP712TypedDataDomain on EIP712TypedDataDomain {
    __typename
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
export const PublicationStatsFragmentDoc = gql`
  fragment PublicationStats on PublicationStats {
    __typename
    totalAmountOfMirrors
    totalUpvotes
    totalAmountOfCollects
    totalAmountOfComments
  }
`;
export const MediaFragmentDoc = gql`
  fragment Media on Media {
    __typename
    url
    mimeType
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
    name
    description
    mainContentFocus
    content
    media {
      ...MediaSet
    }
    attributes {
      ...MetadataAttributeOutput
    }
  }
  ${MediaSetFragmentDoc}
  ${MetadataAttributeOutputFragmentDoc}
`;
export const ProfileMediaFragmentDoc = gql`
  fragment ProfileMedia on ProfileMedia {
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
  ${MediaSetFragmentDoc}
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
    picture {
      ...ProfileMedia
    }
    coverPicture {
      ...ProfileMedia
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
    isFollowedByMe(isFinalisedOnChain: true)
    isFollowing(who: $observerId)
  }
  ${ProfileMediaFragmentDoc}
  ${FeeFollowModuleSettingsFragmentDoc}
  ${ProfileFollowModuleSettingsFragmentDoc}
  ${RevertFollowModuleSettingsFragmentDoc}
  ${UnknownFollowModuleSettingsFragmentDoc}
  ${AttributeFragmentDoc}
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
export const CollectModuleFragmentDoc = gql`
  fragment CollectModule on CollectModule {
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
  }
  ${FreeCollectModuleSettingsFragmentDoc}
  ${FeeCollectModuleSettingsFragmentDoc}
  ${LimitedFeeCollectModuleSettingsFragmentDoc}
  ${LimitedTimedFeeCollectModuleSettingsFragmentDoc}
  ${RevertCollectModuleSettingsFragmentDoc}
  ${TimedFeeCollectModuleSettingsFragmentDoc}
`;
export const ReferenceModuleFragmentDoc = gql`
  fragment ReferenceModule on ReferenceModule {
    __typename
    ... on FollowOnlyReferenceModuleSettings {
      contractAddress
    }
  }
`;
export const MirrorBaseFragmentDoc = gql`
  fragment MirrorBase on Mirror {
    __typename
    id
    stats {
      ...PublicationStats
    }
    metadata {
      ...Metadata
    }
    profile {
      ...Profile
    }
    collectModule {
      ...CollectModule
    }
    referenceModule {
      ...ReferenceModule
    }
    createdAt
    hidden
    isGated
    reaction(request: { profileId: $observerId })
    hasCollectedByMe(isFinalisedOnChain: true)
    canComment(profileId: $observerId) {
      result
    }
    canMirror(profileId: $observerId) {
      result
    }
  }
  ${PublicationStatsFragmentDoc}
  ${MetadataFragmentDoc}
  ${ProfileFragmentDoc}
  ${CollectModuleFragmentDoc}
  ${ReferenceModuleFragmentDoc}
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
export const PostFragmentDoc = gql`
  fragment Post on Post {
    __typename
    id
    stats {
      ...PublicationStats
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
      ...CollectModule
    }
    referenceModule {
      ...ReferenceModule
    }
    createdAt
    hidden
    isGated
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
  ${PublicationStatsFragmentDoc}
  ${MetadataFragmentDoc}
  ${ProfileFragmentDoc}
  ${WalletFragmentDoc}
  ${CollectModuleFragmentDoc}
  ${ReferenceModuleFragmentDoc}
`;
export const CommentBaseFragmentDoc = gql`
  fragment CommentBase on Comment {
    __typename
    id
    stats {
      ...PublicationStats
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
      ...CollectModule
    }
    referenceModule {
      ...ReferenceModule
    }
    createdAt
    hidden
    isGated
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
  ${PublicationStatsFragmentDoc}
  ${MetadataFragmentDoc}
  ${ProfileFragmentDoc}
  ${WalletFragmentDoc}
  ${CollectModuleFragmentDoc}
  ${ReferenceModuleFragmentDoc}
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
