import {
  mockPublicationRevenueFragment,
  mockRevenueFromPublicationsResponse,
} from '@lens-protocol/api-bindings/mocks';
import { mockProfileId } from '@lens-protocol/domain/mocks';
import { waitFor } from '@testing-library/react';

import { setupHookTestScenario } from '../../__helpers__/setupHookTestScenario';
import {
  UseRevenueFromPublicationsArgs,
  useRevenueFromPublications,
} from '../useRevenueFromPublications';

describe(`Given the ${useRevenueFromPublications.name} hook`, () => {
  const profileId = mockProfileId();
  const revenue = [mockPublicationRevenueFragment()];

  describe('when the query returns data successfully', () => {
    it('should settle with the revenue data', async () => {
      const args: UseRevenueFromPublicationsArgs = {
        for: profileId,
      };

      const { renderHook } = setupHookTestScenario([
        mockRevenueFromPublicationsResponse({
          variables: args,
          items: revenue,
        }),
      ]);

      const { result } = renderHook(() => useRevenueFromPublications(args));

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toMatchObject(revenue);
    });
  });
});
