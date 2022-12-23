import { LensConfig, LensProvider, sources, staging } from '@lens-protocol/react';
import { localStorage } from '@lens-protocol/react/web';
import { bindings as wagmiBindings } from '@lens-protocol/wagmi';
import toast, { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { optimism, polygon } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

import { GenericErrorBoundary } from './components/GenericErrorBoundary';
import { SearchProfiles } from './components/Search/SearchProfiles';
import { GenericError } from './components/error/GenericError';
import { Feed } from './components/feed/Feed';
import { Header } from './components/header/Header';
import { Home } from './components/home';
import { NotificationCount } from './components/notification/NotificationCount';
import { Notifications } from './components/notification/Notifications';
import { ExploreProfiles } from './components/profile/ExploreProfiles';
import { ProfileByHandle } from './components/profile/ProfileByHandle';
import { ProfileById } from './components/profile/ProfileById';
import { ProfilesToFollow } from './components/profiles-to-follow/ProfilesToFollow';
import { Publication } from './components/publication/Publication';

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

const toastNotification = (error: Error) => toast.error(error.message);

export function App() {
  return (
    <WagmiConfig client={client}>
      <LensProvider config={lensConfig} onError={toastNotification}>
        <Router>
          <Header />
          <main>
            <GenericErrorBoundary fallback={GenericError}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/feed" element={<Feed />} />
                <Route path="/explore-profiles" element={<ExploreProfiles />} />
                <Route path="/profiles-to-follow" element={<ProfilesToFollow />} />
                <Route path="/publication/:publicationId" element={<Publication />} />
                <Route path="/profile">
                  <Route path="handle/:handle" element={<ProfileByHandle />} />
                  <Route path="id/:profileId" element={<ProfileById />} />
                </Route>
                <Route path="/unread-notification-count" element={<NotificationCount />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/search">
                  <Route path="profiles" element={<SearchProfiles />} />
                  <Route path="publications" />
                </Route>
              </Routes>
            </GenericErrorBoundary>
            <Toaster />
          </main>
        </Router>
      </LensProvider>
    </WagmiConfig>
  );
}
