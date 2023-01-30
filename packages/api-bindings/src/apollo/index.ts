import { from, HttpLink, ReactiveVar } from '@apollo/client';
import { WalletData } from '@lens-protocol/domain/use-cases/wallets';

import { IAccessTokenStorage } from './IAccessTokenStorage';
import { LensApolloClient } from './LensApolloClient';
import { createApolloCache } from './createApolloCache';
import { createAuthLink } from './createAuthLink';

export type ApolloClientConfig = {
  activeWalletVar: ReactiveVar<WalletData | null>;
  accessTokenStorage: IAccessTokenStorage;
  backendURL: string;
  pollingInterval: number;
};

export function createApolloClient({
  backendURL,
  accessTokenStorage,
  activeWalletVar,
  pollingInterval,
}: ApolloClientConfig) {
  const uri = `${backendURL}/graphql`;

  const authLink = createAuthLink(accessTokenStorage);

  const httpLink = new HttpLink({
    uri,
  });

  return new LensApolloClient({
    cache: createApolloCache({ activeWalletVar }),
    link: from([authLink, httpLink]),
    pollingInterval,
  });
}

export type AnonymousApolloClientConfig = {
  backendURL: string;
  activeWalletVar: ReactiveVar<WalletData | null>;
};

export function createAnonymousApolloClient({
  backendURL,
  activeWalletVar,
}: AnonymousApolloClientConfig) {
  const uri = `${backendURL}/graphql`;

  return new LensApolloClient({
    cache: createApolloCache({ activeWalletVar }),
    link: new HttpLink({ uri }),
  });
}

export type { IAccessTokenStorage };
export type { IGraphQLClient } from './IGraphQLClient';
export * from './errors';
export type { LensApolloClient };
