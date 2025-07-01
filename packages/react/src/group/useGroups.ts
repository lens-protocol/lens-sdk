import type { Group, GroupsRequest, Paginated } from '@lens-protocol/graphql';
import { GroupsQuery } from '@lens-protocol/graphql';

import type {
  ReadResult,
  Suspendable,
  SuspendableResult,
  SuspenseResult,
} from '../helpers';
import { useSuspendableQuery } from '../helpers';

export type UseGroupsArgs = GroupsRequest;

/**
 * Fetch groups available filtered by the given arguments.
 * Example: Filtered by search query.
 *
 * This signature supports React Suspense:
 *
 * ```tsx
 * const { data } = useGroups({
 *   filter: {
 *     searchQuery: 'test',
 *   },
 *   suspense: true
 * });
 * ```
 */
export function useGroups(
  args: UseGroupsArgs & Suspendable,
): SuspenseResult<Paginated<Group>>;

/**
 * Fetch groups available filtered by the given arguments.
 * Example: Filtered by search query.
 *
 * ```tsx
 * const { data, loading } = useGroups({ filter: { searchQuery: 'test' }});
 * ```
 */
export function useGroups(args: UseGroupsArgs): ReadResult<Paginated<Group>>;

export function useGroups({
  suspense = false,
  ...request
}: UseGroupsArgs & { suspense?: boolean }): SuspendableResult<Paginated<Group>> {
  return useSuspendableQuery({
    document: GroupsQuery,
    variables: { request },
    suspense: suspense,
  });
}
