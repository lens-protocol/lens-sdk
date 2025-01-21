import type { Follower, FollowersYouKnowRequest, Paginated } from '@lens-protocol/graphql';
import { FollowersYouKnowQuery } from '@lens-protocol/graphql';

import type { ReadResult, Suspendable, SuspendableResult, SuspenseResult } from '../helpers';
import { useSuspendableQuery } from '../helpers';

export type FollowersYouKnowArgs = FollowersYouKnowRequest;

/**
 * Fetch followers you know.
 *
 * This signature supports React Suspense:
 *
 * ```tsx
 * const { data } = useFollowersYouKnow({
 *   observer: evmAddress('0x…'),
 *   target: evmAddress('0x…'),
 *   suspense: true
 * });
 * ```
 */
export function useFollowersYouKnow(
  args: FollowersYouKnowArgs & Suspendable,
): SuspenseResult<Paginated<Follower>>;

/**
 * Fetch followers you know.
 *
 * ```tsx
 * const { data, loading } = useFollowersYouKnow({
 *   observer: evmAddress('0x…'),
 *   target: evmAddress('0x…'),
 * });
 * ```
 */
export function useFollowersYouKnow(args: FollowersYouKnowArgs): ReadResult<Paginated<Follower>>;

export function useFollowersYouKnow({
  suspense = false,
  ...request
}: FollowersYouKnowArgs & { suspense?: boolean }): SuspendableResult<Paginated<Follower>> {
  return useSuspendableQuery({
    document: FollowersYouKnowQuery,
    variables: { request },
    suspense: suspense,
  });
}
