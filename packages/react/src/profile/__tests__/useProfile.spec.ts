import {
  createMockApolloClientWithMultipleResponses,
  mockGetProfileQueryMockedResponse,
  mockProfileFragment,
  mockSources,
} from '@lens-protocol/api-bindings/mocks';
import { mockProfileId } from '@lens-protocol/domain/mocks';
import { waitFor } from '@testing-library/react';

import { NotFoundError } from '../../NotFoundError';
import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { useProfile } from '../useProfile';

const sources = mockSources();

describe(`Given the ${useProfile.name} hook`, () => {
  const profileId = mockProfileId();
  const handle = 'aave.lens';
  const mockProfile = mockProfileFragment({ id: profileId, handle });

  describe('when supplied with a profile id', () => {
    describe('and the query returns data successfully', () => {
      it('should settle with the profile data', async () => {
        const { result } = renderHookWithMocks(() => useProfile({ profileId: profileId }), {
          mocks: {
            sources,
            apolloClient: createMockApolloClientWithMultipleResponses([
              mockGetProfileQueryMockedResponse({
                profile: mockProfile,
                variables: {
                  request: {
                    profileId,
                  },
                  sources,
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
            sources,
            apolloClient: createMockApolloClientWithMultipleResponses([
              mockGetProfileQueryMockedResponse({
                profile: mockProfile,
                variables: {
                  request: { handle },
                  sources,
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

  describe('when the query returns null', () => {
    it(`should settle with a ${NotFoundError.name} state`, async () => {
      const { result } = renderHookWithMocks(() => useProfile({ handle }), {
        mocks: {
          sources,
          apolloClient: createMockApolloClientWithMultipleResponses([
            mockGetProfileQueryMockedResponse({
              profile: null,
              variables: {
                request: { handle },
                sources,
              },
            }),
          ]),
        },
      });

      await waitFor(() => expect(result.current.loading).toBeFalsy());

      expect(result.current.error).toBeInstanceOf(NotFoundError);
    });
  });
});
