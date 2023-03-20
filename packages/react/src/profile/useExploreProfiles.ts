import {
  ProfileFragment,
  ProfileSortCriteria,
  useExploreProfilesQuery,
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

export function useExploreProfiles({
  observerId,
  limit = DEFAULT_PAGINATED_QUERY_LIMIT,
  sortCriteria = ProfileSortCriteria.MostComments,
}: UseExploreProfilesArgs = {}): PaginatedReadResult<ProfileFragment[]> {
  return usePaginatedReadResult(
    useExploreProfilesQuery(
      useLensApolloClient(
        useActiveProfileAsDefaultObserver({
          variables: useSourcesFromConfig({ limit, observerId, sortCriteria }),
        }),
      ),
    ),
  );
}
