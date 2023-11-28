"use client";

import { LensConfig, LensProvider, development } from "@lens-protocol/react-web";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { bindings as wagmiBindings } from "@lens-protocol/wagmi";
import { polygonMumbai } from "wagmi/chains";
import { InjectedConnector } from "wagmi/connectors/injected";
import { publicProvider } from "wagmi/providers/public";
import { ReactNode } from "react";

const { publicClient, webSocketPublicClient } = configureChains(
  [polygonMumbai],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
  connectors: [
    new InjectedConnector({
      options: {
        shimDisconnect: false,
      },
    }),
  ],
});

const lensConfig: LensConfig = {
  environment: development,
  bindings: wagmiBindings(),
};

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiConfig config={config}>
      <LensProvider config={lensConfig}>{children}</LensProvider>
    </WagmiConfig>
  );
}
