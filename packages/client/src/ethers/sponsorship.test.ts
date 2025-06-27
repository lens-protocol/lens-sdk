import { getDefaultProvider, Network, Wallet } from '@lens-chain/sdk/ethers';
import { describe, it } from 'vitest';

import {
  GLOBAL_SPONSORSHIP,
  PRIVATE_KEY,
  SPONSORSHIP_APPROVER_PRIVATE_KEY,
} from '../test-utils';
import { SponsorshipApprovalSigner } from './sponsorship';

const provider = getDefaultProvider(Network.Testnet);

const user = new Wallet(
  PRIVATE_KEY,
  // biome-ignore lint/suspicious/noExplicitAny: needs a fix in @lens-chain/sdk
  provider as any,
);
const signer = new Wallet(
  SPONSORSHIP_APPROVER_PRIVATE_KEY,
  // biome-ignore lint/suspicious/noExplicitAny: needs a fix in @lens-chain/sdk
  provider as any,
);

describe(
  `Given an instance of the '${SponsorshipApprovalSigner.name}' for ethers.js`,
  { timeout: 10_000 },
  () => {
    describe('When approving a TransactionRequest', () => {
      it('Then it should return the corresponding EIP-712 TransactionRequest with sponsorship approval', async () => {
        const approver = new SponsorshipApprovalSigner({
          signer,
          sponsorship: GLOBAL_SPONSORSHIP,
        });

        const approved = await approver.approveSponsorship({
          from: user.address,
          to: user.address,
          value: 1n,
        });

        const response = await user.sendTransaction(approved);
        await response.wait();
      });
    });
  },
);
