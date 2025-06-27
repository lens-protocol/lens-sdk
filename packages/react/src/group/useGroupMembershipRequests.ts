import type {
  GroupMembershipRequest,
  GroupMembershipRequestsRequest,
  Paginated,
} from '@lens-protocol/graphql';
import { GroupMembershipRequestsQuery } from '@lens-protocol/graphql';

import type {
  ReadResult,
  Suspendable,
  SuspendableResult,
  SuspenseResult,
} from '../helpers';
import { useSuspendableQuery } from '../helpers';

export type GroupMembershipRequestsArgs = GroupMembershipRequestsRequest;

/**
 * Fetch group membership requests.
 *
 * This signature supports React Suspense:
 *
 * ```tsx
 * const { data } = useGroupMembershipRequests({ group: evmAddress('0x…'), suspense: true });
 * ```
 */
export function useGroupMembershipRequests(
  args: GroupMembershipRequestsArgs & Suspendable,
): SuspenseResult<Paginated<GroupMembershipRequest>>;

/**
 * Fetch group membership requests.
 *
 * ```tsx
 * const { data, loading } = useGroupMembershipRequests({ group: evmAddress('0x…') });
 * ```
 */
export function useGroupMembershipRequests(
  args: GroupMembershipRequestsArgs,
): ReadResult<Paginated<GroupMembershipRequest>>;

export function useGroupMembershipRequests({
  suspense = false,
  ...request
}: GroupMembershipRequestsArgs & { suspense?: boolean }): SuspendableResult<
  Paginated<GroupMembershipRequest>
> {
  return useSuspendableQuery({
    document: GroupMembershipRequestsQuery,
    variables: { request },
    suspense: suspense,
  });
}
