import { assertOk } from '@lens-protocol/types';
import { beforeAll, describe, it } from 'vitest';

import { loginAsAccountOwner, TEST_ACCOUNT } from '../test-utils';
import {
  fetchAccountRecommendations,
  fetchPostsForYou,
  fetchPostsToExplore,
} from './ml';
import { SessionClient } from '../clients';

describe('Given the ML query actions', () => {
  let sessionClient: SessionClient;
  
  beforeAll(async () => {
    await loginAsAccountOwner().andTee((client) => {
      sessionClient = client;
    });
  });
  
  // TODO: Enable when bug fixed LENS-1201
  describe.skip(`When invoking the '${fetchAccountRecommendations.name}' action`, () => {
    it('Then it should not fail w/ a GQL BadRequest error', async () => {
      const result = await fetchAccountRecommendations(sessionClient, {
        account: TEST_ACCOUNT,
      });
      assertOk(result);
    });
  });

  // TODO: Enable when bug fixed LENS-1201
  describe.skip(`When invoking the '${fetchPostsForYou.name}' action`, () => {
    it('Then it should not fail w/ a GQL BadRequest error', async () => {
      const result = await fetchPostsForYou(sessionClient, {
        account: TEST_ACCOUNT,
      });
      assertOk(result);
    });
  });

  describe(`When invoking the '${fetchPostsToExplore.name}' action`, () => {
    it('Then it should not fail w/ a GQL BadRequest error', async () => {
      const result = await fetchPostsToExplore(sessionClient, {});
      assertOk(result);
    });
  });
});
