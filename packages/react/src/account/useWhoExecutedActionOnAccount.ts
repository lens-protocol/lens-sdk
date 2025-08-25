import type {
  AccountExecutedActions,
  Paginated,
  WhoExecutedActionOnAccountRequest,
} from '@lens-protocol/graphql';
import { WhoExecutedActionOnAccountQuery } from '@lens-protocol/graphql';

import type {
  ReadResult,
  Suspendable,
  SuspendableResult,
  SuspenseResult,
} from '../helpers';
import { useSuspendableQuery } from '../helpers';

export type UseWhoExecutedActionOnAccountArgs =
  WhoExecutedActionOnAccountRequest;

/**
 * Fetch who executed action on an Account.
 *
 * This signature supports React Suspense:
 *
 * ```tsx
 * const { data } = useWhoExecutedActionOnAccount({
 *   account: evmAddress('0x…'),
 *   suspense: true,
 * });
 * ```
 */
export function useWhoExecutedActionOnAccount(
  args: UseWhoExecutedActionOnAccountArgs & Suspendable,
): SuspenseResult<Paginated<AccountExecutedActions>>;

/**
 * Fetch who executed action on an Account.
 *
 * ```tsx
 * const { data, error, loading } = useWhoExecutedActionOnAccount({
 *   account: evmAddress('0x…'),
 * });
 * ```
 */
export function useWhoExecutedActionOnAccount(
  args: UseWhoExecutedActionOnAccountArgs,
): ReadResult<Paginated<AccountExecutedActions>>;

export function useWhoExecutedActionOnAccount({
  suspense = false,
  ...request
}: UseWhoExecutedActionOnAccountArgs & {
  suspense?: boolean;
}): SuspendableResult<Paginated<AccountExecutedActions>> {
  return useSuspendableQuery({
    document: WhoExecutedActionOnAccountQuery,
    variables: { request },
    suspense: suspense,
  });
}
