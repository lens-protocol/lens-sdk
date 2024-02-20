import {
  ExplorePublicationRequest,
  ExplorePublicationsOrderByType,
  useExplorePublications as useUnderlyingQuery,
  ExplorePublication,
} from '@lens-protocol/api-bindings';

import { useLensApolloClient } from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';
import { useFragmentVariables } from '../helpers/variables';

export type UseExplorePublicationsArgs = PaginatedArgs<ExplorePublicationRequest>;

/**
 * `useExplorePublications` is a paginated hook that lets you discover new publications base on a defined criteria
 *
 * @category Discovery
 * @group Hooks
 * @param args - {@link UseExplorePublicationsArgs}
 *
 * @example
 * Explore publications of type post with the most comments
 * ```tsx
 * import { useExplorePublications, ExplorePublicationsOrderByType, ExplorePublicationType  } from '@lens-protocol/react';
 *
 * function ExplorePublications() {
 *   const { data, error, loading } = useExplorePublications(
 *    where: {
 *        publicationTypes: [ExplorePublicationType.Post],
 *      },
 *    orderBy: ExplorePublicationsOrderByType.TopCommented,
 * );
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
export function useExplorePublications(
  { where, orderBy = ExplorePublicationsOrderByType.Latest }: UseExplorePublicationsArgs = {
    orderBy: ExplorePublicationsOrderByType.Latest,
  },
): PaginatedReadResult<ExplorePublication[]> {
  return usePaginatedReadResult(
    useUnderlyingQuery(
      useLensApolloClient({
        variables: useFragmentVariables({
          where,
          orderBy,
          statsFor: where?.metadata?.publishedOn,
        }),
      }),
    ),
  );
}
