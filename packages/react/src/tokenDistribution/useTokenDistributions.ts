import type { TokenDistribution } from '@lens-protocol/graphql';
import {
  type Paginated,
  TokenDistributionsQuery,
  type TokenDistributionsRequest,
} from '@lens-protocol/graphql';
import type {
  ReadResult,
  Suspendable,
  SuspendableResult,
  SuspenseResult,
} from '../helpers';
import { useSuspendableQuery } from '../helpers';

export type UseTokenDistributionsArgs = TokenDistributionsRequest;

/**
 * Fetch list of token distributions received by the authenticated account.
 *
 * This signature supports React Suspense:
 *
 * ```tsx
 * const { data } = useTokenDistributions({ suspense: true });
 * ```
 */
export function useTokenDistributions(
  args: UseTokenDistributionsArgs & Suspendable,
): SuspenseResult<Paginated<TokenDistribution>>;

/**
 * Fetch list of token distributions received by the authenticated account.
 *
 * ```tsx
 * const { data, loading } = useTokenDistributions();
 * ```
 */
export function useTokenDistributions(
  args: UseTokenDistributionsArgs,
): ReadResult<Paginated<TokenDistribution>>;

export function useTokenDistributions(
  args?: UseTokenDistributionsArgs & { suspense?: boolean },
): SuspendableResult<Paginated<TokenDistribution>> {
  const { suspense = false, ...request } = args ?? {};
  return useSuspendableQuery({
    document: TokenDistributionsQuery,
    variables: { request: request ?? {} },
    suspense,
  });
}
