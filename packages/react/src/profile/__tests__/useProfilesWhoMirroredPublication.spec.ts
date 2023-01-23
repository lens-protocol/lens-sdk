import {
  createMockApolloClientWithMultipleResponses,
  createProfilesWhoMirroredPublicationMockedResponse,
  mockPostFragment,
  mockProfileFieldsFragment,
} from '@lens-protocol/api-bindings/mocks';
import { waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { ProfileFieldsFragment } from '../useProfilesToFollow';
import { useProfilesWhoMirroredPublication } from '../useProfilesWhoMirroredPublication';

describe(`Given the ${useProfilesWhoMirroredPublication.name} hook`, () => {
  const observer = mockProfileFieldsFragment();
  const publication = mockPostFragment();

  const mockProfiles: ProfileFieldsFragment[] = [mockProfileFieldsFragment()];

  describe('when the query returns data successfully', () => {
    it('should return profiles that mirrored the queried publication', async () => {
      const { result } = renderHookWithMocks(
        () =>
          useProfilesWhoMirroredPublication({
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
