import { useCommentsQuery, CommentWithFirstCommentFragment } from '@lens-protocol/api-bindings';

import {
  SubjectiveArgs,
  useActiveProfileAsDefaultObserver,
  useConfigSourcesVariable,
  useLensApolloClient,
} from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../utils';
import { createPublicationMetadataFilters, PublicationMetadataFilters } from './filters';

export type UseCommentsArgs = PaginatedArgs<
  SubjectiveArgs<{
    commentsOf: string;
    metadataFilter?: PublicationMetadataFilters;
  }>
>;

export function useComments({
  metadataFilter,
  commentsOf,
  limit = DEFAULT_PAGINATED_QUERY_LIMIT,
  observerId,
}: UseCommentsArgs): PaginatedReadResult<CommentWithFirstCommentFragment[]> {
  return usePaginatedReadResult(
    useCommentsQuery(
      useLensApolloClient(
        useActiveProfileAsDefaultObserver({
          variables: useConfigSourcesVariable({
            metadata: createPublicationMetadataFilters(metadataFilter),
            commentsOf,
            limit,
            observerId,
          }),
        }),
      ),
    ),
  );
}
