import { LensConfig, LensProvider, development } from '@lens-protocol/react-web';
import { bindings } from '@lens-protocol/wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { polygon, polygonMumbai } from 'wagmi/chains';

const queryClient = new QueryClient();

const wagmiConfig = createConfig({
  chains: [polygonMumbai, polygon],
  transports: {
    [polygonMumbai.id]: http(),
    [polygon.id]: http(),
  },
});

const lensConfig: LensConfig = {
  environment: development,
  bindings: bindings(wagmiConfig),
};

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <LensProvider config={lensConfig}>{children}</LensProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
