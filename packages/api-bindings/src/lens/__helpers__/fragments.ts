import { faker } from '@faker-js/faker';
import { mockProfileId, mockPublicationId, mockTransactionHash } from '@lens-protocol/domain/mocks';
import { mockEthereumAddress } from '@lens-protocol/shared-kernel/mocks';

import {
  Comment,
  Mirror,
  PaginatedResultInfo,
  Post,
  Profile,
  PublicationOperations,
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
    invitesLeft: null,
    sponsor: false,
    lensManager: false,
    ownedBy: {
      address: mockEthereumAddress(),
      chainId: '1',
    },
    operations: {
      id: faker.helpers.unique(faker.datatype.uuid),
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
      address: mockEthereumAddress(),
      chainId: '1',
    },
    followModule: null,
    metadata: null,
    invitedBy: null,

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

export function mockPublicationOperationsFragment(overrides: Partial<PublicationOperations> = {}) {
  return {
    isNotInterested: false,
    hasBookmarked: false,
    hasReported: false,
    canAct: TriStateValue.Unknown,
    canComment: TriStateValue.Unknown,
    canMirror: TriStateValue.Unknown,
    hasMirrored: false,
    hasUpvoted: false,
    hasDownvoted: false,
    hasActed: { value: false, isFinalisedOnchain: false },
    actedOn: [],
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
    prev: null,
    next: null,

    ...overrides,
    __typename: 'PaginatedResultInfo',
  };
}
