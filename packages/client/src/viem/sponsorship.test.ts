import { createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { waitForTransactionReceipt } from 'viem/actions';
import { sendTransaction } from 'viem/zksync';
import { describe, it } from 'vitest';
import {
  CHAIN,
  GLOBAL_SPONSORSHIP,
  PRIVATE_KEY,
  SPONSORSHIP_APPROVER_PRIVATE_KEY,
} from '../test-utils';
import { SponsorshipApprovalSigner } from './sponsorship';

const user = createWalletClient({
  account: privateKeyToAccount(PRIVATE_KEY),
  chain: CHAIN,
  transport: http(),
});

const signer = createWalletClient({
  account: privateKeyToAccount(SPONSORSHIP_APPROVER_PRIVATE_KEY),
  chain: CHAIN,
  transport: http(),
});

describe(
  `Given an instance of the '${SponsorshipApprovalSigner.name}' for viem`,
  { timeout: 10_000 },
  () => {
    describe('When approving a transaction Request', () => {
      it('Then it should return the corresponding EIP-712 SendTransactionRequest with sponsorship approval', async () => {
        const approver = new SponsorshipApprovalSigner({
          signer,
          sponsorship: GLOBAL_SPONSORSHIP,
        });

        const approved = await approver.approveSponsorship({
          account: user.account,
          to: user.account.address,
          value: 1n,
        });

        // biome-ignore lint/suspicious/noExplicitAny: needs a fix in viem/zksync
        const hash = await sendTransaction(user, approved as any);
        await waitForTransactionReceipt(user, { hash });
      });
    });
  },
);
