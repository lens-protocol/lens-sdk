import { chains } from '@lens-chain/sdk/viem';
import { evmAddress } from '@lens-protocol/client';
import { SponsorshipApprovalSigner } from '@lens-protocol/client/viem';
import { http, type Address, type Hash, type Hex, createWalletClient } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { waitForTransactionReceipt } from 'viem/actions';
import { sendTransaction } from 'viem/zksync';

const chain = process.env.ENVIRONMENT === 'mainnet' ? chains.mainnet : chains.testnet;
console.log(`Network: ${chain.name}`);

const wallet = createWalletClient({
  account: privateKeyToAccount(process.env.WALLET_PRIVATE_KEY as Hex),
  chain: chain,
  transport: http(),
});
console.log(`Wallet: ${wallet.account.address}`);

const signer = createWalletClient({
  account: privateKeyToAccount(process.env.SPONSORSHIP_SIGNER_PRIVATE_KEY as Hex),
  chain: chain,
  transport: http(),
});
console.log(`Sponsorship Signer: ${signer.account.address}`);

const approver = new SponsorshipApprovalSigner({
  signer,
  sponsorship: evmAddress(process.env.SPONSORSHIP_ADDRESS as Address),
});

export interface SponsorRequest {
  to: Address;
  value: string | number;
  data?: Hex;
}

async function sendSponsoredTransaction({ to, value, data }: SponsorRequest): Promise<Hash> {
  const tx = await approver.approveSponsorship({
    account: wallet.account,
    to,
    value,
    data,
  });

  return await sendTransaction(wallet, tx as any);
}

const hash = await sendSponsoredTransaction({
  to: wallet.account.address,
  value: 1, // 1 wei
});
console.log(`Transaction hash: ${hash}`);
await waitForTransactionReceipt(wallet, { hash });
