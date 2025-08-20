import type {
  Following,
  FollowingRequest,
  Paginated,
} from '@lens-protocol/graphql';
import { FollowingQuery } from '@lens-protocol/graphql';

import type {
  ReadResult,
  Suspendable,
  SuspendableResult,
  SuspenseResult,
} from '../helpers';
import { useSuspendableQuery } from '../helpers';

export type UseFollowingArgs = FollowingRequest;

/**
 * Fetch accounts following.
 *
 * This signature supports React Suspense:
 *
 * ```tsx
 * const { data } = useFollowing({ account: evmAddress('0x…'), suspense: true });
 * ```
 */
export function useFollowing(
  args: UseFollowingArgs & Suspendable,
): SuspenseResult<Paginated<Following>>;

/**
 * Fetch accounts following.
 *
 * ```tsx
 * const { data, loading } = useFollowing({ account: evmAddress('0x…') });
 * ```
 */
export function useFollowing(
  args: UseFollowingArgs,
): ReadResult<Paginated<Following>>;

export function useFollowing({
  suspense = false,
  ...request
}: UseFollowingArgs & { suspense?: boolean }): SuspendableResult<
  Paginated<Following>
> {
  return useSuspendableQuery({
    document: FollowingQuery,
    variables: { request },
    suspense: suspense,
  });
}
