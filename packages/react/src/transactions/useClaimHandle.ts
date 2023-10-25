import {
  ClaimProfileWithHandleErrorReasonType,
  Profile,
  ReservedClaimable,
} from '@lens-protocol/api-bindings';
import {
  PendingSigningRequestError,
  TransactionError,
  TransactionKind,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import {
  ClaimHandleError,
  ClaimHandleRequest,
  FollowPolicyConfig,
} from '@lens-protocol/domain/use-cases/profile';
import { OneOf, invariant } from '@lens-protocol/shared-kernel';

import { SessionType, useSession } from '../authentication';
import { UseDeferredTask, useDeferredTask } from '../helpers/tasks';
import { useClaimHandleController } from './adapters/useClaimHandleController';

/**
 * Claim a handle details.
 */
export type ClaimHandleArgs = OneOf<{
  /**
   * The handle local name to claim.
   */
  localName: string;
  /**
   * The handle reservation to claim.
   */
  reserved: ReservedClaimable;
}> & {
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

    const request: ClaimHandleRequest =
      `reserved` in args && args.reserved
        ? {
            kind: TransactionKind.CLAIM_HANDLE,
            id: args.reserved?.id,
            handle: args.reserved?.withHandle,
          }
        : {
            kind: TransactionKind.CLAIM_HANDLE,
            localName: args.localName,
          };

    return claimHandle(request);
  });
}
