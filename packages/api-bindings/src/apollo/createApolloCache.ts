import {
  ApolloCache,
  InMemoryCache,
  InMemoryCacheConfig,
  NormalizedCacheObject,
} from '@apollo/client';

import { TypePolicy } from './TypePolicy';

export type TypePolicies = {
  [__typename: string]: TypePolicy<unknown>;
};

export function createApolloCache({
  possibleTypes,
  typePolicies,
}: {
  possibleTypes?: InMemoryCacheConfig['possibleTypes'];
  typePolicies: TypePolicies;
}): ApolloCache<NormalizedCacheObject> {
  return new InMemoryCache({
    possibleTypes,
    resultCaching: true,
    typePolicies,
  });
}
