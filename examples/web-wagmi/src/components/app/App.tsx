import { LensConfig, LensProvider, sources, staging } from '@lens-protocol/react';
import { localStorage } from '@lens-protocol/react/web';
import { bindings as wagmiBindings } from '@lens-protocol/wagmi';
import toast, { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { optimism, polygon } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

import { Examples } from '../Examples';
import { Feed } from '../feed/Feed';
import { BackButton } from '../header/BackButton';
import { Header } from '../header/Header';
import { NotificationCount } from '../notification/NotificationCount';
import { Notifications } from '../notification/Notifications';
import { ExploreProfiles } from '../profile/ExploreProfiles';
import { ProfileByHandle } from '../profile/ProfileByHandle';
import { ProfileById } from '../profile/ProfileById';
import { ProfilesToFollow } from '../profiles-to-follow/ProfilesToFollow';

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
          <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
            <BackButton />
            <Routes>
              <Route path="/" element={<Examples />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/explore-profiles" element={<ExploreProfiles />} />
              <Route path="/profiles-to-follow" element={<ProfilesToFollow />} />
              <Route path="/profile-by-id" element={<ProfileById />} />
              <Route path="/profile-by-handle" element={<ProfileByHandle />} />
              <Route path="/unread-notification-count" element={<NotificationCount />} />
              <Route path="/notifications" element={<Notifications />} />
            </Routes>
            <Toaster />
          </div>
        </Router>
      </LensProvider>
    </WagmiConfig>
  );
}
