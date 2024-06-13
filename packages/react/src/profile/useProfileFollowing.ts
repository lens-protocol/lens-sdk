import { Profile, FollowingRequest, FollowingDocument } from '@lens-protocol/api-bindings';

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
 * {@link useProfileFollowing} hook arguments
 */
export type UseProfileFollowingArgs = PaginatedArgs<FollowingRequest>;

export type { FollowingRequest };

/**
 * {@link useProfileFollowing} hook arguments with Suspense support
 *
 * @experimental This API can change without notice
 */
export type UseSuspenseProfileFollowingArgs = SuspenseEnabled<UseProfileFollowingArgs>;

/**
 * Fetch profiles that are followed by a requested profile.
 *
 * @example
 * ```tsx
 * const { data, loading, error } = useProfileFollowing({
 *   for: '0x123',
 * });
 * ```
 *
 * @category Profiles
 * @group Hooks
 */
export function useProfileFollowing(args: UseProfileFollowingArgs): PaginatedReadResult<Profile[]>;

/**
 * Fetch profiles that are followed by a requested profile.
 *
 * This signature supports [React Suspense](https://react.dev/reference/react/Suspense).
 *
 * ```tsx
 * const { data } = useProfileFollowing({
 *   for: '0x123',
 *   suspense: true,
 * });
 *
 * console.log(data);
 * ```
 *
 * @experimental This API can change without notice
 * @category Profiles
 * @group Hooks
 */
export function useProfileFollowing(
  args: UseSuspenseProfileFollowingArgs,
): SuspensePaginatedResult<Profile[]>;

export function useProfileFollowing({
  suspense = false,
  ...args
}: UseProfileFollowingArgs & { suspense?: boolean }): SuspendablePaginatedResult<Profile[]> {
  return useSuspendablePaginatedQuery({
    suspense,
    query: FollowingDocument,
    options: useLensApolloClient({
      variables: useFragmentVariables(args),
    }),
  });
}
