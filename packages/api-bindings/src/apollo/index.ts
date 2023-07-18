import { from } from '@apollo/client';
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
  accessTokenStorage: IAccessTokenStorage;
  backendURL: string;
  logger: ILogger;
  pollingInterval: number;
  contentMatchers: ContentInsightMatcher[];
};

export function createLensApolloClient({
  accessTokenStorage,
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
    cache: createLensCache({ contentMatchers }),
    link: from([authLink, httpLink]),
    pollingInterval,
    version: LENS_API_MINIMAL_SUPPORTED_VERSION,
  });
}

export type AuthApolloClientConfig = {
  backendURL: string;
  logger: ILogger;
};

export function createAuthApolloClient({ backendURL, logger }: AuthApolloClientConfig) {
  const uri = `${backendURL}/graphql`;

  return new SafeApolloClient({
    cache: createLensCache(),
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
export * from './cache/session';
export { newResultsProbe } from './cache/utils/cursorBasedPagination';
export type { SafeApolloClient };
