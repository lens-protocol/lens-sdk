import { DocumentNode } from '@apollo/client';
import {
  AnyPublication,
  FragmentMirror,
  FragmentPost,
  ProfileOwnedByMe,
  isMirrorPublication,
} from '@lens-protocol/api-bindings';
import {
  mockAddToMyBookmarksResponse,
  mockLensApolloClient,
  mockMirrorFragment,
  mockPostFragment,
  mockProfileOwnedByMeFragment,
  mockRemoveFromMyBookmarksResponse,
} from '@lens-protocol/api-bindings/mocks';
import { RenderHookResult, act, waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { PublicationCacheManager } from '../../transactions/adapters/PublicationCacheManager';
import { useBookmarkToggle } from '../useBookmarkToggle';

function setupTestScenario({
  fragment,
  profile,
  publication,
}: {
  fragment: DocumentNode;
  profile: ProfileOwnedByMe;
  publication: AnyPublication;
}) {
  const publicationId = isMirrorPublication(publication) ? publication.mirrorOf.id : publication.id;

  const apolloClient = mockLensApolloClient([
    mockAddToMyBookmarksResponse({
      request: { publicationId, profileId: profile.id },
    }),
    mockRemoveFromMyBookmarksResponse({
      request: { publicationId, profileId: profile.id },
    }),
  ]);

  apolloClient.cache.writeFragment({
    id: apolloClient.cache.identify(publication),
    fragment,
    fragmentName: publication.__typename,
    data: publication,
  });

  const cacheManager = new PublicationCacheManager(apolloClient.cache);

  return {
    renderHook<TProps, TResult>(
      callback: (props: TProps) => TResult,
    ): RenderHookResult<TResult, TProps> {
      return renderHookWithMocks(callback, {
        mocks: {
          apolloClient: apolloClient,
          publicationCacheManager: cacheManager,
        },
      });
    },

    get updatedPublicationFragment() {
      return apolloClient.cache.readFragment({
        id: apolloClient.cache.identify(publication),
        fragment,
        fragmentName: publication.__typename,
      });
    },
  };
}

describe(`Given the ${useBookmarkToggle.name} hook`, () => {
  describe('when invoking the hook callback', () => {
    const profile = mockProfileOwnedByMeFragment();

    it.each([
      {
        initial: true,
        expected: false,
      },
      {
        initial: false,
        expected: true,
      },
    ])(
      'should toggle the `publication.bookmarked` from "$initial" to "$expected"',
      async ({ initial, expected }) => {
        const publication = mockPostFragment({
          bookmarked: initial,
          observedBy: profile.id,
        });
        const scenario = setupTestScenario({
          fragment: FragmentPost,
          profile,
          publication,
        });

        const { result } = scenario.renderHook(() => useBookmarkToggle({ publication, profile }));

        act(() => {
          void result.current.execute();
        });

        expect(result.current).toMatchObject({
          isPending: true,
        });

        await waitFor(() => expect(result.current.isPending).toBe(false));
        expect(scenario.updatedPublicationFragment).toMatchObject({
          bookmarked: expected,
        });
      },
    );

    it('should update the `publication.mirrorOf.bookmarked` in case the `publication` is a Mirror', async () => {
      const publication = mockMirrorFragment({
        mirrorOf: mockPostFragment({
          bookmarked: false,
          observedBy: profile.id,
        }),
      });
      const scenario = setupTestScenario({ fragment: FragmentMirror, profile, publication });

      const { result } = scenario.renderHook(() => useBookmarkToggle({ publication, profile }));

      act(() => {
        void result.current.execute();
      });

      await waitFor(() => expect(result.current.isPending).toBe(false));
      expect(scenario.updatedPublicationFragment).toMatchObject({
        mirrorOf: {
          bookmarked: true,
        },
      });
    });
  });
});
