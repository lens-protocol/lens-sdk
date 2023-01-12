import { ApolloClient, from, HttpLink } from '@apollo/client';

import generatedIntrospection from '../graphql/generated';
import { IAccessTokenStorage } from './IAccessTokenStorage';
import { createApolloCache, TypePolicies } from './createApolloCache';
import { createAuthLink } from './createAuthLink';
import { CreateErc20AmountFieldPolicy } from './createErc20AmountFieldPolicy';
import { createExploreProfilesFieldPolicy } from './createExploreProfileFieldPolicy';
import { createExplorePublicationsFieldPolicy } from './createExplorePublicationsFieldPolicy';
import { createFeedFieldPolicy } from './createFeedFieldPolicy';
import { createNotificationsFieldPolicy } from './createNotificationsFieldPolicy';
import { createProfileTypePolicy } from './createProfileTypePolicy';
import { createPublicationTypePolicy } from './createPublicationTypePolicy';
import { createSearchFieldPolicy } from './createSearchFieldPolicy';
import { createWhoReactedPublicationFieldPolicy } from './createWhoReactedPublicationFieldPolicy';

function createTypePolicies(): TypePolicies {
  return {
    Profile: createProfileTypePolicy(),
    Post: createPublicationTypePolicy(),
    Comment: createPublicationTypePolicy(),
    Mirror: createPublicationTypePolicy(),
    Erc20Amount: CreateErc20AmountFieldPolicy(),
    Query: {
      fields: {
        feed: createFeedFieldPolicy(),
        exploreProfiles: createExploreProfilesFieldPolicy(),
        explorePublications: createExplorePublicationsFieldPolicy(),
        notifications: createNotificationsFieldPolicy(),
        publications: createPublicationTypePolicy(),
        search: createSearchFieldPolicy(),
        whoReactedPublication: createWhoReactedPublicationFieldPolicy(),
      },
    },
  };
}

export type ApolloClientConfig = {
  accessTokenStorage: IAccessTokenStorage;
  backendURL: string;
};

export function createApolloClient({ backendURL, accessTokenStorage }: ApolloClientConfig) {
  const uri = `${backendURL}/graphql`;

  const authLink = createAuthLink(accessTokenStorage);

  const httpLink = new HttpLink({
    uri,
  });

  return new ApolloClient({
    cache: createApolloCache({
      possibleTypes: generatedIntrospection.possibleTypes,
      typePolicies: createTypePolicies(),
    }),
    link: from([authLink, httpLink]),
    connectToDevTools: true,
  });
}

export type AnonymousApolloClientConfig = {
  backendURL: string;
};

export function createAnonymousApolloClient({ backendURL }: AnonymousApolloClientConfig) {
  const uri = `${backendURL}/graphql`;

  return new ApolloClient({
    cache: createApolloCache({
      possibleTypes: generatedIntrospection.possibleTypes,
      typePolicies: createTypePolicies(),
    }),
    uri,
  });
}

export { IAccessTokenStorage };
