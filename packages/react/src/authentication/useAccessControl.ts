import {
  AccessControlQuery,
  type AccessControlRequest,
  type AccessControlResult,
} from '@lens-protocol/graphql';
import type {
  ReadResult,
  Suspendable,
  SuspendableResult,
  SuspenseResult,
} from '../helpers';
import { useSuspendableQuery } from '../helpers';

export type UseAccessControlArgs = AccessControlRequest;

/**
 * Fetch an account's Access Control details.
 *
 * This signature supports React Suspense:
 *
 * ```tsx
 * const { data } = useAccessControl({
 *   address: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 *   suspense: true
 * });
 * ```
 */
export function useAccessControl(
  args: UseAccessControlArgs & Suspendable,
): SuspenseResult<AccessControlResult | null>;

/**
 * Fetch an account's Access Control details.
 *
 * ```tsx
 * const { data, loading } = useAccessControl({
 *   address: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 * });
 * ```
 */
export function useAccessControl(
  args: UseAccessControlArgs,
): ReadResult<AccessControlResult | null>;

export function useAccessControl({
  suspense = false,
  ...request
}: UseAccessControlArgs & {
  suspense?: boolean;
}): SuspendableResult<AccessControlResult | null> {
  return useSuspendableQuery({
    document: AccessControlQuery,
    variables: { request },
    suspense,
  });
}
