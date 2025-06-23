import type { Account, AccountRequest } from '@lens-protocol/graphql';
import { AccountQuery } from '@lens-protocol/graphql';

import type {
  ReadResult,
  Suspendable,
  SuspendableResult,
  SuspenseResult,
} from '../helpers';
import { useSuspendableQuery } from '../helpers';

export type UseAccountArgs = AccountRequest;

/**
 * Fetch a single Account.
 *
 * This signature supports React Suspense:
 *
 * ```tsx
 * const { data } = useAccount({ address: evmAddress('0x…'), suspense: true });
 * ```
 */
export function useAccount(
  args: UseAccountArgs & Suspendable,
): SuspenseResult<Account | null>;

/**
 * Fetch a single Account.
 *
 * ```tsx
 * const { data, loading } = useAccount({ address: evmAddress('0x…') });
 * ```
 */
export function useAccount(args: UseAccountArgs): ReadResult<Account | null>;

export function useAccount({
  suspense = false,
  ...request
}: UseAccountArgs & { suspense?: boolean }): SuspendableResult<Account | null> {
  return useSuspendableQuery({
    document: AccountQuery,
    variables: { request },
    suspense,
  });
}
