import { assertOk, uri } from '@lens-protocol/types';

import { describe, expect, it } from 'vitest';
import { loginAsAccountOwner } from '../test-utils';
import { post } from './post';

describe(`Given the '${post.name}' action`, () => {
  describe('When creating a Post', () => {
    it('Then it should return the expected TransactionRequest', async () => {
      const result = await loginAsAccountOwner().andThen((sessionClient) =>
        post(sessionClient, {
          contentUri: uri('https://example.com'),
        }),
      );

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
