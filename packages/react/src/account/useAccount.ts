import { type Account, AccountQuery, type AccountRequest } from '@lens-protocol/graphql';
import {
  type ReadResult,
  type Suspendable,
  type SuspendableResult,
  type SuspenseResult,
  useSuspendableQuery,
} from '../helpers';

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
export function useAccount(args: UseAccountArgs & Suspendable): SuspenseResult<Account | null>;

/**
 * Fetch a single Account.
 *
 * ```tsx
 * const { data } = useAccount({ address: evmAddress('0x…') });
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
