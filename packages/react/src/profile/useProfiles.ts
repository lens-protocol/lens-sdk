import { Profile, useGetAllProfiles } from '@lens-protocol/api-bindings';
import { ProfileId } from '@lens-protocol/domain/entities';
import { invariant, XOR } from '@lens-protocol/shared-kernel';

import {
  useActiveProfileAsDefaultObserver,
  useLensApolloClient,
  useMediaTransformFromConfig,
  useSourcesFromConfig,
  WithObserverIdOverride,
} from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../utils';

/**
 * {@link useProfiles} hook arguments
 */
export type UseProfilesArgs = PaginatedArgs<
  WithObserverIdOverride<
    XOR<
      {
        handles: string[];
      },
      {
        profileIds: ProfileId[];
      }
    >
  >
>;

/**
 * Get a paginated list of profiles by either their handles or their profile Ids.
 *
 * @category Profiles
 * @group Hooks
 *
 * @param args - {@link UseProfilesArgs}
 *
 * @example
 * Get profiles by handles
 * ```ts
 * const { data, error, loading } = useProfiles({ handles: ['handle1', 'handle2'] });
 *
 * if (loading) {
 *  return <p>Loading...</p>;
 * }
 *
 * if (error) {
 * return <p>Error: {error.message}</p>;
 * }
 *
 * return (
 *   <div>
 *     {data.map((profile) => (
 *       <article key={profile.id}>
 *         <p>Handle: {profile.handle}</p>
 *       </article>
 *     ))}
 *   </div>
 * );
 * ```
 *
 * @example
 * Get profiles by profile Ids
 * ```ts
 * const { data, error, loading } = useProfiles({ profileIds: ['profileId1', 'profileId2'] });
 *
 * if (loading) {
 *  return <p>Loading...</p>;
 * }
 *
 * if (error) {
 * return <p>Error: {error.message}</p>;
 * }
 *
 * return (
 *   <div>
 *     {data.map((profile) => (
 *       <article key={profile.id}>
 *         <p>Handle: {profile.handle}</p>
 *       </article>
 *     ))}
 *   </div>
 * );
 * ```
 */
export function useProfiles({
  handles: byHandles,
  profileIds: byProfileIds,
  observerId,
  limit = DEFAULT_PAGINATED_QUERY_LIMIT,
}: UseProfilesArgs): PaginatedReadResult<Profile[]> {
  invariant(
    byHandles === undefined || byProfileIds === undefined,
    `Cannot provide both 'handles' and 'profileIds' to '${useProfiles.name}' hook`,
  );

  return usePaginatedReadResult(
    useGetAllProfiles(
      useLensApolloClient(
        useActiveProfileAsDefaultObserver({
          variables: useMediaTransformFromConfig(
            useSourcesFromConfig({ byHandles, byProfileIds, limit, observerId }),
          ),
        }),
      ),
    ),
  );
}
