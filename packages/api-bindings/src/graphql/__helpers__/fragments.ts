import { faker } from '@faker-js/faker';
import { mockTransactionHash } from '@lens-protocol/domain/mocks';
import { mockEthereumAddress } from '@lens-protocol/shared-kernel';

import {
  CollectModuleFragment,
  CommentFragment,
  FeedItemFragment,
  MediaFragment,
  MetadataFragment,
  PostFragment,
  ProfileFieldsFragment,
  ProfileMediaFragment,
  PublicationMainFocus,
  PublicationStatsFragment,
  RelayerResultFragment,
  RelayErrorFragment,
  RelayErrorReasons,
} from '../generated';

function mockMediaFragment(): MediaFragment {
  return {
    url: faker.image.imageUrl(),
    mimeType: 'image/jpeg',
    __typename: 'Media',
  };
}

function mockProfileMediaFragment(): ProfileMediaFragment {
  return {
    original: mockMediaFragment(),
    __typename: 'MediaSet',
  };
}

export function mockProfileFieldsFragment(
  overrides?: Partial<ProfileFieldsFragment>,
): ProfileFieldsFragment {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const location = faker.address.cityName();
  const website = faker.internet.url();
  const twitter = faker.internet.userName(firstName, lastName);

  return {
    id: faker.datatype.uuid(),
    name: `${firstName} ${lastName}`,
    bio: faker.lorem.sentence(),
    attributes: [
      {
        __typename: 'Attribute',
        key: 'something',
        value: '42',
      },
      {
        __typename: 'Attribute',
        key: 'location',
        value: location,
      },
      {
        __typename: 'Attribute',
        key: 'website',
        value: website,
      },
      {
        __typename: 'Attribute',
        key: 'twitter',
        value: twitter,
      },
    ],
    handle: faker.internet.userName(firstName, lastName),
    ownedBy: mockEthereumAddress(),
    picture: mockProfileMediaFragment(),
    coverPicture: mockProfileMediaFragment(),

    stats: {
      __typename: 'ProfileStats',
      totalFollowers: 0,
      totalFollowing: 0,
      totalPosts: 0,
      ...overrides?.stats,
    },

    dispatcher: null,
    followModule: null,
    isFollowedByMe: false,
    isFollowing: false,
    isOptimisticFollowedByMe: false,

    location: location,
    website: website,
    twitter: twitter,
    ownedByMe: false,

    ...overrides,
    __typename: 'Profile',
  };
}

export function mockRelayerResultFragment(
  txHash: string = mockTransactionHash(),
): RelayerResultFragment {
  return {
    __typename: 'RelayerResult',
    txHash,
    txId: faker.datatype.uuid(),
  };
}

export function mockRelayErrorFragment(reason: RelayErrorReasons): RelayErrorFragment {
  return {
    __typename: 'RelayError',
    reason,
  };
}

export function mockPublicationStatsFragment(
  overrides?: Partial<PublicationStatsFragment>,
): PublicationStatsFragment {
  return {
    totalAmountOfMirrors: faker.datatype.number({ max: 42000, min: 0, precision: 1 }),
    totalAmountOfCollects: faker.datatype.number({ max: 42000, min: 0, precision: 1 }),
    totalAmountOfComments: faker.datatype.number({ max: 42000, min: 0, precision: 1 }),
    totalUpvotes: faker.datatype.number({ max: 42000, min: 0, precision: 1 }),
    ...overrides,
    __typename: 'PublicationStats',
  };
}

function mockFreeCollectModuleSettings({ followerOnly = false } = {}): CollectModuleFragment {
  return {
    __typename: 'FreeCollectModuleSettings',
    contractAddress: '0x96351D3cE872903EBf4c2D77dd625992CCFdf8c9',
    followerOnly,
  };
}

function mockMetadataFragment(): MetadataFragment {
  return {
    __typename: 'MetadataOutput',
    mainContentFocus: PublicationMainFocus.TextOnly,
    name: faker.commerce.productName(),
    description: null,
    attributes: [],
    content: faker.lorem.words(5),
    media: [],
  };
}

export function mockPostFragment(
  overrides?: Partial<Omit<PostFragment, '__typename'>>,
): PostFragment {
  return {
    id: faker.datatype.uuid(),
    createdAt: faker.datatype.datetime().toISOString(),
    stats: mockPublicationStatsFragment(),
    metadata: mockMetadataFragment(),
    profile: mockProfileFieldsFragment(),
    collectedBy: null,
    ownedByMe: false,
    collectModule: mockFreeCollectModuleSettings(),
    referenceModule: null,
    hasCollectedByMe: false,
    hasOptimisticCollectedByMe: false,
    isOptimisticMirroredByMe: false,
    mirrors: [],
    reaction: null,
    hidden: false,
    isGated: false,
    canComment: {
      result: true,
    },
    canMirror: {
      result: true,
    },
    ...overrides,
    __typename: 'Post',
  };
}

export function mockCommentFragment(
  overrides?: Partial<Omit<CommentFragment, '__typename'>>,
): CommentFragment {
  const mainPost = mockPostFragment();

  return {
    id: faker.datatype.uuid(),
    stats: mockPublicationStatsFragment(),
    metadata: {
      __typename: 'MetadataOutput',
      mainContentFocus: PublicationMainFocus.TextOnly,
      name: null,
      description: null,
      attributes: [],
      content: faker.lorem.paragraph(1),
      media: [],
    },
    profile: mockProfileFieldsFragment(),
    createdAt: faker.date.past().toISOString(),
    collectedBy: null,
    commentOn: mainPost,
    mainPost: mainPost,
    ownedByMe: false,
    collectModule: mockFreeCollectModuleSettings(),
    referenceModule: null,
    hasCollectedByMe: false,
    hasOptimisticCollectedByMe: false,
    isOptimisticMirroredByMe: false,
    mirrors: [],
    reaction: null,
    hidden: false,
    isGated: false,
    canComment: {
      result: true,
    },
    canMirror: {
      result: true,
    },
    ...overrides,
    __typename: 'Comment',
  };
}

export function mockFeedItemFragment(overrides?: Partial<FeedItemFragment>): FeedItemFragment {
  return {
    root: mockPostFragment(),
    comments: null,
    ...overrides,
    __typename: 'FeedItem',
  };
}
