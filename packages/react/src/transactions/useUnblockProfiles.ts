import { Profile } from '@lens-protocol/api-bindings';
import {
  PendingSigningRequestError,
  TransactionKind,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { BroadcastingError } from '@lens-protocol/domain/use-cases/transactions';
import {
  InsufficientAllowanceError,
  InsufficientFundsError,
} from '@lens-protocol/domain/use-cases/wallets';
import { invariant } from '@lens-protocol/shared-kernel';

import { SessionType, useSession } from '../authentication';
import { UseDeferredTask, useDeferredTask } from '../helpers/tasks';
import { AsyncTransactionResult } from './adapters/AsyncTransactionResult';
import { useUnblockProfilesController } from './adapters/useUnblockProfilesController';

export type UnblockProfileArgs = {
  /**
   * The profiles to unblock
   */
  profiles: Profile[];
};

export type UnblockOperation = UseDeferredTask<
  AsyncTransactionResult<void>,
  | BroadcastingError
  | InsufficientAllowanceError
  | InsufficientFundsError
  | PendingSigningRequestError
  | UserRejectedError
  | WalletConnectionError,
  UnblockProfileArgs
>;

export function useUnblockProfiles(): UnblockOperation {
  const { data: session } = useSession();
  const unblockProfile = useUnblockProfilesController();

  return useDeferredTask(async ({ profiles }: UnblockProfileArgs) => {
    invariant(
      session?.type === SessionType.WithProfile,
      'You must be authenticated with a profile to unblock a profile. Use `useLogin` hook to authenticate.',
    );

    return unblockProfile({
      profileIds: profiles.map((profile) => profile.id),
      kind: TransactionKind.UNBLOCK_PROFILE,
      delegate: session.profile.signless,
    });
  });
}
