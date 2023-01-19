import { ApolloClient, ApolloLink, from, HttpLink } from '@apollo/client';

import { IAccessTokenStorage } from './IAccessTokenStorage';
import { createApolloCache } from './createApolloCache';
import { createAuthLink } from './createAuthLink';
import { removeClientTypeFromExtendedUnion } from './transforms';

export type ApolloClientConfig = {
  accessTokenStorage: IAccessTokenStorage;
  backendURL: string;
};

export function createApolloClient({ backendURL, accessTokenStorage }: ApolloClientConfig) {
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
    cache: createApolloCache(),
    link: from([cleanerLink, authLink, httpLink]),
    connectToDevTools: true,
  });
}

export type AnonymousApolloClientConfig = {
  backendURL: string;
};

export function createAnonymousApolloClient({ backendURL }: AnonymousApolloClientConfig) {
  const uri = `${backendURL}/graphql`;

  return new ApolloClient({
    cache: createApolloCache(),
    uri,
  });
}

export { IAccessTokenStorage };
