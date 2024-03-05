import {
  useProfilesManaged as useProfilesManagedHook,
  ProfilesManagedRequest,
  Profile,
} from '@lens-protocol/api-bindings';

import { useLensApolloClient } from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';
import { useFragmentVariables } from '../helpers/variables';

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
 * Fetch all managed profiles, including owned profiles
 * ```tsx
 * const { data, loading, error } = useProfilesManaged({
 *   for: '0x1234567890123456789012345678901234567890',
 * });
 * ```
 *
 * Fetch managed profiles without owned ones
 * ```tsx
 * const { data, loading, error } = useProfilesManaged({
 *   for: '0x1234567890123456789012345678901234567890',
 *   includeOwned: false,
 * });
 * ```
 */
export function useProfilesManaged(args: UseProfilesManagedArgs): PaginatedReadResult<Profile[]> {
  return usePaginatedReadResult(
    useProfilesManagedHook(
      useLensApolloClient({
        variables: useFragmentVariables(args),
      }),
    ),
  );
}
