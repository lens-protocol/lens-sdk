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
import { useSponsoredConfig } from './shared/useSponsoredConfig';

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
   * If not specified, or `true`, the hook will attempt a Sponsored Transaction.
   * Set it to `false` to force it to use a Self-Funded Transaction.
   */
  sponsored?: boolean;
};

/**
 * `useUpdateFollowPolicy` allows you to update the follow policy of the authenticated Profile.
 *
 * You MUST be authenticated via {@link useLogin} to use this hook.
 *
 * @category Profiles
 * @group Hooks
 *
 * @example
 * ```tsx
 * const { execute, loading, error } = useUpdateFollowPolicy();
 * ```
 *
 * ## Follow policy types
 *
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
 * ## Self-funded approach
 *
 * It just takes a single parameter to disable the sponsorship of the transaction gas costs.
 *
 * ```ts
 * await execute({
 *   followPolicy: {
 *     type: FollowPolicyType.CHARGE,
 *     amount: Amount.erc20(wmatic, 100), // 100 WMATIC
 *     recipient: '0x1234123412341234123412341234123412341234',
 *   },
 *   sponsored: false, // <--- this is the only difference
 * });
 * ```
 * In this example you can also see a new error type: {@link InsufficientGasError}. This
 * error happens only with self-funded transactions and it means that the wallet does not
 * have enough funds to pay for the transaction gas costs.
 *
 * ## Self-funded fallback
 *
 * If for some reason the Lens API cannot sponsor the transaction, the hook will fail with a {@link BroadcastingError} with one of the following reasons:
 * - {@link BroadcastingErrorReason.NOT_SPONSORED} - the profile is not sponsored
 * - {@link BroadcastingErrorReason.RATE_LIMITED} - the profile reached the rate limit
 * - {@link BroadcastingErrorReason.APP_NOT_ALLOWED} - the app is not whitelisted for gasless transactions
 *
 * In those cases you can retry the transaction as self-funded like in the following example:
 *
 * ```ts
 * const update = async () => {
 *   // the first part is the same as in the initial example
 *
 *   // sponsored attempt
 *   const sponsoredResult = await execute({
 *     followPolicy: {
 *       type: FollowPolicyType.CHARGE,
 *       amount: Amount.erc20(wmatic, 100), // 100 WMATIC
 *       recipient: '0x1234123412341234123412341234123412341234',
 *     },
 *     sponsored: false,
 *   });
 *
 *   if (sponsoredResult.isFailure()) {
 *     switch (sponsoredResult.error.name) {
 *       case 'BroadcastingError':
 *         if ([BroadcastingErrorReason.NOT_SPONSORED, BroadcastingErrorReason.RATE_LIMITED].includes(sponsoredResult.error.reason)) {
 *
 *           const selfFundedResult = await execute({
 *             metadataURI: uri,
 *             sponsored: false
 *           });
 *
 *           // continue with selfFundedResult as in the previous example
 *         }
 *         break;
 *
 *      // ...
 *   }
 * }
 * ```
 *
 * In this example we omitted {@link BroadcastingErrorReason.APP_NOT_ALLOWED} as it's not normally a problem per-se.
 * It just requires the app to apply for whitelisting. See https://docs.lens.xyz/docs/gasless-and-signless#whitelisting-your-app.
 *
 * You can still include it in your fallback logic if you want to. For example to unblock testing your app from a domain that is not the
 * whitelisted one (e.g. localhost).
 *
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
  const configureRequest = useSponsoredConfig();

  return useDeferredTask(async (args) => {
    invariant(
      session?.authenticated,
      'You must be authenticated to use this operation. Use `useLogin` hook to authenticate.',
    );
    invariant(
      session.type === SessionType.WithProfile,
      'You must have a profile to use this operation.',
    );

    return updateFollowPolicy(
      configureRequest({
        kind: TransactionKind.UPDATE_FOLLOW_POLICY,
        policy: args.followPolicy,
        signless: session.profile.signless,
        sponsored: args.sponsored ?? true,
      }),
    );
  });
}
