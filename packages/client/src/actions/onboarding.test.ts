import { account } from '@lens-protocol/metadata';
import { assertOk } from '@lens-protocol/types';
import { describe, it } from 'vitest';

import { loginAsOnboardingUser, signerWallet } from '../../testing-utils';
import { handleWith } from '../viem';
import { createAccountWithUsername, fetchAccount } from './account';
import { switchAccount } from './authentication';

const walletClient = signerWallet();
const metadata = account({
  name: 'John Doe',
  bio: 'A test account',
});
const metadataUri = `data:application/json,${JSON.stringify(metadata)}`;

const handler = handleWith(walletClient);

describe('Given an onboarding user', () => {
  describe('When switching to the newly created account', () => {
    it('Then it should be authenticated', async () => {
      // Login as onboarding user
      const result = await loginAsOnboardingUser().andThen((sessionClient) =>
        // Create an account with username
        createAccountWithUsername(sessionClient, {
          username: { localName: `testname${Date.now()}` },
          metadataUri,
        })
          // Sign if necessary
          .andThen(handler)

          // Wait for the transaction to be mined
          .andThen(sessionClient.waitForTransaction as any)

          // Fetch the account
          .andThen((txHash) => fetchAccount(sessionClient, { txHash }))

          // Switch to the newly created account
          .andThen((account) => switchAccount(sessionClient, { account: account?.address })),
      );

      console.log(result);

      assertOk(result);
    });
  });
});
