import { testnet } from '@lens-protocol/env';
import { assertOk, evmAddress, uri } from '@lens-protocol/types';
import { privateKeyToAccount } from 'viem/accounts';

import { describe, expect, it } from 'vitest';
import { PublicClient } from '../clients';
import { post } from './post';

const signer = privateKeyToAccount(import.meta.env.PRIVATE_KEY);
const owner = evmAddress(signer.address);
const app = evmAddress(import.meta.env.TEST_APP);
const account = evmAddress(import.meta.env.TEST_ACCOUNT);

describe(`Given the '${post.name}' action`, () => {
  const client = PublicClient.create({
    environment: testnet,
    origin: 'http://example.com',
  });

  describe('When creating a Post', () => {
    it('Then it should return the expected TransactionRequest', async () => {
      const authenticated = await client.login({
        accountOwner: { account, app, owner },
        signMessage: (message) => signer.signMessage({ message }),
      });

      const result = await post(authenticated._unsafeUnwrap(), {
        contentUri: uri('https://example.com'),
      });

      assertOk(result);
      expect(result.value).toMatchObject({
        __typename: 'SponsoredTransactionRequest',
        raw: expect.objectContaining({
          __typename: 'Eip712TransactionRequest',
        }),
      });
    });
  });
});
