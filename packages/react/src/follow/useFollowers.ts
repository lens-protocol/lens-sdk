import type {
  Follower,
  FollowersRequest,
  Paginated,
} from '@lens-protocol/graphql';
import { FollowersQuery } from '@lens-protocol/graphql';

import type {
  ReadResult,
  Suspendable,
  SuspendableResult,
  SuspenseResult,
} from '../helpers';
import { useSuspendableQuery } from '../helpers';

export type UseFollowersArgs = FollowersRequest;

/**
 * Fetch followers accounts.
 *
 * This signature supports React Suspense:
 *
 * ```tsx
 * const { data } = useFollowers({ account: evmAddress('0x…'), suspense: true });
 * ```
 */
export function useFollowers(
  args: UseFollowersArgs & Suspendable,
): SuspenseResult<Paginated<Follower>>;

/**
 * Fetch followers accounts.
 *
 * ```tsx
 * const { data, loading } = useFollowers({ account: evmAddress('0x…') });
 * ```
 */
export function useFollowers(
  args: UseFollowersArgs,
): ReadResult<Paginated<Follower>>;

export function useFollowers({
  suspense = false,
  ...request
}: UseFollowersArgs & { suspense?: boolean }): SuspendableResult<
  Paginated<Follower>
> {
  return useSuspendableQuery({
    document: FollowersQuery,
    variables: { request },
    suspense: suspense,
  });
}
