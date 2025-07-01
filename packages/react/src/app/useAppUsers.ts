import type {
  AppUser,
  AppUsersRequest,
  Paginated,
} from '@lens-protocol/graphql';
import { AppUsersQuery } from '@lens-protocol/graphql';

import type {
  ReadResult,
  Suspendable,
  SuspendableResult,
  SuspenseResult,
} from '../helpers';
import { useSuspendableQuery } from '../helpers';

export type UseAppUsersArgs = AppUsersRequest;

/**
 * Fetch list of users using an App.
 *
 * This signature supports React Suspense:
 *
 * ```tsx
 * const { data } = useAppUsers({
 *   app: evmAddress('0x123…'),
 *   suspense: true
 * });
 * ```
 */
export function useAppUsers(
  args: UseAppUsersArgs & Suspendable,
): SuspenseResult<Paginated<AppUser>>;

/**
 * Fetch list of users using an App.
 *
 * ```tsx
 * const { data, loading } = useAppUsers({
 *   app: evmAddress('0x123…'),
 * });
 * ```
 */
export function useAppUsers(
  args: UseAppUsersArgs,
): ReadResult<Paginated<AppUser>>;

export function useAppUsers({
  suspense = false,
  ...request
}: UseAppUsersArgs & { suspense?: boolean }): SuspendableResult<
  Paginated<AppUser>
> {
  return useSuspendableQuery({
    document: AppUsersQuery,
    variables: { request },
    suspense: suspense,
  });
}
