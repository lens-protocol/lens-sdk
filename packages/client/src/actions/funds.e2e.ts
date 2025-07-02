import type { Erc20Amount, NativeAmount } from '@lens-protocol/graphql';
import { assertOk, bigDecimal, evmAddress, Result } from '@lens-protocol/types';
import { Big } from 'big.js';
import { zeroAddress } from 'viem';
import { beforeAll, describe, expect, it } from 'vitest';

import type { SessionClient } from '../clients';
import { CHAIN, loginAsAccountOwner, TEST_ACCOUNT, TEST_ERC20, wallet } from '../test-utils';
import { handleOperationWith } from '../viem';
import {
  deposit,
  fetchBalancesBulk,
  unwrapTokens,
  withdraw,
  wrapTokens,
} from './funds';
import { findErc20Amount, findNativeAmount } from './helpers';

async function fetchBalances(
  sessionClient: SessionClient,
): Promise<[NativeAmount, Erc20Amount]> {
  const result = await fetchBalancesBulk(sessionClient, {
    address: TEST_ACCOUNT,
    includeNative: true,
    tokens: [TEST_ERC20],
  }).andThen((balances) =>
    Result.combine([
      findNativeAmount(balances),
      findErc20Amount(TEST_ERC20, balances),
    ]),
  );
  assertOk(result);
  return result.value;
}

describe('Given a Lens Account', () => {
  describe(`When calling the '${fetchBalancesBulk.name}' action`, () => {
    it('Then it should return the requested balance amounts', async () => {
      const result = await loginAsAccountOwner().andThen((sessionClient) =>
        fetchBalancesBulk(sessionClient, {
          address: TEST_ACCOUNT,
          includeNative: true,
          tokens: [TEST_ERC20],
        }),
      );
      assertOk(result);

      expect(result.value).toMatchObject([
        {
          __typename: 'NativeAmount',
          asset: {
            symbol: 'GRASS',
          },
          value: expect.any(String),
        },
        {
          __typename: 'Erc20Amount',
          asset: {
            contract: {
              chainId: CHAIN.id,
              address: TEST_ERC20,
            },
          },
          value: expect.any(String),
        },
      ]);
    });

    it('Then it should be resilient and have a local error just for the failed balance', async () => {
      const result = await loginAsAccountOwner().andThen((sessionClient) =>
        fetchBalancesBulk(sessionClient, {
          address: TEST_ACCOUNT,
          includeNative: true,
          tokens: [evmAddress(zeroAddress), TEST_ERC20],
        }),
      );
      assertOk(result);

      expect(result.value).toMatchObject([
        {
          __typename: 'NativeAmount',
          asset: {
            symbol: 'GRASS',
          },
          value: expect.any(String),
        },
        {
          __typename: 'Erc20BalanceError',
          reason: expect.any(String),
          token: zeroAddress,
        },
        {
          __typename: 'Erc20Amount',
          asset: {
            contract: {
              chainId: CHAIN.id,
              address: TEST_ERC20,
            },
          },
          value: expect.any(String),
        },
      ]);
    });
  });

  describe('When managing Account funds', { timeout: 20_000 }, () => {
    let sessionClient: SessionClient;

    beforeAll(async () => {
      await loginAsAccountOwner().andTee((client) => {
        sessionClient = client;
      });
    });

    it.sequential(
      `Then it should be possible to deposit native tokens via the '${deposit.name}' action`,
      async () => {
        const [native] = await fetchBalances(sessionClient);

        const result = await deposit(sessionClient, {
          native: bigDecimal(1),
        }).andThen(handleOperationWith(wallet));

        assertOk(result);
        const [newNative] = await fetchBalances(sessionClient);
        expect(Big(newNative.value)).toEqual(Big(native.value).add(1));
      },
    );

    it.sequential(
      `Then it should be possible to wrap native tokens via the '${wrapTokens.name}' action`,
      async () => {
        const [native, wrapped] = await fetchBalances(sessionClient);

        const result = await wrapTokens(sessionClient, {
          amount: bigDecimal(1),
        }).andThen(handleOperationWith(wallet));

        assertOk(result);
        const [newNative, newWrapped] = await fetchBalances(sessionClient);
        expect(Big(newNative.value)).toEqual(Big(native.value).sub(1));
        expect(Big(newWrapped.value)).toEqual(Big(wrapped.value).add(1));
      },
    );

    it.sequential(
      `Then it should be possible to withdraw ERC20 tokens via the '${withdraw.name}' action`,
      async () => {
        const [, wrapped] = await fetchBalances(sessionClient);

        const result = await withdraw(sessionClient, {
          erc20: {
            currency: TEST_ERC20,
            value: bigDecimal(1),
          },
        }).andThen(handleOperationWith(wallet));

        assertOk(result);
        const [, newWrapped] = await fetchBalances(sessionClient);
        expect(Big(newWrapped.value)).toEqual(Big(wrapped.value).sub(1));
      },
    );

    it.sequential(
      `Then it should be possible to deposit ERC20 tokens via the '${deposit.name}' action`,
      async () => {
        const [, wrapped] = await fetchBalances(sessionClient);
        const result = await deposit(sessionClient, {
          erc20: {
            currency: TEST_ERC20,
            value: bigDecimal(1),
          },
        }).andThen(handleOperationWith(wallet));

        assertOk(result);
        const [, newWrapped] = await fetchBalances(sessionClient);
        expect(Big(newWrapped.value)).toEqual(Big(wrapped.value).add(1));
      },
    );

    it.sequential(
      `Then it should be possible to unwrap wrapped native tokens via the '${unwrapTokens.name}' action`,
      async () => {
        const [native, wrapped] = await fetchBalances(sessionClient);

        const result = await unwrapTokens(sessionClient, {
          amount: bigDecimal(1),
        }).andThen(handleOperationWith(wallet));

        assertOk(result);
        const [newNative, newWrapped] = await fetchBalances(sessionClient);
        expect(Big(newNative.value)).toEqual(Big(native.value).add(1));
        expect(Big(newWrapped.value)).toEqual(Big(wrapped.value).sub(1));
      },
    );

    it.sequential(
      `Then it should be possible to withdraw native tokens via the '${withdraw.name}' action`,
      async () => {
        const [native] = await fetchBalances(sessionClient);

        const result = await withdraw(sessionClient, {
          native: bigDecimal(1),
        }).andThen(handleOperationWith(wallet));

        assertOk(result);
        const [newNative] = await fetchBalances(sessionClient);
        expect(Big(newNative.value)).toEqual(Big(native.value).sub(1));
      },
    );
  });
});
