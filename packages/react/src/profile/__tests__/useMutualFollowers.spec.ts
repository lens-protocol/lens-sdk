import { LimitType } from '@lens-protocol/api-bindings';
import {
  mockProfileFragment,
  mockMutualFollowersResponse,
  simulateNotAuthenticated,
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

  beforeAll(() => {
    simulateNotAuthenticated();
  });

  describe('when the query returns data successfully', () => {
    it('should settle with the profiles', async () => {
      const { renderHook } = setupHookTestScenario([
        mockMutualFollowersResponse({
          variables: {
            observer: observerProfileId,
            viewing: viewingProfileId,
            limit: LimitType.Ten,
          },
          items: profiles,
        }),
      ]);

      const args: UseMutualFollowersArgs = {
        observer: observerProfileId,
        viewing: viewingProfileId,
      };

      const { result } = renderHook(() => useMutualFollowers(args));

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toMatchObject(expectations);
    });
  });
});
