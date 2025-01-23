import type { AccountManager, AccountManagersRequest, Paginated } from '@lens-protocol/graphql';
import { AccountManagersQuery } from '@lens-protocol/graphql';

import type { ReadResult, Suspendable, SuspendableResult, SuspenseResult } from '../helpers';
import { useSuspendableQuery } from '../helpers';

export type AccountManagersArgs = AccountManagersRequest;

/**
 * Fetch Account Managers.
 *
 * This signature supports React Suspense:
 *
 * ```tsx
 * const { data } = useAccountManagers({ suspense: true });
 * ```
 */
export function useAccountManagers(
  args: AccountManagersArgs & Suspendable,
): SuspenseResult<Paginated<AccountManager>>;

/**
 * Fetch Account Managers.
 *
 * ```tsx
 * const { data, loading } = useAccountManagers();
 * ```
 */
export function useAccountManagers(
  args?: AccountManagersArgs,
): ReadResult<Paginated<AccountManager>>;

export function useAccountManagers({
  suspense = false,
  ...request
}: AccountManagersArgs & { suspense?: boolean } = {}): SuspendableResult<
  Paginated<AccountManager>
> {
  return useSuspendableQuery({
    document: AccountManagersQuery,
    variables: { request },
    suspense: suspense,
  });
}
