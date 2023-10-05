import {
  Profile,
  ProfilesRequest,
  useProfiles as useProfilesHook,
} from '@lens-protocol/api-bindings';

import { useLensApolloClient, useMediaTransformFromConfig } from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../utils';

/**
 * {@link useProfiles} hook arguments
 */
export type UseProfilesArgs = PaginatedArgs<ProfilesRequest>;

/**
 * `useProfiles` is a paginated hook that lets you fetch profiles based on a set of filters.
 *
 * @category Profiles
 * @group Hooks
 *
 * @example
 * Fetch profiles by handles
 * ```tsx
 * const { data, loading, error } = useProfiles({
 *   where: {
 *     handles: ['test/@firstprofile'],
 *   },
 * });
 * ```
 *
 * @example
 * Fetch profiles by ids
 * ```tsx
 * const { data, loading, error } = useProfiles({
 *   where: {
 *     profileIds: ['0x01', '0x02'],
 *   },
 * });
 * ```
 *
 * @example
 * Fetch profiles by owner addresses
 * ```tsx
 * const { data, loading, error } = useProfiles({
 *   where: {
 *     ownedBy: ['0xe3D871d389BF78c091E29deCe83200E9d6B2B0C2'],
 *   },
 * });
 * ```
 *
 * @example
 * Fetch profiles who commented on a publication
 * ```tsx
 * const { data, loading, error } = useProfiles({
 *   where: {
 *     whoCommentedOn: '0x1b-0x012b',
 *   },
 * });
 * ```
 *
 * @example
 * Fetch profiles who mirrored a publication
 * ```tsx
 * const { data, loading, error } = useProfiles({
 *   where: {
 *     whoMirroredPublication: '0x1b-0x012b',
 *   },
 * });
 * ```
 *
 * @example
 * Fetch profiles who quoted a publication
 * ```tsx
 * const { data, loading, error } = useProfiles({
 *   where: {
 *     whoQuotedPublication: '0x1b-0x012b',
 *   },
 * });
 * ```
 */
export function useProfiles({
  where,
  limit = DEFAULT_PAGINATED_QUERY_LIMIT,
}: UseProfilesArgs): PaginatedReadResult<Profile[]> {
  return usePaginatedReadResult(
    useProfilesHook(
      useLensApolloClient({
        variables: useMediaTransformFromConfig({
          where,
          limit,
        }),
      }),
    ),
  );
}
