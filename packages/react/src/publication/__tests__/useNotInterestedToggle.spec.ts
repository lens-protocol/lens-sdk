import { DocumentNode } from '@apollo/client';
import {
  AnyPublication,
  FragmentMirror,
  FragmentPost,
  isMirrorPublication,
} from '@lens-protocol/api-bindings';
import {
  mockAddPublicationNotInterestedResponse,
  mockLensApolloClient,
  mockMirrorFragment,
  mockPostFragment,
  mockPublicationOperationsFragment,
  mockUndoPublicationNotInterestedResponse,
} from '@lens-protocol/api-bindings/mocks';
import { RenderHookResult, act, waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { PublicationCacheManager } from '../infrastructure/PublicationCacheManager';
import { useNotInterestedToggle } from '../useNotInterestedToggle';

function setupTestScenario({
  fragment,
  publication,
}: {
  fragment: DocumentNode;
  publication: AnyPublication;
}) {
  const publicationId = isMirrorPublication(publication) ? publication.mirrorOn.id : publication.id;

  const apolloClient = mockLensApolloClient([
    mockAddPublicationNotInterestedResponse({
      request: { on: publicationId },
    }),
    mockUndoPublicationNotInterestedResponse({
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

describe(`Given the ${useNotInterestedToggle.name} hook`, () => {
  describe('when invoking the hook callback', () => {
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
      'should toggle the `publication.notInterested` from "$initial" to "$expected"',
      async ({ initial, expected }) => {
        const publication = mockPostFragment({
          operations: mockPublicationOperationsFragment({ isNotInterested: initial }),
        });
        const scenario = setupTestScenario({
          fragment: FragmentPost,
          publication,
        });

        const { result } = scenario.renderHook(() => useNotInterestedToggle());

        act(() => {
          void result.current.execute({ publication });
        });

        expect(result.current).toMatchObject({
          loading: true,
        });

        await waitFor(() => expect(result.current.loading).toBe(false));
        expect(scenario.updatedPublicationFragment).toMatchObject({
          operations: {
            isNotInterested: expected,
          },
        });
      },
    );

    it('should update the `publication.mirrorOf.notInterested` in case the `publication` is a Mirror', async () => {
      const publication = mockMirrorFragment({
        mirrorOn: mockPostFragment({
          operations: mockPublicationOperationsFragment({ isNotInterested: false }),
        }),
      });
      const scenario = setupTestScenario({ fragment: FragmentMirror, publication });

      const { result } = scenario.renderHook(() => useNotInterestedToggle());

      act(() => {
        void result.current.execute({ publication });
      });

      await waitFor(() => expect(result.current.loading).toBe(false));
      expect(scenario.updatedPublicationFragment).toMatchObject({
        mirrorOn: {
          operations: {
            isNotInterested: true,
          },
        },
      });
    });
  });
});
