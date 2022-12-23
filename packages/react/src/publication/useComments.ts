import { useCommentsQuery, CommentWithFirstCommentFragment } from '@lens-protocol/api-bindings';

import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers';
import { useSharedDependencies } from '../shared';

type UseCommentsArgs = PaginatedArgs<{
  commentsOf: string;
  observerId?: string;
}>;

export function useComments({
  commentsOf,
  limit,
  observerId,
}: UseCommentsArgs): PaginatedReadResult<CommentWithFirstCommentFragment[]> {
  const { apolloClient, sources } = useSharedDependencies();

  return usePaginatedReadResult(
    useCommentsQuery({
      variables: {
        commentsOf,
        limit: limit ?? 10,
        observerId,
        sources,
      },
      client: apolloClient,
    }),
  );
}
