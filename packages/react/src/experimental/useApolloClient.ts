// eslint-disable-next-line no-restricted-imports
import type { ApolloClient, NormalizedCacheObject } from '@apollo/client';

import { useSharedDependencies } from '../shared';

/**
 * Returns the internal Apollo Client instance.
 *
 * If you already signed in, the instance will be already include Access Token credentials in its requests.
 *
 * The internal Apollo Client instance is configured so that it automatically renews credentials (both Access Token and Refresh Token) when they expire.
 * This is done transparently, so you don't need to worry about it.
 *
 * @example
 * Perform a query
 * ```ts
 * import { useQuery, gql} from '@apollo/client';
 * import { useApolloClient } from '@lens-protocol/react-web';
 *
 * function MyComponent() {
 *    const client = useApolloClient();
 *    const { data, loading, error } = useQuery(gql`<your query>`, { client })
 *
 *    // use the low-level useQuery response
 * }
 * ```
 *
 * @experimental This hook is experimental and may change in the future.
 * @category Misc
 * @group Hooks
 */
export function useApolloClient(): ApolloClient<NormalizedCacheObject> {
  const { apolloClient } = useSharedDependencies();

  return apolloClient;
}
