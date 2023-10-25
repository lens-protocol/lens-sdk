import {
  ClaimableProfilesResult,
  UnspecifiedError,
  useClaimableProfiles,
} from '@lens-protocol/api-bindings';
import { invariant } from '@lens-protocol/shared-kernel';

import { SessionType, useSession } from '../authentication';
import { useLensApolloClient } from '../helpers/arguments';
import { ReadResult, useReadResult } from '../helpers/reads';

export type { ClaimableProfilesResult, ReservedClaimable } from '@lens-protocol/api-bindings';

/**
 * Check if authenticated wallet can claim a handle
 *
 * @category Wallet
 * @group Hooks
 */
export function useCanClaimHandle(): ReadResult<ClaimableProfilesResult> {
  const { data: session } = useSession();
  const { data, error, loading } = useReadResult(useClaimableProfiles(useLensApolloClient()));

  invariant(
    session?.authenticated,
    'You must be authenticated to use this operation. Use `useLogin` hook to authenticate.',
  );

  if (session.type !== SessionType.JustWallet) {
    return {
      data: undefined,
      error: new UnspecifiedError(new Error('You must be authenticated with just wallet.')),
      loading: false,
    };
  }

  if (loading) {
    return {
      data: undefined,
      error: undefined,
      loading: true,
    };
  }

  if (error) {
    return {
      data: undefined,
      error,
      loading: false,
    };
  }

  return {
    data,
    error: undefined,
    loading: false,
  };
}
