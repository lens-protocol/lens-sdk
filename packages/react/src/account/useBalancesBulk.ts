import type { BalancesBulkRequest } from '@lens-protocol/graphql';
import { BalancesBulkQuery, AnyBalance } from '@lens-protocol/graphql';

import type {
  ReadResult,
  Suspendable,
  SuspendableResult,
  SuspenseResult,
} from '../helpers';
import { useSuspendableQuery } from '../helpers';

export type BalancesBulkArgs = BalancesBulkRequest;

/**
 * Fetch a finite number of balances for the specific address.
 *
 * This signature supports React Suspense:
 *
 * ```tsx
 * const { data } = useBalancesBulk({
 *   address: evmAddress('0x…'),
 *   tokenAddresses: [evmAddress('0x…'), evmAddress('0x…')],
 *   suspense: true
 * });
 * ```
 */
export function useBalancesBulk(
  args: BalancesBulkArgs & Suspendable,
): SuspenseResult<AnyBalance[]>;

/**
 * Fetch a finite number of balances for the specific address.
 *
 * ```tsx
 * const { data, loading } = useBalancesBulk({
 *   address: evmAddress('0x…'),
 *   tokens: [evmAddress("0x1234…"), evmAddress("0x5678…")]
 * });
 * ```
 */
export function useBalancesBulk(args: BalancesBulkArgs): ReadResult<AnyBalance[]>;

export function useBalancesBulk({
  suspense = false,
  ...request
}: BalancesBulkArgs & { suspense?: boolean }): SuspendableResult<AnyBalance[]> {
  return useSuspendableQuery({
    document: BalancesBulkQuery,
    variables: { request },
    suspense: suspense,
  });
}
