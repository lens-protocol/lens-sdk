import { renderHook } from '@testing-library/react';
import { ProfileFieldsFragment } from '@lens-protocol/api';

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
    const { result } = renderHook(() => useProfilesToFollow());

    expect(result.current.data).toEqual({
      recommendedProfiles: mockProfiles,
    });
  });
});
