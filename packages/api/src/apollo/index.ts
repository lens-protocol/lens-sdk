import { ApolloClient } from '@apollo/client';

import generatedIntrospection from '../graphql/generated';
import { createApolloCache } from './createApolloCache';

type ApolloClientConfig = {
  backendURL: string;
};

export function createApolloClient({ backendURL }: ApolloClientConfig) {
  const uri = `${backendURL}/graphql`;

  return new ApolloClient({
    cache: createApolloCache({
      possibleTypes: generatedIntrospection.possibleTypes,
      typePolicies: {},
    }),
    uri,
  });
}
