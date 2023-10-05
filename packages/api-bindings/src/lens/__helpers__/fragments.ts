import { faker } from '@faker-js/faker';
import { mockProfileId, mockPublicationId, mockTransactionHash } from '@lens-protocol/domain/mocks';
import { mockEvmAddress } from '@lens-protocol/shared-kernel/mocks';

import {
  Comment,
  FeedItem,
  Mirror,
  PaginatedResultInfo,
  Post,
  Profile,
  ProfileStats,
  PublicationOperations,
  PublicationStats,
  TextOnlyMetadataV3,
  TriStateValue,
} from '../graphql/generated';

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
    ownedBy: {
      address: mockEvmAddress(),
      chainId: 1,
    },
    operations: {
      id: mockProfileId(),
      canBlock: false,
      canUnblock: false,
      canFollow: TriStateValue.Unknown,
      canUnfollow: false,
      isBlockedByMe: { value: false, isFinalisedOnchain: false },
      isFollowedByMe: { value: false, isFinalisedOnchain: false },
      isFollowingMe: { value: false, isFinalisedOnchain: false },
    },
    guardian: null,
    onchainIdentity: {
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
    },
    followNftAddress: {
      address: mockEvmAddress(),
      chainId: 1,
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

export function mockPublicationTextOnlyMetadata(overrides: Partial<TextOnlyMetadataV3> = {}) {
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
    hasCollected: { value: false, isFinalisedOnchain: false },
    canDecrypt: {
      result: false,
      reasons: null,
      extraDetails: null,
    },

    ...overrides,
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
  };
}
