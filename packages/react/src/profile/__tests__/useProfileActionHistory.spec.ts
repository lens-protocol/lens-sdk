import { LimitType } from '@lens-protocol/api-bindings';
import {
  mockProfileActionHistoryFragment,
  mockProfileActionHistoryResponse,
} from '@lens-protocol/api-bindings/mocks';
import { waitFor } from '@testing-library/react';

import { setupHookTestScenarioWithSession } from '../../__helpers__/setupHookTestScenarioWithSession';
import { useProfileActionHistory } from '../useProfileActionHistory';

describe(`Given the ${useProfileActionHistory.name} hook`, () => {
  const history = [mockProfileActionHistoryFragment()];
  const expectations = history.map(({ id, actionType }) => ({ id, actionType }));

  describe('when the query returns data successfully', () => {
    it('should settle with the data', async () => {
      const { renderHook } = await setupHookTestScenarioWithSession([
        mockProfileActionHistoryResponse({
          variables: {
            limit: LimitType.Ten,
          },
          items: history,
        }),
      ]);

      const { result } = renderHook(() =>
        useProfileActionHistory({
          limit: LimitType.Ten,
        }),
      );

      await waitFor(() => expect(result.current.loading).toBeFalsy());

      expect(result.current.data).toMatchObject(expectations);
    });
  });
});
