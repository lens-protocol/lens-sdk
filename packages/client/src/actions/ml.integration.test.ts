import { assertOk } from '@lens-protocol/types';
import { describe, it } from 'vitest';

import { TEST_ACCOUNT, createPublicClient } from '../test-utils';
import { fetchAccountRecommendations, fetchPostsForYou, fetchPostsToExplore } from './ml';

describe('Given the ML query actions', () => {
  const client = createPublicClient();

  describe(`When invoking the '${fetchAccountRecommendations.name}' action`, () => {
    it('Then it should not fail w/ a GQL BadRequest error', async () => {
      const result = await fetchAccountRecommendations(client, {
        account: TEST_ACCOUNT,
      });
      assertOk(result);
    });
  });

  describe(`When invoking the '${fetchPostsForYou.name}' action`, () => {
    it('Then it should not fail w/ a GQL BadRequest error', async () => {
      const result = await fetchPostsForYou(client, {
        account: TEST_ACCOUNT,
      });
      assertOk(result);
    });
  });

  describe(`When invoking the '${fetchPostsToExplore.name}' action`, () => {
    it('Then it should not fail w/ a GQL BadRequest error', async () => {
      const result = await fetchPostsToExplore(client, {});
      assertOk(result);
    });
  });
});
