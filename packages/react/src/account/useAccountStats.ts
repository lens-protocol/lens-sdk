import {
  type AccountStats,
  AccountStatsQuery,
  type AccountStatsRequest,
} from '@lens-protocol/graphql';

import type {
  ReadResult,
  Suspendable,
  SuspendableResult,
  SuspenseResult,
} from '../helpers';
import { useSuspendableQuery } from '../helpers';

export type AccountStatsArgs = AccountStatsRequest;

/**
 * Fetch an Account Stats.
 *
 * This signature supports React Suspense:
 *
 * ```tsx
 * const { data } = useAccountStats({
 *   account: evmAddress('0xe2f2a5C28793345a840db3B0845fbc70f5935a5'),
 *   suspense: true
 * });
 * ```
 */
export function useAccountStats(
  args: AccountStatsArgs & Suspendable,
): SuspenseResult<AccountStats>;

/**
 * Fetch an Account Stats.
 *
 * ```tsx
 * const { data, loading } = useAccountStats({
 *   account: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 * );
 * ```
 */
export function useAccountStats(
  args: AccountStatsArgs,
): ReadResult<AccountStats>;

export function useAccountStats({
  suspense = false,
  ...request
}: AccountStatsArgs & {
  suspense?: boolean;
}): SuspendableResult<AccountStats> {
  return useSuspendableQuery({
    document: AccountStatsQuery,
    variables: { request },
    suspense: suspense,
  });
}
