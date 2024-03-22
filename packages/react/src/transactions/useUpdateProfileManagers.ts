import {
  InsufficientGasError,
  PendingSigningRequestError,
  TransactionError,
  TransactionKind,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { BroadcastingError } from '@lens-protocol/domain/use-cases/transactions';
import { AtLeastOneOf, EvmAddress, invariant } from '@lens-protocol/shared-kernel';

import { SessionType, useSession } from '../authentication';
import { UseDeferredTask, useDeferredTask } from '../helpers/tasks';
import { useUpdateProfileManagersController } from './adapters/useUpdateProfileManagersController';
import { useSponsoredConfig } from './shared/useSponsoredConfig';

export type UpdateProfileManagersArgs = AtLeastOneOf<{
  /**
   * Enables the Lens Profile Manager to sign transactions on behalf of the authenticated Profile.
   */
  approveSignless?: boolean;
  /**
   * Adds the given addresses to the list of Profile managers for the authenticated Profile.
   */
  add?: EvmAddress[];
  /**
   * Removes the given addresses from the list of Profile managers for the authenticated Profile.
   */
  remove?: EvmAddress[];
}> & {
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
 * Update the profile manager configuration for the authenticated profile.
 *
 * You MUST be authenticated via {@link useLogin} to use this hook.
 *
 * **NOTE** This hook waits for the transaction to be mined and indexed before returning.
 * This is due to the fact that until a Profile Manager configuration change is fully finalized, the enabled managers cannot yet sign transactions.
 * In the case of disabling profile managers, it's very likely you'll want the rest of the application to not perform operations while the transaction is pending.
 *
 * @example
 * ```ts
 * const { execute, loading, error } = useUpdateProfileManagers();
 * ```
 *
 * ## Basic usage
 *
 * Enable/disable the Lens Profile Manager. This allows to perform signless transaction through the Lens API.
 * ```ts
 * const { execute, loading, error } = useUpdateProfileManagers();
 *
 * const callback = async () => {
 *   const result = await execute({
 *     approveSignless: true, // or false to disable it
 *   });
 *
 *   if (result.isFailure()) {
 *     toast.error(result.error.message);
 *   }
 * };
 * ```
 *
 * ## Add/remove managers
 *
 * Add/remove an arbitrary address to the list of Profile managers for the authenticated Profile.
 * ```ts
 * const { execute, loading, error } = useUpdateProfileManagers();
 *
 * const callback = async () => {
 *   const result = await execute({
 *     add: ['0x1234567890123456789012345678901234567890', '0x1234567890123456789012345678901234567891'],
 *     remove: ['0x1234567890123456789012345678901234567892'],
 *   });
 * }
 * ```
 *
 * ## Failure scenarios
 *
 * You can handle possible failure scenarios by checking the `result` value.
 *
 * ```tsx
 * const callback = async () => {
 *   const result = await execute({
 *     approveSignless: true,
 *   });
 *
 *   if (result.isFailure()) {
 *     switch (result.error.name) {
 *       case 'BroadcastingError':
 *         console.log('There was an error broadcasting the transaction', error.message);
 *         break;
 *
 *       case 'PendingSigningRequestError':
 *         console.log(
 *           'There is a pending signing request in your wallet. ' +
 *             'Approve it or discard it and try again.'
 *         );
 *         break;
 *
 *       case 'WalletConnectionError':
 *         console.log('There was an error connecting to your wallet', error.message);
 *         break;
 *
 *       case 'UserRejectedError':
 *         // the user decided to not sign, usually this is silently ignored by UIs
 *         break;
 *     }
 *     return;
 *   }
 * };
 *```
 *
 * ## Self-funded approach
 *
 * It just takes a single parameter to disable the sponsorship of the transaction gas costs.
 *
 * ```ts
 * const callback = async () => {
 *   const result = await execute({
 *     approveSignless: true,
 *     sponsored: false, <-- this is the only change
 *   });
 *
 *   if (result.isFailure()) {
 *     switch (result.error.name) {
 *       case 'InsufficientGasError':
 *         console.log('You do not have enough funds to pay for the transaction gas cost.');
 *         break;
 *
 *       // ...
 *     }
 *     return;
 *   }
 *```
 * In this example you can also see a new error type: {@link InsufficientGasError}. This
 * error happens only with self-funded transactions and it means that the wallet does not
 * have enough funds to pay for the transaction gas costs.
 *
 * ## Self-funded Fallback
 *
 * If for some reason the Lens API cannot sponsor the transaction, the hook will fail with a {@link BroadcastingError} with one of the following reasons:
 * - {@link BroadcastingErrorReason.NOT_SPONSORED} - the profile is not sponsored
 * - {@link BroadcastingErrorReason.RATE_LIMITED} - the profile reached the rate limit
 * - {@link BroadcastingErrorReason.APP_NOT_ALLOWED} - the app is not whitelisted for gasless transactions
 *
 * In those cases you can retry the transaction as self-funded like in the following example:
 *
 * ```ts
 * const callback = async () => {
 *   // sponsored attempt
 *   const sponsoredResult = await execute({
 *     approveSignless: true,
 *   });
 *
 *   if (sponsoredResult.isFailure()) {
 *     switch (sponsoredResult.error.name) {
 *       case 'BroadcastingError':
 *         if ([BroadcastingErrorReason.NOT_SPONSORED, BroadcastingErrorReason.RATE_LIMITED].includes(sponsoredResult.error.reason)) {
 *
 *           const selfFundedResult = await execute({
 *             approveSignless: true,
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
 * @category Profiles
 * @group Hooks
 */
export function useUpdateProfileManagers(): UseDeferredTask<
  void,
  | BroadcastingError
  | InsufficientGasError
  | PendingSigningRequestError
  | TransactionError
  | UserRejectedError
  | WalletConnectionError,
  UpdateProfileManagersArgs
> {
  const { data: session } = useSession();
  const updateProfileManagers = useUpdateProfileManagersController();
  const configureRequest = useSponsoredConfig();

  return useDeferredTask(async (args) => {
    invariant(
      session?.type === SessionType.WithProfile,
      'You must be authenticated with the Profile you intend update Profile Managers for. ' +
        'Use `useLogin` hook to authenticate.',
    );

    if ('approveSignless' in args) {
      invariant(
        args.approveSignless !== session.profile.signless,
        `The Signless Experience is already ${args.approveSignless ? 'enabled' : 'disabled'}`,
      );
    }

    return updateProfileManagers(
      configureRequest({
        kind: TransactionKind.UPDATE_PROFILE_MANAGERS,
        sponsored: args.sponsored ?? true,
        ...args,
      }),
    );
  });
}
