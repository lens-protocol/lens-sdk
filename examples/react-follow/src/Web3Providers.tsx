import type React from 'react';

import { LensProvider } from '@lens-protocol/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';

import { ConnectKitProvider } from 'connectkit';

import { client } from './client';
import { config } from './config';

const queryClient = new QueryClient();

export function Web3Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <LensProvider client={client}>
          <ConnectKitProvider>{children}</ConnectKitProvider>
        </LensProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
