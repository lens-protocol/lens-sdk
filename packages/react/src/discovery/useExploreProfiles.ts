import {
  ExploreProfilesOrderByType,
  ExploreProfilesRequest,
  Profile,
  useExploreProfiles as useBaseExploreProfilesQuery,
} from '@lens-protocol/api-bindings';

import { useLensApolloClient } from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';

export type UseExploreProfilesArgs = PaginatedArgs<ExploreProfilesRequest>;

/**
 * `useExploreProfiles` is a paginated hook that lets you discover new profiles based on a defined criteria
 *
 * @category Discovery
 * @group Hooks
 * @param args - {@link UseExploreProfilesArgs}
 *
 * @example
 * Explore the latest created profiles
 * ```tsx
 * import { useExploreProfiles, ExploreProfilesOrderByType } from '@lens-protocol/react-web';
 *
 * function ExploreProfiles() {
 *   const { data, error, loading } = useExploreProfiles({
 *      orderBy: ExploreProfilesOrderByType.LatestCreated,
 *   });
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
export function useExploreProfiles(
  { where, limit, orderBy = ExploreProfilesOrderByType.LatestCreated }: UseExploreProfilesArgs = {
    orderBy: ExploreProfilesOrderByType.LatestCreated,
  },
): PaginatedReadResult<Profile[]> {
  return usePaginatedReadResult(
    useBaseExploreProfilesQuery(
      useLensApolloClient({
        variables: { limit, where, orderBy },
      }),
    ),
  );
}
