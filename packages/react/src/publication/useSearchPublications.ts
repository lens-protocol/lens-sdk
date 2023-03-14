import {
  CommentFragment,
  PostFragment,
  useSearchPublicationsQuery,
} from '@lens-protocol/api-bindings';

import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';
import { useSharedDependencies } from '../shared';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../utils';

type UseSearchPublicationsArgs = PaginatedArgs<{
  query: string;
  limit?: number;
  observerId?: string;
}>;

export function useSearchPublications({
  query,
  limit = DEFAULT_PAGINATED_QUERY_LIMIT,
  observerId,
}: UseSearchPublicationsArgs): PaginatedReadResult<(PostFragment | CommentFragment)[]> {
  const { sources, apolloClient } = useSharedDependencies();

  return usePaginatedReadResult(
    useSearchPublicationsQuery({
      variables: {
        query,
        sources,
        limit,
        observerId,
      },
      client: apolloClient,
    }),
  );
}
