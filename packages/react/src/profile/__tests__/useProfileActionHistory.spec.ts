import {
  mockProfileActionHistoryFragment,
  mockProfileActionHistoryResponse,
} from '@lens-protocol/api-bindings/mocks';
import { waitFor } from '@testing-library/react';

import { setupHookTestScenario } from '../../__helpers__/setupHookTestScenario';
import { useProfileActionHistory } from '../useProfileActionHistory';

describe.skip(`Given the ${useProfileActionHistory.name} hook`, () => {
  const history = [mockProfileActionHistoryFragment()];
  const expectations = history.map(({ id, actionType }) => ({ id, actionType }));

  describe('when the query returns data successfully', () => {
    it('should settle with the data', async () => {
      const { renderHook } = setupHookTestScenario([
        mockProfileActionHistoryResponse({
          variables: {},
          items: history,
        }),
      ]);

      const { result } = renderHook(() => useProfileActionHistory());

      await waitFor(() => expect(result.current.loading).toBeFalsy());

      expect(result.current.data).toMatchObject(expectations);
    });
  });
});
