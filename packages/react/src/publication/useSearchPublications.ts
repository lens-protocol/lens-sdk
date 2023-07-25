import {
  Comment,
  Post,
  useSearchPublications as useUnderlyingQuery,
} from '@lens-protocol/api-bindings';

import {
  useActiveProfileAsDefaultObserver,
  useLensApolloClient,
  useMediaTransformFromConfig,
  useSourcesFromConfig,
  WithObserverIdOverride,
} from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../utils';

export type UseSearchPublicationsArgs = PaginatedArgs<
  WithObserverIdOverride<{
    /**
     * Search query
     */
    query: string;
  }>
>;

/**
 * `useSearchPublications` is a paginated hook that lets you search for publications based on a defined criteria
 *
 * @category Discovery
 * @group Hooks
 * @param args - {@link UseSearchPublicationsArgs}
 *
 * @example
 * ```tsx
 * import { useSearchPublications } from '@lens-protocol/react-web';
 *
 * function SearchPublication() {
 *   const { data, error, loading } = useSearchPublications({ query: 'foo' });
 *
 *   if (loading) return <p>Loading...</p>;
 *
 *   if (error) return <p>Error: {error.message}</p>;
 *
 *   return (
 *     <ul>
 *       {data.map((publication) => (
 *         <li key={publication.id}>
 *            // render publication details
 *         </li>
 *       ))}
 *     </ul>
 *   );
 * }
 * ```
 */
export function useSearchPublications({
  query,
  limit = DEFAULT_PAGINATED_QUERY_LIMIT,
  observerId,
}: UseSearchPublicationsArgs): PaginatedReadResult<(Post | Comment)[]> {
  return usePaginatedReadResult(
    useUnderlyingQuery(
      useLensApolloClient(
        useActiveProfileAsDefaultObserver({
          variables: useMediaTransformFromConfig(
            useSourcesFromConfig({
              query,
              limit,
              observerId,
            }),
          ),
        }),
      ),
    ),
  );
}
