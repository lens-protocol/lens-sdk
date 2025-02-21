import { chains } from '@lens-network/sdk/viem';
import { http, createConfig, injected } from 'wagmi';

export const config = createConfig({
  chains: [chains.testnet],
  connectors: [injected()],
  transports: {
    [chains.testnet.id]: http(),
  },
});
