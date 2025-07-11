import type { MeResult } from '@lens-protocol/graphql';
import { MeQuery } from '@lens-protocol/graphql';

import type {
  ReadResult,
  Suspendable,
  SuspendableResult,
  SuspenseResult,
} from '../helpers';
import { useSuspendableQuery } from '../helpers';

/**
 * Fetch the current authenticated user's details.
 *
 * This signature supports React Suspense:
 *
 * ```tsx
 * const { data } = useMe({ suspense: true });
 * ```
 */
export function useMe(args: Suspendable): SuspenseResult<MeResult | null>;

/**
 * Fetch the current authenticated user's details.
 *
 * ```tsx
 * const { data, loading } = useMe();
 * ```
 */
export function useMe(): ReadResult<MeResult | null>;

export function useMe({
  suspense = false,
}: {
  suspense?: boolean;
} = {}): SuspendableResult<MeResult | null> {
  return useSuspendableQuery({
    document: MeQuery,
    variables: {},
    suspense,
  });
}
