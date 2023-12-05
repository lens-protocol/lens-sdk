import { HandleInfo } from '@lens-protocol/api-bindings';
import {
  InsufficientGasError,
  PendingSigningRequestError,
  TransactionKind,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { BroadcastingError } from '@lens-protocol/domain/use-cases/transactions';
import { invariant } from '@lens-protocol/shared-kernel';

import { SessionType, useSession } from '../authentication';
import { UseDeferredTask, useDeferredTask } from '../helpers/tasks';
import { AsyncTransactionResult } from './adapters/AsyncTransactionResult';
import { useUnlinkHandleController } from './adapters/useUnlinkHandleController';

export type UnlinkHandleArgs = {
  /**
   * The handle to unlink from the currently authenticated Profile.
   */
  handle: HandleInfo;
  /**
   * Whether the transaction costs should be sponsored by the Lens API or
   * should be paid by the authenticated wallet.
   *
   * There are scenarios where the sponsorship will be denied regardless of this value.
   * See {@link BroadcastingError} with:
   * - {@link BroadcastingErrorReason.NOT_SPONSORED} - the profile is not sponsored
   * - {@link BroadcastingErrorReason.RATE_LIMITED} - the profile reached the rate limit
   * - {@link BroadcastingErrorReason.APP_NOT_ALLOWED} - the app is not whitelisted for gasless transactions
   *
   * @defaultValue true, the request will be attempted to be sponsored by the Lens API.
   */
  sponsored?: boolean;
};

/**
 * `useUnlinkHandle` allows you to unlink a handle from your Profile.
 *
 * You MUST be authenticated via {@link useLogin} to use this hook.
 *
 * @example
 * ```tsx
 * const { execute, error, loading } = useUnlinkHandle();
 *
 * <button onClick={() => execute({ handle })} disabled={loading}>
 *   Unlink handle
 * </button>
 * ```
 *
 * @category Profiles
 * @group Hooks
 */
export function useUnlinkHandle(): UseDeferredTask<
  AsyncTransactionResult<void>,
  | BroadcastingError
  | InsufficientGasError
  | PendingSigningRequestError
  | UserRejectedError
  | WalletConnectionError,
  UnlinkHandleArgs
> {
  const { data: session } = useSession();
  const unlinkHandle = useUnlinkHandleController();

  return useDeferredTask(async (args) => {
    invariant(
      session?.authenticated,
      'You must be authenticated to use this operation. Use `useLogin` hook to authenticate.',
    );
    invariant(
      session.type === SessionType.WithProfile,
      'You must have a profile to use this operation.',
    );
    invariant(
      args.handle.linkedTo?.nftTokenId === session.profile.id,
      `You can't unlink handle that is not linked to current profile.`,
    );

    return unlinkHandle({
      kind: TransactionKind.UNLINK_HANDLE,
      fullHandle: args.handle.fullHandle,
      profileId: session.profile.id,
      signless: session.profile.signless,
      sponsored: args.sponsored ?? true,
    });
  });
}
