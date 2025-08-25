import type {
  AccountManager,
  AccountManagersRequest,
  Paginated,
} from '@lens-protocol/graphql';
import { AccountManagersQuery } from '@lens-protocol/graphql';

import type {
  ReadResult,
  Suspendable,
  SuspendableResult,
  SuspenseResult,
} from '../helpers';
import { useSuspendableQuery } from '../helpers';

export type UseAccountManagersArgs = AccountManagersRequest;

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
  args: UseAccountManagersArgs & Suspendable,
): SuspenseResult<Paginated<AccountManager>>;

/**
 * Fetch Account Managers.
 *
 * ```tsx
 * const { data, error, loading } = useAccountManagers();
 * ```
 */
export function useAccountManagers(
  args?: UseAccountManagersArgs,
): ReadResult<Paginated<AccountManager>>;

export function useAccountManagers({
  suspense = false,
  ...request
}: UseAccountManagersArgs & { suspense?: boolean } = {}): SuspendableResult<
  Paginated<AccountManager>
> {
  return useSuspendableQuery({
    document: AccountManagersQuery,
    variables: { request },
    suspense: suspense,
  });
}
