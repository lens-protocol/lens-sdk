import {
  PublicationMetadataMainFocusType,
  SearchPublicationType,
} from '@lens-protocol/api-bindings';
import {
  mockCommentFragment,
  mockPostFragment,
  mockSearchPublicationsResponse,
} from '@lens-protocol/api-bindings/mocks';
import { waitFor } from '@testing-library/react';

import { setupHookTestScenario } from '../../__helpers__/setupHookTestScenario';
import { UseSearchPublicationsArgs, useSearchPublications } from '../useSearchPublications';

describe(`Given the ${useSearchPublications.name} hook`, () => {
  const query = 'query_test';
  const publications = [mockPostFragment(), mockCommentFragment()];
  const expectations = publications.map(({ __typename, id }) => ({ __typename, id }));

  describe('when the query returns data successfully', () => {
    it('should return publications that match the search result', async () => {
      const args: UseSearchPublicationsArgs = {
        query,
        where: {
          publicationTypes: [SearchPublicationType.Post],
          metadata: {
            mainContentFocus: [PublicationMetadataMainFocusType.Audio],
          },
        },
      };

      const { renderHook } = setupHookTestScenario([
        mockSearchPublicationsResponse({
          variables: args,
          items: publications,
        }),
      ]);

      const { result } = renderHook(() => useSearchPublications(args));

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toMatchObject(expectations);
    });
  });
});
