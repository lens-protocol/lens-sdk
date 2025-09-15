import { chains } from '@lens-chain/sdk/viem';
import { createConfig, http, injected } from 'wagmi';

export const config = createConfig({
  chains: [chains.testnet],
  connectors: [injected()],
  transports: {
    [chains.testnet.id]: http(),
  },
});
