import { LensConfig, LensProvider, development } from '@lens-protocol/react-web';
import { bindings as wagmiBindings } from '@lens-protocol/wagmi';
import { XMTPProvider } from '@xmtp/react-sdk';
import { Toaster } from 'react-hot-toast';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { publicProvider } from 'wagmi/providers/public';

import { HomePage } from './HomePage';
import { Layout } from './Layout';
import { LogInPage } from './LogInPage';
import { GenericErrorBoundary } from './components/GenericErrorBoundary';
import { ErrorMessage } from './components/error/ErrorMessage';
import { Header } from './components/header/Header';
import {
  DiscoveryPage,
  UseExploreProfiles,
  UseExplorePublications,
  UseFeed,
  UseFeedHighlights,
  UseSearchProfiles,
  UseSearchPublications,
} from './discovery';
import {
  LensClientInteroperability,
  MiscPage,
  UseApproveModule,
  UseClaimHandle,
  UseCurrencies,
  UseInviteWallets,
  UseNotifications,
} from './misc';
import {
  ProfilesPage,
  UseBlockAndUnblockProfiles,
  UseBlockedProfiles,
  UseFollowAndUnfollow,
  UseLastLoggedInProfile,
  UseLazyProfile,
  UseLazyProfiles,
  UseMutualFollowers,
  UseOwnedHandles,
  UseProfile,
  UseProfileActionHistory,
  UseProfileFollowers,
  UseProfileFollowing,
  UseProfileManagers,
  UseProfiles,
  UseProfilesManaged,
  UseRecommendedProfiles,
  UseSetProfileMetadata,
  UseUpdateFollowPolicy,
  UseUpdateProfileManagers,
  UseWhoActedOnPublication,
} from './profiles';
import {
  PublicationsPage,
  UseBookmarkToggle,
  UseCreateComment,
  UseCreatePost,
  UseCreateQuote,
  UseHidePublication,
  UseBookmarks,
  UseNotInterestedToggle,
  UseOpenAction,
  UsePublication,
  UsePublications,
  UseReactionToggle,
  UseReportPublication,
  UseWhoReactedToPublication,
  UseLazyPublications,
} from './publications';
import {
  RevenuePage,
  UseRevenueFromFollow,
  UseRevenueFromPublication,
  UseRevenueFromPublications,
} from './revenue';

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
                      <Route path="useCreatePost" element={<UseCreatePost />} />
                      <Route path="useCreateComment" element={<UseCreateComment />} />
                      <Route path="useCreateQuote" element={<UseCreateQuote />} />
                      <Route path="usePublication" element={<UsePublication />} />
                      <Route path="usePublications" element={<UsePublications />} />
                      <Route path="useLazyPublications" element={<UseLazyPublications />} />
                      <Route
                        path="useWhoReactedToPublication"
                        element={<UseWhoReactedToPublication />}
                      />
                      <Route path="useHidePublication" element={<UseHidePublication />} />
                      <Route path="useReportPublication" element={<UseReportPublication />} />
                      <Route path="useReactionToggle" element={<UseReactionToggle />} />
                      <Route path="useBookmarkToggle" element={<UseBookmarkToggle />} />
                      <Route path="useBookmarks" element={<UseBookmarks />} />
                      <Route path="useOpenAction" element={<UseOpenAction />} />
                      <Route path="useNotInterestedToggle" element={<UseNotInterestedToggle />} />
                    </Route>

                    <Route path="/profiles">
                      <Route index element={<ProfilesPage />} />
                      <Route path="useProfile" element={<UseProfile />} />
                      <Route path="useLazyProfile" element={<UseLazyProfile />} />
                      <Route path="useProfiles" element={<UseProfiles />} />
                      <Route path="useLazyProfiles" element={<UseLazyProfiles />} />
                      <Route path="useProfileFollowers" element={<UseProfileFollowers />} />
                      <Route path="useProfileFollowing" element={<UseProfileFollowing />} />
                      <Route path="useMutualFollowers" element={<UseMutualFollowers />} />
                      <Route path="useFollow" element={<UseFollowAndUnfollow />} />
                      <Route path="useRecommendedProfiles" element={<UseRecommendedProfiles />} />
                      <Route path="useProfileManagers" element={<UseProfileManagers />} />
                      <Route
                        path="useUpdateProfileManagers"
                        element={<UseUpdateProfileManagers />}
                      />
                      <Route path="useProfilesManaged" element={<UseProfilesManaged />} />
                      <Route
                        path="useWhoActedOnPublication"
                        element={<UseWhoActedOnPublication />}
                      />
                      <Route path="useProfileActionHistory" element={<UseProfileActionHistory />} />
                      <Route path="useSetProfileMetadata" element={<UseSetProfileMetadata />} />
                      <Route path="useUpdateFollowPolicy" element={<UseUpdateFollowPolicy />} />
                      <Route path="useOwnedHandles" element={<UseOwnedHandles />} />
                      <Route path="useBlockProfiles" element={<UseBlockAndUnblockProfiles />} />
                      <Route path="useBlockedProfiles" element={<UseBlockedProfiles />} />
                      <Route path="useLastLoggedInProfile" element={<UseLastLoggedInProfile />} />
                    </Route>

                    <Route path="/discovery">
                      <Route index element={<DiscoveryPage />} />
                      <Route path="useFeed" element={<UseFeed />} />
                      <Route path="useFeedHighlights" element={<UseFeedHighlights />} />
                      <Route path="useSearchPublications" element={<UseSearchPublications />} />
                      <Route path="useSearchProfiles" element={<UseSearchProfiles />} />
                      <Route path="useExploreProfiles" element={<UseExploreProfiles />} />
                      <Route path="useExplorePublications" element={<UseExplorePublications />} />
                    </Route>

                    <Route path="/revenue">
                      <Route index element={<RevenuePage />} />
                      <Route path="useRevenueFromFollow" element={<UseRevenueFromFollow />} />
                      <Route
                        path="useRevenueFromPublication"
                        element={<UseRevenueFromPublication />}
                      />
                      <Route
                        path="useRevenueFromPublications"
                        element={<UseRevenueFromPublications />}
                      />
                    </Route>

                    <Route path="/misc">
                      <Route index element={<MiscPage />} />
                      <Route path="useNotifications" element={<UseNotifications />} />
                      <Route path="useCurrencies" element={<UseCurrencies />} />
                      <Route path="useApproveModule" element={<UseApproveModule />} />
                      <Route path="useClaimHandle" element={<UseClaimHandle />} />
                      <Route path="useInviteWallets" element={<UseInviteWallets />} />
                      <Route
                        path="lensClientInteroperability"
                        element={<LensClientInteroperability />}
                      />
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
