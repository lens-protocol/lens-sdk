import {
  PendingSigningRequestError,
  TransactionKind,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { BroadcastingError } from '@lens-protocol/domain/use-cases/transactions';

import { UseDeferredTask, useDeferredTask } from '../helpers/tasks';
import { AsyncTransactionResult } from './adapters/AsyncTransactionResult';
import { useLinkHandleController } from './adapters/useLinkHandleController';

export type LinkHandleArgs = {
  /**
   * The owned handle to link to the currently authenticated Profile.
   */
  handle: string;
};

/**
 * `useLinkHandle` allows you to link an owned handle to your Profile.
 *
 * You MUST be authenticated via {@link useLogin} to use this hook.
 *
 * @category Profiles
 * @group Hooks
 */
export function useLinkHandle(): UseDeferredTask<
  AsyncTransactionResult<void>,
  BroadcastingError | PendingSigningRequestError | UserRejectedError | WalletConnectionError,
  LinkHandleArgs
> {
  const linkHandle = useLinkHandleController();

  return useDeferredTask(async (args) => {
    return linkHandle({
      kind: TransactionKind.LINK_HANDLE,
      handle: args.handle,
      delegate: true,
    });
  });
}
