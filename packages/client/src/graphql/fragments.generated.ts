// @ts-nocheck
import * as Types from './types.generated';

import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import { print } from 'graphql';
import gql from 'graphql-tag';
export type OptimisticStatusResultFragment = { value: boolean; isFinalisedOnChain: boolean | null };

export type Erc20Fragment = {
  name: string;
  symbol: string;
  decimals: number;
  contract: NetworkAddressFragment;
};

export type FiatAmountFragment = { value: string; asset: FiatFragment };

export type FiatFragment = { name: string; symbol: string; decimals: number };

export type AmountFragment = {
  value: string;
  asset: Erc20Fragment;
  rate: FiatAmountFragment | null;
};

export type FeeFollowModuleSettingsFragment = {
  recipient: string;
  amount: AmountFragment;
  contract: NetworkAddressFragment;
};

export type ProfileFollowModuleSettingsFragment = { contract: NetworkAddressFragment };

export type RevertFollowModuleSettingsFragment = { contract: NetworkAddressFragment };

export type UnknownFollowModuleSettingsFragment = {
  followModuleReturnData: string;
  contract: NetworkAddressFragment;
};

export type GaslessFragment = { enabled: boolean; relay: NetworkAddressFragment | null };

export type NetworkAddressFragment = { address: string; chainId: string };

export type ImageFragment = {
  url: string;
  mimeType: string | null;
  width: number | null;
  height: number | null;
};

export type ProfileCoverSetFragment = {
  rawURL: string;
  altTag: string | null;
  media: ImageFragment;
  transformed: ImageFragment | null;
};

export type ProfilePictureSetFragment = {
  rawURL: string;
  altTag: string | null;
  media: ImageFragment;
  transformed: ImageFragment | null;
};

export type ProfileFieldsFragment = {
  __typename: 'Profile';
  id: string;
  handle: string | null;
  interests: Array<string>;
  invitesLeft: number;
  createdAt: string;
  metadata: {
    rawURL: string | null;
    displayName: string | null;
    bio: string | null;
    coverPicture: ProfileCoverSetFragment | null;
  } | null;
  ownedBy: NetworkAddressFragment;
  picture:
    | ProfilePictureSetFragment
    | {
        tokenId: string;
        verified: boolean;
        collection: NetworkAddressFragment;
        image: ProfilePictureSetFragment;
      }
    | null;
  gasless: GaslessFragment;
  followModule:
    | FeeFollowModuleSettingsFragment
    | ProfileFollowModuleSettingsFragment
    | RevertFollowModuleSettingsFragment
    | UnknownFollowModuleSettingsFragment
    | null;
  followNftAddress: NetworkAddressFragment | null;
  attributes: Array<{ type: Types.AttributeTypes | null; key: string; value: string }>;
  onChainIdentity: {
    proofOfHumanity: { isVerified: boolean };
    ens: { name: string } | null;
    sybilDotOrg: { source: { twitter: { handle: string | null } } } | null;
    worldcoin: { isHuman: boolean };
  };
  isFollowedByMe: OptimisticStatusResultFragment;
  isFollowingMe: OptimisticStatusResultFragment;
  guardian: { protected: boolean; cooldownEndsOn: string | null };
};

export type ProfileFragment = { invitedBy: ProfileFieldsFragment | null } & ProfileFieldsFragment;

export type PaginatedResultInfoFragment = { prev: string | null; next: string | null };

export type AppFragment = { id: string };

export type MomokaInfoFragment = { proof: string };

export type PostFragment = {
  id: string;
  isHidden: boolean;
  isGated: boolean;
  createdAt: string;
  by: ProfileFieldsFragment;
  publishedOn: AppFragment | null;
  momoka: MomokaInfoFragment | null;
};

export type CommentBaseFragment = {
  id: string;
  isHidden: boolean;
  isGated: boolean;
  createdAt: string;
  by: ProfileFieldsFragment;
  publishedOn: AppFragment | null;
  momoka: MomokaInfoFragment | null;
};

export type CommentFragment = {
  root: PostFragment;
  commentOn: CommentBaseFragment | PostFragment | QuoteBaseFragment | null;
  firstComment: CommentBaseFragment | null;
} & CommentBaseFragment;

export type MirrorFragment = {
  id: string;
  createdAt: string;
  by: ProfileFieldsFragment;
  momoka: MomokaInfoFragment | null;
  mirrorOf: CommentFragment | PostFragment | QuoteFragment;
};

