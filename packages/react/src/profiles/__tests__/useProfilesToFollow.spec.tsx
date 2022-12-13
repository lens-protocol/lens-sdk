import { ProfileFieldsFragment } from '@lens-protocol/api';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { mockProfileFieldsFragment } from '../__helpers__/mocks';
import { useProfilesToFollow } from '../useProfilesToFollow';

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

    expect(result.current.data).toEqual({
      recommendedProfiles: mockProfiles,
    });
  });
});
