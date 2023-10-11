import { useProfileManagers as useProfileManagersQuery } from '@lens-protocol/api-bindings';
import { ProfileId } from '@lens-protocol/domain/entities';

import { useLensApolloClient } from '../helpers/arguments';
import { PaginatedArgs, usePaginatedReadResult } from '../helpers/reads';

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
 * Use this hook in combination with the Profile returned by the {@link useSession} to fetch the profile managers for the logged-in Profile
 * ```tsx
 * function ProfileManagers({ session }: { session: ProfileSession }) {
 *   const { data: managers, error, loading } = useProfileManagers({
 *     for: session.profileId,
 *   });
 *
 *   if (loading) {
 *     return <p>Loading...</p>;
 *   }
 *
 *   if (error) {
 *     return <p>Error: {error.message}</p>;
 *   }
 *
 *   return (
 *     <ul>
 *       {managers?.items.map(({ address }) => (
 *         <li key={address}>{address}</li>
 *       ))}
 *     </ul>
 *   );
 * }
 * ```
 */
export function useProfileManagers(args: UseProfileManagersArgs) {
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
