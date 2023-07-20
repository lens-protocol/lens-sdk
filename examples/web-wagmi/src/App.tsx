import {
  LensConfig,
  LensProvider,
  LogoutData,
  LogoutReason,
  development,
} from '@lens-protocol/react-web';
import { bindings as wagmiBindings } from '@lens-protocol/wagmi';
import toast, { Toaster } from 'react-hot-toast';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { publicProvider } from 'wagmi/providers/public';

import { Home } from './HomePage';
import { AuthenticationPage } from './authentication/AuthenticationPage';
import { LoginSpecificProfile } from './authentication/LoginSpecificProfile';
import { Breadcrumbs } from './components/Breadcrumbs';
import { GenericErrorBoundary } from './components/GenericErrorBoundary';
import { ErrorMessage } from './components/error/ErrorMessage';
import { Header } from './components/header/Header';
import { DiscoveryPage } from './discovery/DiscoveryPage';
import { UseExploreProfiles } from './discovery/UseExploreProfiles';
import { UseExplorePublications } from './discovery/UseExplorePublications';
import { UseFeed } from './discovery/UseFeed';
import { UseSearchProfiles } from './discovery/UseSearchProfiles';
import { UseSearchPublications } from './discovery/UseSearchPublications';
import { MiscPage } from './misc/MiscPage';
import { Polls } from './misc/Polls';
import { UseApproveModule } from './misc/UseApproveModule';
import { UseCurrencies } from './misc/UseCurrencies';
import { UseEnabledModules } from './misc/UseEnabledModules';
import { UseNotifications } from './misc/UseNotifications';
import { UseRecentTransactions } from './misc/UseRecentTransactions';
import { UseUnreadNotificationCount } from './misc/UseUnreadNotificationCount';
import { ProfilesPage } from './profiles/ProfilesPage';
import { UseActiveProfileSwitch } from './profiles/UseActiveProfileSwitch';
import { UseCreateProfile } from './profiles/UseCreateProfile';
import { UseFollowAndUnfollow } from './profiles/UseFollowAndUnfollow';
import { UseMutualFollowers } from './profiles/UseMutualFollowers';
import { UseProfile } from './profiles/UseProfile';
import { UseProfileFollowers } from './profiles/UseProfileFollowers';
import { UseProfileFollowing } from './profiles/UseProfileFollowing';
import { UseProfileGuardian } from './profiles/UseProfileGuardian';
import { UseProfilesOwnedBy } from './profiles/UseProfileOwnedBy';
import { UseProfiles } from './profiles/UseProfiles';
import { ProfilesToFollow } from './profiles/UseProfilesToFollow';
import { UseUpdateDispatcherConfig } from './profiles/UseUpdateDispatcherConfig';
import { UseUpdateFollowPolicy } from './profiles/UseUpdateFollowPolicy';
import { UseUpdateProfileDetails } from './profiles/UseUpdateProfileDetails';
import { UseUpdateProfileImage } from './profiles/UseUpdateProfileImage';
import { PublicationsPage } from './publications/PublicationsPage';
import { UseCollect } from './publications/UseCollect';
import { UseCollectedPublications } from './publications/UseCollectedPublications';
import { UseCreateComment } from './publications/UseCreateComment';
import { UseCreateEncryptedPost } from './publications/UseCreateEncryptedPost';
import { UseCreateMirror } from './publications/UseCreateMirror';
import { UseCreatePost } from './publications/UseCreatePost';
import { UseHidePublication } from './publications/UseHidePublication';
import { UseProfilePublicationsForSale } from './publications/UseProfilePublicationsForSale';
import { UsePublication } from './publications/UsePublication';
import { UsePublications } from './publications/UsePublications';
import { UseReaction } from './publications/UseReaction';
import { UseReportPublication } from './publications/UseReportPublication';
import { UseWhoCollectedPublication } from './publications/UseWhoCollectedPublication';
import { UseWhoMirroredPublication } from './publications/UseWhoMirroredPublication';
import { UseWhoReacted } from './publications/UseWhoReacted';
import { RevenuePage } from './revenue/RevenuePage';
import { UseProfileFollowRevenue } from './revenue/UseProfileFollowRevenue';
import { UseProfilePublicationRevenue } from './revenue/UseProfilePublicationRevenue';
import { UsePublicationRevenue } from './revenue/UsePublicationRevenue';

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
  bindings: wagmiBindings(),
  environment: development,
};

const notifyError = (error: Error) => toast.error(error.message);

const notifyLogout = ({ logoutReason }: LogoutData) => {
  switch (logoutReason) {
    case LogoutReason.CREDENTIALS_EXPIRED:
      return toast.error('It appears your credentials have expired. Please log in again.');
    case LogoutReason.USER_INITIATED:
      return toast.success('You have successfully logged out.');
  }
};

