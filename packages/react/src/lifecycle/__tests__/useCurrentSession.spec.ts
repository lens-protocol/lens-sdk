import {
  FragmentProfile,
  Profile,
  SessionType,
  authenticatedProfile,
  authenticatedWallet,
  notAuthenticated,
  resetSession,
  updateSession,
} from '@lens-protocol/api-bindings';
import {
  mockLensApolloClient,
  mockProfileFragment,
  mockSources,
} from '@lens-protocol/api-bindings/mocks';
import { mockProfileIdentifier, mockWalletData } from '@lens-protocol/domain/mocks';
import { act } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { defaultMediaTransformsConfig } from '../../mediaTransforms';
import { useCurrentSession } from '../useCurrentSession';

function setupUseActiveProfile({ profile = mockProfileFragment() }: { profile?: Profile } = {}) {
  const sources = mockSources();

  const apolloClient = mockLensApolloClient();

  apolloClient.cache.writeFragment({
    id: apolloClient.cache.identify({
      __typename: 'Profile',
      id: profile.id,
    }),
    fragment: FragmentProfile,
    fragmentName: 'Profile',
    data: profile,
  });

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
      const { result } = setupUseActiveProfile();

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
        const { result } = setupUseActiveProfile({ profile });

        expect(result.current.loading).toBe(true);

        act(() => {
          updateSession(session);
        });

        expect(result.current.loading).toBe(false);
        expect(result.current.data).toMatchObject(expectations);
      });
    });
  });

  describe(`when the user logs-in with a Lens Profile`, () => {
    beforeAll(() => {
      updateSession(notAuthenticated());
    });

    it('should return the profile data without flickering of the "loading" flag', async () => {
      const { result } = setupUseActiveProfile({ profile });

      act(() => {
        updateSession(authenticatedProfile(wallet, profileIdentifier));
      });

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
