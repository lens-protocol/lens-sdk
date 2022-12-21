import { faker } from '@faker-js/faker';
import { mockTransactionHash } from '@lens-protocol/domain/mocks';
import { mockEthereumAddress } from '@lens-protocol/shared-kernel';

import {
  MediaFieldsFragment,
  ProfileFieldsFragment,
  ProfileMediaFieldsFragment,
  RelayerResultFragment,
  RelayErrorFragment,
  RelayErrorReasons,
} from '../generated';

function mockMedia(): MediaFieldsFragment {
  return {
    __typename: 'Media',
    url: faker.image.imageUrl(),
    mimeType: 'image/jpeg',
  };
}

export function mockProfileMediaFieldsFragment(): ProfileMediaFieldsFragment {
  return {
    __typename: 'MediaSet',
    original: mockMedia(),
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
    picture: mockProfileMediaFieldsFragment(),
    coverPicture: mockProfileMediaFieldsFragment(),

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
