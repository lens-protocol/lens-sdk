import { assertOk, postId } from '@lens-protocol/types';
import { describe, it } from 'vitest';

import { createPublicClient } from '../test-utils';
import { fetchPost } from './posts';

describe('Given the Post query actions', () => {
  const client = createPublicClient();

  describe(`When invoking the '${fetchPost.name}' action`, () => {
    it('Then it should not fail w/ a GQL BadRequest error', async () => {
      const result = await fetchPost(client, {
        post: postId('42'),
      });

      assertOk(result);
    });
  });
});
