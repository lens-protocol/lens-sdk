import {
  PublicationSortCriteria,
  PublicationTypes,
  useExplorePublicationsQuery,
} from '@lens-protocol/api-bindings';

import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers';
import { useSharedDependencies } from '../shared';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../utils';
import { Publication } from './types';

type UseExplorePublicationsArgs = PaginatedArgs<{
  observerId?: string;
  sortCriteria?: PublicationSortCriteria;
  timestamp?: number;
  publicationTypes?: Array<PublicationTypes>;
  excludeProfileIds?: Array<string>;
}>;

export function useExplorePublications({
  observerId,
  limit = DEFAULT_PAGINATED_QUERY_LIMIT,
  sortCriteria = PublicationSortCriteria.Latest,
  timestamp,
  publicationTypes,
  excludeProfileIds,
}: UseExplorePublicationsArgs = {}): PaginatedReadResult<Array<Publication>> {
  const { sources, apolloClient } = useSharedDependencies();

  return usePaginatedReadResult(
    useExplorePublicationsQuery({
      variables: {
        request: {
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
