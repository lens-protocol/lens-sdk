import { ProfileFieldsFragment } from '@lens-protocol/api';
import { mockEthereumAddress } from '@lens-protocol/shared-kernel/src/tests';

export function mockProfileFieldsFragment(
  overrides?: Partial<ProfileFieldsFragment>,
): ProfileFieldsFragment {
  return {
    id: '1',
    name: 'reece',
    bio: 'i love lens',
    handle: 'reecej.lens',
    ownedBy: mockEthereumAddress(),
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
