import { mockProfileFragment, mockProfileResponse } from '@lens-protocol/api-bindings/mocks';
import { waitFor } from '@testing-library/react';

import { NotFoundError } from '../../NotFoundError';
import { setupHookTestScenario } from '../../__helpers__/setupHookTestScenario';
import { useProfile } from '../useProfile';

describe(`Given the ${useProfile.name} hook`, () => {
  const profile = mockProfileFragment();
  const expectations = { __typename: 'Profile', id: profile.id };

  describe.each([
    {
      description: 'when invoked with a profile id',
      args: { forProfileId: profile.id },
    },
    {
      description: 'when invoked with a profile handle',
      args: { forHandle: profile.handle },
    },
  ])('$description', ({ args }) => {
    it('should settle with the profile data', async () => {
      const { renderHook } = setupHookTestScenario([
        mockProfileResponse({
          variables: {
            request: args,
          },
          result: profile,
        }),
      ]);

      const { result } = renderHook(() => useProfile(args));

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toMatchObject(expectations);
    });

    it(`should settle with a ${NotFoundError.name} if not found`, async () => {
      const { renderHook } = setupHookTestScenario([
        mockProfileResponse({
          variables: {
            request: args,
          },
          result: null,
        }),
      ]);

      const { result } = renderHook(() => useProfile(args));

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.error).toBeInstanceOf(NotFoundError);
    });
  });
});
