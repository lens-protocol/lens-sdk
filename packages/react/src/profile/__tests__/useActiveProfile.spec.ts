import { FragmentProfile, Profile, resetSession } from '@lens-protocol/api-bindings';
import {
  mockLensApolloClient,
  mockProfileFragment,
  mockSources,
  simulateNotAuthenticated,
  simulateAuthenticatedWallet,
  simulateAuthenticatedProfile,
} from '@lens-protocol/api-bindings/mocks';
import { mockProfileIdentifier, mockWalletData } from '@lens-protocol/domain/mocks';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { defaultMediaTransformsConfig } from '../../mediaTransforms';
import { useActiveProfile } from '../useActiveProfile';

function setupUseActiveProfile({ profile }: { profile: Profile }) {
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

  return renderHookWithMocks(() => useActiveProfile(), {
    mocks: { sources, mediaTransforms: defaultMediaTransformsConfig, apolloClient },
  });
}

describe(`Given the ${useActiveProfile.name} hook`, () => {
  const profile = mockProfileFragment();

  describe(`when the current session is "null"`, () => {
    beforeAll(() => {
      resetSession();
    });

    it('should return the expected loading state', async () => {
      const { result } = setupUseActiveProfile({ profile });

      expect(result.current.loading).toBeTruthy();
      expect(result.current.data).toBeUndefined();
    });
  });

  describe(`when the current session is anonymous`, () => {
    beforeAll(() => {
      simulateNotAuthenticated();
    });

    it('should return null', async () => {
      const { result } = setupUseActiveProfile({ profile });

      expect(result.current.data).toBeNull();
    });
  });

  describe(`when the current authenticated session does not have an active profile`, () => {
    beforeAll(() => {
      simulateAuthenticatedWallet(mockWalletData());
    });

    it('should return null', async () => {
      const { result } = setupUseActiveProfile({ profile });

      expect(result.current.data).toBeNull();
    });
  });

  describe(`when the current session includes an active profile`, () => {
    beforeAll(() => {
      simulateAuthenticatedProfile(
        mockProfileIdentifier(profile),
        mockWalletData({ address: profile.ownedBy }),
      );
    });

    it('should return the expected profile data without flickering of the "loading" flag', async () => {
      const { result } = setupUseActiveProfile({ profile });

      expect(result.current.loading).toBe(false);
      expect(result.current.data).toMatchObject({
        id: profile.id,
      });
    });
  });
});
