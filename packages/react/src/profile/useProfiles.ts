import {
  Profile,
  ProfilesDocument,
  ProfilesRequest,
  ProfilesRequestWhere,
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
 * {@link useProfiles} hook arguments
 */
export type UseProfilesArgs = PaginatedArgs<ProfilesRequest>;

export type { ProfilesRequest, ProfilesRequestWhere };

/**
 * {@link useProfiles} hook arguments with Suspense support
 *
 * @experimental This API can change without notice
 */
export type UseSuspenseProfilesArgs = SuspenseEnabled<UseProfilesArgs>;

/**
 * Retrieves a paginated list of profiles, filtered according to specified criteria.
 *
 * Fetch profiles by handles
 * ```tsx
 * const { data, loading, error } = useProfiles({
 *   where: {
 *     handles: ['lens/firstprofile'],
 *   },
 * });
 * ```
 *
 * Fetch profiles by ids
 * ```tsx
 * const { data, loading, error } = useProfiles({
 *   where: {
 *     profileIds: [profileId('0x01'), profileId('0x02')],
 *   },
 * });
 * ```
 *
 * Fetch profiles by owner addresses
 * ```tsx
 * const { data, loading, error } = useProfiles({
 *   where: {
 *     ownedBy: ['0xe3D871d389BF78c091E29deCe83200E9d6B2B0C2'],
 *   },
 * });
 * ```
 *
 * Fetch profiles who commented on a publication
 * ```tsx
 * const { data, loading, error } = useProfiles({
 *   where: {
 *     whoCommentedOn: publicationId('0x1b-0x012b'),
 *   },
 * });
 * ```
 *
 * Fetch profiles who mirrored a publication
 * ```tsx
 * const { data, loading, error } = useProfiles({
 *   where: {
 *     whoMirroredPublication: publicationId('0x1b-0x012b'),
 *   },
 * });
 * ```
 *
 * Fetch profiles who quoted a publication
 * ```tsx
 * const { data, loading, error } = useProfiles({
 *   where: {
 *     whoQuotedPublication: publicationId('0x1b-0x012b'),
 *   },
 * });
 * ```
 *
 * @category Profiles
 * @group Hooks
 */
export function useProfiles(args: UseProfilesArgs): PaginatedReadResult<Profile[]>;

/**
 * Retrieves a paginated list of profiles, filtered according to specified criteria.
 *
 * This signature supports [React Suspense](https://react.dev/reference/react/Suspense).
 *
 * ```tsx
 * const { data } = useProfiles({
 *   where: { ... },
 *   suspense: true,
 * });
 * ```
 *
 * @experimental This API can change without notice
 * @category Profiles
 * @group Hooks
 */
export function useProfiles(args: UseSuspenseProfilesArgs): SuspensePaginatedResult<Profile[]>;

export function useProfiles({
  suspense = false,
  ...args
}: UseProfilesArgs & { suspense?: boolean }): SuspendablePaginatedResult<Profile[]> {
  return useSuspendablePaginatedQuery({
    suspense,
    query: ProfilesDocument,
    options: useLensApolloClient({
      variables: useFragmentVariables(args),
    }),
  });
}
