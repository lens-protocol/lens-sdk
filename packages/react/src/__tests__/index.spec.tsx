import { renderHook } from '@testing-library/react';
import { ProfileFieldsFragment } from '..';
import { useProfilesToFollow } from '..';
import { mockProfileFieldsFragment } from '../__helpers__/mocks';

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
    const { result } = renderHook(() => useProfilesToFollow());

    expect(result.current.data).toEqual({
      recommendedProfiles: mockProfiles,
    });
  });
});
