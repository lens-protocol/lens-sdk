import { mockProfileFieldsFragment } from '../__helpers__/mocks';
import { ProfileFieldsFragment } from '../useProfilesToFollow';
import { useProfilesToFollow } from '../useProfilesToFollow';

import { renderHookWithMocks } from '../../__helpers__/testing-library';

const mockProfiles: ProfileFieldsFragment[] = [mockProfileFieldsFragment()];

jest.mock('@lens-protocol/api', () => ({
  useProfilesToFollowQuery: () => ({
    data: {
      recommendedProfiles: mockProfiles,
    },
    loading: false,
    error: null,
  }),
}));

describe('useProfilesToFollow', () => {
  it('should return profiles to follow', () => {
    const { result } = renderHookWithMocks(() => useProfilesToFollow());

    expect(result.current.data).toEqual(mockProfiles);
  });
});
