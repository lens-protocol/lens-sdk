import { ApolloCache, InMemoryCache, NormalizedCacheObject } from '@apollo/client';

import generatedIntrospection from '../../lens/graphql/generated';
import { createTypePolicies } from './createTypePolicies';

export function createLensCache(): ApolloCache<NormalizedCacheObject> {
  return new InMemoryCache({
    possibleTypes: generatedIntrospection.possibleTypes,
    typePolicies: createTypePolicies(),
  });
}
