import { SafeApolloClient } from '@lens-protocol/api-bindings';
import {
  mockGetProfileBookmarksResponse,
  mockLensApolloClient,
  mockPostFragment,
  mockProfileOwnedByMeFragment,
  mockSources,
  simulateAuthenticatedProfile,
  simulateAuthenticatedWallet,
} from '@lens-protocol/api-bindings/mocks';
import { mockProfile, mockProfileId } from '@lens-protocol/domain/mocks';
import { RenderHookResult, waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import {
  defaultMediaTransformsConfig,
  mediaTransformConfigToQueryVariables,
} from '../../mediaTransforms';
import { useMyBookmarks } from '../useMyBookmarks';

const sources = mockSources();

function setupTestScenario({ client }: { client: SafeApolloClient }) {
  return {
    renderHook<TProps, TResult>(
      callback: (props: TProps) => TResult,
    ): RenderHookResult<TResult, TProps> {
      return renderHookWithMocks(callback, {
        mocks: {
          apolloClient: client,
          sources,
          mediaTransforms: defaultMediaTransformsConfig,
        },
      });
    },
  };
}

describe(`Given the ${useMyBookmarks.name} hook`, () => {
  const profile = mockProfileOwnedByMeFragment();
  const publications = [mockPostFragment()];
  const expectations = publications.map(({ __typename, id }) => ({ __typename, id }));

  beforeAll(() => {
    simulateAuthenticatedWallet();
  });

  describe('when a profile is provided', () => {
    const client = mockLensApolloClient([
      mockGetProfileBookmarksResponse({
        variables: {
          profileId: profile.id,
          observerId: null,
          sources,
          limit: 10,
          ...mediaTransformConfigToQueryVariables(defaultMediaTransformsConfig),
        },
        publications,
      }),
    ]);

    it('should settle with the bookmarked publications', async () => {
      const { renderHook } = setupTestScenario({ client });

      const { result } = renderHook(() => useMyBookmarks({ profile }));

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toMatchObject(expectations);
    });
  });

  describe('when a session with an Active Profile is set', () => {
    const activeProfile = mockProfile();
    const client = mockLensApolloClient([
      mockGetProfileBookmarksResponse({
        variables: {
          profileId: profile.id,
          observerId: activeProfile.id,
          sources,
          limit: 10,
          ...mediaTransformConfigToQueryVariables(defaultMediaTransformsConfig),
        },
        publications,
      }),
    ]);

    beforeAll(() => {
      simulateAuthenticatedProfile(activeProfile);
    });

    afterAll(() => {
      simulateAuthenticatedWallet();
    });

    it('should use the Active Profile as the queried publication observer', async () => {
      const { renderHook } = setupTestScenario({ client });

      const { result } = renderHook(() => useMyBookmarks({ profile }));

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toMatchObject(expectations);
    });
  });

  describe('when an "observerId" is provided', () => {
    const observerId = mockProfileId();
    const client = mockLensApolloClient([
      mockGetProfileBookmarksResponse({
        variables: {
          profileId: profile.id,
          observerId,
          sources,
          limit: 10,
          ...mediaTransformConfigToQueryVariables(defaultMediaTransformsConfig),
        },
        publications,
      }),
    ]);

    it('should allow to override the "observerId" on a per-call basis', async () => {
      const { renderHook } = setupTestScenario({ client });

      const { result } = renderHook(() => useMyBookmarks({ profile, observerId }));

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toMatchObject(expectations);
    });
  });
});
