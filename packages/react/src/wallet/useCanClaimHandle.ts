import { ClaimableProfilesResult, useClaimableProfiles } from '@lens-protocol/api-bindings';

import { useLensApolloClient } from '../helpers/arguments';
import { ReadResult, useReadResult } from '../helpers/reads';

export type { ClaimableProfilesResult, ReservedClaimable } from '@lens-protocol/api-bindings';

/**
 * `useCanClaimHandle` is React Hook that allows you to check if you can claim a handle.
 *
 * You MUST be authenticated with a {@link WalletOnlySession} via {@link useLogin} to use this hook.
 *
 * @experimental This hook is experimental and may change in future versions.
 * @category Wallet
 * @group Hooks
 */
export function useCanClaimHandle(): ReadResult<ClaimableProfilesResult> {
  return useReadResult(
    useClaimableProfiles(
      useLensApolloClient({
        fetchPolicy: 'network-only',
      }),
    ),
  );
}
