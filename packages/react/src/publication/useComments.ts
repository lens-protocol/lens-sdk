import { useCommentsQuery, CommentWithFirstCommentFragment } from '@lens-protocol/api-bindings';

import {
  WithObserverIdOverride,
  useActiveProfileAsDefaultObserver,
  useSourcesFromConfig,
  useLensApolloClient,
} from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../utils';
import { createPublicationMetadataFilters, PublicationMetadataFilters } from './filters';

export type UseCommentsArgs = PaginatedArgs<
  WithObserverIdOverride<{
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
          variables: useSourcesFromConfig({
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
