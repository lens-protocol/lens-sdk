import { Profile, FollowersRequest, FollowersDocument } from '@lens-protocol/api-bindings';

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
 * {@link useProfileFollowers} hook arguments
 */
export type UseProfileFollowersArgs = PaginatedArgs<FollowersRequest>;

export type { FollowersRequest };

/**
 * {@link useProfileFollowers} hook arguments with Suspense support
 *
 * @experimental This API can change without notice
 */
export type UseSuspenseProfileFollowersArgs = SuspenseEnabled<UseProfileFollowersArgs>;

/**
 * Fetch profiles that follow a requested profile.
 *
 * @example
 * ```tsx
 * const { data, loading, error } = useProfileFollowers({
 *   of: '0x123',
 * });
 * ```
 *
 * @category Profiles
 * @group Hooks
 */
export function useProfileFollowers(args: UseProfileFollowersArgs): PaginatedReadResult<Profile[]>;

/**
 * Fetch profiles that follow a requested profile.
 *
 * This signature supports [React Suspense](https://react.dev/reference/react/Suspense).
 *
 * ```tsx
 * const { data } = useProfileFollowers({
 *   of: '0x123',
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
export function useProfileFollowers(
  args: UseSuspenseProfileFollowersArgs,
): SuspensePaginatedResult<Profile[]>;

export function useProfileFollowers({
  suspense = false,
  ...args
}: UseProfileFollowersArgs & { suspense?: boolean }): SuspendablePaginatedResult<Profile[]> {
  return useSuspendablePaginatedQuery({
    suspense,
    query: FollowersDocument,
    options: useLensApolloClient({
      variables: useFragmentVariables(args),
    }),
  });
}
