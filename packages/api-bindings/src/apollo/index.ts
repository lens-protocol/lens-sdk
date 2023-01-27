import { ApolloClient, from, HttpLink, ReactiveVar } from '@apollo/client';
import { WalletData } from '@lens-protocol/domain/use-cases/wallets';

import { IAccessTokenStorage } from './IAccessTokenStorage';
import { createApolloCache } from './createApolloCache';
import { createAuthLink } from './createAuthLink';

export type ApolloClientConfig = {
  activeWalletVar: ReactiveVar<WalletData | null>;
  accessTokenStorage: IAccessTokenStorage;
  backendURL: string;
};

export function createApolloClient({
  backendURL,
  accessTokenStorage,
  activeWalletVar,
}: ApolloClientConfig) {
  const uri = `${backendURL}/graphql`;

  const authLink = createAuthLink(accessTokenStorage);

  const httpLink = new HttpLink({
    uri,
  });

  return new ApolloClient({
    cache: createApolloCache({ activeWalletVar }),
    link: from([authLink, httpLink]),
    connectToDevTools: true,
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

  return new ApolloClient({
    cache: createApolloCache({ activeWalletVar }),
    uri,
  });
}

export { IAccessTokenStorage };
