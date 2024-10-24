import { local } from '@lens-social/env';
import { url, assertErr, assertOk, evmAddress, signatureFrom } from '@lens-social/types';
import { privateKeyToAccount } from 'viem/accounts';

import { describe, expect, it } from 'vitest';
import { Client } from './client';

const signer = privateKeyToAccount(import.meta.env.PRIVATE_KEY);
const account = evmAddress(signer.address);
const app = evmAddress('0x90c8c68d0Abfb40D4fCD72316A65e42161520BC3');

describe(`Given an instance of the ${Client.name}`, () => {
  const client = Client.create({
    environment: local,
    origin: url('http://example.com'),
  });

  describe('When authenticating via the low-level methods', () => {
    it('Then it should authenticate and stay authenticated', async () => {
      const challenge = await client.challenge({
        request: {
          account,
          signedBy: account,
          app,
        },
      });
      assertOk(challenge);

      const authenticated = await client.authenticate({
        request: {
          id: challenge.value.id,
          signature: signatureFrom(await signer.signMessage({ message: challenge.value.text })),
        },
      });
      assertOk(authenticated);

      const authentication = await authenticated.value.currentAuthentication();
      expect(authentication._unsafeUnwrap()).toMatchObject({
        signer: account,
        app,
      });
    });
  });

  describe('When authenticating via the `login` convenience method', () => {
    it('Then it should return an Err<never, SigningError> with any error thrown by the provided `SignMessage` function', async () => {
      const challenge = await client.login({
        request: {
          account,
          signedBy: account,
          app,
        },
        signMessage: async () => {
          throw new Error('Test Error');
        },
      });

      assertErr(challenge);
    });
  });
});
