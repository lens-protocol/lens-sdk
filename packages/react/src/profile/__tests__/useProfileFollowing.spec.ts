import { mockProfileFragment, mockFollowingResponse } from '@lens-protocol/api-bindings/mocks';
import { mockProfileId } from '@lens-protocol/domain/mocks';
import { waitFor } from '@testing-library/react';

import { setupHookTestScenario } from '../../__helpers__/setupHookTestScenario';
import { UseProfileFollowingArgs, useProfileFollowing } from '../useProfileFollowing';

describe(`Given the ${useProfileFollowing.name} hook`, () => {
  const profileId = mockProfileId();
  const profiles = [mockProfileFragment()];
  const expectations = profiles.map(({ __typename, id }) => ({ __typename, id }));

  describe('when the query returns data successfully', () => {
    it('should settle with the profiles', async () => {
      const { renderHook } = setupHookTestScenario([
        mockFollowingResponse({
          variables: {
            for: profileId,
          },
          items: profiles,
        }),
      ]);

      const args: UseProfileFollowingArgs = {
        for: profileId,
      };

      const { result } = renderHook(() => useProfileFollowing(args));

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toMatchObject(expectations);
    });
  });
});