export function App() {
  return (
    <WagmiConfig config={config}>
      <LensProvider config={lensConfig} onError={notifyError} onLogout={notifyLogout}>
        <Router>
          <Header />
          <main>
            <Breadcrumbs />
            <GenericErrorBoundary fallback={ErrorMessage}>
              <Routes>
                <Route index element={<Home />} />

                <Route path="/authentication">
                  <Route index element={<AuthenticationPage />} />
                  <Route path="loginSpecificProfile" element={<LoginSpecificProfile />} />
                </Route>

                <Route path="/publications">
                  <Route index element={<PublicationsPage />} />
                  <Route path="usePublication" element={<UsePublication />} />
                  <Route path="usePublications" element={<UsePublications />} />
                  <Route path="useComments" element={<UsePublication />} />
                  <Route path="useCollectedPublications" element={<UseCollectedPublications />} />
                  <Route path="useCreatePost" element={<UseCreatePost />} />
                  <Route path="useCreateEncryptedPost" element={<UseCreateEncryptedPost />} />
                  <Route path="useCreateComment" element={<UseCreateComment />} />
                  <Route
                    path="useProfilePublicationsForSale"
                    element={<UseProfilePublicationsForSale />}
                  />
                  <Route path="useReaction" element={<UseReaction />} />
                  <Route path="useWhoReacted" element={<UseWhoReacted />} />
                  <Route path="useReportPublication" element={<UseReportPublication />} />
                  <Route path="useHidePublication" element={<UseHidePublication />} />
                  <Route
                    path="useWhoCollectedPublication"
                    element={<UseWhoCollectedPublication />}
                  />
                  <Route path="UseCreateMirror" element={<UseCreateMirror />} />
                  <Route path="useWhoMirroredPublication" element={<UseWhoMirroredPublication />} />
                  <Route path="useCollect" element={<UseCollect />} />
                </Route>

                <Route path="/profiles">
                  <Route index element={<ProfilesPage />} />
                  <Route path="useCreateProfile" element={<UseCreateProfile />} />
                  <Route path="useProfile" element={<UseProfile />} />
                  <Route path="useProfiles" element={<UseProfiles />} />
                  <Route path="useUpdateDispatcherConfig" element={<UseUpdateDispatcherConfig />} />
                  <Route path="useMutualFollowers" element={<UseMutualFollowers />} />
                  <Route path="useProfilesToFollow" element={<ProfilesToFollow />} />
                  <Route path="useFollow" element={<UseFollowAndUnfollow />} />
                  <Route path="useUpdateProfileImage" element={<UseUpdateProfileImage />} />
                  <Route path="useUpdateFollowPolicy" element={<UseUpdateFollowPolicy />} />
                  <Route path="useUpdateProfileDetails" element={<UseUpdateProfileDetails />} />
                  <Route path="useActiveProfileSwitch" element={<UseActiveProfileSwitch />} />
                  <Route path="useProfilesOwnedBy" element={<UseProfilesOwnedBy />} />
                  <Route path="useProfileFollowers" element={<UseProfileFollowers />} />
                  <Route path="useProfileFollowing" element={<UseProfileFollowing />} />
                  <Route path="useProfileGuardian" element={<UseProfileGuardian />} />
                </Route>

                <Route path="/discovery">
                  <Route index element={<DiscoveryPage />} />
                  <Route path="useFeed" element={<UseFeed />} />
                  <Route path="useExploreProfiles" element={<UseExploreProfiles />} />
                  <Route path="useExplorePublications" element={<UseExplorePublications />} />
                  <Route path="useSearchProfiles" element={<UseSearchProfiles />} />
                  <Route path="useSearchPublications" element={<UseSearchPublications />} />
                </Route>

                <Route path="/revenue">
                  <Route index element={<RevenuePage />} />
                  <Route path="usePublicationRevenue" element={<UsePublicationRevenue />} />
                  <Route path="useProfileFollowRevenue" element={<UseProfileFollowRevenue />} />
                  <Route
                    path="useProfilePublicationRevenue"
                    element={<UseProfilePublicationRevenue />}
                  />
                </Route>

                <Route path="/misc">
                  <Route index element={<MiscPage />} />
                  <Route path="/misc/useCurrencies" element={<UseCurrencies />} />
                  <Route path="/misc/useEnabledModules" element={<UseEnabledModules />} />
                  <Route path="/misc/useNotifications" element={<UseNotifications />} />
                  <Route
                    path="/misc/useUnreadNotificationCount"
                    element={<UseUnreadNotificationCount />}
                  />
                  <Route path="/misc/useApproveModule" element={<UseApproveModule />} />
                  <Route path="/misc/useRecentTransactions" element={<UseRecentTransactions />} />
                  <Route path="/misc/polls" element={<Polls />} />
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
