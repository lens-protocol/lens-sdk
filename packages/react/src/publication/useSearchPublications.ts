import {
  CommentFragment,
  PostFragment,
  useSearchPublicationsQuery,
} from '@lens-protocol/api-bindings';

import {
  WithObserverIdOverride,
  useActiveProfileAsDefaultObserver,
  useConfigSourcesVariable,
  useLensApolloClient,
} from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../utils';

export type UseSearchPublicationsArgs = PaginatedArgs<
  WithObserverIdOverride<{
    query: string;
    limit?: number;
  }>
>;

export function useSearchPublications({
  query,
  limit = DEFAULT_PAGINATED_QUERY_LIMIT,
  observerId,
}: UseSearchPublicationsArgs): PaginatedReadResult<(PostFragment | CommentFragment)[]> {
  return usePaginatedReadResult(
    useSearchPublicationsQuery(
      useLensApolloClient(
        useActiveProfileAsDefaultObserver({
          variables: useConfigSourcesVariable({
            query,
            limit,
            observerId,
          }),
        }),
      ),
    ),
  );
}
