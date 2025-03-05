import { signMessageWith } from '@lens-protocol/client/viem';
import { assertOk } from '@lens-protocol/types';
import { describe, expect, it } from 'vitest';

import {
  TEST_ACCOUNT,
  TEST_APP,
  TEST_SIGNER,
  createPublicClient,
  wallet,
} from '@lens-protocol/client/test-utils';
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
          account: TEST_ACCOUNT,
          owner: TEST_SIGNER,
          app: TEST_APP,
        },
        signMessage: signMessageWith(wallet),
      });

      assertOk(record);
      expect(record.value).toHaveProperty('address', TEST_ACCOUNT.toLowerCase());
    });
  });
});
