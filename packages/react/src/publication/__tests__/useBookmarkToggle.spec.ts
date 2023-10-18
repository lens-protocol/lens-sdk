import { DocumentNode } from '@apollo/client';
import {
  AnyPublication,
  FragmentMirror,
  FragmentPost,
  Profile,
  isPrimaryPublication,
} from '@lens-protocol/api-bindings';
import {
  mockAddToMyBookmarksResponse,
  mockLensApolloClient,
  mockMirrorFragment,
  mockPostFragment,
  mockProfileFragment,
  mockPublicationOperationsFragment,
  mockRemoveFromMyBookmarksResponse,
} from '@lens-protocol/api-bindings/mocks';
import { RenderHookResult, act, waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { PublicationCacheManager } from '../infrastructure/PublicationCacheManager';
import { useBookmarkToggle } from '../useBookmarkToggle';

function setupTestScenario({
  fragment,
  publication,
}: {
  fragment: DocumentNode;
  profile: Profile;
  publication: AnyPublication;
}) {
  const publicationId = !isPrimaryPublication(publication)
    ? publication.mirrorOn.id
    : publication.id;

  const apolloClient = mockLensApolloClient([
    mockAddToMyBookmarksResponse({
      request: { on: publicationId },
    }),
    mockRemoveFromMyBookmarksResponse({
      request: { on: publicationId },
    }),
  ]);

  apolloClient.cache.writeFragment({
    id: apolloClient.cache.identify(publication),
    fragment,
    fragmentName: publication.__typename,
    data: publication,
  });

  const cacheManager = new PublicationCacheManager(apolloClient);

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
    const profile = mockProfileFragment();

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
          operations: mockPublicationOperationsFragment({ hasBookmarked: initial }),
        });
        const scenario = setupTestScenario({
          fragment: FragmentPost,
          profile,
          publication,
        });

        const { result } = scenario.renderHook(() => useBookmarkToggle());

        act(() => {
          void result.current.execute({ publication });
        });

        expect(result.current).toMatchObject({
          loading: true,
        });

        await waitFor(() => expect(result.current.loading).toBe(false));
        expect(scenario.updatedPublicationFragment).toMatchObject({
          operations: {
            hasBookmarked: expected,
          },
        });
      },
    );

    it('should update the `publication.mirrorOn.operations.hasBookmarked` in case the `publication` is a Mirror', async () => {
      const publication = mockMirrorFragment({
        mirrorOn: mockPostFragment({
          operations: mockPublicationOperationsFragment({ hasBookmarked: false }),
        }),
      });
      const scenario = setupTestScenario({ fragment: FragmentMirror, profile, publication });

      const { result } = scenario.renderHook(() => useBookmarkToggle());

      act(() => {
        void result.current.execute({ publication });
      });

      await waitFor(() => expect(result.current.loading).toBe(false));
      expect(scenario.updatedPublicationFragment).toMatchObject({
        mirrorOn: {
          operations: {
            hasBookmarked: true,
          },
        },
      });
    });
  });
});
