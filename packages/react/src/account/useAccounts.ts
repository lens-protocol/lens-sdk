import type {
  Account,
  AccountsRequest,
  Paginated,
} from '@lens-protocol/graphql';
import { AccountsQuery } from '@lens-protocol/graphql';

import type {
  ReadResult,
  Suspendable,
  SuspendableResult,
  SuspenseResult,
} from '../helpers';
import { useSuspendableQuery } from '../helpers';

export type UseAccountsArgs = AccountsRequest;

/**
 * Fetch accounts available filtered by the given arguments.
 *
 * This signature supports React Suspense:
 *
 * ```tsx
 * const { data } = useAccounts({
 *   filter: {
 *     searchBy: {
 *       localNameQuery: 'wagmi'
 *     },
 *   },
 *   suspense: true
 * });
 * ```
 */
export function useAccounts(
  args: UseAccountsArgs & Suspendable,
): SuspenseResult<Paginated<Account>>;

/**
 * Fetch accounts available filtered by the given arguments.
 *
 * ```tsx
 * const { data, error, loading } = useAccounts({
 *   filter: {
 *     searchBy: {
 *       localNameQuery: 'wagmi'
 *     },
 *   },
 * );
 * ```
 */
export function useAccounts(
  args: UseAccountsArgs,
): ReadResult<Paginated<Account>>;

export function useAccounts({
  suspense = false,
  ...request
}: UseAccountsArgs & { suspense?: boolean }): SuspendableResult<
  Paginated<Account>
> {
  return useSuspendableQuery({
    document: AccountsQuery,
    variables: { request },
    suspense: suspense,
  });
}
