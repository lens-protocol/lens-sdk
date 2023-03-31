import 'example-shared';
import { LensConfig, LensProvider, sources, development, appId } from '@lens-protocol/react-web';
import { bindings as wagmiBindings } from '@lens-protocol/wagmi';
import type { AppProps } from 'next/app';
import React from 'react';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { polygonMumbai, polygon } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { provider, webSocketProvider } = configureChains(
  [polygon, polygonMumbai],
  [publicProvider()],
);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

const lensConfig: LensConfig = {
  bindings: wagmiBindings(),
  environment: development,
  sources: [sources.lenster, sources.orb, appId('any-other-app-id')],
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
