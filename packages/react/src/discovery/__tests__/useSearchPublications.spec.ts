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
import { UseSearchPublicationsArgs, useSearchPublications } from '../useSearchPublications';

function setupTestScenario({
  result,
  ...args
}: UseSearchPublicationsArgs & {
  result: PrimaryPublication[];
}) {
  return renderHookWithMocks(() => useSearchPublications(args), {
    mocks: {
      apolloClient: mockLensApolloClient([
        mockSearchPublicationsResponse({
          variables: {
            ...args,
            limit: LimitType.Ten,
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
    it('should return publications that match the search result', async () => {
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
