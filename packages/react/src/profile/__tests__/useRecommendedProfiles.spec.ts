import {
  mockProfileFragment,
  mockProfileRecommendationsResponse,
} from '@lens-protocol/api-bindings/mocks';
import { mockProfileId } from '@lens-protocol/domain/mocks';
import { waitFor } from '@testing-library/react';

import { setupHookTestScenario } from '../../__helpers__/setupHookTestScenario';
import { UseRecommendedProfilesArgs, useRecommendedProfiles } from '../useRecommendedProfiles';

describe(`Given the ${useRecommendedProfiles.name} hook`, () => {
  const profileId = mockProfileId();
  const profiles = [mockProfileFragment()];
  const expectations = profiles.map(({ __typename, id }) => ({ __typename, id }));

  describe('when the query returns data successfully', () => {
    it('should settle with the profiles', async () => {
      const { renderHook } = setupHookTestScenario([
        mockProfileRecommendationsResponse({
          variables: {
            for: profileId,
          },
          items: profiles,
        }),
      ]);

      const args: UseRecommendedProfilesArgs = {
        for: profileId,
      };

      const { result } = renderHook(() => useRecommendedProfiles(args));

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toMatchObject(expectations);
    });
  });
});
