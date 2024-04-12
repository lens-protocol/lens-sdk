import { Profile, resetSessionData, updateSessionData } from '@lens-protocol/api-bindings';
import { mockProfileFragment, mockProfileResponse } from '@lens-protocol/api-bindings/mocks';
import {
  anonymousSessionData,
  profileSessionData,
  SessionType,
  walletOnlySessionData,
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

  describe('when rendered in traditional non-suspense mode', () => {
    beforeAll(() => {
      resetSessionData();
    });

    it('should return the expected initial loading state', async () => {
      const { renderHook } = setupTestScenario({ profiles: [] });

      const { result } = renderHook(() => useSession());

      expect(result.current.loading).toBeTruthy();
      expect(result.current.data).toBeUndefined();
    });
  });

  describe('when rendered in suspense mode', () => {
    beforeAll(() => {
      resetSessionData();
    });

    it('should suspend and render once the session data is determined', async () => {
      const { renderHook } = setupTestScenario({ profiles: [] });

      const { result } = renderHook(() => useSession({ suspense: true }));

      act(() => {
        updateSessionData(anonymousSessionData());
      });

      await waitFor(() => {
        expect(result.current.data.type).toBe(SessionType.Anonymous);
      });
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
      session: walletOnlySessionData({ address: profile.ownedBy.address }),
      expectations: {
        type: SessionType.JustWallet,
        authenticated: true,
        address: profile.ownedBy.address,
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
        resetSessionData();
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

  describe(`and the initial session is ${SessionType.Anonymous}`, () => {
    describe(`when the user logs-in with just a wallet`, () => {
      beforeAll(() => {
        updateSessionData(anonymousSessionData());
      });

      it('should return the expected WalletOnlySession', async () => {
        const { renderHook } = setupTestScenario({ profiles: [profile] });

        const { result } = renderHook(() => useSession());

        act(() => {
          updateSessionData(walletOnlySessionData({ address: profile.ownedBy.address }));
        });

        expect(result.current.loading).toBe(false);

        await waitFor(() => {
          expect(result.current.data).toMatchObject({
            type: SessionType.JustWallet,
            address: profile.ownedBy.address,
            authenticated: true,
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

        await waitFor(() => {
          expect(result.current.loading).toBe(false);
        });

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

  describe(`and the initial session is ${SessionType.WithProfile}`, () => {
    describe(`when the user switches to a different profile`, () => {
      const prevProfile = mockProfileFragment();

      beforeAll(() => {
        updateSessionData(
          profileSessionData({ address: prevProfile.ownedBy.address, profileId: prevProfile.id }),
        );
      });

      it('should return the new profile data', async () => {
        const { renderHook } = setupTestScenario({ profiles: [prevProfile, profile] });

        const { result } = renderHook(() => useSession());

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
});
