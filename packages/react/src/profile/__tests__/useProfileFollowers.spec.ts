import { LimitType } from '@lens-protocol/api-bindings';
import {
  mockProfileFragment,
  mockFollowersResponse,
  simulateNotAuthenticated,
} from '@lens-protocol/api-bindings/mocks';
import { mockProfileId } from '@lens-protocol/domain/mocks';
import { waitFor } from '@testing-library/react';

import { setupHookTestScenario } from '../../__helpers__/setupHookTestScenario';
import { UseProfileFollowersArgs, useProfileFollowers } from '../useProfileFollowers';

describe(`Given the ${useProfileFollowers.name} hook`, () => {
  const profileId = mockProfileId();
  const profiles = [mockProfileFragment()];
  const expectations = profiles.map(({ __typename, id }) => ({ __typename, id }));

  beforeAll(() => {
    simulateNotAuthenticated();
  });

  describe('when the query returns data successfully', () => {
    it('should settle with the profiles', async () => {
      const { renderHook } = setupHookTestScenario([
        mockFollowersResponse({
          variables: {
            of: profileId,
            limit: LimitType.Ten,
          },
          items: profiles,
        }),
      ]);

      const args: UseProfileFollowersArgs = {
        of: profileId,
      };

      const { result } = renderHook(() => useProfileFollowers(args));

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toMatchObject(expectations);
    });
  });
});
