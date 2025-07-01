import {
  type AccountFeedsStats,
  AccountFeedsStatsQuery,
  type AccountFeedsStatsRequest,
} from '@lens-protocol/graphql';

import type {
  ReadResult,
  Suspendable,
  SuspendableResult,
  SuspenseResult,
} from '../helpers';
import { useSuspendableQuery } from '../helpers';

export type UseAccountFeedsStatsArgs = AccountFeedsStatsRequest;

/**
 * Fetch an Account Feed Stats.
 *
 * This signature supports React Suspense:
 *
 * ```tsx
 * const { data } = useAccountFeedsStats({
 *   account: evmAddress('0xe2f2a5C28793345a840db3B0845fbc70f5935a5'),
 *   suspense: true
 * });
 * ```
 */
export function useAccountFeedsStats(
  args: UseAccountFeedsStatsArgs & Suspendable,
): SuspenseResult<AccountFeedsStats>;

/**
 * Fetch an Account Feed Stats.
 *
 * ```tsx
 * const { data, loading } = useAccountFeedsStats({
 *   account: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 * );
 * ```
 */
export function useAccountFeedsStats(
  args: UseAccountFeedsStatsArgs,
): ReadResult<AccountFeedsStats>;

export function useAccountFeedsStats({
  suspense = false,
  ...request
}: UseAccountFeedsStatsArgs & {
  suspense?: boolean;
}): SuspendableResult<AccountFeedsStats> {
  return useSuspendableQuery({
    document: AccountFeedsStatsQuery,
    variables: { request },
    suspense: suspense,
  });
}
