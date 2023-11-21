import { ExploreProfilesOrderByType } from '@lens-protocol/api-bindings';
import {
  mockExploreProfilesResponse,
  mockProfileFragment,
} from '@lens-protocol/api-bindings/mocks';
import { waitFor } from '@testing-library/react';

import { setupHookTestScenario } from '../../__helpers__/setupHookTestScenario';
import { useExploreProfiles, UseExploreProfilesArgs } from '../useExploreProfiles';

describe(`Given the ${useExploreProfiles.name} hook`, () => {
  const profiles = [mockProfileFragment()];
  const expectations = profiles.map(({ __typename, id }) => ({ __typename, id }));

  describe('when the query returns data successfully', () => {
    it('should return list of profiles', async () => {
      const args: UseExploreProfilesArgs = {
        orderBy: ExploreProfilesOrderByType.LatestCreated,
      };

      const { renderHook } = setupHookTestScenario([
        mockExploreProfilesResponse({
          items: profiles,
          variables: args,
        }),
      ]);

      const { result } = renderHook(() => useExploreProfiles(args));

      await waitFor(() => expect(result.current.loading).toBeFalsy());

      expect(result.current.data).toMatchObject(expectations);
    });
  });
});
