import { Profile } from '@lens-protocol/api-bindings';
import {
  PendingSigningRequestError,
  TransactionError,
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
import { useBlockProfilesController } from './adapters/useBlockProfileController';

export type BlockProfileArgs = {
  /**
   * The profiles to block
   */
  profiles: Profile[];
};

export type BlockOperation = UseDeferredTask<
  void,
  | BroadcastingError
  | InsufficientAllowanceError
  | InsufficientFundsError
  | PendingSigningRequestError
  | UserRejectedError
  | WalletConnectionError
  | TransactionError,
  BlockProfileArgs
>;

export function useBlockProfiles(): BlockOperation {
  const { data: session } = useSession();
  const blockProfile = useBlockProfilesController();

  return useDeferredTask(async ({ profiles }: BlockProfileArgs) => {
    invariant(
      session?.type === SessionType.WithProfile,
      'You must be authenticated with a profile to block a profile. Use `useLogin` hook to authenticate.',
    );

    return blockProfile({
      profileIds: profiles.map((profile) => profile.id),
      kind: TransactionKind.BLOCK_PROFILE,
      delegate: session.profile.signless,
    });
  });
}
