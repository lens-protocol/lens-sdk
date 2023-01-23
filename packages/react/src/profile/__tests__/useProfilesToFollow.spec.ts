import {
  createMockApolloClientWithMultipleResponses,
  mockProfileFragment,
  createProfilesToFollowQueryMockedResponse,
} from '@lens-protocol/api-bindings/mocks';
import { waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { ProfileFragment, useProfilesToFollow } from '../useProfilesToFollow';

describe(`Given the ${useProfilesToFollow.name} hook`, () => {
  const mockProfiles: ProfileFragment[] = [mockProfileFragment()];

  describe('when the query returns data successfully', () => {
    it('should return profiles to follow', async () => {
      const { result } = renderHookWithMocks(() => useProfilesToFollow(), {
        mocks: {
          apolloClient: createMockApolloClientWithMultipleResponses([
            createProfilesToFollowQueryMockedResponse({ profiles: mockProfiles }),
          ]),
        },
      });

      await waitFor(() => expect(result.current.loading).toBeFalsy());

      expect(result.current.data).toEqual(mockProfiles);
    });
  });
});
