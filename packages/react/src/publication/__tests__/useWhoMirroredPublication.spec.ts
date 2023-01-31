import {
  createMockApolloClientWithMultipleResponses,
  createProfilesWhoMirroredPublicationMockedResponse,
  mockPostFragment,
  mockProfileFragment,
} from '@lens-protocol/api-bindings/mocks';
import { waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { ProfileFragment } from '../../profile/useProfilesToFollow';
import { useWhoMirroredPublication } from '../useWhoMirroredPublication';

describe(`Given the ${useWhoMirroredPublication.name} hook`, () => {
  const observer = mockProfileFragment();
  const publication = mockPostFragment();

  const mockProfiles: ProfileFragment[] = [mockProfileFragment()];

  describe('when the query returns data successfully', () => {
    it('should return profiles that mirrored the queried publication', async () => {
      const { result } = renderHookWithMocks(
        () =>
          useWhoMirroredPublication({
            publicationId: publication.id,
            observerId: observer.id,
          }),
        {
          mocks: {
            apolloClient: createMockApolloClientWithMultipleResponses([
              createProfilesWhoMirroredPublicationMockedResponse({
                variables: {
                  publicationId: publication.id,
                  observerId: observer.id,
                  limit: 10,
                },
                items: mockProfiles,
              }),
            ]),
          },
        },
      );

      await waitFor(() => expect(result.current.loading).toBeFalsy());

      expect(result.current.data).toEqual(mockProfiles);
    });
  });
});
