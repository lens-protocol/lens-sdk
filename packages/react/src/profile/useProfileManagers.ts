import {
  ProfileManager,
  useProfileManagers as useProfileManagersQuery,
} from '@lens-protocol/api-bindings';
import { ProfileId } from '@lens-protocol/domain/entities';

import { useLensApolloClient } from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';

export type UseProfileManagersArgs = PaginatedArgs<{
  /**
   * The Profile Id to fetch profile manager details for.
   */
  for: ProfileId;
}>;

/**
 * `useProfileManagers` is a paginated React hook that lets you fetch profile manager details for a given profile.
 *
 * @example
 * Use this hook in combination with the ProfileSession returned by the {@link useSession} to fetch the profile managers for the logged-in Profile
 * ```tsx
 * function ProfileManagers({ session }: { session: ProfileSession }) {
 *   const { data: managers, error, loading } = useProfileManagers({
 *     for: session.profile.id,
 *   });
 *
 *   if (loading) {
 *     return <Loader />;
 *   }
 *
 *   if (error) {
 *     return <Error message={error.message} />;
 *   }
 *
 *   return (
 *     <ul>
 *       {managers.map(({ address }) => (
 *         <li key={address}>{address}</li>
 *       ))}
 *     </ul>
 *   );
 * }
 * ```
 *
 * @category Profiles
 * @group Hooks
 */
export function useProfileManagers(
  args: UseProfileManagersArgs,
): PaginatedReadResult<ProfileManager[]> {
  return usePaginatedReadResult(
    useProfileManagersQuery(
      useLensApolloClient({
        variables: {
          request: args,
        },
      }),
    ),
  );
}
