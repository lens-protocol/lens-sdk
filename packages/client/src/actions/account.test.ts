import { assertOk, evmAddress } from '@lens-protocol/types';
import { describe, it } from 'vitest';

import { createPublicClient } from '../test-utils';
import { fetchAccount } from './account';

describe('Given the Account query actions', () => {
  const client = createPublicClient();

  describe(`When invoking the '${fetchAccount.name}' action`, () => {
    it('Then it should not fail w/ a GQL BadRequest error', async () => {
      const result = await fetchAccount(client, {
        address: evmAddress(import.meta.env.TEST_ACCOUNT),
      });

      assertOk(result);
    });
  });
});
