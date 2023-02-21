import {
  createGetAllProfilesByOwnerAddressQueryMockedResponse,
  createMockApolloClientWithMultipleResponses,
  mockProfileFragment,
  mockSources,
} from '@lens-protocol/api-bindings/mocks';
import { mockEthereumAddress } from '@lens-protocol/shared-kernel/mocks';
import { waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { useProfilesOwnedBy } from '../useProfilesOwnedBy';

const sources = mockSources();

describe(`Given the ${useProfilesOwnedBy.name} hook`, () => {
  const address = mockEthereumAddress();
  const observer = mockProfileFragment();
  const profiles = [
    mockProfileFragment({ ownedBy: address }),
    mockProfileFragment({ ownedBy: address }),
  ];

  describe('when the query returns data successfully', () => {
    it('should return the profiles owned by the specified address', async () => {
      const { result } = renderHookWithMocks(
        () =>
          useProfilesOwnedBy({
            address,
            observerId: observer.id,
          }),
        {
          mocks: {
            sources,
            apolloClient: createMockApolloClientWithMultipleResponses([
              createGetAllProfilesByOwnerAddressQueryMockedResponse({
                variables: {
                  address,
                  observerId: observer.id,
                  limit: 10,
                  sources,
                },
                profiles,
              }),
            ]),
          },
        },
      );

      await waitFor(() => expect(result.current.loading).toBeFalsy());

      expect(result.current.data).toEqual(profiles);
    });
  });
});
