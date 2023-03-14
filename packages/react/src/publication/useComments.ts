import { useCommentsQuery, CommentWithFirstCommentFragment } from '@lens-protocol/api-bindings';

import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';
import { useSharedDependencies } from '../shared';
import { createPublicationMetadataFilters, PublicationMetadataFilters } from './filters';

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
