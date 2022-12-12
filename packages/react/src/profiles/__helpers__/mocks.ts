import { ProfileFieldsFragment } from '@lens-protocol/api';

export function mockProfileFieldsFragment(
  overrides?: Partial<ProfileFieldsFragment>,
): ProfileFieldsFragment {
  return {
    id: '1',
    name: 'reece',
    bio: 'i love lens',
    handle: 'reecej.lens',
    ownedBy: '0x2324',
    picture: null,
    coverPicture: null,

    stats: {
      __typename: 'ProfileStats',
      totalFollowers: 0,
      totalFollowing: 0,
      totalPosts: 0,
      ...overrides?.stats,
    },

    ...overrides,
    __typename: 'Profile',
  };
}
