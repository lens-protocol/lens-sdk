import {
  AnyPublication,
  PublicationSortCriteria,
  PublicationTypes,
  useExplorePublications as useUnderlyingQuery,
} from '@lens-protocol/api-bindings';
import { ProfileId } from '@lens-protocol/domain/entities';

import {
  useActiveProfileAsDefaultObserver,
  useLensApolloClient,
  useMediaTransformFromConfig,
  useSourcesFromConfig,
  WithObserverIdOverride,
} from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../utils';
import { createPublicationMetadataFilters, PublicationMetadataFilters } from './filters';

export type UseExplorePublicationsArgs = PaginatedArgs<
  WithObserverIdOverride<{
    /**
     * Exclude publications from these profiles
     */
    excludeProfileIds?: ProfileId[];

    /**
     * Filter publications by metadata details
     */
    metadataFilter?: PublicationMetadataFilters;

    /**
     * Filter publications by type
     *
     * @defaultValue empty - all types
     */
    publicationTypes?: Array<PublicationTypes>;

    /**
     * Sort criteria
     */
    sortCriteria?: PublicationSortCriteria;

    /**
     * Timestamp to start from
     */
    timestamp?: number;
  }>
>;

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
export function useExplorePublications({
  observerId,
  limit = DEFAULT_PAGINATED_QUERY_LIMIT,
  sortCriteria = PublicationSortCriteria.Latest,
  timestamp,
  publicationTypes,
  excludeProfileIds,
  metadataFilter,
}: UseExplorePublicationsArgs = {}): PaginatedReadResult<Array<AnyPublication>> {
  return usePaginatedReadResult(
    useUnderlyingQuery(
      useLensApolloClient(
        useActiveProfileAsDefaultObserver({
          variables: useMediaTransformFromConfig(
            useSourcesFromConfig({
              excludeProfileIds,
              limit,
              metadata: createPublicationMetadataFilters(metadataFilter),
              publicationTypes,
              sortCriteria,
              timestamp,
              observerId,
            }),
          ),
        }),
      ),
    ),
  );
}
