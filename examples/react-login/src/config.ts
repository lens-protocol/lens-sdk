import { chains } from '@lens-chain/sdk/viem';
import { getDefaultConfig } from 'connectkit';
import { createConfig, http } from 'wagmi';

export const config = createConfig(
  getDefaultConfig({
    chains: [chains.mainnet, chains.testnet],
    transports: {
      [chains.mainnet.id]: http(chains.mainnet.rpcUrls.default.http[0]!),
      [chains.testnet.id]: http(chains.testnet.rpcUrls.default.http[0]!),
    },
    walletConnectProjectId: '',
    appName: 'Lens + ConnectKit Example',
    appDescription: 'A sample app integrating ConnectKit and Lens React SDK.',
    appUrl: `${import.meta.env.BASE_URL}`,
    appIcon: `${import.meta.env.BASE_URL}/lens.svg`,
  }),
);
