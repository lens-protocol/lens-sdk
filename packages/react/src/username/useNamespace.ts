import {
  NamespaceQuery,
  type NamespaceRequest,
  type UsernameNamespace,
} from '@lens-protocol/graphql';

import type { ReadResult, Suspendable, SuspendableResult, SuspenseResult } from '../helpers';
import { useSuspendableQuery } from '../helpers';

export type UseNamespaceArgs = NamespaceRequest;

/**
 * Fetch a single namespace.
 *
 * This signature supports React Suspense:
 *
 * ```tsx
 * const { data } = useNamespace({ namespace: evmAddress('0x1234…'), suspense: true });
 * ```
 */
export function useNamespace(
  args: UseNamespaceArgs & Suspendable,
): SuspenseResult<UsernameNamespace | null>;

/**
 * Fetch a single namespace.
 *
 * ```tsx
 * const { data, loading } = useNamespace({ namespace: evmAddress('0x1234…') });
 * ```
 */
export function useNamespace(args: UseNamespaceArgs): ReadResult<UsernameNamespace | null>;

export function useNamespace({
  suspense = false,
  ...request
}: UseNamespaceArgs & { suspense?: boolean }): SuspendableResult<UsernameNamespace | null> {
  return useSuspendableQuery({
    document: NamespaceQuery,
    variables: { request },
    suspense,
  });
}
