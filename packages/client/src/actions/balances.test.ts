import { assertOk, evmAddress } from '@lens-protocol/types';
import { describe, expect, it } from 'vitest';

import { zeroAddress } from 'viem';
import { CHAIN, TEST_ERC20, loginAsAccountOwner } from '../test-utils';
import { fetchAccountBalances } from './balances';

describe(`Given the '${fetchAccountBalances.name}' action`, () => {
  describe('When fetching token balances for the logged-in account', () => {
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
  });

  describe('When fetching a token balance that does not resolve', () => {
    it('Then it should be resilient and have a local erro just for the failed balance', async () => {
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
});
