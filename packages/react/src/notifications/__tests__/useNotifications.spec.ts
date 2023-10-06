import { Notification, NotificationWhere } from '@lens-protocol/api-bindings';
import {
  mockLensApolloClient,
  mockMentionNotification,
  mockNotificationsResponse,
} from '@lens-protocol/api-bindings/mocks';
import { waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import {
  defaultMediaTransformsConfig,
  mediaTransformConfigToQueryVariables,
} from '../../mediaTransforms';
import { useNotifications } from '../useNotifications';

function setupTestScenario({ items, where }: { where: NotificationWhere; items: Notification[] }) {
  return renderHookWithMocks(
    () =>
      useNotifications({
        where,
      }),
    {
      mocks: {
        mediaTransforms: defaultMediaTransformsConfig,
        apolloClient: mockLensApolloClient([
          mockNotificationsResponse({
            variables: {
              where,
              ...mediaTransformConfigToQueryVariables(defaultMediaTransformsConfig),
            },
            items,
          }),
        ]),
      },
    },
  );
}

describe(`Given the ${useNotifications.name} hook`, () => {
  const items = [mockMentionNotification(), mockMentionNotification()];
  const expectations = items.map(({ id }) => ({ id }));

  describe('when the query returns data successfully', () => {
    it('should return notifications', async () => {
      const { result } = setupTestScenario({
        where: {},
        items,
      });

      await waitFor(() => expect(result.current.loading).toBeFalsy());

      expect(result.current.data).toMatchObject(expectations);
    });
  });
});
