import { assertOk } from '@lens-protocol/types';
import { describe, it } from 'vitest';

import { loginAsAccountOwner } from '../test-utils';
import { fetchNotifications } from './notifications';

describe(`Given the '${fetchNotifications.name}' action`, () => {
  describe('When invoked', () => {
    it('Then it should not fail w/ a GQL BadRequest error', async () => {
      const result = await loginAsAccountOwner().andThen(fetchNotifications);

      assertOk(result);
    });
  });
});
