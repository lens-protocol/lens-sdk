import { chains } from '@lens-chain/sdk/viem';
import { type Address, createWalletClient, custom } from 'viem';

const chain = chains.testnet;

// hoist account
const [address] = (await window.ethereum!.request({
  method: 'eth_requestAccounts',
})) as [Address];

export const walletClient = createWalletClient({
  account: address,
  chain,
  transport: custom(window.ethereum!),
});

const chainId = await walletClient.getChainId();

if (chainId !== chain.id) {
  try {
    await walletClient.switchChain({ id: chain.id });
  } catch {
    await walletClient.addChain({ chain });
  }
}
