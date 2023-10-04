import { LensConfig, LensProvider, development } from '@lens-protocol/react';
import { XMTPProvider } from '@xmtp/react-sdk';
import { Toaster } from 'react-hot-toast';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { publicProvider } from 'wagmi/providers/public';

import { Home } from './HomePage';
import { Breadcrumbs } from './components/Breadcrumbs';
import { GenericErrorBoundary } from './components/GenericErrorBoundary';
import { ErrorMessage } from './components/error/ErrorMessage';
import { Header } from './components/header/Header';
import { ProfilesPage } from './profiles/ProfilesPage';
import { UseProfile } from './profiles/UseProfile';
import { UseProfiles } from './profiles/UseProfiles';
import { PublicationsPage } from './publications/PublicationsPage';
import { UsePublication } from './publications/UsePublication';
import { UsePublications } from './publications/UsePublications';
import { SearchPage } from './search/SearchPage';
import { UseSearchPublications } from './search/UseSearchPublications';
import { localStorage } from './storage';

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
  storage: localStorage(),
};

export function App() {
  return (
    <WagmiConfig config={config}>
      <LensProvider config={lensConfig}>
        <XMTPProvider>
          <Router>
            <Header />
            <main>
              <Breadcrumbs />
              <GenericErrorBoundary fallback={ErrorMessage}>
                <Routes>
                  <Route index element={<Home />} />

                  <Route path="/publications">
                    <Route index element={<PublicationsPage />} />
                    <Route path="usePublication" element={<UsePublication />} />
                    <Route path="usePublications" element={<UsePublications />} />
                  </Route>

                  <Route path="/profiles">
                    <Route index element={<ProfilesPage />} />
                    <Route path="useProfile" element={<UseProfile />} />
                    <Route path="useProfiles" element={<UseProfiles />} />
                  </Route>

                  <Route path="/search">
                    <Route index element={<SearchPage />} />
                    <Route path="useSearchPublications" element={<UseSearchPublications />} />
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
