import {
  PendingSigningRequestError,
  TransactionKind,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { BroadcastingError } from '@lens-protocol/domain/use-cases/transactions';

import { UseDeferredTask, useDeferredTask } from '../helpers/tasks';
import { AsyncTransactionResult } from './adapters/AsyncTransactionResult';
import { useUnlinkHandleController } from './adapters/useUnlinkHandleController';

export type UnlinkHandleArgs = {
  /**
   * The handle to unlink from the currently authenticated Profile.
   */
  handle: string;
};

/**
 * `useUnlinkHandle` allows you to unlink a handle from your Profile.
 *
 * You MUST be authenticated via {@link useLogin} to use this hook.
 *
 * @category Profiles
 * @group Hooks
 */
export function useUnlinkHandle(): UseDeferredTask<
  AsyncTransactionResult<void>,
  BroadcastingError | PendingSigningRequestError | UserRejectedError | WalletConnectionError,
  UnlinkHandleArgs
> {
  const unlinkHandle = useUnlinkHandleController();

  return useDeferredTask(async (args) => {
    return unlinkHandle({
      kind: TransactionKind.UNLINK_HANDLE,
      handle: args.handle,
      delegate: true,
    });
  });
}
