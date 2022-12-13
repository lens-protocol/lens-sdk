import { renderHook } from '@testing-library/react';
import { mockProfileFieldsFragment } from '../../__helpers__/mocks';
import { ProfileFieldsFragment } from '../profiles-to-follow';
import { useProfilesToFollow } from '../profiles-to-follow';

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

    expect(result.current.data).toEqual(mockProfiles);
  });
});
