import type { GroupMember, GroupMembersRequest, Paginated } from '@lens-protocol/graphql';
import { GroupMembersQuery } from '@lens-protocol/graphql';

import type { ReadResult, Suspendable, SuspendableResult, SuspenseResult } from '../helpers';
import { useSuspendableQuery } from '../helpers';

export type GroupMembersArgs = GroupMembersRequest;

/**
 * Fetch group members.
 *
 * This signature supports React Suspense:
 *
 * ```tsx
 * const { data } = useGroupMembers({ group: evmAddress('0x…'), suspense: true });
 * ```
 */
export function useGroupMembers(
  args: GroupMembersArgs & Suspendable,
): SuspenseResult<Paginated<GroupMember>>;

/**
 * Fetch group members.
 *
 * ```tsx
 * const { data, loading } = useGroups({ group: evmAddress('0x…') });
 * ```
 */
export function useGroupMembers(args: GroupMembersArgs): ReadResult<Paginated<GroupMember>>;

export function useGroupMembers({
  suspense = false,
  ...request
}: GroupMembersArgs & { suspense?: boolean }): SuspendableResult<Paginated<GroupMember>> {
  return useSuspendableQuery({
    document: GroupMembersQuery,
    variables: { request },
    suspense: suspense,
  });
}
