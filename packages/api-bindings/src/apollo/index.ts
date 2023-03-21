import { from, ReactiveVar } from '@apollo/client';
import { WalletData } from '@lens-protocol/domain/use-cases/wallets';
import { ILogger } from '@lens-protocol/shared-kernel';

import { LENS_API_SUPPORTED_MAJOR_VERSION } from '../constants';
import type { IAccessTokenStorage } from './IAccessTokenStorage';
import { LensApolloClient } from './LensApolloClient';
import { createApolloCache } from './cache/createApolloCache';
import { createAuthLink, createHttpLink } from './links';

export type ApolloClientConfig = {
  activeWalletVar: ReactiveVar<WalletData | null>;
  accessTokenStorage: IAccessTokenStorage;
  backendURL: string;
  logger: ILogger;
  pollingInterval: number;
};

export function createApolloClient({
  accessTokenStorage,
  activeWalletVar,
  backendURL,
  logger,
  pollingInterval,
}: ApolloClientConfig) {
  const uri = `${backendURL}/graphql`;

  const authLink = createAuthLink(accessTokenStorage);

  const httpLink = createHttpLink({
    uri,
    logger,
    supportedVersion: LENS_API_SUPPORTED_MAJOR_VERSION,
  });

  return new LensApolloClient({
    cache: createApolloCache({ activeWalletVar }),
    link: from([authLink, httpLink]),
    pollingInterval,
    version: LENS_API_SUPPORTED_MAJOR_VERSION,
  });
}

export type AnonymousApolloClientConfig = {
  activeWalletVar: ReactiveVar<WalletData | null>;
  backendURL: string;
  logger: ILogger;
};

export function createAnonymousApolloClient({
  activeWalletVar,
  backendURL,
  logger,
}: AnonymousApolloClientConfig) {
  const uri = `${backendURL}/graphql`;

  return new LensApolloClient({
    cache: createApolloCache({ activeWalletVar }),
    link: createHttpLink({ uri, logger, supportedVersion: LENS_API_SUPPORTED_MAJOR_VERSION }),
    version: LENS_API_SUPPORTED_MAJOR_VERSION,
  });
}

export type { IAccessTokenStorage };
export type { IGraphQLClient } from './IGraphQLClient';
export * from './errors';
export * from './cache/transactions';
export type { LensApolloClient };
