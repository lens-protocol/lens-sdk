import {
  Profile,
  ProfileSearchRequest,
  ProfileSearchWhere,
  SearchProfilesDocument,
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
 * {@link useSearchProfiles} hook arguments
 */
export type UseSearchProfilesArgs = PaginatedArgs<ProfileSearchRequest>;

export type { ProfileSearchRequest, ProfileSearchWhere };

/**
 * {@link useSearchProfiles} hook arguments with Suspense support
 *
 * @experimental This API can change without notice
 */
export type UseSuspenseSearchProfilesArgs = SuspenseEnabled<UseSearchProfilesArgs>;

/**
 * `useSearchProfiles` is a paginated hook that lets you search for profiles based on a defined criteria
 *
 * ```tsx
 * function SearchProfiles() {
 *   const { data, error, loading } = useSearchProfiles({ query: 'foo' });
 *
 *   if (loading) return <Loader />;
 *
 *   if (error) return <Error message={error.message} />;
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
 *
 * @category Discovery
 * @group Hooks
 */
export function useSearchProfiles(args: UseSearchProfilesArgs): PaginatedReadResult<Profile[]>;

/**
 * `useSearchProfiles` is a paginated hook that lets you search for profiles based on a defined criteria
 *
 * This signature supports [React Suspense](https://react.dev/reference/react/Suspense).
 *
 * ```tsx
 * const { data } = useSearchProfiles({
 *   query: 'foo',
 *   suspense: true,
 * });
 *
 * console.log(data);
 * ```
 *
 * Use [startTransition](https://react.dev/reference/react/startTransition) to avoid to re-suspend the component.
 *
 * ```tsx
 * const [query, setQuery] = useState('bob');
 *
 * const { data } = useSearchProfiles({
 *   query,
 *   suspense: true,
 * });
 *
 * const search = () => {
 *   startTransition(() => {
 *     setQuery('foo');
 *   });
 * };
 * ```
 *
 * @experimental This API can change without notice
 * @category Discovery
 * @group Hooks
 */
export function useSearchProfiles(
  args: UseSuspenseSearchProfilesArgs,
): SuspensePaginatedResult<Profile[]>;

export function useSearchProfiles({
  suspense = false,
  ...args
}: UseSearchProfilesArgs & { suspense?: boolean }): SuspendablePaginatedResult<Profile[]> {
  return useSuspendablePaginatedQuery({
    suspense,
    query: SearchProfilesDocument,
    options: useLensApolloClient({
      variables: useFragmentVariables(args),
    }),
  });
}
