import { LensConfig, LensProvider, sources, staging } from '@lens-protocol/react';
import { localStorage } from '@lens-protocol/react/web';
import { bindings as wagmiBindings } from '@lens-protocol/wagmi';
import toast, { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { optimism, polygon } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

import { AuthenticationPage } from './authentication/AuthenticationPage';
import { Breadcrumbs } from './components/Breadcrumbs';
import { GenericErrorBoundary } from './components/GenericErrorBoundary';
import { GenericError } from './components/error/GenericError';
import { Feed } from './components/feed/Feed';
import { Header } from './components/header/Header';
import { Home } from './components/home';
import { NotificationCount } from './components/notification/NotificationCount';
import { Notifications } from './components/notification/Notifications';
import { ProfileByHandle } from './components/profile/ProfileByHandle';
import { ProfileById } from './components/profile/ProfileById';
import { UseCollectedPublications } from './components/profile/UseCollectedPublications';
import { UseExploreProfiles } from './components/profile/UseExploreProfiles';
import { UseMutualFollowers } from './components/profile/UseMutualFollowers';
import { ProfilesToFollow } from './components/profiles-to-follow/ProfilesToFollow';
import { Publication } from './components/publication/UsePublication';
import { UsePublications } from './components/publication/UsePublications';
import { UseCurrencies } from './components/revenue/UseCurrencies';
import { DiscoveryPage } from './discovery/DiscoveryPage';
import { MiscPage } from './misc/MiscPage';
import { ProfilesPage } from './profiles/ProfilesPage';
import { PublicationsPage } from './publications/PublicationsPage';
import { UseCreatePost } from './publications/UseCreatePost';
import { RevenuePage } from './revenue/RevenuePage';

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
            <Breadcrumbs />
            <GenericErrorBoundary fallback={GenericError}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/authentication" element={<AuthenticationPage />} />

                <Route path="/publications" element={<PublicationsPage />} />
                <Route path="/publications/usePublication" element={<Publication />} />
                <Route path="/publications/useComments" element={<Publication />} />
                <Route path="/publications/usePublications" element={<UsePublications />} />
                <Route path="/publications/useCreatePost" element={<UseCreatePost />} />
                <Route
                  path="/publications/useCollectedPublications"
                  element={<UseCollectedPublications />}
                />

                <Route path="/profiles" element={<ProfilesPage />} />
                <Route path="/profiles/useProfile-handle" element={<ProfileByHandle />} />
                <Route path="/profiles/useProfile-id" element={<ProfileById />} />
                <Route path="/profiles/useExploreProfiles" element={<UseExploreProfiles />} />
                <Route path="/profiles/useProfilesToFollow" element={<ProfilesToFollow />} />
                <Route path="/profiles/useMutualFollowers" element={<UseMutualFollowers />} />

                <Route path="/discovery" element={<DiscoveryPage />} />
                <Route path="/discovery/useFeed" element={<Feed />} />

                <Route path="/revenue" element={<RevenuePage />} />

                <Route path="/misc" element={<MiscPage />} />
                <Route path="/misc/useNotifications" element={<Notifications />} />
                <Route path="/misc/useUnreadNotificationCount" element={<NotificationCount />} />
                <Route path="/misc/useCurrencies" element={<UseCurrencies />} />
              </Routes>
            </GenericErrorBoundary>
            <Toaster />
          </main>
        </Router>
      </LensProvider>
    </WagmiConfig>
  );
}
