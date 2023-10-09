import {
  mockProfileFragment,
  mockMutualFollowersResponse,
} from '@lens-protocol/api-bindings/mocks';
import { mockProfileId } from '@lens-protocol/domain/mocks';
import { waitFor } from '@testing-library/react';

import { setupHookTestScenario } from '../../__helpers__/setupHookTestScenario';
import { UseMutualFollowersArgs, useMutualFollowers } from '../useMutualFollowers';

describe(`Given the ${useMutualFollowers.name} hook`, () => {
  const observerProfileId = mockProfileId();
  const viewingProfileId = mockProfileId();
  const profiles = [mockProfileFragment()];
  const expectations = profiles.map(({ __typename, id }) => ({ __typename, id }));

  describe('when the query returns data successfully', () => {
    it('should settle with the profiles', async () => {
      const args: UseMutualFollowersArgs = {
        observer: observerProfileId,
        viewing: viewingProfileId,
      };

      const { renderHook } = setupHookTestScenario([
        mockMutualFollowersResponse({
          variables: args,
          items: profiles,
        }),
      ]);

      const { result } = renderHook(() => useMutualFollowers(args));

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toMatchObject(expectations);
    });
  });
});
