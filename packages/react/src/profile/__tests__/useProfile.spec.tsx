import {
  createMockApolloClientWithMultipleResponses,
  mockGetProfileByHandleQueryMockedResponse,
  mockGetProfileByIdQueryMockedResponse,
  mockProfileFieldsFragment,
} from '@lens-protocol/api/mocks';
import { waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { useProfile } from '../useProfile';
import { ProfileFieldsFragment } from '../useProfilesToFollow';

describe('Given the useProfile hook', () => {
  const id = '0x2000';
  const handle = 'aave.lens';
  const mockProfile: ProfileFieldsFragment = mockProfileFieldsFragment({ id, handle });

  describe('when supplied with a profile id', () => {
    describe('and the query returns data successfully', () => {
      it('should return a profile', async () => {
        const { result } = renderHookWithMocks(() => useProfile({ id }), {
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
  });

  describe('when supplied with a profile handle', () => {
    describe('and the query returns data successfully', () => {
      it('should return a profile', async () => {
        const { result } = renderHookWithMocks(() => useProfile({ handle }), {
          mocks: {
            apolloClient: createMockApolloClientWithMultipleResponses([
              mockGetProfileByHandleQueryMockedResponse({ profile: mockProfile, handle }),
            ]),
          },
        });

        await waitFor(() => expect(result.current.loading).toBeFalsy());

        expect(result.current.data).toEqual(mockProfile);
      });
    });
  });
});
