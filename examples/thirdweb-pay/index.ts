import 'viem/window';

import { chains } from '@lens-network/sdk/viem';
// import { PublicClient, testnet as protocolTestnet } from '@lens-protocol/client';
import { NATIVE_TOKEN_ADDRESS, createThirdwebClient } from 'thirdweb';
import { ethereum } from 'thirdweb/chains';
import { getBuyWithFiatQuote, isSwapRequiredPostOnramp } from 'thirdweb/pay';
import { type Address, createWalletClient, custom } from 'viem';

const chain = chains.testnet;

// hoist account
const [address] = (await window.ethereum!.request({ method: 'eth_requestAccounts' })) as [Address];

const walletClient = createWalletClient({
  account: address,
  chain,
  transport: custom(window.ethereum!),
});

// const client = PublicClient.create({
//   environment: protocolTestnet,
// });

// create a thirdweb client
const client = createThirdwebClient({
  clientId: '44323e7868feac3bd3ea4d91c9e879d4',
});

// Get a quote for buying 0.01 Base ETH with USD
const quote = await getBuyWithFiatQuote({
  client: client, // thirdweb client
  fromAddress: address,
  fromCurrencySymbol: 'USD', // fiat currency symbol
  toChainId: ethereum.id, // base chain id
  toAmount: '0.01', // amount of token to buy
  toTokenAddress: NATIVE_TOKEN_ADDRESS, // native token
  toAddress: address, // user's wallet address
});

// display quote information to user
console.table(quote.onRampLink);
console.log('Is swap required?', isSwapRequiredPostOnramp(quote));

window.open(quote.onRampLink, '_blank');
