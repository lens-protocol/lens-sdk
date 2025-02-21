import { createRoot } from 'react-dom/client';

import { LensProvider } from '@lens-protocol/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';

import { App } from './App';
import { client } from './client';
import { config } from './config';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <LensProvider client={client}>
        <App />
      </LensProvider>
    </QueryClientProvider>
  </WagmiProvider>,
);
