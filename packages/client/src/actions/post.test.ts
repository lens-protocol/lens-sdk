import { local } from '@lens-social/env';
import { assertOk, evmAddress, uri } from '@lens-social/types';
import { privateKeyToAccount } from 'viem/accounts';

import { describe, expect, it } from 'vitest';
import { PublicClient } from '../clients';
import { post } from './post';

const signer = privateKeyToAccount(import.meta.env.PRIVATE_KEY);
const account = evmAddress(signer.address);
const app = evmAddress('0x90c8c68d0Abfb40D4fCD72316A65e42161520BC3');

describe(`Given the ${post.name} action`, () => {
  const client = PublicClient.create({
    environment: local,
    origin: 'http://example.com',
  });

  describe('When creating a Post', () => {
    it('Then it should return the expected TransactionRequest', async () => {
      const authenticated = await client.login({
        request: { signedBy: account, app, account },
        signMessage: (message) => signer.signMessage({ message }),
      });

      const result = await post(authenticated._unsafeUnwrap(), {
        request: {
          contentUri: uri('https://example.com'),
        },
      });

      assertOk(result);
      expect(result.value).toMatchObject({
        __typename: 'TransactionRequest',
        encoded: expect.any(String),
        raw: expect.objectContaining({
          __typename: 'Eip1559TransactionRequest',
        }),
      });
    });
  });
});