export type QuoteBaseFragment = {
  id: string;
  isHidden: boolean;
  isGated: boolean;
  createdAt: string;
  by: ProfileFieldsFragment;
  publishedOn: AppFragment | null;
  momoka: MomokaInfoFragment | null;
};

export type QuoteFragment = {
  quotedOn: CommentBaseFragment | PostFragment | QuoteBaseFragment | null;
} & QuoteBaseFragment;

export const ImageFragmentDoc = gql`
  fragment Image on Image {
    url
    mimeType
    width
    height
  }
`;
export const ProfileCoverSetFragmentDoc = gql`
  fragment ProfileCoverSet on ImageSet {
    rawURL
    media {
      ...Image
    }
    altTag
    transformed(input: $profileCoverTransform) {
      ...Image
    }
  }
  ${ImageFragmentDoc}
`;
export const NetworkAddressFragmentDoc = gql`
  fragment NetworkAddress on NetworkAddress {
    address
    chainId
  }
`;
export const ProfilePictureSetFragmentDoc = gql`
  fragment ProfilePictureSet on ImageSet {
    rawURL
    media {
      ...Image
    }
    altTag
    transformed(input: $profilePictureTransform) {
      ...Image
    }
  }
  ${ImageFragmentDoc}
`;
export const GaslessFragmentDoc = gql`
  fragment Gasless on Gasless {
    enabled
    relay {
      ...NetworkAddress
    }
  }
  ${NetworkAddressFragmentDoc}
`;
export const Erc20FragmentDoc = gql`
  fragment ERC20 on ERC20 {
    name
    symbol
    decimals
    contract {
      ...NetworkAddress
    }
  }
  ${NetworkAddressFragmentDoc}
`;
export const FiatFragmentDoc = gql`
  fragment Fiat on Fiat {
    name
    symbol
    decimals
  }
`;
export const FiatAmountFragmentDoc = gql`
  fragment FiatAmount on FiatAmount {
    asset {
      ...Fiat
    }
    value
  }
  ${FiatFragmentDoc}
`;
export const AmountFragmentDoc = gql`
  fragment Amount on Amount {
    asset {
      ...ERC20
    }
    value
    rate(currency: USD) {
      ...FiatAmount
    }
  }
  ${Erc20FragmentDoc}
  ${FiatAmountFragmentDoc}
`;
export const FeeFollowModuleSettingsFragmentDoc = gql`
  fragment FeeFollowModuleSettings on FeeFollowModuleSettings {
    amount {
      ...Amount
    }
    contract {
      ...NetworkAddress
    }
    recipient
  }
  ${AmountFragmentDoc}
  ${NetworkAddressFragmentDoc}
`;
export const ProfileFollowModuleSettingsFragmentDoc = gql`
  fragment ProfileFollowModuleSettings on ProfileFollowModuleSettings {
    contract {
      ...NetworkAddress
    }
  }
  ${NetworkAddressFragmentDoc}
`;
export const RevertFollowModuleSettingsFragmentDoc = gql`
  fragment RevertFollowModuleSettings on RevertFollowModuleSettings {
    contract {
      ...NetworkAddress
    }
  }
  ${NetworkAddressFragmentDoc}
`;
export const UnknownFollowModuleSettingsFragmentDoc = gql`
  fragment UnknownFollowModuleSettings on UnknownFollowModuleSettings {
    contract {
      ...NetworkAddress
    }
    followModuleReturnData
  }
  ${NetworkAddressFragmentDoc}
`;
export const OptimisticStatusResultFragmentDoc = gql`
  fragment OptimisticStatusResult on OptimisticStatusResult {
    value
    isFinalisedOnChain
  }
`;
export const ProfileFieldsFragmentDoc = gql`
  fragment ProfileFields on Profile {
    __typename
    id
    metadata {
      rawURL
      displayName
      bio
      coverPicture {
        ...ProfileCoverSet
      }
    }
    handle
    ownedBy {
      ...NetworkAddress
    }
    picture {
      ... on NftImage {
        collection {
          ...NetworkAddress
        }
        tokenId
        image {
          ...ProfilePictureSet
        }
        verified
      }
      ... on ImageSet {
        ...ProfilePictureSet
      }
    }
    gasless {
      ...Gasless
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
    followNftAddress {
      ...NetworkAddress
    }
    attributes {
      type
      key
      value
    }
    onChainIdentity {
      proofOfHumanity {
        isVerified
      }
      ens {
        name
      }
      sybilDotOrg {
        source {
          twitter {
            handle
          }
        }
      }
      worldcoin {
        isHuman
      }
    }
    interests
    isFollowedByMe {
      ...OptimisticStatusResult
    }
    isFollowingMe {
      ...OptimisticStatusResult
    }
    guardian {
      protected
      cooldownEndsOn
    }
    invitesLeft
    createdAt
  }
  ${ProfileCoverSetFragmentDoc}
  ${NetworkAddressFragmentDoc}
  ${ProfilePictureSetFragmentDoc}
  ${GaslessFragmentDoc}
  ${FeeFollowModuleSettingsFragmentDoc}
  ${ProfileFollowModuleSettingsFragmentDoc}
  ${RevertFollowModuleSettingsFragmentDoc}
  ${UnknownFollowModuleSettingsFragmentDoc}
  ${OptimisticStatusResultFragmentDoc}
`;
export const ProfileFragmentDoc = gql`
  fragment Profile on Profile {
    ...ProfileFields
    invitedBy {
      ...ProfileFields
    }
  }
  ${ProfileFieldsFragmentDoc}
`;
export const PaginatedResultInfoFragmentDoc = gql`
  fragment PaginatedResultInfo on PaginatedResultInfo {
    prev
    next
  }
`;
export const MomokaInfoFragmentDoc = gql`
  fragment MomokaInfo on MomokaInfo {
    proof
  }
`;
export const AppFragmentDoc = gql`
  fragment App on App {
    id
  }
`;
export const PostFragmentDoc = gql`
  fragment Post on Post {
    id
    by {
      ...ProfileFields
    }
    publishedOn {
      ...App
    }
    isHidden
    isGated
    momoka {
      ...MomokaInfo
    }
    createdAt
  }
  ${ProfileFieldsFragmentDoc}
  ${AppFragmentDoc}
  ${MomokaInfoFragmentDoc}
`;
export const CommentBaseFragmentDoc = gql`
  fragment CommentBase on Comment {
    id
    by {
      ...ProfileFields
    }
    publishedOn {
      ...App
    }
    isHidden
    isGated
    momoka {
      ...MomokaInfo
    }
    createdAt
  }
  ${ProfileFieldsFragmentDoc}
  ${AppFragmentDoc}
  ${MomokaInfoFragmentDoc}
`;
export const QuoteBaseFragmentDoc = gql`
  fragment QuoteBase on Quote {
    id
    by {
      ...ProfileFields
    }
    publishedOn {
      ...App
    }
    isHidden
    isGated
    momoka {
      ...MomokaInfo
    }
    createdAt
  }
  ${ProfileFieldsFragmentDoc}
  ${AppFragmentDoc}
  ${MomokaInfoFragmentDoc}
`;
export const CommentFragmentDoc = gql`
  fragment Comment on Comment {
    ...CommentBase
    root {
      ...Post
    }
    commentOn {
      ... on Post {
        ...Post
      }
      ... on Comment {
        ...CommentBase
      }
      ... on Quote {
        ...QuoteBase
      }
    }
    firstComment {
      ...CommentBase
    }
  }
  ${CommentBaseFragmentDoc}
  ${PostFragmentDoc}
  ${QuoteBaseFragmentDoc}
`;
export const QuoteFragmentDoc = gql`
  fragment Quote on Quote {
    ...QuoteBase
    quotedOn {
      ... on Post {
        ...Post
      }
      ... on Comment {
        ...CommentBase
      }
      ... on Quote {
        ...QuoteBase
      }
    }
  }
  ${QuoteBaseFragmentDoc}
  ${PostFragmentDoc}
  ${CommentBaseFragmentDoc}
`;
export const MirrorFragmentDoc = gql`
  fragment Mirror on Mirror {
    id
    by {
      ...ProfileFields
    }
    momoka {
      ...MomokaInfo
    }
    mirrorOf {
      ... on Post {
        ...Post
      }
      ... on Comment {
        ...Comment
      }
      ... on Quote {
        ...Quote
      }
    }
    createdAt
  }
  ${ProfileFieldsFragmentDoc}
  ${MomokaInfoFragmentDoc}
  ${PostFragmentDoc}
  ${CommentFragmentDoc}
  ${QuoteFragmentDoc}
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
