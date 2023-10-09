import { Profile, resetSession, updateSessionData } from '@lens-protocol/api-bindings';
import { mockProfileFragment, mockProfileResponse } from '@lens-protocol/api-bindings/mocks';
import {
  anonymousSessionData,
  profileSessionData,
  SessionType,
} from '@lens-protocol/domain/use-cases/authentication';
import { act, waitFor } from '@testing-library/react';

import { setupHookTestScenario } from '../../__helpers__/setupHookTestScenario';
import { useSession } from '../useSession';

function setupTestScenario({ profiles }: { profiles: Profile[] }) {
  return setupHookTestScenario(
    profiles.map((profile) =>
      mockProfileResponse({
        variables: {
          request: { forProfileId: profile.id },
        },
        result: profile,
      }),
    ),
  );
}

describe(`Given the ${useSession.name} hook`, () => {
  const profile = mockProfileFragment();

  describe(`when the current session is "null"`, () => {
    beforeAll(() => {
      resetSession();
    });

    it('should return the expected loading state', async () => {
      const { renderHook } = setupTestScenario({ profiles: [] });

      const { result } = renderHook(() => useSession());

      expect(result.current.loading).toBeTruthy();
      expect(result.current.data).toBeUndefined();
    });
  });

  describe.each([
    {
      session: anonymousSessionData(),
      expectations: {
        type: SessionType.Anonymous,
        authenticated: false,
      },
    },
    {
      session: profileSessionData({ address: profile.ownedBy.address, profileId: profile.id }),
      expectations: {
        type: SessionType.WithProfile,
        authenticated: true,
        address: profile.ownedBy.address,
        profile: {
          __typename: 'Profile',
          id: profile.id,
        },
      },
    },
  ])(`when the initial session is:`, ({ session, expectations }) => {
    describe(session.type, () => {
      beforeAll(() => {
        resetSession();
      });

      it('should return the expected session object', async () => {
        const { renderHook } = setupTestScenario({ profiles: [profile] });

        const { result } = renderHook(() => useSession());

        expect(result.current.loading).toBe(true);

        act(() => {
          updateSessionData(session);
        });

        await waitFor(() => {
          expect(result.current.loading).toBe(false);
          expect(result.current.data).toMatchObject(expectations);
        });
      });
    });
  });

  describe(`when the user logs-in with a Lens Profile`, () => {
    beforeAll(() => {
      updateSessionData(anonymousSessionData());
    });

    it('should return the profile data without flickering of the "loading" flag', async () => {
      const { renderHook } = setupTestScenario({ profiles: [profile] });

      const { result } = renderHook(() => useSession());

      act(() => {
        updateSessionData(
          profileSessionData({ address: profile.ownedBy.address, profileId: profile.id }),
        );
      });

      expect(result.current.loading).toBe(false);

      await waitFor(() => {
        expect(result.current.data).toMatchObject({
          type: SessionType.WithProfile,
          address: profile.ownedBy.address,
          profile: {
            __typename: 'Profile',
            id: profile.id,
          },
        });
      });
    });
  });

  describe(`when the user switches to a different profile`, () => {
    const prevProfile = mockProfileFragment();

    beforeAll(() => {
      updateSessionData(anonymousSessionData());
    });

    it('should return the new profile data', async () => {
      const { renderHook } = setupTestScenario({ profiles: [prevProfile, profile] });

      const { result } = renderHook(() => useSession());

      act(() => {
        updateSessionData(
          profileSessionData({ address: prevProfile.ownedBy.address, profileId: prevProfile.id }),
        );
      });

      await waitFor(() => {
        // previous profile loaded
        expect(result.current.loading).toBe(false);
        expect(result.current.data).toMatchObject({
          type: SessionType.WithProfile,
          address: prevProfile.ownedBy.address,
          profile: {
            __typename: 'Profile',
            id: prevProfile.id,
          },
        });
      });

      act(() => {
        // change to a new profile
        updateSessionData(
          profileSessionData({ address: profile.ownedBy.address, profileId: profile.id }),
        );
      });

      // loading state shouldn't change anymore, return previous session while loading a new profile
      expect(result.current.loading).toBe(false);

      await waitFor(() => {
        expect(result.current.data).toMatchObject({
          type: SessionType.WithProfile,
          address: profile.ownedBy.address,
          profile: {
            __typename: 'Profile',
            id: profile.id,
          },
        });
      });
    });
  });
});
