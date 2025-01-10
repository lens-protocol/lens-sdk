import { signMessageWith } from '@lens-protocol/client/viem';
import { assertOk } from '@lens-protocol/types';
import { describe, expect, it } from 'vitest';

import { account, app, createPublicClient, signer, wallet } from '@lens-protocol/client/test-utils';
import { renderHookWithContext } from '../test-utils';
import { useLogin } from './useLogin';

describe(`Given the ${useLogin.name} hook`, () => {
  const client = createPublicClient();

  describe('When used to login into an existing Account', () => {
    it('Then it should return the Account data', async () => {
      const { result } = renderHookWithContext(() => useLogin(), {
        client,
      });

      const record = await result.current.execute({
        accountOwner: {
          account,
          owner: signer,
          app,
        },
        signMessage: signMessageWith(wallet),
      });

      assertOk(record);
      expect(record.value).toHaveProperty('address', account.toLowerCase());
    });
  });
});
