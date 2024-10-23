import { local } from '@lens-social/env';
import { url, assertOk, evmAddress, signature } from '@lens-social/types';
import { privateKeyToAccount } from 'viem/accounts';

import { describe, expect, it } from 'vitest';
import { LensClient } from './client';

const signer = privateKeyToAccount(import.meta.env.PRIVATE_KEY);

describe(`Given an instance of the ${LensClient.name}`, () => {
  const client = new LensClient({
    environment: local,
    cache: false,
    debug: false,
    origin: url('http://example.com'),
  });

  describe('When authenticating', () => {
    const account = evmAddress('0x00A58BA275E6BFC004E2bf9be121a15a2c543e71');
    const app = evmAddress('0x90c8c68d0Abfb40D4fCD72316A65e42161520BC3');

    it('Then it should stay authenticated', async () => {
      const challenge = await client.challenge({
        request: {
          account,
          signedBy: account,
          app,
        },
      });
      assertOk(challenge);

      const tokens = await client.authenticate({
        request: {
          id: challenge.value.id,
          signature: signature(await signer.signMessage({ message: challenge.value.text })),
        },
      });
      assertOk(tokens);

      expect(client.accessToken).not.toBeNull();

      const authentication = await client.currentAuthentication();
      expect(authentication._unsafeUnwrap()).toMatchObject({
        signer: account,
        app,
      });
    });
  });
});
