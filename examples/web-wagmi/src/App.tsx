import { LensConfig, LensProvider, sources, staging } from '@lens-protocol/react';
import { localStorage } from '@lens-protocol/react/web';
import { bindings as wagmiBindings } from '@lens-protocol/wagmi';
import toast, { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { optimism, polygon } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

import { Home } from './HomePage';
import { AuthenticationPage } from './authentication/AuthenticationPage';
import { Breadcrumbs } from './components/Breadcrumbs';
import { GenericErrorBoundary } from './components/GenericErrorBoundary';
import { GenericError } from './components/error/GenericError';
import { Header } from './components/header/Header';
import { DiscoveryPage } from './discovery/DiscoveryPage';
import { Feed } from './discovery/UseFeed';
import { MiscPage } from './misc/MiscPage';
import { UseCurrencies } from './misc/UseCurrencies';
import { Notifications } from './misc/UseNotifications';
import { UseUnreadNotificationCount } from './misc/UseUnreadNotificationCount';
import { ProfilesPage } from './profiles/ProfilesPage';
import { UseCollectedPublications } from './profiles/UseCollectedPublications';
import { UseExploreProfiles } from './profiles/UseExploreProfiles';
import { UseMutualFollowers } from './profiles/UseMutualFollowers';
import { ProfileByHandle } from './profiles/UseProfileByHandle';
import { ProfileById } from './profiles/UseProfileById';
import { ProfilesToFollow } from './profiles/UseProfilesToFollow';
import { UseSearchProfiles } from './profiles/UseSearchProfiles';
import { PublicationsPage } from './publications/PublicationsPage';
import { UsePublication } from './publications/UsePublication';
import { UsePublications } from './publications/UsePublications';
import { UseSearchPublications } from './publications/UseSearchPublications';
import { CreatePost } from './publications/components/CreatePost';
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
                <Route path="/publications/usePublication" element={<UsePublication />} />
                <Route path="/publications/useComments" element={<UsePublication />} />
                <Route path="/publications/usePublications" element={<UsePublications />} />
                <Route path="/publications/useCreatePost" element={<CreatePost />} />
                <Route
                  path="/publications/useCollectedPublications"
                  element={<UseCollectedPublications />}
                />
                <Route 
                  path="/publications/useSearchPublications"
                  element={<UseSearchPublications />}
                />

                <Route path="/profiles" element={<ProfilesPage />} />
                <Route path="/profiles/useProfile-handle" element={<ProfileByHandle />} />
                <Route path="/profiles/useProfile-id" element={<ProfileById />} />
                <Route path="/profiles/useExploreProfiles" element={<UseExploreProfiles />} />
                <Route path="/profiles/useProfilesToFollow" element={<ProfilesToFollow />} />
                <Route path="/profiles/useMutualFollowers" element={<UseMutualFollowers />} />
                <Route path="/profiles/useSearchProfiles" element={<UseSearchProfiles />} />

                <Route path="/discovery" element={<DiscoveryPage />} />
                <Route path="/discovery/useFeed" element={<Feed />} />

                <Route path="/revenue" element={<RevenuePage />} />

                <Route path="/misc" element={<MiscPage />} />
                <Route path="/misc/useNotifications" element={<Notifications />} />
                <Route
                  path="/misc/useUnreadNotificationCount"
                  element={<UseUnreadNotificationCount />}
                />
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
