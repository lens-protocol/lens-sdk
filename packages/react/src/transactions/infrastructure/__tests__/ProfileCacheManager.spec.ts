import { Profile, FragmentProfile, SingleProfileQueryRequest } from '@lens-protocol/api-bindings';
import {
  mockLensApolloClient,
  mockGetProfileResponse,
  mockProfileFragment,
  mockSources,
  simulateAuthenticatedWallet,
  simulateAuthenticatedProfile,
} from '@lens-protocol/api-bindings/mocks';
import { ProfileId } from '@lens-protocol/domain/entities';
import { mockProfile, mockProfileId } from '@lens-protocol/domain/mocks';
import identity from 'lodash/identity';

import {
  defaultMediaTransformsConfig,
  mediaTransformConfigToQueryVariables,
} from '../../../mediaTransforms';
import { ProfileCacheManager } from '../ProfileCacheManager';

function setupTestScenario({
  profile,
  expectedObserverId = null,
  cacheEntry = profile,
  expectedRequest = { profileId: profile.id },
}: {
  expectedRequest?: SingleProfileQueryRequest;
  cacheEntry?: Profile | null;
  expectedObserverId?: ProfileId | null;
  profile: Profile;
}) {
  const handleResolver = (v: string) => v;
  const sources = mockSources();
  const mediaTransforms = defaultMediaTransformsConfig;
  const client = mockLensApolloClient([
    mockGetProfileResponse({
      profile: profile,
      variables: {
        request: expectedRequest,
        observerId: expectedObserverId,
        sources,
        ...mediaTransformConfigToQueryVariables(mediaTransforms),
      },
    }),
  ]);

  const profileIdentifier = client.cache.identify({
    __typename: 'Profile',
    id: profile.id,
  });

  client.cache.writeFragment({
    id: profileIdentifier,
    fragment: FragmentProfile,
    fragmentName: 'Profile',
    data: cacheEntry,
  });

  const manager = new ProfileCacheManager(client, sources, mediaTransforms, handleResolver);

  return {
    manager,

    get profileFromCache() {
      return client.cache.readFragment({
        id: profileIdentifier,
        fragmentName: 'Profile',
        fragment: FragmentProfile,
      });
    },
  };
}

describe(`Given an instance of the ${ProfileCacheManager.name}`, () => {
  const profile = mockProfileFragment();
  const expectations = { __typename: 'Profile', id: profile.id };

  describe(`when invoking the "${ProfileCacheManager.prototype.fetchProfile.name}" method`, () => {
    beforeAll(() => {
      simulateAuthenticatedWallet();
    });

    it('should allow to query by profile Id', async () => {
      const { manager } = setupTestScenario({
        profile,
      });

      const actual = await manager.fetchProfile(profile.id);

      expect(actual).toMatchObject(expectations);
    });

    it('should use the Active Profile if available as observerId', async () => {
      const activeProfile = mockProfile();
      simulateAuthenticatedProfile(activeProfile);

      const { manager } = setupTestScenario({
        profile,
        expectedObserverId: activeProfile.id,
      });

      const actual = await manager.fetchProfile(profile.id);

      expect(actual).toMatchObject(expectations);
    });
  });

  describe(`when invoking the "${ProfileCacheManager.prototype.fetchNewProfile.name}" method`, () => {
    beforeAll(() => {
      simulateAuthenticatedWallet();
    });

    it('should allow to query by profile handle', async () => {
      const { manager } = setupTestScenario({
        profile,
        expectedRequest: { handle: profile.handle },
      });

      const actual = await manager.fetchNewProfile(profile.handle);

      expect(actual).toMatchObject(expectations);
    });

    it('should use the Active Profile if available as observerId', async () => {
      const activeProfile = mockProfile();
      simulateAuthenticatedProfile(activeProfile);

      const { manager } = setupTestScenario({
        profile,
        expectedRequest: { handle: profile.handle },
        expectedObserverId: activeProfile.id,
      });

      const actual = await manager.fetchNewProfile(profile.handle);

      expect(actual).toMatchObject(expectations);
    });
  });

  describe(`when invoking the "${ProfileCacheManager.prototype.refreshProfile.name}" method`, () => {
    beforeAll(() => {
      simulateAuthenticatedWallet();
    });

    it('should update the cache with fresh data from the API', async () => {
      const cacheEntry = mockProfileFragment({
        id: profile.id,
        handle: profile.handle,
        ownedBy: profile.ownedBy,
      });

      const scenario = setupTestScenario({
        profile,
        cacheEntry,
      });

      const actual = await scenario.manager.refreshProfile(profile.id);

      expect(scenario.profileFromCache).toMatchObject(expectations);
      expect(actual).toMatchObject(expectations);
    });

    it('should update the cache even if the initial cache entry is null', async () => {
      const scenario = setupTestScenario({
        profile,
        cacheEntry: null,
      });

      const actual = await scenario.manager.refreshProfile(profile.id);

      expect(scenario.profileFromCache).toMatchObject(expectations);
      expect(actual).toMatchObject(expectations);
    });
  });

  describe(`when invoking the "${ProfileCacheManager.prototype.updateProfile.name}" method`, () => {
    it(`should update properly the profile fragment in the`, () => {
      const scenario = setupTestScenario({ profile });

      scenario.manager.updateProfile(profile.id, (current) => ({
        ...current,
        name: 'Bob',
      }));

      expect(scenario.profileFromCache).toMatchObject({
        name: 'Bob',
      });
    });

    it(`should be resilient to missing entry in cache`, () => {
      const scenario = setupTestScenario({ profile });

      expect(() => scenario.manager.updateProfile(mockProfileId(), identity)).not.toThrowError();
    });
  });
});
