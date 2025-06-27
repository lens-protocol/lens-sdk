import type {
  GroupBannedAccount,
  GroupBannedAccountsRequest,
  Paginated,
} from '@lens-protocol/graphql';
import { GroupBannedAccountsQuery } from '@lens-protocol/graphql';

import type {
  ReadResult,
  Suspendable,
  SuspendableResult,
  SuspenseResult,
} from '../helpers';
import { useSuspendableQuery } from '../helpers';

export type GroupBannedAccountsArgs = GroupBannedAccountsRequest;

/**
 * Fetch group banned accounts.
 *
 * This signature supports React Suspense:
 *
 * ```tsx
 * const { data } = useGroupBannedAccounts({ group: evmAddress('0x…'), suspense: true });
 * ```
 */
export function useGroupBannedAccounts(
  args: GroupBannedAccountsArgs & Suspendable,
): SuspenseResult<Paginated<GroupBannedAccount>>;

/**
 * Fetch group banned accounts.
 *
 * ```tsx
 * const { data, loading } = useGroupBannedAccounts({ group: evmAddress('0x…') });
 * ```
 */
export function useGroupBannedAccounts(
  args: GroupBannedAccountsArgs,
): ReadResult<Paginated<GroupBannedAccount>>;

export function useGroupBannedAccounts({
  suspense = false,
  ...request
}: GroupBannedAccountsArgs & { suspense?: boolean }): SuspendableResult<
  Paginated<GroupBannedAccount>
> {
  return useSuspendableQuery({
    document: GroupBannedAccountsQuery,
    variables: { request },
    suspense: suspense,
  });
}
