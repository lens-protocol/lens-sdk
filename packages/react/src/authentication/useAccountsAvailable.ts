import {
  type AccountAvailable,
  AccountsAvailableQuery,
  type AccountsAvailableRequest,
  type Paginated,
} from '@lens-protocol/graphql';
import {
  type ReadResult,
  type Suspendable,
  type SuspendableResult,
  type SuspenseResult,
  useSuspendableQuery,
} from '../helpers';

export type UseAccountsAvailableArgs = AccountsAvailableRequest;

/**
 * Fetch the accounts available for a given address.
 *
 * This signature supports React Suspense:
 *
 * ```tsx
 * const { data } = useAccountsAvailable({ managedBy: evmAddress('0x…'), suspense: true });
 * ```
 */
export function useAccountsAvailable(
  args: UseAccountsAvailableArgs & Suspendable,
): SuspenseResult<Paginated<AccountAvailable>>;

/**
 * Fetch the accounts available for a given address.
 *
 * ```tsx
 * const { data, error, loading } = useAccountsAvailable({ managedBy: evmAddress('0x…') });
 * ```
 */
export function useAccountsAvailable(
  args: UseAccountsAvailableArgs,
): ReadResult<Paginated<AccountAvailable>>;

export function useAccountsAvailable({
  suspense = false,
  ...request
}: UseAccountsAvailableArgs & { suspense?: boolean }): SuspendableResult<
  Paginated<AccountAvailable>
> {
  return useSuspendableQuery({
    document: AccountsAvailableQuery,
    variables: { request },
    suspense: suspense,
  });
}
