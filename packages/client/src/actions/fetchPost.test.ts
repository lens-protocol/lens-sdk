import { local } from '@lens-social/env';
import { assertOk, postId } from '@lens-social/types';
import { describe, it } from 'vitest';

import { PublicClient } from '../clients';
import { fetchPost } from './fetchPost';

describe(`Given the '${fetchPost.name}' action`, () => {
  const client = PublicClient.create({
    environment: local,
    origin: 'http://example.com',
  });

  describe('When fetching a Post', () => {
    it('Then it should not fail w/ a GQL BadRequest error', async () => {
      const result = await fetchPost(client, {
        request: {
          postId: postId('0x00'),
        },
      });

      assertOk(result);
    });
  });
});
