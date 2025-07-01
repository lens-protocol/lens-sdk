import type { Graph, GraphRequest } from '@lens-protocol/graphql';
import { GraphQuery } from '@lens-protocol/graphql';

import type {
  ReadResult,
  Suspendable,
  SuspendableResult,
  SuspenseResult,
} from '../helpers';
import { useSuspendableQuery } from '../helpers';

export type UseGraphArgs = GraphRequest;

/**
 * Fetch a single Graph.
 *
 * This signature supports React Suspense:
 *
 * ```tsx
 * const { data } = useGraph({ graph: evmAddress('0x…'), suspense: true });
 * ```
 */
export function useGraph(
  args: UseGraphArgs & Suspendable,
): SuspenseResult<Graph | null>;

/**
 * Fetch a single Graph.
 *
 * ```tsx
 * const { data, loading } = useGraph({ graph: evmAddress('0x…') });
 * ```
 */
export function useGraph(args: UseGraphArgs): ReadResult<Graph | null>;

export function useGraph({
  suspense = false,
  ...request
}: UseGraphArgs & { suspense?: boolean }): SuspendableResult<Graph | null> {
  return useSuspendableQuery({
    document: GraphQuery,
    variables: { request },
    suspense,
  });
}
