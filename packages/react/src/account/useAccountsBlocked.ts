import type {
  AccountBlocked,
  AccountsBlockedRequest,
  Paginated,
} from '@lens-protocol/graphql';
import { AccountsBlockedQuery } from '@lens-protocol/graphql';

import type {
  ReadResult,
  Suspendable,
  SuspendableResult,
  SuspenseResult,
} from '../helpers';
import { useSuspendableQuery } from '../helpers';

export type UseAccountsBlockedArgs = AccountsBlockedRequest;

/**
 * Fetch Blocked Accounts.
 *
 * This signature supports React Suspense:
 *
 * ```tsx
 * const { data } = useAccountsBlocked({ suspense: true });
 * ```
 */
export function useAccountsBlocked(
  args: UseAccountsBlockedArgs & Suspendable,
): SuspenseResult<Paginated<AccountBlocked>>;

/**
 * Fetch Blocked Accounts.
 *
 * ```tsx
 * const { data, loading } = useAccountsBlocked();
 * ```
 */
export function useAccountsBlocked(
  args?: UseAccountsBlockedArgs,
): ReadResult<Paginated<AccountBlocked>>;

export function useAccountsBlocked({
  suspense = false,
  ...request
}: UseAccountsBlockedArgs & { suspense?: boolean } = {}): SuspendableResult<
  Paginated<AccountBlocked>
> {
  return useSuspendableQuery({
    document: AccountsBlockedQuery,
    variables: { request },
    suspense: suspense,
  });
}
