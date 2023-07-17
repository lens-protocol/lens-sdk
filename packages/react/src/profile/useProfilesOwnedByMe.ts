import { ProfileOwnedByMe, useGetAllProfiles, useSessionVar } from '@lens-protocol/api-bindings';
import { constants } from 'ethers';

import {
  useActiveProfileAsDefaultObserver,
  useLensApolloClient,
  useMediaTransformFromConfig,
  useSourcesFromConfig,
  WithObserverIdOverride,
} from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';
import { useRecentProfiles } from '../transactions/adapters/responders/CreateProfileResponder';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../utils';

export type UseProfilesOwnedByMeArgs = PaginatedArgs<WithObserverIdOverride>;

/**
 * `useProfilesOwnedByMe` is a paginated hook that returns all profiles owned by the logged in wallet.
 *
 * @category Profiles
 * @group Hooks
 * @param args - {@link UseFeedArgs}
 *
 * @example
 * ```tsx
 * import { useProfilesOwnedByMe } from '@lens-protocol/react-web';
 *
 * function MyProfiles() {
 *   const { data: profiles, error, loading } = useProfilesOwnedByMe();
 *
 *   if (loading) return <div>Loading...</div>;
 *
 *   if (error) return <div>Error: {error.message}</div>;
 *
 *   return (
 *     <ul>
 *      {profiles.map((profile) => (
 *        <li key={profile.id}>{profile.name}</li>
 *      ))}
 *     </ul>
 *   );
 * }
 * ```
 */
export function useProfilesOwnedByMe({
  observerId,
  limit = DEFAULT_PAGINATED_QUERY_LIMIT,
}: UseProfilesOwnedByMeArgs = {}): PaginatedReadResult<ProfileOwnedByMe[]> {
  const session = useSessionVar();
  const recentProfiles = useRecentProfiles();

  const result = usePaginatedReadResult(
    useGetAllProfiles(
      useLensApolloClient(
        useActiveProfileAsDefaultObserver({
          variables: useMediaTransformFromConfig(
            useSourcesFromConfig({
              byOwnerAddresses: [
                session?.isAuthenticated() ? session.wallet.address : constants.AddressZero,
              ],
              observerId,
              limit,
            }),
          ),
          skip: session === null,
        }),
      ),
    ),
  );

  return {
    ...result,
    data: result.data ? [...result.data, ...recentProfiles] : result.data,
  } as PaginatedReadResult<ProfileOwnedByMe[]>;
}
