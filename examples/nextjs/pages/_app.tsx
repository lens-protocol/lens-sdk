import 'example-shared';
import { LensConfig, LensProvider, sources, staging } from '@lens-protocol/react';
import { localStorage } from '@lens-protocol/react/web';
import { bindings as wagmiBindings } from '@lens-protocol/wagmi';
import type { AppProps } from 'next/app';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { optimism, polygon } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { provider, webSocketProvider } = configureChains([polygon, optimism], [publicProvider()]);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

const lensConfig: LensConfig = {
  bindings: wagmiBindings(),
  environment: staging,
  sources: [sources.lenster, sources.orb, 'any-other-app-id'],
  storage: localStorage(),
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <LensProvider config={lensConfig}>
        <Component {...pageProps} />
      </LensProvider>
    </WagmiConfig>
  );
}
