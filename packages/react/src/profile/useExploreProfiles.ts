import {
  Profile,
  ProfileSortCriteria,
  useExploreProfiles as useUnderlyingQuery,
} from '@lens-protocol/api-bindings';

import {
  useActiveProfileAsDefaultObserver,
  useLensApolloClient,
  useMediaTransformFromConfig,
  useSourcesFromConfig,
  WithObserverIdOverride,
} from '../helpers/arguments';
import { PaginatedReadResult, PaginatedArgs, usePaginatedReadResult } from '../helpers/reads';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../utils';

export type UseExploreProfilesArgs = PaginatedArgs<
  WithObserverIdOverride<{
    sortCriteria?: ProfileSortCriteria;
  }>
>;

/**
 * `useExploreProfiles` is a paginated hook that lets you discover new profiles based on a defined criteria
 *
 * @category Discovery
 * @group Hooks
 * @param args - {@link UseExploreProfilesArgs}
 *
 * @example
 *
 * ```tsx
 * import { useExploreProfiles } from '@lens-protocol/react-web';
 *
 * function ExploreProfiles() {
 *   const { data, error, loading } = useExploreProfiles({ sortCriteria: ProfileSortCriteria.MostFollowers });
 *
 *   if (loading) return <p>Loading...</p>;
 *
 *   if (error) return <p>Error: {error.message}</p>;
 *
 *   return (
 *     <ul>
 *       {data.map((profile) => (
 *         <li key={profile.id}>{profile.handle}</li>
 *       ))}
 *     </ul>
 *   );
 * }
 * ```
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
          variables: useMediaTransformFromConfig(
            useSourcesFromConfig({ limit, observerId, sortCriteria }),
          ),
        }),
      ),
    ),
  );
}
