import {
  PublicationSortCriteria,
  PublicationTypes,
  useExplorePublicationsQuery,
} from '@lens-protocol/api-bindings';

import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers';
import { useSharedDependencies } from '../shared';
import { DEFAULT_PAGINATED_QUERY_LIMIT, DEFAULT_PUBLICATION_SORT_CRITERIA } from '../utils';
import { Publication } from './types';

type UseExplorePublicationsArgs = PaginatedArgs<{
  observerId?: string;
  sortCriteria?: PublicationSortCriteria;
  timestamp?: number;
  noRandomize?: boolean;
  publicationTypes?: Array<PublicationTypes>;
  excludeProfileIds?: Array<string>;
}>;

export function useExplorePublications({
  observerId,
  limit = DEFAULT_PAGINATED_QUERY_LIMIT,
  sortCriteria = DEFAULT_PUBLICATION_SORT_CRITERIA,
  timestamp,
  noRandomize,
  publicationTypes,
  excludeProfileIds,
}: UseExplorePublicationsArgs = {}): PaginatedReadResult<Array<Publication>> {
  const { sources, apolloClient } = useSharedDependencies();

  return usePaginatedReadResult(
    useExplorePublicationsQuery({
      variables: {
        observerId,
        limit,
        sortCriteria,
        sources,
        timestamp,
        noRandomize,
        publicationTypes,
        excludeProfileIds,
      },
      client: apolloClient,
    }),
  );
}
