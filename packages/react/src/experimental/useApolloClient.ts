// eslint-disable-next-line no-restricted-imports
import type { ApolloClient, NormalizedCacheObject } from '@apollo/client';

import { useSharedDependencies } from '../shared';

/**
 * Returns the internal authenticated Apollo client instance.
 *
 * @experimental
 */
export function useApolloClient(): ApolloClient<NormalizedCacheObject> {
  const { apolloClient } = useSharedDependencies();

  return apolloClient;
}
