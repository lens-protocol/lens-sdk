import { faker } from '@faker-js/faker';
import { mockProfileId, mockPublicationId, mockTransactionHash } from '@lens-protocol/domain/mocks';
import { FollowPolicyType } from '@lens-protocol/domain/use-cases/profile';
import { mockEvmAddress } from '@lens-protocol/shared-kernel/mocks';

import {
  CanDecryptResponse,
  Comment,
  FeedItem,
  MentionNotification,
  Mirror,
  NetworkAddress,
  OptimisticStatusResult,
  PaginatedResultInfo,
  Post,
  Profile,
  ProfileActionHistory,
  ProfileActionHistoryType,
  ProfileOnchainIdentity,
  ProfileOperations,
  ProfileReactionResult,
  ProfileStats,
  ProfileWhoReactedResult,
  PublicationOperations,
  PublicationReactionType,
  PublicationStats,
  TextOnlyMetadataV3,
  TriStateValue,
} from '../graphql/generated';

function mockNetworkAddressFragment(overrides?: Partial<NetworkAddress>): NetworkAddress {
  return {
    address: mockEvmAddress(),
    chainId: 1,
    ...overrides,
    __typename: 'NetworkAddress',
  };
}

function mockOptimisticStatusResultFragment(
  overrides?: Partial<OptimisticStatusResult>,
): OptimisticStatusResult {
  return {
    value: true,
    isFinalisedOnchain: false,
    ...overrides,
    __typename: 'OptimisticStatusResult',
  };
}

function mockProfileOperationsFragment(overrides?: Partial<ProfileOperations>): ProfileOperations {
  return {
    id: mockProfileId(),
    canBlock: false,
    canUnblock: false,
    canFollow: TriStateValue.Unknown,
    canUnfollow: false,
    isBlockedByMe: mockOptimisticStatusResultFragment(),
    isFollowedByMe: mockOptimisticStatusResultFragment(),
    isFollowingMe: mockOptimisticStatusResultFragment(),
    ...overrides,
    __typename: 'ProfileOperations',
  };
}

function mockProfileOnchainIdentityFragment(
  overrides?: Partial<ProfileOnchainIdentity>,
): ProfileOnchainIdentity {
  return {
    proofOfHumanity: false,
    ens: null,
    sybilDotOrg: {
      source: {
        twitter: {
          handle: null,
        },
      },
    },
    worldcoin: {
      isHuman: false,
    },
    ...overrides,
    __typename: 'ProfileOnchainIdentity',
  };
}

export function mockProfileFragment(overrides?: Partial<Profile>): Profile {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();

  return {
    id: mockProfileId(),
    txHash: mockTransactionHash(),
    createdAt: faker.date.past().toISOString(),
    interests: [],
    handle: faker.internet.userName(firstName, lastName),
    invitesLeft: 0,
    sponsor: false,
    lensManager: false,
    ownedBy: mockNetworkAddressFragment(),
    operations: mockProfileOperationsFragment(),
    guardian: null,
    onchainIdentity: mockProfileOnchainIdentityFragment(),
    followNftAddress: mockNetworkAddressFragment(),
    followPolicy: {
      type: FollowPolicyType.ANYONE,
    },
    followModule: null,
    metadata: null,
    invitedBy: null,
    stats: mockProfileStatsFragment(),

    ...overrides,
    __typename: 'Profile',
  };
}

export function mockPostFragment(overrides?: Partial<Omit<Post, '__typename'>>): Post {
  return {
    id: mockPublicationId(),
    isHidden: false,
    txHash: mockTransactionHash(),
    by: mockProfileFragment(),
    createdAt: faker.date.past().toISOString(),
    publishedOn: null,
    momoka: null,
    operations: mockPublicationOperationsFragment(),
    metadata: mockPublicationTextOnlyMetadata(),
    openActionModules: null,
    referenceModule: null,
    stats: mockPublicationStatsFragment(),

    ...overrides,
    __typename: 'Post',
  };
}

export function mockCommentFragment(overrides?: Partial<Omit<Comment, '__typename'>>): Comment {
  const mainPost = mockPostFragment();

  return {
    id: mockPublicationId(),
    isHidden: false,
    txHash: mockTransactionHash(),
    by: mockProfileFragment(),
    createdAt: faker.date.past().toISOString(),
    publishedOn: null,
    momoka: null,
    operations: mockPublicationOperationsFragment(),
    metadata: mockPublicationTextOnlyMetadata(),
    openActionModules: null,
    referenceModule: null,
    root: mainPost,
    commentOn: mainPost,
    firstComment: null,
    stats: mockPublicationStatsFragment(),

    ...overrides,
    __typename: 'Comment',
  };
}

