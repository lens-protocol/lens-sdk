import { Comment, useGetComments } from '@lens-protocol/api-bindings';
import { PublicationId } from '@lens-protocol/domain/entities';

import {
  WithObserverIdOverride,
  useActiveProfileAsDefaultObserver,
  useSourcesFromConfig,
  useLensApolloClient,
  useMediaTransformFromConfig,
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

/**
 * @category Publications
 * @group Hooks
 */
export function useComments({
  metadataFilter,
  commentsOf,
  limit = DEFAULT_PAGINATED_QUERY_LIMIT,
  observerId,
}: UseCommentsArgs): PaginatedReadResult<Comment[]> {
  return usePaginatedReadResult(
    useGetComments(
      useLensApolloClient(
        useActiveProfileAsDefaultObserver({
          variables: useMediaTransformFromConfig(
            useSourcesFromConfig({
              metadata: createPublicationMetadataFilters(metadataFilter),
              commentsOf,
              limit,
              observerId,
            }),
          ),
        }),
      ),
    ),
  );
}
