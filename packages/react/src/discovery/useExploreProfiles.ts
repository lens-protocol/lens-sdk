import {
  ExploreProfilesDocument,
  ExploreProfilesOrderByType,
  ExploreProfilesRequest,
  ExploreProfilesWhere,
  Profile,
} from '@lens-protocol/api-bindings';

import { useLensApolloClient } from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult } from '../helpers/reads';
import {
  SuspendablePaginatedResult,
  SuspenseEnabled,
  SuspensePaginatedResult,
  useSuspendablePaginatedQuery,
} from '../helpers/suspense';
import { useFragmentVariables } from '../helpers/variables';

/**
 * {@link useExploreProfiles} hook arguments
 */
export type UseExploreProfilesArgs = PaginatedArgs<ExploreProfilesRequest>;

export type { ExploreProfilesRequest, ExploreProfilesWhere };

/**
 * {@link useExploreProfiles} hook arguments with Suspense support
 */
export type UseSuspenseExploreProfilesArgs = SuspenseEnabled<UseExploreProfilesArgs>;

/**
 * Discover new profiles based on a defined criteria.
 *
 * ```tsx
 * const { data, error, loading } = useExploreProfiles({
 *   orderBy: ExploreProfilesOrderByType.LatestCreated,
 * });
 *
 * if (loading) return <Loader />;
 *
 * if (error) return <Error message={error.message} />;
 *
 * return (
 *   <>
 *     {data.map((profile) => (
 *       <Profile key={profile.id} profile={profile} />
 *     ))}
 *   </>
 * );
 * ```
 *
 * @category Discovery
 * @group Hooks
 */
export function useExploreProfiles(args?: UseExploreProfilesArgs): PaginatedReadResult<Profile[]>;

/**
 * Discover new profiles based on a defined criteria.
 *
 * This signature supports [React Suspense](https://react.dev/reference/react/Suspense).
 *
 * ```ts
 * const { data } = useExploreProfiles({
 *   orderBy: ExploreProfilesOrderByType.LatestCreated,
 *   suspense: true,
 * );
 *
 * console.log(data);
 * ```
 *
 * @experimental This API can change without notice
 * @category Discovery
 * @group Hooks
 */
export function useExploreProfiles(
  args: UseSuspenseExploreProfilesArgs,
): SuspensePaginatedResult<Profile[]>;

export function useExploreProfiles(
  {
    where,
    limit,
    orderBy = ExploreProfilesOrderByType.LatestCreated,
    suspense = false,
  }: UseExploreProfilesArgs & { suspense?: boolean } = {
    orderBy: ExploreProfilesOrderByType.LatestCreated,
    suspense: false,
  },
): SuspendablePaginatedResult<Profile[]> {
  return useSuspendablePaginatedQuery({
    suspense,
    query: ExploreProfilesDocument,
    options: useLensApolloClient({
      variables: useFragmentVariables({
        limit,
        where,
        orderBy,
      }),
    }),
  });
}
