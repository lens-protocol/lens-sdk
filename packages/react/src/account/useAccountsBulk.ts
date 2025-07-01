import type { Account, AccountsBulkRequest } from '@lens-protocol/graphql';
import { AccountsBulkQuery } from '@lens-protocol/graphql';

import type {
  ReadResult,
  Suspendable,
  SuspendableResult,
  SuspenseResult,
} from '../helpers';
import { useSuspendableQuery } from '../helpers';

export type UseAccountsBulkArgs = AccountsBulkRequest;

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
  args: UseAccountsBulkArgs & Suspendable,
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
export function useAccountsBulk(args: UseAccountsBulkArgs): ReadResult<Account[]>;

export function useAccountsBulk({
  suspense = false,
  ...request
}: UseAccountsBulkArgs & { suspense?: boolean }): SuspendableResult<Account[]> {
  return useSuspendableQuery({
    document: AccountsBulkQuery,
    variables: { request },
    suspense: suspense,
  });
}
