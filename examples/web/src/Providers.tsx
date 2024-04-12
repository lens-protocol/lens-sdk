import { LensConfig, LensProvider, development } from '@lens-protocol/react-web';
import { bindings } from '@lens-protocol/wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { polygon, polygonAmoy } from 'wagmi/chains';

const queryClient = new QueryClient();

const wagmiConfig = createConfig({
  chains: [polygonAmoy, polygon],
  transports: {
    [polygonAmoy.id]: http(),
    [polygon.id]: http(),
  },
});

const lensConfig: LensConfig = {
  environment: development,
  bindings: bindings(wagmiConfig),
  debug: window.location.search.includes('debug'),
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
