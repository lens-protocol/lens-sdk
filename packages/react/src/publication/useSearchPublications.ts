import { CommentFragment, PostFragment, useSearchPublicationsQuery } from '@lens-protocol/api';

import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers';
import { useSharedDependencies } from '../shared';

type UseSearchPublicationsArgs = PaginatedArgs<{
  query: string;
  limit?: number;
  observerId?: string;
}>;

export function useSearchPublications({
  query,
  limit = 10,
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
