import type { Group, GroupRequest } from '@lens-protocol/graphql';
import { GroupQuery } from '@lens-protocol/graphql';

import type {
  ReadResult,
  Suspendable,
  SuspendableResult,
  SuspenseResult,
} from '../helpers';
import { useSuspendableQuery } from '../helpers';

export type UseGroupArgs = GroupRequest;

/**
 * Fetch a single Group.
 *
 * This signature supports React Suspense:
 *
 * ```tsx
 * const { data } = useGroup({ group: evmAddress('0x…'), suspense: true });
 * ```
 */
export function useGroup(
  args: UseGroupArgs & Suspendable,
): SuspenseResult<Group | null>;

/**
 * Fetch a single Group.
 *
 * ```tsx
 * const { data, error, loading } = useGroup({ group: evmAddress('0x…') });
 * ```
 */
export function useGroup(args: UseGroupArgs): ReadResult<Group | null>;

export function useGroup({
  suspense = false,
  ...request
}: UseGroupArgs & { suspense?: boolean }): SuspendableResult<Group | null> {
  return useSuspendableQuery({
    document: GroupQuery,
    variables: { request },
    suspense,
  });
}
