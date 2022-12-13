import {
  createMockApolloClientWithMultipleResponses,
  mockProfileFieldsFragment,
  mockProfilesToFollowQueryMockedResponse,
} from '@lens-protocol/api/mocks';
import { waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { ProfileFieldsFragment, useProfilesToFollow } from '../useProfilesToFollow';

describe('useProfilesToFollow', () => {
  const mockProfiles: ProfileFieldsFragment[] = [mockProfileFieldsFragment()];

  it('should return profiles to follow', async () => {
    const { result } = renderHookWithMocks(() => useProfilesToFollow(), {
      mocks: {
        apolloClient: createMockApolloClientWithMultipleResponses([
          mockProfilesToFollowQueryMockedResponse({ profiles: mockProfiles }),
        ]),
      },
    });

    await waitFor(() => expect(result.current.loading).toBeFalsy());

    expect(result.current.data).toEqual(mockProfiles);
  });
});
