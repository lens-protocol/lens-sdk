import { from } from '@apollo/client';
import { ILogger } from '@lens-protocol/shared-kernel';

import { LENS_API_MINIMAL_SUPPORTED_VERSION } from '../constants';
import { SafeApolloClient } from './SafeApolloClient';
import { createLensCache } from './cache/createLensCache';
import { AuthLinkArgs, IAccessTokenStorage, createAuthLink, createLensLink } from './links';

export type ApolloClientConfig = AuthLinkArgs & {
  connectToDevTools?: boolean;
  logger: ILogger;
  pollingInterval: number;
  uri: string;
};

export function createLensApolloClient({
  accessTokenStorage,
  uri,
  logger,
  pollingInterval,
  connectToDevTools,
}: ApolloClientConfig) {
  const authLink = createAuthLink({ accessTokenStorage });

  const httpLink = createLensLink({
    logger,
    supportedVersion: LENS_API_MINIMAL_SUPPORTED_VERSION,
    uri,
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
  logger: ILogger;
  origin?: string;
  uri: string;
};

export function createAuthApolloClient({ logger, origin, uri }: AuthApolloClientConfig) {
  return new SafeApolloClient({
    cache: createLensCache(),
    link: createLensLink({
      logger,
      origin,
      supportedVersion: LENS_API_MINIMAL_SUPPORTED_VERSION,
      uri,
    }),
    version: LENS_API_MINIMAL_SUPPORTED_VERSION,
  });
}

export type { IGraphQLClient } from './IGraphQLClient';
export * from './cache/session';
export * from './cache/transactions';
export * from './errors';
export type { IAccessTokenStorage, SafeApolloClient };
