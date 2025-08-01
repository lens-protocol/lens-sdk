import type { EvmAddress } from '@lens-chain/storage-client';
import { account } from '@lens-protocol/metadata';
import { assertOk, nonNullable, uri } from '@lens-protocol/types';
import { beforeAll, describe, expect, it } from 'vitest';
import {
  loginAsAccountOwner,
  loginAsOnboardingUser,
  wallet,
} from '../test-utils';
import { handleOperationWith } from '../viem';
import {
  createAccount,
  fetchAccount,
  updateAccountFollowRules,
} from './account';
import { follow } from './follow';

const firstAccount = account({
  name: 'First',
  bio: 'A test account',
});

describe('Given a logged-in user', () => {
  describe('When creating two accounts with SimplePaymentRule in native token denomination', () => {
    let accountAddress: EvmAddress;

    beforeAll(async () => {
      const accountResult = await loginAsOnboardingUser().andThen(
        (sessionClient) =>
          createAccount(sessionClient, {
            metadataUri: uri(
              `data:application/json,${JSON.stringify(firstAccount)}`,
            ),
          })
            .andThen(handleOperationWith(wallet))
            .andThen(sessionClient.waitForTransaction)
            .andThen((txHash) => fetchAccount(sessionClient, { txHash }))
            .map(nonNullable),
      );
      assertOk(accountResult);
      accountAddress = accountResult.value.address;

      const followerRuleResult = await loginAsOnboardingUser().andThen(
        (sessionClient) =>
          sessionClient
            .switchAccount({
              account: accountAddress,
            })
            .andThen((sessionClient) =>
              updateAccountFollowRules(sessionClient, {
                toAdd: {
                  required: [
                    {
                      simplePaymentRule: {
                        native: '0.01',
                        recipient: accountAddress,
                      },
                    },
                  ],
                },
              }),
            )
            .andThen(handleOperationWith(wallet))
            .andThen(sessionClient.waitForTransaction)
            .andThen(() =>
              fetchAccount(sessionClient, { address: accountAddress }).map(
                nonNullable,
              ),
            ),
      );
      assertOk(followerRuleResult);
    }, 15_000);

    it('Then the user can follow the account by fulfilling the payment rule with native tokens from the Lens Account', async () => {
      const result = await loginAsAccountOwner().andThen((sessionClient) =>
        follow(sessionClient, { account: accountAddress })
          .andThen(handleOperationWith(wallet))
          .andThen(sessionClient.waitForTransaction)
          .andThen(() =>
            fetchAccount(sessionClient, { address: accountAddress }).map(
              nonNullable,
            ),
          ),
      );

      assertOk(result);
      expect(result.value.operations?.canFollow).toEqual({
        __typename: 'AccountFollowOperationValidationPassed',
      });
    });
  });
});
