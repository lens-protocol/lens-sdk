import { from, ReactiveVar } from '@apollo/client';
import { WalletData } from '@lens-protocol/domain/use-cases/wallets';
import { ILogger } from '@lens-protocol/shared-kernel';

import { LENS_API_MINIMAL_SUPPORTED_VERSION } from '../constants';
import type { IAccessTokenStorage } from './IAccessTokenStorage';
import { SafeApolloClient } from './SafeApolloClient';
import { createSnapshotCache } from './cache';
import { createLensCache } from './cache/createLensCache';
import { ContentInsightMatcher } from './cache/utils/ContentInsight';
import { createAuthLink, createLensLink, createSnapshotLink } from './links';

export type { ContentInsightMatcher } from './cache/utils/ContentInsight';
export { snapshotPoll, demoSnapshotPoll } from './cache/utils/ContentInsight';

export type ApolloClientConfig = {
  activeWalletVar: ReactiveVar<WalletData | null>;
  accessTokenStorage: IAccessTokenStorage;
  backendURL: string;
  logger: ILogger;
  pollingInterval: number;
  contentMatchers: ContentInsightMatcher[];
};

export function createLensApolloClient({
  accessTokenStorage,
  activeWalletVar,
  backendURL,
  logger,
  pollingInterval,
  contentMatchers,
}: ApolloClientConfig) {
  const uri = `${backendURL}/graphql`;

  const authLink = createAuthLink(accessTokenStorage);

  const httpLink = createLensLink({
    uri,
    logger,
    supportedVersion: LENS_API_MINIMAL_SUPPORTED_VERSION,
  });

  return new SafeApolloClient({
    connectToDevTools: true,
    cache: createLensCache({ activeWalletVar, contentMatchers }),
    link: from([authLink, httpLink]),
    pollingInterval,
    version: LENS_API_MINIMAL_SUPPORTED_VERSION,
  });
}

export type AnonymousApolloClientConfig = {
  /**
   * @deprecated activeWalletVar should not be needed here. Move activeWalletVar in @lens-protocol/api-bindings to solve this.
   */
  activeWalletVar: ReactiveVar<WalletData | null>;
  backendURL: string;
  logger: ILogger;
};

export function createAnonymousLensApolloClient({
  activeWalletVar,
  backendURL,
  logger,
}: AnonymousApolloClientConfig) {
  const uri = `${backendURL}/graphql`;

  return new SafeApolloClient({
    cache: createLensCache({ activeWalletVar }),
    link: createLensLink({ uri, logger, supportedVersion: LENS_API_MINIMAL_SUPPORTED_VERSION }),
    version: LENS_API_MINIMAL_SUPPORTED_VERSION,
  });
}

export type SnapshotApolloClientConfig = {
  backendURL: string;
};

export function createSnapshotApolloClient({ backendURL }: SnapshotApolloClientConfig) {
  return new SafeApolloClient({
    cache: createSnapshotCache(),
    link: createSnapshotLink({
      uri: `${backendURL}/graphql`,
    }),
  });
}

export type { IAccessTokenStorage };
export type { IGraphQLClient } from './IGraphQLClient';
export * from './errors';
export * from './cache/transactions';
export * from './cache/activeProfileIdentifier';
export type { SafeApolloClient };
