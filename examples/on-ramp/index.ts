import 'viem/window';

import { openHalliday } from '@halliday-sdk/commerce';
import { chains } from '@lens-network/sdk/viem';
import { PublicClient, testnet as protocolTestnet } from '@lens-protocol/client';
import { type Address, createWalletClient, custom } from 'viem';

const chain = chains.testnet;

// hoist account
const [address] = (await window.ethereum!.request({ method: 'eth_requestAccounts' })) as [Address];

const walletClient = createWalletClient({
  account: address,
  chain,
  transport: custom(window.ethereum!),
});

const client = PublicClient.create({
  environment: protocolTestnet,
});

await openHalliday({
  apiKey: '10e4e6e2-7d66-4fb3-b691-48dba9e6a24d',
  destinationChainId: 421614,
  destinationTokenAddress: '0x9EbD77f6F4f94C86C138E1da78CD15Ba72808eA1',
  services: ['ONRAMP'],
  useSandbox: true,
  windowType: 'EMBED',
  targetElementId: 'app',
});

export default [];
