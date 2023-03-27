import {
  Profile,
  ProfileSortCriteria,
  useExploreProfiles as useUnderlyingQuery,
} from '@lens-protocol/api-bindings';

import {
  WithObserverIdOverride,
  useActiveProfileAsDefaultObserver,
  useSourcesFromConfig,
  useLensApolloClient,
} from '../helpers/arguments';
import { PaginatedReadResult, PaginatedArgs, usePaginatedReadResult } from '../helpers/reads';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../utils';

export type UseExploreProfilesArgs = PaginatedArgs<
  WithObserverIdOverride<{
    sortCriteria?: ProfileSortCriteria;
  }>
>;

/**
 * @category Discovery
 * @group Hooks
 */
export function useExploreProfiles({
  observerId,
  limit = DEFAULT_PAGINATED_QUERY_LIMIT,
  sortCriteria = ProfileSortCriteria.MostComments,
}: UseExploreProfilesArgs = {}): PaginatedReadResult<Profile[]> {
  return usePaginatedReadResult(
    useUnderlyingQuery(
      useLensApolloClient(
        useActiveProfileAsDefaultObserver({
          variables: useSourcesFromConfig({ limit, observerId, sortCriteria }),
        }),
      ),
    ),
  );
}
