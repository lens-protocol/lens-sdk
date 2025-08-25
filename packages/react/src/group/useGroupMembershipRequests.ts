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

export type UseGroupMembershipRequestsArgs = GroupMembershipRequestsRequest;

/**
 * Fetch group membership requests.
 *
 * This signature supports React Suspense:
 *
 * ```tsx
 * const { data } = useGroupMembershipRequests({
 *   group: evmAddress('0x…'),
 *   suspense: true
 * });
 * ```
 */
export function useGroupMembershipRequests(
  args: UseGroupMembershipRequestsArgs & Suspendable,
): SuspenseResult<Paginated<GroupMembershipRequest>>;

/**
 * Fetch group membership requests.
 *
 * ```tsx
 * const { data, error, loading } = useGroupMembershipRequests({
 *   group: evmAddress('0x…'),
 * });
 * ```
 */
export function useGroupMembershipRequests(
  args: UseGroupMembershipRequestsArgs,
): ReadResult<Paginated<GroupMembershipRequest>>;

export function useGroupMembershipRequests({
  suspense = false,
  ...request
}: UseGroupMembershipRequestsArgs & { suspense?: boolean }): SuspendableResult<
  Paginated<GroupMembershipRequest>
> {
  return useSuspendableQuery({
    document: GroupMembershipRequestsQuery,
    variables: { request },
    suspense: suspense,
  });
}
