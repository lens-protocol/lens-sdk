// eslint-disable-next-line no-restricted-imports
import type { ApolloClient, NormalizedCacheObject } from '@apollo/client';

import { useSharedDependencies } from '../shared';

export function useApolloClient(): ApolloClient<NormalizedCacheObject> {
  const { apolloClient } = useSharedDependencies();

  return apolloClient;
}
