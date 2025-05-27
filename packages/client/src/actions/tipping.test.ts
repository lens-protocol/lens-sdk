import { type Post, justPost } from '@lens-protocol/graphql';
import { textOnly } from '@lens-protocol/metadata';
import { assertOk, bigDecimal, nonNullable } from '@lens-protocol/types';
import { beforeAll, describe, it } from 'vitest';

import type { SessionClient } from '../clients';
import { TEST_ACCOUNT, TEST_ERC20, TEST_SIGNER, loginAsAccountOwner, wallet } from '../test-utils';
import { handleOperationWith } from '../viem';
import { executeAccountAction, executePostAction } from './actions';
import { fetchAccountBalances, wrapTokens } from './funds';
import { findErc20Amount } from './helpers';
import { post } from './post';
import { fetchPost } from './posts';

describe('Given a Lens Account with some WGHO (or any other ERC20)', { timeout: 20000 }, () => {
  let sessionClient: SessionClient;

  beforeAll(async () => {
    await loginAsAccountOwner().andTee((client) => {
      sessionClient = client;
    });

    const balance = await fetchAccountBalances(sessionClient, {
      includeNative: false,
      tokens: [TEST_ERC20],
    }).andThen((balances) => findErc20Amount(TEST_ERC20, balances));
    assertOk(balance);

    if (balance.value.value < '1') {
      const wrapped = await wrapTokens(sessionClient, {
        amount: bigDecimal(1),
      })
        .andThen(handleOperationWith(wallet))
        .andThen(sessionClient.waitForTransaction);

      assertOk(wrapped);
    }
  }, 15000);

  describe('When executing the Tipping Account Action', () => {
    it('Then it should work as expected', async () => {
      const result = await executeAccountAction(sessionClient, {
        account: TEST_ACCOUNT,
        action: {
          tipping: {
            currency: TEST_ERC20,
            value: bigDecimal(1),
            referrals: [
              {
                address: TEST_SIGNER,
                percent: 10,
              },
              {
                address: TEST_SIGNER,
                percent: 90,
              },
            ],
          },
        },
      })
        .andThen(handleOperationWith(wallet))
        .andThen(sessionClient.waitForTransaction);

      assertOk(result);
    });
  });

  describe('When executing the Tipping Post Action', () => {
    const content = `data:application/json,${JSON.stringify(textOnly({ content: 'Hello world!' }))}`;
    let anyPost: Post;

    beforeAll(async () => {
      const result = await post(sessionClient, {
        contentUri: content,
      })
        .andThen(handleOperationWith(wallet))
        .andThen(sessionClient.waitForTransaction)
        .andThen((txHash) => fetchPost(sessionClient, { txHash }))
        .map(nonNullable)
        .map(justPost);
      assertOk(result);
      anyPost = result.value;
    });

    it('Then it should work as expected', async () => {
      const result = await executePostAction(sessionClient, {
        post: anyPost.id,
        action: {
          tipping: {
            currency: TEST_ERC20,
            value: '0.001',
            referrals: [
              {
                address: TEST_SIGNER,
                percent: 10,
              },
              {
                address: TEST_SIGNER,
                percent: 90,
              },
            ],
          },
        },
      })
        .andThen(handleOperationWith(wallet))
        .andThen(sessionClient.waitForTransaction);

      assertOk(result);
    });
  });
});
