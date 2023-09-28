import { MockedResponse } from '@apollo/client/testing';
import { LimitType, PublicationsOrderByType } from '@lens-protocol/api-bindings';
import {
  mockGetPublicationsResponse,
  mockLensApolloClient,
  mockPostFragment,
  mockSources,
  simulateNotAuthenticated,
} from '@lens-protocol/api-bindings/mocks';
import { mockProfileId } from '@lens-protocol/domain/mocks';
import { RenderHookResult, waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { defaultMediaTransformsConfig } from '../../mediaTransforms';
import { usePublications } from '../usePublications';

const sources = mockSources();

function setupTestScenario(mocks: MockedResponse[]) {
  const client = mockLensApolloClient(mocks);

  return {
    renderHook<TProps, TResult>(
      callback: (props: TProps) => TResult,
    ): RenderHookResult<TResult, TProps> {
      return renderHookWithMocks(callback, {
        mocks: {
          sources,
          mediaTransforms: defaultMediaTransformsConfig,
          apolloClient: client,
        },
      });
    },
  };
}

describe(`Given the ${usePublications.name} hook`, () => {
  const profileId = mockProfileId();
  const publications = [mockPostFragment()];
  const expectations = publications.map(({ __typename, id }) => ({ __typename, id }));

  beforeAll(() => {
    simulateNotAuthenticated();
  });

  describe('when the query returns data successfully', () => {
    const { renderHook } = setupTestScenario([
      mockGetPublicationsResponse({
        variables: {
          request: {
            where: {
              actedBy: profileId,
            },
            orderBy: PublicationsOrderByType.Latest,
            limit: LimitType.Ten,
          },
        },
        publications,
      }),
    ]);

    it('should settle with the publications', async () => {
      const { result } = renderHook(() =>
        usePublications({
          where: {
            actedBy: profileId,
          },
        }),
      );

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toMatchObject(expectations);
    });
  });
});
