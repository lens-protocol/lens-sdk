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
 * To setup a {@link FollowPolicyType.CHARGE} you need to define an amount of a currency as a fee.
 * You can get a list of supported currencies via {@link useCurrencies}.
 *
 * @example
 * Anyone can follow.
 * ```tsx
 * const { execute, loading, error } = useUpdateFollowPolicy();
 *
 * await execute({
 *   followPolicy: {
 *     type: FollowPolicyType.ANYONE,
 *   },
 * });
 * ```
 *
 * @example
 * No one can follow.
 * ```tsx
 * const { execute, loading, error } = useUpdateFollowPolicy();
 *
 * await execute({
 *   followPolicy: {
 *     type: FollowPolicyType.NO_ONE,
 *   },
 * });
 * ```
 *
 * @example
 * Anyone can follow, but they must pay a fee.
 * ```tsx
 * const { execute, loading, error } = useUpdateFollowPolicy();
 *
 * await execute({
 *   followPolicy: {
 *     type: FollowPolicyType.CHARGE,
 *     amount: Amount.erc20(erc20, amount),
 *     recipient: '0x1234123412341234123412341234123412341234',
 *   },
 * });
 * ```
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
      delegate: true,
    });
  });
}
