import {
  createGetAllProfilesByOwnerAddressQueryMockedResponse,
  createMockApolloClientWithMultipleResponses,
  mockProfileFieldsFragment,
} from '@lens-protocol/api-bindings/mocks';
import { mockEthereumAddress } from '@lens-protocol/shared-kernel/mocks';
import { waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { useProfilesOwnedBy } from '../useProfilesOwnedBy';

describe(`Given the ${useProfilesOwnedBy.name} hook`, () => {
  const address = mockEthereumAddress();
  const observer = mockProfileFieldsFragment();
  const profiles = [
    mockProfileFieldsFragment({ ownedBy: address }),
    mockProfileFieldsFragment({ ownedBy: address }),
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
            apolloClient: createMockApolloClientWithMultipleResponses([
              createGetAllProfilesByOwnerAddressQueryMockedResponse({
                address,
                profiles,
                observerId: observer.id,
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
