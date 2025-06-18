import type {
  Paginated,
  Username,
  UsernamesRequest,
} from '@lens-protocol/graphql';
import { UsernamesQuery } from '@lens-protocol/graphql';

import type {
  ReadResult,
  Suspendable,
  SuspendableResult,
  SuspenseResult,
} from '../helpers';
import { useSuspendableQuery } from '../helpers';

export type UsernamesArgs = UsernamesRequest;

/**
 * Fetch usernames available filtered by the given arguments.
 * Example: owned by a specific address.
 *
 * This signature supports React Suspense:
 *
 * ```tsx
 * const { data } = useUsernames({
 *   filter: {
 *     owner: evmAddress('0x..'),
 *   },
 *   suspense: true
 * });
 * ```
 */
export function useUsernames(
  args: UsernamesArgs & Suspendable,
): SuspenseResult<Paginated<Username>>;

/**
 * Fetch usernames available filtered by the given arguments.
 * Example: owned by a specific address.
 *
 * ```tsx
 * const { data, loading } = useUsernames({
 *   filter: {
 *     owner: evmAddress('0x..'),
 *   },
 * });
 * ```
 */
export function useUsernames(
  args: UsernamesArgs,
): ReadResult<Paginated<Username>>;

export function useUsernames({
  suspense = false,
  ...request
}: UsernamesArgs & { suspense?: boolean }): SuspendableResult<
  Paginated<Username>
> {
  return useSuspendableQuery({
    document: UsernamesQuery,
    variables: { request },
    suspense: suspense,
  });
}
