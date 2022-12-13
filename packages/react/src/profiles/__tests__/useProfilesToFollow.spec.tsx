<<<<<<<< HEAD:packages/react/src/profile/__tests__/profiles-to-follow.tsx
import { renderHook } from '@testing-library/react';
import { mockProfileFieldsFragment } from '../../__helpers__/mocks';
import { ProfileFieldsFragment } from '../profiles-to-follow';
import { useProfilesToFollow } from '../profiles-to-follow';
========
import { ProfileFieldsFragment } from '@lens-protocol/api';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { mockProfileFieldsFragment } from '../__helpers__/mocks';
import { useProfilesToFollow } from '../useProfilesToFollow';
>>>>>>>> main:packages/react/src/profiles/__tests__/useProfilesToFollow.spec.tsx

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
