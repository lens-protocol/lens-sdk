import {
  PendingSigningRequestError,
  TransactionError,
  TransactionKind,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { ChargeFollowConfig, NoFeeFollowConfig } from '@lens-protocol/domain/use-cases/profile';
import { BroadcastingError } from '@lens-protocol/domain/use-cases/transactions';

import { UseDeferredTask, useDeferredTask } from '../helpers/tasks';
import { useUpdateFollowPolicyController } from './adapters/useUpdateFollowPolicyController';

export type UpdateFollowPolicyArgs = {
  followPolicy: ChargeFollowConfig | NoFeeFollowConfig;
};

/**
 * `useUpdateFollowPolicy` allows you to update the follow policy of the authenticated Profile.
 *
 * You MUST be authenticated via {@link useLogin} to use this hook.
 *
 * @category Profiles
 * @group Hooks
 */
export function useUpdateFollowPolicy(): UseDeferredTask<
  void,
  | BroadcastingError
  | PendingSigningRequestError
  | UserRejectedError
  | WalletConnectionError
  | TransactionError,
  UpdateFollowPolicyArgs
> {
  const updateFollowPolicy = useUpdateFollowPolicyController();

  return useDeferredTask(async (args) => {
    return updateFollowPolicy({
      kind: TransactionKind.UPDATE_FOLLOW_POLICY,
      policy: args.followPolicy,
    });
  });
}
