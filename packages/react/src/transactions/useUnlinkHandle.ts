import { HandleInfo } from '@lens-protocol/api-bindings';
import {
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
  BroadcastingError | PendingSigningRequestError | UserRejectedError | WalletConnectionError,
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
      delegate: session.profile.signless,
    });
  });
}
