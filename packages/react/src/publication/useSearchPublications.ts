import {
  CommentFragment,
  CustomFiltersTypes,
  PostFragment,
  useSearchPublicationsQuery,
} from '@lens-protocol/api-bindings';

import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers';
import { useSharedDependencies } from '../shared';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../utils';

type UseSearchPublicationsArgs = PaginatedArgs<{
  query: string;
  limit?: number;
  observerId?: string;
  customFilters?: Array<CustomFiltersTypes>;
}>;

export function useSearchPublications({
  query,
  limit = DEFAULT_PAGINATED_QUERY_LIMIT,
  observerId,
  customFilters,
}: UseSearchPublicationsArgs): PaginatedReadResult<(PostFragment | CommentFragment)[]> {
  const { sources, apolloClient } = useSharedDependencies();

  return usePaginatedReadResult(
    useSearchPublicationsQuery({
      variables: {
        query,
        sources,
        limit,
        customFilters,
        observerId,
      },
      client: apolloClient,
    }),
  );
}
