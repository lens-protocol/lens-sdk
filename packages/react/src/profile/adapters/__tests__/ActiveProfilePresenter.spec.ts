import { ApolloClient } from '@apollo/client';
import { GetProfileDocument, ProfileFragment } from '@lens-protocol/api-bindings';
import {
  createMockApolloCache,
  mockGetProfileQuery,
  mockProfileFragment,
} from '@lens-protocol/api-bindings/mocks';

import { ActiveProfilePresenter, activeProfileVar } from '../ActiveProfilePresenter';

// Utility that can be used to wait for a response of an Apollo query/mutation.
// See:
// https://www.apollographql.com/docs/react/development-testing/testing/#testing-the-success-state
const waitForResponse = () => new Promise((res) => setTimeout(res, 0));

function setupApolloClient({ profile }: { profile: ProfileFragment }) {
  const cache = createMockApolloCache();

  const updateProfileCache = (profilePatch: Omit<ProfileFragment, 'id'>) => {
    cache.writeQuery({
      query: GetProfileDocument,
      data: mockGetProfileQuery({ ...profile, ...profilePatch }),
      variables: {
        request: { profileId: profile.id },
      },
    });
  };

  updateProfileCache(profile);

  return {
    client: new ApolloClient({
      cache,
    }),
    updateProfileCache,
  };
}

describe(`Given the ${ActiveProfilePresenter.name}`, () => {
  describe(`when "${ActiveProfilePresenter.prototype.presentActiveProfile.name}" method is invoked`, () => {
    it(`should
        - set active profile reactive var
        - update the active profile reactive var on cache updates`, async () => {
      const activeProfile = mockProfileFragment();

      const { client, updateProfileCache } = setupApolloClient({
        profile: activeProfile,
      });
      const presenter = new ActiveProfilePresenter(client);

      await presenter.presentActiveProfile(activeProfile);

      expect(activeProfileVar()).toEqual(activeProfile);

      const newActiveProfile = mockProfileFragment({ id: activeProfile.id });
      updateProfileCache(newActiveProfile);

      await waitForResponse();

      expect(activeProfileVar()).toEqual(newActiveProfile);
    });

    describe('and later invoked a second time with "null"', () => {
      it(`should
          - set the active profile to null
          - stops watching for cache updates`, async () => {
        const activeProfile = mockProfileFragment();

        const { client, updateProfileCache } = setupApolloClient({
          profile: activeProfile,
        });

        const presenter = new ActiveProfilePresenter(client);

        await presenter.presentActiveProfile(activeProfile);
        await presenter.presentActiveProfile(null);

        expect(activeProfileVar()).toBeNull();

        const newActiveProfile = mockProfileFragment({ id: activeProfile.id });
        updateProfileCache(newActiveProfile);

        await waitForResponse();

        expect(activeProfileVar()).toBeNull();
      });
    });
  });
});
