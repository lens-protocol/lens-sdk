import { type Account, RulesSubject } from '@lens-protocol/graphql';
import { account } from '@lens-protocol/metadata';
import {
  assertOk,
  type EvmAddress,
  never,
  nonNullable,
  uri,
} from '@lens-protocol/types';
import { beforeAll, describe, expect, it } from 'vitest';
import {
  createPublicClient,
  loginAsBuilder,
  loginAsOnboardingUser,
  TEST_SIGNER,
  wallet,
} from '../test-utils';
import { handleOperationWith } from '../viem';
import {
  createAccount,
  createAccountWithUsername,
  fetchAccount,
} from './account';
import { fetchMeDetails } from './authentication';
import { createUsernameNamespace, fetchNamespace } from './namespace';
import { createUsername, fetchUsername } from './username';

const metadata = account({
  name: 'John Doe',
  bio: 'A test account',
});

describe('Given a new user', { timeout: 10000 }, () => {
  describe('When testing the onboarding flow using a custom Namespace with payment rule', () => {
    let namespace: EvmAddress;

    beforeAll(async () => {
      const result = await loginAsBuilder().andThen((sessionClient) =>
        createUsernameNamespace(sessionClient, {
          namespace: 'test',
          symbol: 'TST',
          rules: {
            required: [
              { usernameLengthRule: { minLength: 1, maxLength: 42 } },
              {
                usernamePricePerLengthRule: {
                  native: '0.01',
                  recipient: TEST_SIGNER,
                  costOverrides: [
                    { amount: '10', length: 5 },
                    { amount: '200', length: 2 },
                    { amount: '300', length: 1 },
                    { amount: '100', length: 3 },
                    { amount: '25', length: 4 },
                  ],
                },
              },
            ],
          },
        })

          .andThen(handleOperationWith(wallet))
          .andThen(sessionClient.waitForTransaction)

          .andThen((txHash) => fetchNamespace(sessionClient, { txHash }))
          .map(nonNullable),
      );

      assertOk(result);
      namespace = result.value.address;
    }, 15000);

    it.only('Then it should work as expected', async () => {
      const localName = `t${Date.now()}`;
      const publicClient = createPublicClient();

      const account = await loginAsOnboardingUser().andThen((sessionClient) =>
        createAccount(sessionClient, {
          metadataUri: uri(`data:application/json,${JSON.stringify(metadata)}`),
        })
          .andThen(handleOperationWith(wallet))
          .andThen(sessionClient.waitForTransaction)

          // Fetch the account
          .andThen((txHash) =>
            fetchAccount(sessionClient, { txHash }).map(nonNullable),
          )

          // Switch to the newly created account
          .andThrough((account) =>
            sessionClient.switchAccount({
              account: account.address,
            }),
          )

          // Create a username
          .andThrough(() =>
            createUsername(sessionClient, {
              username: { localName, namespace },
              rulesSubject: RulesSubject.Signer,
            })
              .andThen(handleOperationWith(wallet))
              .andThen(sessionClient.waitForTransaction),
          ),
      );

      const username = await fetchUsername(publicClient, {
        username: { localName, namespace },
      }).map(nonNullable);
      assertOk(account);
      assertOk(username);
      expect(username.value).toMatchObject({
        ownedBy: account.value.address,
        linkedTo: account.value.address,
      });
    });
  });

  describe('When testing the onboarding flow for the global lens/ Namespace', () => {
    it('Then it should work as expected', async () => {
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

          // Wait for the transaction to be indexed
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

          // Ensure the switched account is what we expect
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
