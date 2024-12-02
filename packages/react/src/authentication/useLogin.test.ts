import { PublicClient } from '@lens-protocol/client';
import { local } from '@lens-protocol/env';
import { assertOk, evmAddress } from '@lens-protocol/types';
import { privateKeyToAccount } from 'viem/accounts';
import { describe, expect, it } from 'vitest';

import { renderHookWithContext } from '../__helpers__/testing-utils';
import { useLogin } from './useLogin';

const signer = privateKeyToAccount(import.meta.env.PRIVATE_KEY);
const account = evmAddress(signer.address);
const app = evmAddress(import.meta.env.TEST_APP);

describe(`Given the ${useLogin.name} hook`, () => {
  const client = PublicClient.create({
    environment: local,
    origin: 'http://example.com',
  });

  describe('When used to login into an existing Account', () => {
    it('Then it should return the Account data', async () => {
      const { result } = renderHookWithContext(() => useLogin(), {
        client,
      });

      const record = await result.current.execute({
        account,
        app,
        signer: {
          address: account,
          signMessage: async (message: string) => signer.signMessage({ message }),
        },
      });

      assertOk(record);
      expect(record.value).toHaveProperty('address', account);
    });
  });
});
