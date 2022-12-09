import { WagmiConfig, chain, configureChains, createClient } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { LensClient } from "@lens-protocol/react";

import { Header } from "../header/Header";
import { ProfilesToFollow } from "../profiles-to-follow/ProfilesToFollow";

const { provider, webSocketProvider } = configureChains([chain.polygon], [publicProvider()]);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

export function App() {
  return (
    <WagmiConfig client={client}>
      <LensClient>
        <Header />
        <ProfilesToFollow />
      </LensClient>
    </WagmiConfig>
  );
}
