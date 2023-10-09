import {
  ExplorePublicationRequest,
  ExplorePublicationsOrderByType,
  useExplorePublications as useUnderlyingQuery,
} from '@lens-protocol/api-bindings';
import { ExplorePublication } from '@lens-protocol/api-bindings/src/lens';

import { useLensApolloClient } from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';

export type UseExplorePublicationsArgs = PaginatedArgs<ExplorePublicationRequest>;

/**
 * `useExplorePublications` is a paginated hook that lets you discover new publications base on a defined criteria
 *
 * @category Discovery
 * @group Hooks
 * @param args - {@link UseExplorePublicationsArgs}
 *
 * @example
 *
 * ```tsx
 * import { PublicationSortCriteria, useExplorePublications } from '@lens-protocol/react-web';
 *
 * function ExplorePublications() {
 *   const { data, error, loading } = useExplorePublications({ sortCriteria: PublicationSortCriteria.MostComments });
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
        variables: {
          where,
          orderBy,
        },
      }),
    ),
  );
}
