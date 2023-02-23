import {
  AnyPublicationFragment,
  PublicationSortCriteria,
  PublicationTypes,
  useExplorePublicationsQuery,
} from '@lens-protocol/api-bindings';

import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers';
import { useSharedDependencies } from '../shared';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../utils';
import { createPublicationMetadataFilters, PublicationMetadataFilters } from './filters';

type UseExplorePublicationsArgs = PaginatedArgs<{
  observerId?: string;
  sortCriteria?: PublicationSortCriteria;
  timestamp?: number;
  publicationTypes?: Array<PublicationTypes>;
  excludeProfileIds?: Array<string>;
  metadataFilter?: PublicationMetadataFilters;
}>;

export function useExplorePublications({
  observerId,
  limit = DEFAULT_PAGINATED_QUERY_LIMIT,
  sortCriteria = PublicationSortCriteria.Latest,
  timestamp,
  publicationTypes,
  excludeProfileIds,
  metadataFilter,
}: UseExplorePublicationsArgs = {}): PaginatedReadResult<Array<AnyPublicationFragment>> {
  const { sources, apolloClient } = useSharedDependencies();

  return usePaginatedReadResult(
    useExplorePublicationsQuery({
      variables: {
        request: {
          metadata: createPublicationMetadataFilters(metadataFilter),
          limit,
          sortCriteria,
          sources,
          timestamp,
          publicationTypes,
          excludeProfileIds,
        },
        observerId,
      },
      client: apolloClient,
    }),
  );
}
