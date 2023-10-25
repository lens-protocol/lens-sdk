import {
  useOwnedHandles as useOwnedHandlesHook,
  OwnedHandlesRequest,
  HandleInfo,
} from '@lens-protocol/api-bindings';

import { useLensApolloClient } from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';

/**
 * {@link useOwnedHandles} hook arguments
 */
export type UseOwnedHandlesArgs = PaginatedArgs<OwnedHandlesRequest>;

/**
 * `useOwnedHandles` is a paginated hook that lets you fetch handles owned by a wallet.
 *
 * @category Wallet
 * @group Hooks
 *
 * @example
 * ```tsx
 * const { data, loading, error } = useOwnedHandles({
 *   for: '0x1234567890123456789012345678901234567890',
 * });
 * ```
 */
export function useOwnedHandles(args: UseOwnedHandlesArgs): PaginatedReadResult<HandleInfo[]> {
  return usePaginatedReadResult(
    useOwnedHandlesHook(
      useLensApolloClient({
        variables: args,
      }),
    ),
  );
}
