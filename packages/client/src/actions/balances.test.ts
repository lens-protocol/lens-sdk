import { assertOk, bigDecimal, evmAddress } from '@lens-protocol/types';
import { describe, expect, it } from 'vitest';

import { zeroAddress } from 'viem';
import { CHAIN, TEST_ERC20, loginAsAccountOwner, wallet } from '../test-utils';
import { handleOperationWith } from '../viem';
import { deposit, fetchAccountBalances, withdraw } from './balances';

describe('Given the balance actions', () => {
  describe(`When calling the '${fetchAccountBalances.name}' action`, () => {
    it('Then it should return the expected balance amounts', async () => {
      const result = await loginAsAccountOwner().andThen((sessionClient) =>
        fetchAccountBalances(sessionClient, {
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
        fetchAccountBalances(sessionClient, {
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

  describe('When managing Account funds', () => {
    it.sequential(
      `Then it should allow to deposit funds via the '${deposit.name}' action`,
      async () => {
        const result = await loginAsAccountOwner().andThen((sessionClient) =>
          deposit(sessionClient, {
            native: bigDecimal(1),
          }).andThen(handleOperationWith(wallet)),
        );
        assertOk(result);

        console.log(result.value);
      },
    );

    it.sequential(
      `Then it should allow to withdraw funds via the '${withdraw.name}' action`,
      async () => {
        const result = await loginAsAccountOwner().andThen((sessionClient) =>
          withdraw(sessionClient, {
            native: bigDecimal(1),
          }).andThen(handleOperationWith(wallet)),
        );
        assertOk(result);

        console.log(result.value);
      },
    );
  });
});
