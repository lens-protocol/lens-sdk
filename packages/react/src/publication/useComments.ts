import {
  useComments as useUnderlyingQuery,
  CommentWithFirstComment,
} from '@lens-protocol/api-bindings';
import { PublicationId } from '@lens-protocol/domain/entities';

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
    commentsOf: PublicationId;
    metadataFilter?: PublicationMetadataFilters;
  }>
>;

export function useComments({
  metadataFilter,
  commentsOf,
  limit = DEFAULT_PAGINATED_QUERY_LIMIT,
  observerId,
}: UseCommentsArgs): PaginatedReadResult<CommentWithFirstComment[]> {
  return usePaginatedReadResult(
    useUnderlyingQuery(
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
