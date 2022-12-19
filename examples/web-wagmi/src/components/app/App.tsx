import { LensConfig, LensProvider, sources, staging } from '@lens-protocol/react';
import { localStorage } from '@lens-protocol/react/web';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

import { Examples } from '../Examples';
import { Feed } from '../feed/Feed';
import { BackButton } from '../header/BackButton';
import { Header } from '../header/Header';
import { ProfileByHandle } from '../profile/ProfileByHandle';
import { ProfileById } from '../profile/ProfileById';
import { ProfilesToFollow } from '../profiles-to-follow/ProfilesToFollow';
import { Publication } from '../publication/Publication';

const { provider, webSocketProvider } = configureChains([chain.polygon], [publicProvider()]);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

const lensConfig: LensConfig = {
  provider: client.provider,
  environment: staging,
  storage: localStorage(),
  sources: [sources.lenster, sources.orb, 'any-other-app-id'],
};

export function App() {
  return (
    <WagmiConfig client={client}>
      <LensProvider config={lensConfig}>
        <Router>
          <Header />
          <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
            <BackButton />
            <Routes>
              <Route path="/" element={<Examples />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/profiles-to-follow" element={<ProfilesToFollow />} />
              <Route path="/publication/:publicationId" element={<Publication />} />
              <Route path="/profile">
                <Route path="handle/:handle" element={<ProfileByHandle />} />
                <Route path="id/:id" element={<ProfileById />} />
              </Route>
            </Routes>
          </div>
        </Router>
      </LensProvider>
    </WagmiConfig>
  );
}
