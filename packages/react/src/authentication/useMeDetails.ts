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
 * const { data } = useMeDetails({ suspense: true });
 * ```
 */
export function useMeDetails(
  args: Suspendable,
): SuspenseResult<MeResult | null>;

/**
 * Fetch the current authenticated user's details.
 *
 * ```tsx
 * const { data, error, loading } = useMeDetails();
 * ```
 */
export function useMeDetails(): ReadResult<MeResult | null>;

export function useMeDetails({
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
