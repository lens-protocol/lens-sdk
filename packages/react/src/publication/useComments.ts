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

  const {
    loading,
    data,
    ...rest
  }: PaginatedReadResult<
    (CommentWithFirstCommentFragment | { __typename: 'Mirror' } | { __typename: 'Post' })[]
  > = usePaginatedReadResult(
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

  if (loading) return { loading: true, data: undefined, ...rest };
  return {
    loading: false,
    data: data.filter(
      (publication): publication is CommentWithFirstCommentFragment =>
        publication.__typename === 'Comment',
    ),
    ...rest,
  };
}
