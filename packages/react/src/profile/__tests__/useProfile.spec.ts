import {
  createMockApolloClientWithMultipleResponses,
  createGetProfileQueryMockedResponse,
  mockProfileFieldsFragment,
} from '@lens-protocol/api-bindings/mocks';
import { waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { useProfile } from '../useProfile';
import { ProfileFieldsFragment } from '../useProfilesToFollow';

describe(`Given the ${useProfile.name} hook`, () => {
  const profileId = '0x2000';
  const handle = 'aave.lens';
  const mockProfile: ProfileFieldsFragment = mockProfileFieldsFragment({ id: profileId, handle });

  describe('when supplied with a profile id', () => {
    describe('and the query returns data successfully', () => {
      it('should return a profile', async () => {
        const { result } = renderHookWithMocks(() => useProfile({ profileId: profileId }), {
          mocks: {
            apolloClient: createMockApolloClientWithMultipleResponses([
              createGetProfileQueryMockedResponse({
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
      it('should return a profile', async () => {
        const { result } = renderHookWithMocks(() => useProfile({ handle }), {
          mocks: {
            apolloClient: createMockApolloClientWithMultipleResponses([
              createGetProfileQueryMockedResponse({
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
});
