import {
  Profile,
  SessionType,
  authenticatedProfile,
  authenticatedWallet,
  notAuthenticated,
  resetSession,
  updateSession,
} from '@lens-protocol/api-bindings';
import {
  mockGetProfileResponse,
  mockLensApolloClient,
  mockProfileFragment,
  mockSources,
} from '@lens-protocol/api-bindings/mocks';
import { mockProfileIdentifier, mockWalletData } from '@lens-protocol/domain/mocks';
import { act, waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import {
  defaultMediaTransformsConfig,
  mediaTransformConfigToQueryVariables,
} from '../../mediaTransforms';
import { useCurrentSession } from '../useCurrentSession';

function setupUseCurrentSession({ profile = mockProfileFragment() }: { profile?: Profile } = {}) {
  const sources = mockSources();

  const apolloClient = mockLensApolloClient([
    mockGetProfileResponse({
      variables: {
        request: { profileId: profile.id },
        sources,
        ...mediaTransformConfigToQueryVariables(defaultMediaTransformsConfig),
      },
      profile,
    }),
  ]);

  return renderHookWithMocks(() => useCurrentSession(), {
    mocks: { sources, mediaTransforms: defaultMediaTransformsConfig, apolloClient },
  });
}

describe(`Given the ${useCurrentSession.name} hook`, () => {
  const profile = mockProfileFragment();
  const wallet = mockWalletData({ address: profile.ownedBy });
  const profileIdentifier = mockProfileIdentifier({ id: profile.id, handle: profile.handle });

  describe(`when the current session is "null"`, () => {
    beforeAll(() => {
      resetSession();
    });

    it('should return the expected loading state', async () => {
      const { result } = setupUseCurrentSession();

      expect(result.current.loading).toBeTruthy();
      expect(result.current.data).toBeUndefined();
    });
  });

  describe.each([
    {
      session: notAuthenticated(),
      expectations: {
        type: SessionType.Anonymous,
      },
    },
    {
      session: authenticatedWallet(wallet),
      expectations: {
        type: SessionType.JustWallet,
        wallet,
      },
    },
    {
      session: authenticatedProfile(wallet, profileIdentifier),
      expectations: {
        type: SessionType.WithProfile,
        wallet,
        profile: {
          __typename: 'Profile',
          ...profileIdentifier,
        },
      },
    },
  ])(`when the current session is`, ({ session, expectations }) => {
    describe(`a ${session.constructor.name}`, () => {
      beforeAll(() => {
        resetSession();
      });

      it('should return the expected session object', async () => {
        const { result } = setupUseCurrentSession({ profile });

        expect(result.current.loading).toBe(true);

        act(() => {
          updateSession(session);
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
      updateSession(notAuthenticated());
    });

    it('should return the profile data without flickering of the "loading" flag', async () => {
      const { result } = setupUseCurrentSession({ profile });

      act(() => {
        updateSession(authenticatedProfile(wallet, profileIdentifier));
      });

      expect(result.current.loading).toBe(false);

      await waitFor(() => {
        expect(result.current.data).toMatchObject({
          type: SessionType.WithProfile,
          wallet,
          profile: {
            __typename: 'Profile',
            ...profileIdentifier,
          },
        });
      });
    });
  });

  describe(`when the user switches to a different profile`, () => {
    const prevProfile = mockProfileFragment();
    const prevWallet = mockWalletData({ address: prevProfile.ownedBy });
    const prevProfileIdentifier = mockProfileIdentifier({
      id: prevProfile.id,
      handle: prevProfile.handle,
    });

    beforeAll(() => {
      updateSession(authenticatedProfile(prevWallet, prevProfileIdentifier));
    });

    it('should return the new profile data', async () => {
      const { result } = setupUseCurrentSession({ profile });

      act(() => {
        updateSession(authenticatedProfile(wallet, profileIdentifier));
      });

      expect(result.current.loading).toBe(true); // loading while fetching the new profile

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
        expect(result.current.data).toMatchObject({
          type: SessionType.WithProfile,
          wallet,
          profile: {
            __typename: 'Profile',
            ...profileIdentifier,
          },
        });
      });
    });
  });
});
