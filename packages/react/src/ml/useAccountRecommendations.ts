import type { Account, AccountRecommendationsRequest, Paginated } from '@lens-protocol/graphql';
import { MlAccountRecommendationsQuery } from '@lens-protocol/graphql';

import type { ReadResult, Suspendable, SuspendableResult, SuspenseResult } from '../helpers';
import { useSuspendableQuery } from '../helpers';

export type AccountRecommendationsArgs = AccountRecommendationsRequest;

/**
 * Fetch account recommendations from ML.
 *
 * This signature supports React Suspense:
 *
 * ```tsx
 * const { data } = useAccountRecommendations({ account: evmAddress('0x…'), suspense: true });
 * ```
 */
export function useAccountRecommendations(
  args: AccountRecommendationsArgs & Suspendable,
): SuspenseResult<Paginated<Account> | null>;

/**
 * Fetch account recommendations from ML.
 *
 * ```tsx
 * const { data, loading } = useAccountRecommendations({ account: evmAddress('0x…') });
 * ```
 */
export function useAccountRecommendations(
  args: AccountRecommendationsArgs,
): ReadResult<Paginated<Account> | null>;

export function useAccountRecommendations({
  suspense = false,
  ...request
}: AccountRecommendationsArgs & {
  suspense?: boolean;
}): SuspendableResult<Paginated<Account> | null> {
  return useSuspendableQuery({
    document: MlAccountRecommendationsQuery,
    variables: { request },
    suspense,
  });
}
