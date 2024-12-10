import { testnet } from '@lens-protocol/env';
import { assertOk, evmAddress } from '@lens-protocol/types';
import { describe, it } from 'vitest';

import { FullAccountFragment } from '@lens-protocol/graphql';
import { PublicClient } from '../clients';
import { fetchAccount } from './account';

describe('Given the Account query actions', () => {
  const client = PublicClient.create({
    environment: testnet,
    origin: 'http://example.com',
    accountFragment: FullAccountFragment,
  });

  describe(`When invoking the '${fetchAccount.name}' action`, () => {
    it('Then it should not fail w/ a GQL BadRequest error', async () => {
      const result = await fetchAccount(client, {
        address: evmAddress(import.meta.env.TEST_ACCOUNT),
      });

      assertOk(result);
    });
  });
});
