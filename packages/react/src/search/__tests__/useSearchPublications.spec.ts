import {
  LimitType,
  PrimaryPublication,
  PublicationMetadataMainFocusType,
  SearchPublicationType,
} from '@lens-protocol/api-bindings';
import {
  mockCommentFragment,
  mockLensApolloClient,
  mockPostFragment,
  mockSearchPublicationsResponse,
} from '@lens-protocol/api-bindings/mocks';
import { waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import {
  defaultMediaTransformsConfig,
  mediaTransformConfigToQueryVariables,
} from '../../mediaTransforms';
import { UseSearchPublicationsArgs, useSearchPublications } from '../useSearchPublications';

function setupTestScenario({
  result,
  ...args
}: UseSearchPublicationsArgs & {
  result: PrimaryPublication[];
}) {
  return renderHookWithMocks(() => useSearchPublications(args), {
    mocks: {
      mediaTransforms: defaultMediaTransformsConfig,
      apolloClient: mockLensApolloClient([
        mockSearchPublicationsResponse({
          variables: {
            ...args,
            limit: LimitType.Ten,
            ...mediaTransformConfigToQueryVariables(defaultMediaTransformsConfig),
          },
          items: result,
        }),
      ]),
    },
  });
}

describe(`Given the ${useSearchPublications.name} hook`, () => {
  const query = 'query_test';
  const publications = [mockPostFragment(), mockCommentFragment()];
  const expectations = publications.map(({ __typename, id }) => ({ __typename, id }));

  describe('when the query returns data successfully', () => {
    it.only('should return publications that match the search result', async () => {
      const { result } = setupTestScenario({
        query,
        where: {
          publicationTypes: [SearchPublicationType.Post],
          metadata: {
            mainContentFocus: [PublicationMetadataMainFocusType.Audio],
          },
        },
        result: publications,
      });

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toMatchObject(expectations);
    });
  });
});
