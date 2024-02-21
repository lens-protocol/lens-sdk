import { from } from '@apollo/client';
import { ILogger } from '@lens-protocol/shared-kernel';

import { LENS_API_MINIMAL_SUPPORTED_VERSION } from '../constants';
import { SafeApolloClient } from './SafeApolloClient';
import { createSnapshotCache } from './cache';
import { createLensCache } from './cache/createLensCache';
import {
  AuthLinkArgs,
  IAccessTokenStorage,
  createAuthLink,
  createLensLink,
  createSnapshotLink,
} from './links';

export { demoSnapshotPoll, snapshotPoll } from './cache/utils/ContentInsight';
export type { ContentInsightMatcher } from './cache/utils/ContentInsight';

export type ApolloClientConfig = AuthLinkArgs & {
  uri: string;
  logger: ILogger;
  pollingInterval: number;
  connectToDevTools?: boolean;
};

export function createLensApolloClient({
  accessTokenStorage,
  origin,
  uri,
  logger,
  pollingInterval,
  connectToDevTools,
}: ApolloClientConfig) {
  const authLink = createAuthLink({ accessTokenStorage, origin });

  const httpLink = createLensLink({
    uri,
    logger,
    supportedVersion: LENS_API_MINIMAL_SUPPORTED_VERSION,
  });

  return new SafeApolloClient({
    connectToDevTools,
    cache: createLensCache(),
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

export type { IGraphQLClient } from './IGraphQLClient';
export * from './cache/session';
export * from './cache/transactions';
export * from './errors';
export type { IAccessTokenStorage, SafeApolloClient };
