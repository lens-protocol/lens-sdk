import type { Account } from '@lens-protocol/graphql';
import { account } from '@lens-protocol/metadata';
import { assertOk, never, uri } from '@lens-protocol/types';
import { describe, expect, it } from 'vitest';
import { loginAsOnboardingUser, TEST_SIGNER, wallet } from '../test-utils';
import { handleOperationWith } from '../viem';
import { createAccountWithUsername, fetchAccount } from './account';
import { fetchMeDetails } from './authentication';

const metadata = account({
  name: 'John Doe',
  bio: 'A test account',
});

describe('Given an onboarding user', { timeout: 10000 }, () => {
  describe('When switching to the newly created account', () => {
    it('Then it should be authenticated', async () => {
      let newAccount: Account | null = null;

      // Login as onboarding user
      const result = await loginAsOnboardingUser().andThen((sessionClient) =>
        // Create an account with username
        createAccountWithUsername(sessionClient, {
          username: { localName: `testname${Date.now()}` },
          metadataUri: uri(`data:application/json,${JSON.stringify(metadata)}`),
        })
          // Sign if necessary
          .andThen(handleOperationWith(wallet))

          // Wait for the transaction to be mined
          .andThen(sessionClient.waitForTransaction)

          // Fetch the account
          .andThen((txHash) => fetchAccount(sessionClient, { txHash }))

          .andTee((account) => {
            newAccount = account ?? never('Account not found');
          })

          // Switch to the newly created account
          .andThen((account) =>
            sessionClient.switchAccount({
              account: account?.address ?? never('Account not found'),
            }),
          )

          // Ensure the switche account is what we expect
          .andThen(() => fetchMeDetails(sessionClient)),
      );
      assertOk(result);

      expect(result.value).toMatchObject({
        loggedInAs: {
          __typename: 'AccountOwned',
          account: {
            address: newAccount!.address,
            owner: TEST_SIGNER,
          },
        },
      });
    });
  });
});
