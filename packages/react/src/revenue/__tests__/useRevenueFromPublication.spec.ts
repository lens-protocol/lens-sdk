import {
  mockPostFragment,
  mockPublicationRevenueFragment,
  mockRevenueFromPublicationResponse,
} from '@lens-protocol/api-bindings/mocks';
import { waitFor } from '@testing-library/react';

import { NotFoundError } from '../../NotFoundError';
import { setupHookTestScenario } from '../../__helpers__/setupHookTestScenario';
import {
  UseRevenueFromPublicationArgs,
  useRevenueFromPublication,
} from '../useRevenueFromPublication';

describe(`Given the ${useRevenueFromPublication.name} hook`, () => {
  const publication = mockPostFragment();
  const args: UseRevenueFromPublicationArgs = {
    for: publication.id,
  };

  describe('when the query returns data successfully', () => {
    const revenue = mockPublicationRevenueFragment({
      publication,
    });

    it('should settle with the revenue data', async () => {
      const { renderHook } = setupHookTestScenario([
        mockRevenueFromPublicationResponse({
          variables: {
            request: args,
          },
          result: revenue,
        }),
      ]);

      const { result } = renderHook(() => useRevenueFromPublication(args));

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toMatchObject(revenue);
    });
  });

  it(`should settle with a ${NotFoundError.name} if not found`, async () => {
    const { renderHook } = setupHookTestScenario([
      mockRevenueFromPublicationResponse({
        variables: {
          request: args,
        },
        result: null,
      }),
    ]);

    const { result } = renderHook(() => useRevenueFromPublication(args));

    await waitFor(() => expect(result.current.loading).toBeFalsy());
    expect(result.current.error).toBeInstanceOf(NotFoundError);
  });
});
