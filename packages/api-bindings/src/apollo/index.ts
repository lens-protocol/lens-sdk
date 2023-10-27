import { from } from '@apollo/client';
import { ILogger } from '@lens-protocol/shared-kernel';

import { LENS_API_MINIMAL_SUPPORTED_VERSION } from '../constants';
import type { IAccessTokenStorage } from './IAccessTokenStorage';
import { SafeApolloClient } from './SafeApolloClient';
import { createSnapshotCache } from './cache';
import { createLensCache, QueryParams } from './cache/createLensCache';
import { createAuthLink, createLensLink, createSnapshotLink } from './links';

export type { ContentInsightMatcher } from './cache/utils/ContentInsight';
export { snapshotPoll, demoSnapshotPoll } from './cache/utils/ContentInsight';

export type ApolloClientConfig = {
  accessTokenStorage: IAccessTokenStorage;
  uri: string;
  logger: ILogger;
  pollingInterval: number;
  queryParams: QueryParams;
};

export function createLensApolloClient({
  accessTokenStorage,
  uri,
  logger,
  pollingInterval,
  queryParams,
}: ApolloClientConfig) {
  const authLink = createAuthLink(accessTokenStorage);

  const httpLink = createLensLink({
    uri,
    logger,
    supportedVersion: LENS_API_MINIMAL_SUPPORTED_VERSION,
  });

  return new SafeApolloClient({
    connectToDevTools: true,
    cache: createLensCache(queryParams),
    link: from([authLink, httpLink]),
    pollingInterval,
    version: LENS_API_MINIMAL_SUPPORTED_VERSION,
  });
}

export type AuthApolloClientConfig = {
  uri: string;
  logger: ILogger;
};

export function createAuthApolloClient({ uri, logger }: AuthApolloClientConfig) {
  return new SafeApolloClient({
    cache: createLensCache(),
    link: createLensLink({ uri, logger, supportedVersion: LENS_API_MINIMAL_SUPPORTED_VERSION }),
    version: LENS_API_MINIMAL_SUPPORTED_VERSION,
  });
}

export type SnapshotApolloClientConfig = {
  uri: string;
};

export function createSnapshotApolloClient({ uri }: SnapshotApolloClientConfig) {
  return new SafeApolloClient({
    cache: createSnapshotCache(),
    link: createSnapshotLink({ uri }),
  });
}

export type { IAccessTokenStorage };
export { defaultQueryParams } from './cache/createLensCache';
export type { QueryParams };
export type { IGraphQLClient } from './IGraphQLClient';
export * from './errors';
export * from './cache/transactions';
export * from './cache/session';
export type { SafeApolloClient };
