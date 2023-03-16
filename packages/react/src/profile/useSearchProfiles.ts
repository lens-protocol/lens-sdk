import { ProfileFragment, useSearchProfilesQuery } from '@lens-protocol/api-bindings';

import {
  WithObserverIdOverride,
  useActiveProfileAsDefaultObserver,
  useSourcesFromConfig,
  useLensApolloClient,
} from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../utils';

export type UseSearchProfilesArgs = PaginatedArgs<
  WithObserverIdOverride<{
    query: string;
    limit?: number;
  }>
>;

export function useSearchProfiles({
  query,
  limit = DEFAULT_PAGINATED_QUERY_LIMIT,
  observerId,
}: UseSearchProfilesArgs): PaginatedReadResult<ProfileFragment[]> {
  return usePaginatedReadResult(
    useSearchProfilesQuery(
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
