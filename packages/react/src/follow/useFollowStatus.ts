import type {
  FollowStatusRequest,
  FollowStatusResult,
} from '@lens-protocol/graphql';
import { FollowStatusQuery } from '@lens-protocol/graphql';

import type {
  ReadResult,
  Suspendable,
  SuspendableResult,
  SuspenseResult,
} from '../helpers';
import { useSuspendableQuery } from '../helpers';

export type FollowStatusArgs = FollowStatusRequest;

/**
 * Fetch follow status.
 *
 * This signature supports React Suspense:
 *
 * ```tsx
 * const { data } = useFollowStatus({
 *   pairs: [
 *     {
 *       account: evmAddress('0x…'),
 *       follower: evmAddress('0x…'),
 *     }
 *   ],
 * }, suspense: true });
 * ```
 */
export function useFollowStatus(
  args: FollowStatusArgs & Suspendable,
): SuspenseResult<FollowStatusResult[]>;

/**
 * Fetch follow status.
 *
 * ```tsx
 * const { data, loading } = useFollowStatus({
 *   pairs: [
 *     {
 *       account: evmAddress('0x…'),
 *       follower: evmAddress('0x…'),
 *     }
 *   ],
 * });
 * ```
 */
export function useFollowStatus(
  args: FollowStatusArgs,
): ReadResult<FollowStatusResult[]>;

export function useFollowStatus({
  suspense = false,
  ...request
}: FollowStatusArgs & { suspense?: boolean }): SuspendableResult<
  FollowStatusResult[]
> {
  return useSuspendableQuery({
    document: FollowStatusQuery,
    variables: { request },
    suspense: suspense,
  });
}
