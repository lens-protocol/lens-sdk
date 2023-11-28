import {
  InsufficientGasError,
  PendingSigningRequestError,
  TransactionError,
  TransactionKind,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { FollowPolicyConfig } from '@lens-protocol/domain/use-cases/profile';
import { BroadcastingError } from '@lens-protocol/domain/use-cases/transactions';
import { invariant } from '@lens-protocol/shared-kernel';

import { SessionType, useSession } from '../authentication';
import { UseDeferredTask, useDeferredTask } from '../helpers/tasks';
import { useUpdateFollowPolicyController } from './adapters/useUpdateFollowPolicyController';

export type UpdateFollowPolicyArgs = {
  /**
   * The follow policy to be set.
   *
   * See {@link FollowPolicyConfig} with types:
   * - {@link FollowPolicyType.ANYONE} - anyone can follow
   * - {@link FollowPolicyType.CHARGE} - anyone can follow, but they must pay a fee
   */
  followPolicy: FollowPolicyConfig;
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
 * `useUpdateFollowPolicy` allows you to update the follow policy of the authenticated Profile.
 *
 * You MUST be authenticated via {@link useLogin} to use this hook.
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
 * To setup a {@link FollowPolicyType.CHARGE} you need to define an amount of a currency as a fee.
 *
 * As with anything involving amounts in the Lens SDK you can use the
 * {@link Amount} helper with currencies from the {@link useCurrencies} hook to
 * create the desired amounts.
 *
 * ```tsx
 * const { execute, loading, error } = useUpdateFollowPolicy();
 *
 * const wmatic = ... // from useCurrencies hook
 *
 * await execute({
 *   followPolicy: {
 *     type: FollowPolicyType.CHARGE,
 *     amount: Amount.erc20(wmatic, 100), // 100 WMATIC
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
  | TransactionError
  | InsufficientGasError,
  UpdateFollowPolicyArgs
> {
  const { data: session } = useSession();
  const updateFollowPolicy = useUpdateFollowPolicyController();

  return useDeferredTask(async (args) => {
    invariant(
      session?.authenticated,
      'You must be authenticated to use this operation. Use `useLogin` hook to authenticate.',
    );
    invariant(
      session.type === SessionType.WithProfile,
      'You must have a profile to use this operation.',
    );

    return updateFollowPolicy({
      kind: TransactionKind.UPDATE_FOLLOW_POLICY,
      policy: args.followPolicy,
      signless: session.profile.signless,
      sponsored: args.sponsored ?? false,
    });
  });
}
