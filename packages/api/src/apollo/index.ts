import { ApolloClient } from '@apollo/client';

import generatedIntrospection from '../graphql/generated';
import { createApolloCache, TypePolicies } from './createApolloCache';
import { createExploreProfilesFieldPolicy } from './createExploreProfileFieldPolicy';
import { createFeedFieldPolicy } from './createFeedFieldPolicy';

function createTypePolicies(): TypePolicies {
  return {
    // Post: createPublicationTypePolicy(),
    // Comment: createPublicationTypePolicy(),
    // Mirror: createPublicationTypePolicy(),

    Query: {
      fields: {
        feed: createFeedFieldPolicy(),
        exploreProfiles: createExploreProfilesFieldPolicy(),
      },
    },
  };
}

type ApolloClientConfig = {
  backendURL: string;
};

export function createApolloClient({ backendURL }: ApolloClientConfig) {
  const uri = `${backendURL}/graphql`;

  return new ApolloClient({
    cache: createApolloCache({
      possibleTypes: generatedIntrospection.possibleTypes,
      typePolicies: createTypePolicies(),
    }),
    uri,
  });
}
