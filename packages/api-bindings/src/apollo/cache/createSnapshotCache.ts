import { ApolloCache, InMemoryCache, NormalizedCacheObject } from '@apollo/client';

export function createSnapshotCache(): ApolloCache<NormalizedCacheObject> {
  return new InMemoryCache();
}
