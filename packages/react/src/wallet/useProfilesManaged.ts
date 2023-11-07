import {
  useProfilesManaged as useProfilesManagedHook,
  ProfilesManagedRequest,
  Profile,
} from '@lens-protocol/api-bindings';

import { useLensApolloClient } from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';

/**
 * {@link useProfilesManaged} hook arguments
 */
export type UseProfilesManagedArgs = PaginatedArgs<ProfilesManagedRequest>;

/**
 * `useProfilesManaged` is a paginated hook that lets you fetch profiles managed by a wallet.
 *
 * @category Wallet
 * @group Hooks
 *
 * @example
 * ```tsx
 * const { data, loading, error } = useProfilesManaged({
 *   for: '0x1234567890123456789012345678901234567890',
 * });
 * ```
 */
export function useProfilesManaged(args: UseProfilesManagedArgs): PaginatedReadResult<Profile[]> {
  return usePaginatedReadResult(
    useProfilesManagedHook(
      useLensApolloClient({
        variables: args,
      }),
    ),
  );
}
