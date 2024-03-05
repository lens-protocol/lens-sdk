import {
  PrimaryPublication,
  PublicationSearchRequest,
  useSearchPublications as useBaseSearchPublications,
} from '@lens-protocol/api-bindings';

import { useLensApolloClient } from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';
import { useFragmentVariables } from '../helpers/variables';

export type UseSearchPublicationsArgs = PaginatedArgs<PublicationSearchRequest>;

/**
 * Search for publications based on a defined criteria
 *
 * @category Discovery
 * @group Hooks
 * @param args - {@link UseSearchPublicationsArgs}
 *
 * @example
 * Search for publications with content that contains "foo"
 * ```tsx
 * import { useSearchPublications } from '@lens-protocol/react';
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
 *
 * @example
 * Search for audio post publications with content that matches a query
 * ```tsx
 * import { useSearchPublications } from '@lens-protocol/react';
 *
 * function SearchPublication() {
 *   const { data, error, loading } = useSearchPublications({
 *      query,
 *      where: {
 *        publicationTypes: [SearchPublicationType.Post],
 *        metadata: {
 *          mainContentFocus: [PublicationMetadataMainFocusType.Audio],
 *        },
 *      },
 *    });
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
  limit,
  where,
}: UseSearchPublicationsArgs): PaginatedReadResult<PrimaryPublication[]> {
  return usePaginatedReadResult(
    useBaseSearchPublications(
      useLensApolloClient({
        variables: useFragmentVariables({
          query,
          limit,
          where,
          statsFor: where?.metadata?.publishedOn,
        }),
      }),
    ),
  );
}
