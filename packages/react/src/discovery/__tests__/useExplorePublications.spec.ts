import {
  ExplorePublicationsOrderByType,
  ExplorePublicationType,
} from '@lens-protocol/api-bindings';
import {
  mockExplorePublicationsResponse,
  mockPostFragment,
} from '@lens-protocol/api-bindings/mocks';
import { waitFor } from '@testing-library/react';

import { setupHookTestScenario } from '../../__helpers__/setupHookTestScenario';
import { useExplorePublications, UseExplorePublicationsArgs } from '../useExplorePublications';

describe(`Given the ${useExplorePublications.name} hook`, () => {
  const publications = [mockPostFragment()];

  describe('when invoked', () => {
    it('should return publications that match the explore parameters', async () => {
      const args: UseExplorePublicationsArgs = {
        where: {
          publicationTypes: [ExplorePublicationType.Post],
        },
        orderBy: ExplorePublicationsOrderByType.TopCommented,
      };

      const { renderHook } = setupHookTestScenario([
        mockExplorePublicationsResponse({
          variables: args,
          items: publications,
        }),
      ]);

      const { result } = renderHook(() => useExplorePublications(args));

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toMatchObject(publications);
    });
  });
});
