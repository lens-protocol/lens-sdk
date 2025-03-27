import { chains } from '@lens-chain/sdk/viem';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';
import { ThirdwebProvider } from 'thirdweb/react';
import { http, WagmiProvider, createConfig, injected } from 'wagmi';

import { App } from './App';

export const config = createConfig({
  chains: [chains.testnet],
  connectors: [injected()],
  transports: {
    [chains.testnet.id]: http(),
  },
});

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <ThirdwebProvider>
        <App />
      </ThirdwebProvider>
    </QueryClientProvider>
  </WagmiProvider>,
);
