import { useCommentsQuery, CommentWithFirstCommentFragment } from '@lens-protocol/api-bindings';

import { createPublicationMetadataFilters, PublicationMetadataFilters } from './filters';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers';
import { useSharedDependencies } from '../shared';

type UseCommentsArgs = PaginatedArgs<{
  commentsOf: string;
  observerId?: string;
  metadataFilter?: PublicationMetadataFilters;
}>;

export function useComments({
  metadataFilter,
  commentsOf,
  limit,
  observerId,
}: UseCommentsArgs): PaginatedReadResult<CommentWithFirstCommentFragment[]> {
  const { apolloClient, sources } = useSharedDependencies();

  return usePaginatedReadResult(
    useCommentsQuery({
      variables: {
        metadata: createPublicationMetadataFilters(metadataFilter),
        commentsOf,
        limit: limit ?? 10,
        observerId,
        sources,
      },
      client: apolloClient,
    }),
  );
}
