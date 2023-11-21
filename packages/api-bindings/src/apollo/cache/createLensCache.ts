import { ApolloCache, InMemoryCache, NormalizedCacheObject } from '@apollo/client';

import generatedIntrospection from '../../lens/graphql/generated';
import { QueryParams } from './createQueryParamsLocalFields';
import { createTypePolicies } from './createTypePolicies';

export type { QueryParams };

export { defaultQueryParams } from './createQueryParamsLocalFields';

export function createLensCache(options?: QueryParams): ApolloCache<NormalizedCacheObject> {
  return new InMemoryCache({
    possibleTypes: generatedIntrospection.possibleTypes,
    typePolicies: createTypePolicies(options),
  });
}
