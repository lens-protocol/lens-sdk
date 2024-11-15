import { local } from '@lens-social/env';
import { assertOk, postId } from '@lens-social/types';
import { describe, it } from 'vitest';

import { PublicClient } from '../clients';
import { fetchPost } from './posts';

describe('Given the Post queries', () => {
  const client = PublicClient.create({
    environment: local,
    origin: 'http://example.com',
  });

  describe(`When invoking the '${fetchPost.name}' action`, () => {
    it('Then it should not fail w/ a GQL BadRequest error', async () => {
      const result = await fetchPost(client, {
        post: postId('42'),
      });

      assertOk(result);
    });
  });
});
