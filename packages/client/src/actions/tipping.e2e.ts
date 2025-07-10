import { justPost, type Post } from '@lens-protocol/graphql';
import { textOnly } from '@lens-protocol/metadata';
import {
  assertOk,
  bigDecimal,
  nonNullable,
  Result,
} from '@lens-protocol/types';
import { beforeAll, describe, it } from 'vitest';

import type { SessionClient } from '../clients';
import {
  loginAsAccountOwner,
  TEST_ACCOUNT,
  TEST_ERC20,
  TEST_SIGNER,
  wallet,
} from '../test-utils';
import { handleOperationWith } from '../viem';
import { executeAccountAction, executePostAction } from '.';
import { deposit, fetchBalancesBulk, wrapTokens } from './funds';
import { findErc20Amount, findNativeAmount } from './helpers';
import { post } from './post';
import { fetchPost } from './posts';

describe('Given a Lens Account with some WGHO (or any other ERC20)', () => {
  let sessionClient: SessionClient;

  beforeAll(async () => {
    await loginAsAccountOwner().andTee((client) => {
      sessionClient = client;
    });

    const balance = await fetchBalancesBulk(sessionClient, {
      includeNative: true,
      address: TEST_ACCOUNT,
      tokens: [TEST_ERC20],
    }).andThen((balances) =>
      Result.combine([
        findNativeAmount(balances),
        findErc20Amount(TEST_ERC20, balances),
      ]),
    );
    assertOk(balance);

    // Check native balance
    if (balance.value[0].value < '1') {
      const result = await deposit(sessionClient, {
        native: bigDecimal(1),
      }).andThen(handleOperationWith(wallet));

      assertOk(result);
    }

    // Check ERC20 balance
    if (balance.value[1].value < '1') {
      const wrapped = await wrapTokens(sessionClient, {
        amount: bigDecimal(1),
      })
        .andThen(handleOperationWith(wallet))
        .andThen(sessionClient.waitForTransaction);

      assertOk(wrapped);
    }
  }, 30_000);

  describe('When executing the Tipping Account Action', () => {
    it('Then it should work as expected', async () => {
      const result = await executeAccountAction(sessionClient, {
        account: TEST_ACCOUNT,
        action: {
          tipping: {
            currency: TEST_ERC20,
            value: bigDecimal(0.1),
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
            value: bigDecimal(0.1),
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
