import {
  mockMentionNotification,
  mockNotificationsResponse,
} from '@lens-protocol/api-bindings/mocks';
import { mockAppId } from '@lens-protocol/domain/mocks';
import { waitFor } from '@testing-library/react';

import { setupHookTestScenario } from '../../__helpers__/setupHookTestScenario';
import { UseNotificationsArgs, useNotifications } from '../useNotifications';

describe(`Given the ${useNotifications.name} hook`, () => {
  const items = [mockMentionNotification(), mockMentionNotification()];
  const expectations = items.map(({ id }) => ({ id }));

  describe('when the query returns data successfully', () => {
    it('should return notifications', async () => {
      const args: UseNotificationsArgs = {
        where: {
          publishedOn: [mockAppId()],
        },
      };
      const { renderHook } = setupHookTestScenario([
        mockNotificationsResponse({
          variables: args,
          items,
        }),
      ]);

      const { result } = renderHook(() => useNotifications(args));

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toMatchObject(expectations);
    });
  });
});
