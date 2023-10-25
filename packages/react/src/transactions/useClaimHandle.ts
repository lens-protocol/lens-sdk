import { ClaimProfileWithHandleErrorReasonType, Profile } from '@lens-protocol/api-bindings';
import {
  PendingSigningRequestError,
  TransactionError,
  TransactionKind,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { ClaimHandleError, FollowPolicyConfig } from '@lens-protocol/domain/use-cases/profile';
import { invariant } from '@lens-protocol/shared-kernel';

import { SessionType, useSession } from '../authentication';
import { UseDeferredTask, useDeferredTask } from '../helpers/tasks';
import { useClaimHandleController } from './adapters/useClaimHandleController';

/**
 * Claim a handle details.
 */
export type ClaimHandleArgs = {
  /**
   * The claimable handle ID.
   */
  id: string;
  /**
   * The free text localName to claim.
   */
  localName: string;
  /**
   * You can optionally specify a follow policy for the profile.
   */
  followPolicy?: FollowPolicyConfig;
};

/**
 * `useClaimHandle` is React Hook that allows you to claim a handle.
 *
 * You MUST be authenticated with a {@link WalletOnlySession} via {@link useLogin} to use this hook.
 *
 * @experimental
 *
 * @category Profiles
 * @group Hooks
 */
export function useClaimHandle(): UseDeferredTask<
  Profile,
  | ClaimHandleError<ClaimProfileWithHandleErrorReasonType>
  | PendingSigningRequestError
  | UserRejectedError
  | TransactionError
  | WalletConnectionError,
  ClaimHandleArgs
> {
  const { data: session } = useSession();
  const claimHandle = useClaimHandleController();

  return useDeferredTask(async (args: ClaimHandleArgs) => {
    invariant(
      session?.type === SessionType.JustWallet,
      'You must be authenticated with just a wallet to claim an handle. Use `useLogin` hook omitting the profileId.',
    );

    return claimHandle({
      kind: TransactionKind.CLAIM_HANDLE,
      ...args,
    });
  });
}
