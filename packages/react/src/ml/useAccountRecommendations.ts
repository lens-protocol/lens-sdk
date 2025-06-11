import type { Account, AccountRecommendationsRequest, Paginated } from '@lens-protocol/graphql';
import { MlAccountRecommendationsQuery } from '@lens-protocol/graphql';

import type { ReadResult, Suspendable, SuspendableResult, SuspenseResult } from '../helpers';
import { useSuspendableQuery } from '../helpers';

export type UseAccountRecommendationsArgs = AccountRecommendationsRequest;

/**
 * Retrieve a list of recommended accounts for a given account address.
 *
 * This signature supports React Suspense:
 *
 * ```tsx
 * const { data } = useAccountRecommendations({ account: evmAddress('0x…'), suspense: true });
 * ```
 */
export function useAccountRecommendations(
  args: UseAccountRecommendationsArgs & Suspendable,
): SuspenseResult<Paginated<Account> | null>;

/**
 * Retrieve a list of recommended accounts for a given account address.
 *
 * ```tsx
 * const { data, loading } = useAccountRecommendations({ account: evmAddress('0x…') });
 * ```
 */
export function useAccountRecommendations(
  args: UseAccountRecommendationsArgs,
): ReadResult<Paginated<Account> | null>;

export function useAccountRecommendations({
  suspense = false,
  ...request
}: UseAccountRecommendationsArgs & {
  suspense?: boolean;
}): SuspendableResult<Paginated<Account> | null> {
  return useSuspendableQuery({
    document: MlAccountRecommendationsQuery,
    variables: { request },
    suspense,
  });
}
