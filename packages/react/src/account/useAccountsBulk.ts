import type { Account, AccountsBulkRequest } from '@lens-protocol/graphql';
import { AccountsBulkQuery } from '@lens-protocol/graphql';

import type {
  ReadResult,
  Suspendable,
  SuspendableResult,
  SuspenseResult,
} from '../helpers';
import { useSuspendableQuery } from '../helpers';

export type AccountsBulkArgs = AccountsBulkRequest;

/**
 * Fetch Accounts in Bulk.
 *
 * This signature supports React Suspense:
 *
 * ```tsx
 * const { data } = useAccountsBulk({
 *   addresses: [evmAddress('0x…'), evmAddress('0x…')],
 *   suspense: true
 * });
 * ```
 */
export function useAccountsBulk(
  args: AccountsBulkArgs & Suspendable,
): SuspenseResult<Account[]>;

/**
 * Fetch Accounts in Bulk.
 *
 * ```tsx
 * const { data, loading } = useAccountsBulk({
 *   addresses: [evmAddress('0x…'), evmAddress('0x…')]
 * });
 * ```
 */
export function useAccountsBulk(args: AccountsBulkArgs): ReadResult<Account[]>;

export function useAccountsBulk({
  suspense = false,
  ...request
}: AccountsBulkArgs & { suspense?: boolean }): SuspendableResult<Account[]> {
  return useSuspendableQuery({
    document: AccountsBulkQuery,
    variables: { request },
    suspense: suspense,
  });
}
