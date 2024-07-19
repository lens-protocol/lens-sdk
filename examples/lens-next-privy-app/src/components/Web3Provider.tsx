"use client";

import React from "react";
import { http } from "wagmi";
import { polygon, polygonAmoy } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LensConfig, LensProvider, development } from "@lens-protocol/react-web";
import { bindings } from "@lens-protocol/wagmi";
import { WagmiProvider, createConfig } from "@privy-io/wagmi";
import { PrivyClientConfig, PrivyProvider } from "@privy-io/react-auth";

const wagmiConfig = createConfig({
  chains: [polygon, polygonAmoy],
  transports: {
    [polygon.id]: http(),
    [polygonAmoy.id]: http(),
  },
});

const privyConfig: PrivyClientConfig = {
  defaultChain: polygonAmoy, // or polygon
  supportedChains: [polygon, polygonAmoy],
  embeddedWallets: {
    createOnLogin: "users-without-wallets",
  },
};

const queryClient = new QueryClient();

const lensConfig: LensConfig = {
  environment: development, // or production
  bindings: bindings(wagmiConfig),
  debug: true,
};

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!} config={privyConfig}>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig} reconnectOnMount={false}>
          <LensProvider config={lensConfig}>{children}</LensProvider>
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}
