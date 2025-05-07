import 'viem/window';

import { chains } from '@lens-chain/sdk/viem';
import { evmAddress } from '@lens-protocol/client';
import { SponsorshipApprovalSigner } from '@lens-protocol/client/viem';

import { http, createWalletClient, custom } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { sendTransaction } from 'viem/zksync';

const chain = chains.testnet;

const [address] = (await window.ethereum!.request({ method: 'eth_requestAccounts' })) as [Address];

const wallet = createWalletClient({
  account: address,
  chain,
  transport: custom(window.ethereum!),
});

const signer = createWalletClient({
  account: privateKeyToAccount(window.prompt('Sponsorship Signer PK')),
  chain: chain,
  transport: http(),
});

const approver = new SponsorshipApprovalSigner({
  signer,
  sponsorship: evmAddress(window.prompt('Sponsorship Address')),
});

const tx = await approver.approveSponsorship({
  account: wallet.account,
  to: wallet.account.address,
  data: '0x',
  value: 1, // 1 wei
});

console.log('tx', tx);

const hash = await sendTransaction(wallet, tx);

export default [
  `<p>Network: ${chain.name}</p>`,
  `<p>Wallet: ${wallet.account.address}</p>`,
  `<p>Sponsorship Signer: ${signer.account.address}</p>`,
  `<p>Transaction hash: ${hash}</p>`,
];
