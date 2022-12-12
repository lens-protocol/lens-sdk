import { WagmiConfig, chain, configureChains, createClient } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { LensConfig, LensProvider, staging } from '@lens-protocol/react';

import { Header } from '../header/Header';
import { ProfilesToFollow } from '../profiles-to-follow/ProfilesToFollow';

const { provider, webSocketProvider } = configureChains([chain.polygon], [publicProvider()]);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

const lensConfig: LensConfig = {
  provider: client.provider,
  environment: staging,
  storage: window.localStorage,
};

export function App() {
  return (
    <WagmiConfig client={client}>
      <LensProvider config={lensConfig}>
        <Header />
        <ProfilesToFollow />
      </LensProvider>
    </WagmiConfig>
  );
}
