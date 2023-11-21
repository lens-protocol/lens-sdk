import { mockPostFragment, mockPublicationResponse } from '@lens-protocol/api-bindings/mocks';
import { waitFor } from '@testing-library/react';

import { NotFoundError } from '../../NotFoundError';
import { setupHookTestScenario } from '../../__helpers__/setupHookTestScenario';
import { usePublication } from '../usePublication';

describe(`Given the ${usePublication.name} hook`, () => {
  const publication = mockPostFragment();
  const expectations = { __typename: 'Post', id: publication.id };

  describe.each([
    {
      description: 'when invoked with a publication id',
      args: { forId: publication.id },
    },
    {
      description: 'when invoked with a txHash',
      args: { forTxHash: publication.txHash },
    },
  ])('$description', ({ args }) => {
    it('should settle with the publication data', async () => {
      const { renderHook } = setupHookTestScenario([
        mockPublicationResponse({
          variables: {
            request: args,
          },
          result: publication,
        }),
      ]);

      const { result } = renderHook(() => usePublication(args));

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toMatchObject(expectations);
    });

    it(`should settle with a ${NotFoundError.name} if not found`, async () => {
      const { renderHook } = setupHookTestScenario([
        mockPublicationResponse({
          variables: {
            request: args,
          },
          result: null,
        }),
      ]);

      const { result } = renderHook(() => usePublication(args));

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.error).toBeInstanceOf(NotFoundError);
    });
  });
});
