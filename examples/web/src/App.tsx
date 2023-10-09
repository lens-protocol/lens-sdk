import { LensConfig, LensProvider, development } from '@lens-protocol/react-web';
import { bindings as wagmiBindings } from '@lens-protocol/wagmi';
import { XMTPProvider } from '@xmtp/react-sdk';
import { Toaster } from 'react-hot-toast';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { publicProvider } from 'wagmi/providers/public';

import { HomePage } from './HomePage';
import { Layout } from './Layout';
import { LogInPage } from './LogInPage';
import { GenericErrorBoundary } from './components/GenericErrorBoundary';
import { ErrorMessage } from './components/error/ErrorMessage';
import { Header } from './components/header/Header';
import { DiscoveryPage } from './discovery/DiscoveryPage';
import { UseExplorePublications } from './discovery/UseExplorePublications';
import { UseFeed } from './discovery/UseFeed';
import { UseSearchProfiles } from './discovery/UseSearchProfiles';
import { UseSearchPublications } from './discovery/UseSearchPublications';
import {
  ProfilesPage,
  UseLazyProfile,
  UseMutualFollowers,
  UseProfile,
  UseProfileActionHistory,
  UseProfileFollowers,
  UseProfileFollowing,
  UseProfiles,
  UseRecommendedProfiles,
  UseWhoActedOnPublication,
} from './profiles';
import {
  PublicationsPage,
  UsePublication,
  UsePublications,
  UseWhoReactedToPublication,
} from './publications';

const { publicClient, webSocketPublicClient } = configureChains(
  [polygonMumbai],
  [publicProvider()],
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

export function App() {
  return (
    <WagmiConfig config={config}>
      <LensProvider config={lensConfig}>
        <XMTPProvider>
          <Router>
            <Header />
            <main>
              <GenericErrorBoundary fallback={ErrorMessage}>
                <Routes>
                  <Route index element={<HomePage />} />
                  <Route path="/login" element={<LogInPage />} />

                  <Route element={<Layout />}>
                    <Route path="/publications">
                      <Route index element={<PublicationsPage />} />
                      <Route path="usePublication" element={<UsePublication />} />
                      <Route path="usePublications" element={<UsePublications />} />
                      <Route
                        path="useWhoReactedToPublication"
                        element={<UseWhoReactedToPublication />}
                      />
                    </Route>

                    <Route path="/profiles">
                      <Route index element={<ProfilesPage />} />
                      <Route path="useProfile" element={<UseProfile />} />
                      <Route path="useLazyProfile" element={<UseLazyProfile />} />
                      <Route path="useProfiles" element={<UseProfiles />} />
                      <Route path="useProfileFollowers" element={<UseProfileFollowers />} />
                      <Route path="useProfileFollowing" element={<UseProfileFollowing />} />
                      <Route path="useMutualFollowers" element={<UseMutualFollowers />} />
                      <Route path="useRecommendedProfiles" element={<UseRecommendedProfiles />} />
                      <Route
                        path="useWhoActedOnPublication"
                        element={<UseWhoActedOnPublication />}
                      />
                      <Route path="useProfileActionHistory" element={<UseProfileActionHistory />} />
                    </Route>

                    <Route path="/discovery">
                      <Route index element={<DiscoveryPage />} />
                      <Route path="useFeed" element={<UseFeed />} />
                      <Route path="useSearchPublications" element={<UseSearchPublications />} />
                      <Route path="useSearchProfiles" element={<UseSearchProfiles />} />
                      <Route path="useExplorePublications" element={<UseExplorePublications />} />
                    </Route>
                  </Route>

                  <Route path="*" element={<p>Not found</p>} />
                </Routes>
              </GenericErrorBoundary>
              <Toaster />
            </main>
          </Router>
        </XMTPProvider>
      </LensProvider>
    </WagmiConfig>
  );
}