export function mockMirrorFragment(overrides?: Partial<Omit<Mirror, '__typename'>>): Mirror {
  const mainPost = mockPostFragment();

  return {
    id: mockPublicationId(),
    isHidden: false,
    txHash: mockTransactionHash(),
    by: mockProfileFragment(),
    createdAt: faker.date.past().toISOString(),
    publishedOn: null,
    momoka: null,
    mirrorOn: mainPost,
    ...overrides,
    __typename: 'Mirror',
  };
}

export function mockPublicationTextOnlyMetadata(
  overrides: Partial<TextOnlyMetadataV3> = {},
): TextOnlyMetadataV3 {
  return {
    id: faker.helpers.unique(faker.datatype.uuid),
    rawURI: faker.internet.url(),
    locale: 'en',
    tags: null,
    contentWarning: null,
    hideFromFeed: false,
    appId: null,
    content: faker.lorem.words(5),
    marketplace: null,
    attributes: null,
    encryptedWith: null,

    ...overrides,
    __typename: 'TextOnlyMetadataV3',
  };
}

function mockCanDecryptResponseFragment(
  overrides?: Partial<ProfileOperations>,
): CanDecryptResponse {
  return {
    result: false,
    reasons: null,
    extraDetails: null,
    ...overrides,
    __typename: 'CanDecryptResponse',
  };
}

export function mockPublicationOperationsFragment(
  overrides: Partial<PublicationOperations> = {},
): PublicationOperations {
  return {
    isNotInterested: false,
    hasBookmarked: false,
    hasReported: false,
    canCollect: TriStateValue.Unknown,
    canComment: TriStateValue.Unknown,
    canMirror: TriStateValue.Unknown,
    hasMirrored: false,
    hasUpvoted: false,
    hasDownvoted: false,
    hasCollected: mockOptimisticStatusResultFragment(),
    canDecrypt: mockCanDecryptResponseFragment(),

    ...overrides,
    __typename: 'PublicationOperations',
  };
}

export function mockPaginatedResultInfo(
  overrides: Partial<PaginatedResultInfo> = {},
): PaginatedResultInfo {
  return {
    moreAfter: false,
    prev: null,
    next: null,
    ...overrides,
    __typename: 'PaginatedResultInfo',
  };
}

export function mockPublicationStatsFragment(
  overrides: Partial<PublicationStats> = {},
): PublicationStats {
  return {
    id: mockPublicationId(),
    comments: faker.datatype.number(),
    mirrors: faker.datatype.number(),
    quotes: faker.datatype.number(),
    bookmarks: faker.datatype.number(),
    collects: faker.datatype.number(),
    upvotes: faker.datatype.number(),
    downvotes: faker.datatype.number(),

    ...overrides,
    __typename: 'PublicationStats',
  };
}

export function mockProfileStatsFragment(overrides: Partial<ProfileStats> = {}): ProfileStats {
  return {
    id: mockProfileId(),
    followers: faker.datatype.number(),
    following: faker.datatype.number(),
    comments: faker.datatype.number(),
    posts: faker.datatype.number(),
    mirrors: faker.datatype.number(),
    quotes: faker.datatype.number(),
    publications: faker.datatype.number(),
    collects: faker.datatype.number(),
    upvotes: faker.datatype.number(),
    downvotes: faker.datatype.number(),
    upvoted: faker.datatype.number(),
    downvoted: faker.datatype.number(),

    ...overrides,
    __typename: 'ProfileStats',
  };
}

export function mockFeedItemFragment(overrides?: Partial<FeedItem>): FeedItem {
  return {
    id: faker.datatype.uuid(),
    root: mockPostFragment(),
    comments: [],
    mirrors: [],
    reactions: [],

    ...overrides,
    __typename: 'FeedItem',
  };
}

export function mockProfileActionHistoryFragment(
  overrides: Partial<ProfileActionHistory> = {},
): ProfileActionHistory {
  return {
    id: faker.datatype.number(),
    actionType: ProfileActionHistoryType.LoggedIn,
    who: mockEvmAddress(),
    txHash: mockTransactionHash(),
    actionedOn: faker.date.past().toISOString(),

    ...overrides,
  };
}

export function mockMentionNotification(
  overrides?: Partial<MentionNotification>,
): MentionNotification {
  return {
    __typename: 'MentionNotification',
    id: faker.datatype.uuid(),
    publication: mockPostFragment(),
    ...overrides,
  };
}

export function mockProfileReactionResultFragment(
  overrides: Partial<ProfileReactionResult> = {},
): ProfileReactionResult {
  return {
    reaction: PublicationReactionType.Upvote,
    reactionAt: faker.date.past().toISOString(),

    ...overrides,
    __typename: 'ProfileReactionResult',
  };
}

export function mockProfileWhoReactedResultFragment(
  overrides: Partial<ProfileWhoReactedResult> = {},
): ProfileWhoReactedResult {
  return {
    profile: mockProfileFragment(),
    reactions: [mockProfileReactionResultFragment()],

    ...overrides,
    __typename: 'ProfileWhoReactedResult',
  };
}
