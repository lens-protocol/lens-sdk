import {
  createMockApolloClientWithMultipleResponses,
  mockGetProfileByIdQueryMockedResponse,
  mockProfileFieldsFragment,
} from '@lens-protocol/api/mocks';
import { waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { useProfileById } from '../useProfileById';
import { ProfileFieldsFragment } from '../useProfilesToFollow';

describe('useProfileById', () => {
  const id = '0x2000';
  const mockProfile: ProfileFieldsFragment = mockProfileFieldsFragment({ id });

  it('should return profile', async () => {
    const { result } = renderHookWithMocks(() => useProfileById({ id }), {
      mocks: {
        apolloClient: createMockApolloClientWithMultipleResponses([
          mockGetProfileByIdQueryMockedResponse({ profile: mockProfile, id }),
        ]),
      },
    });

    await waitFor(() => expect(result.current.loading).toBeFalsy());

    expect(result.current.data).toEqual(mockProfile);
  });
});
