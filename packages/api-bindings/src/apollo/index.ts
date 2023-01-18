import { ApolloClient, ApolloLink, from, HttpLink, ReactiveVar } from '@apollo/client';
import { WalletData } from '@lens-protocol/domain/use-cases/wallets';

import { ProfileFieldsFragment } from '../graphql';
import { IAccessTokenStorage } from './IAccessTokenStorage';
import { createApolloCache } from './createApolloCache';
import { createAuthLink } from './createAuthLink';
import { removeClientTypeFromExtendedUnion } from './transforms';

export type ApolloClientConfig = {
  activeProfileVar: ReactiveVar<ProfileFieldsFragment | null>;
  activeWalletVar: ReactiveVar<WalletData | null>;
  accessTokenStorage: IAccessTokenStorage;
  backendURL: string;
};

export function createApolloClient({
  backendURL,
  accessTokenStorage,
  activeProfileVar,
  activeWalletVar,
}: ApolloClientConfig) {
  const uri = `${backendURL}/graphql`;

  const cleanerLink = new ApolloLink((operation, forward) => {
    operation.query = removeClientTypeFromExtendedUnion('PendingPost', operation.query);

    return forward(operation);
  });

  const authLink = createAuthLink(accessTokenStorage);

  const httpLink = new HttpLink({
    uri,
  });

  return new ApolloClient({
    cache: createApolloCache({ activeWalletVar, activeProfileVar }),
    link: from([cleanerLink, authLink, httpLink]),
    connectToDevTools: true,
  });
}

export type AnonymousApolloClientConfig = {
  backendURL: string;
  activeProfileVar: ReactiveVar<ProfileFieldsFragment | null>;
  activeWalletVar: ReactiveVar<WalletData | null>;
};

export function createAnonymousApolloClient({
  backendURL,
  activeProfileVar,
  activeWalletVar,
}: AnonymousApolloClientConfig) {
  const uri = `${backendURL}/graphql`;

  return new ApolloClient({
    cache: createApolloCache({ activeWalletVar, activeProfileVar }),
    uri,
  });
}

export { IAccessTokenStorage };

export { resolveFeedQueryCacheKey } from './createFeedFieldPolicy';
