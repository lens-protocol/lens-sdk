import {
  createMockApolloClientWithMultipleResponses,
  mockGetProfileQueryMockedResponse,
  mockProfileFragment,
} from '@lens-protocol/api-bindings/mocks';
import { waitFor } from '@testing-library/react';

import { NotFoundError } from '../../NotFoundError';
import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { useProfile } from '../useProfile';
import { ProfileFragment } from '../useProfilesToFollow';

describe(`Given the ${useProfile.name} hook`, () => {
  const profileId = '0x2000';
  const handle = 'aave.lens';
  const mockProfile: ProfileFragment = mockProfileFragment({ id: profileId, handle });

  describe('when supplied with a profile id', () => {
    describe('and the query returns data successfully', () => {
      it('should settle with the profile data', async () => {
        const { result } = renderHookWithMocks(() => useProfile({ profileId: profileId }), {
          mocks: {
            apolloClient: createMockApolloClientWithMultipleResponses([
              mockGetProfileQueryMockedResponse({
                profile: mockProfile,
                request: {
                  profileId,
                },
              }),
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
      it('should settle with the profile data', async () => {
        const { result } = renderHookWithMocks(() => useProfile({ handle }), {
          mocks: {
            apolloClient: createMockApolloClientWithMultipleResponses([
              mockGetProfileQueryMockedResponse({
                profile: mockProfile,
                request: { handle },
              }),
            ]),
          },
        });

        await waitFor(() => expect(result.current.loading).toBeFalsy());

        expect(result.current.data).toEqual(mockProfile);
      });
    });
  });

  describe('when the query returns null', () => {
    it(`should settle with a ${NotFoundError.name} state`, async () => {
      const { result } = renderHookWithMocks(() => useProfile({ handle }), {
        mocks: {
          apolloClient: createMockApolloClientWithMultipleResponses([
            mockGetProfileQueryMockedResponse({
              profile: null,
              request: { handle },
            }),
          ]),
        },
      });

      await waitFor(() => expect(result.current.loading).toBeFalsy());

      expect(result.current.error).toBeInstanceOf(NotFoundError);
    });
  });
});
