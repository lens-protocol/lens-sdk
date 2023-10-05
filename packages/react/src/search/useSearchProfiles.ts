import {
  Profile,
  ProfileSearchRequest,
  useSearchProfiles as useBaseSearchProfiles,
} from '@lens-protocol/api-bindings';

import { useLensApolloClient, useMediaTransformFromConfig } from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../utils';

export type UseSearchProfilesArgs = PaginatedArgs<ProfileSearchRequest>;

/**
 * `useSearchProfiles` is a paginated hook that lets you search for profiles based on a defined criteria
 *
 * @category Discovery
 * @group Hooks
 * @param args - {@link UseSearchProfilesArgs}
 *
 * @example
 * ```tsx
 * import { useSearchProfiles } from '@lens-protocol/react-web';
 *
 * function SearchProfiles() {
 *   const { data, error, loading } = useSearchProfiles({ query: 'foo' });
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
export function useSearchProfiles({
  query,
  where,
  limit = DEFAULT_PAGINATED_QUERY_LIMIT,
}: UseSearchProfilesArgs): PaginatedReadResult<Profile[]> {
  return usePaginatedReadResult(
    useBaseSearchProfiles(
      useLensApolloClient({
        variables: useMediaTransformFromConfig({
          query,
          where,
          limit,
        }),
      }),
    ),
  );
}
