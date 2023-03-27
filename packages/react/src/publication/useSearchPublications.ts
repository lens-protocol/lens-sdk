import {
  Comment,
  Post,
  useSearchPublications as useUnderlyingQuery,
} from '@lens-protocol/api-bindings';

import {
  WithObserverIdOverride,
  useActiveProfileAsDefaultObserver,
  useSourcesFromConfig,
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
}: UseSearchPublicationsArgs): PaginatedReadResult<(Post | Comment)[]> {
  return usePaginatedReadResult(
    useUnderlyingQuery(
      useLensApolloClient(
        useActiveProfileAsDefaultObserver({
          variables: useSourcesFromConfig({
            query,
            limit,
            observerId,
          }),
        }),
      ),
    ),
  );
}
