import { mockProfileFragment, mockSearchProfilesResponse } from '@lens-protocol/api-bindings/mocks';
import { waitFor } from '@testing-library/react';

import { setupHookTestScenario } from '../../__helpers__/setupHookTestScenario';
import { UseSearchProfilesArgs, useSearchProfiles } from '../useSearchProfiles';

describe(`Given the ${useSearchProfiles.name} hook`, () => {
  const query = 'query_test';
  const profiles = [mockProfileFragment()];
  const expectations = profiles.map(({ id }) => ({ __typename: 'Profile', id }));

  describe('when the query returns data successfully', () => {
    it('should return profiles that match the search criteria', async () => {
      const { renderHook } = setupHookTestScenario([
        mockSearchProfilesResponse({
          variables: {
            query,
          },
          items: profiles,
        }),
      ]);

      const args: UseSearchProfilesArgs = {
        query,
      };

      const { result } = renderHook(() => useSearchProfiles(args));

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toMatchObject(expectations);
    });
  });
});
