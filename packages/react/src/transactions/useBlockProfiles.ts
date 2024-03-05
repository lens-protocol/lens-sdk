import { Profile } from '@lens-protocol/api-bindings';
import {
  InsufficientGasError,
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
import { AsyncTransactionResult } from './adapters/AsyncTransactionResult';
import { useBlockProfilesController } from './adapters/useBlockProfileController';
import { useSponsoredConfig } from './shared/useSponsoredConfig';

export type BlockProfileArgs = {
  /**
   * The profiles to block
   */
  profiles: Profile[];
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
   * If not specified, or `true`, the hook will attempt a Signless Experience when possible;
   * otherwise, it will fall back to a signed experience.
   */
  sponsored?: boolean;
};

export type BlockOperation = UseDeferredTask<
  AsyncTransactionResult<void>,
  | BroadcastingError
  | InsufficientAllowanceError
  | InsufficientFundsError
  | InsufficientGasError
  | PendingSigningRequestError
  | TransactionError
  | UserRejectedError
  | WalletConnectionError,
  BlockProfileArgs
>;

/**
 * Block one or many profiles.
 *
 * You MUST be authenticated via {@link useLogin} to use this hook.
 *
 * @category Profiles
 * @group Hooks
 * @param args - {@link BlockProfileArgs}
 *
 * @example
 * ```ts
 * const { execute, error, loading } = useBlockProfiles();
 * ```
 *
 * ## Basic usage
 *
 * Block a single profile.
 *
 * ```tsx
 * const { execute, loading, error } = useBlockProfiles();
 *
 * const block = async (profileId: ProfileId) => {
 *  // invoke the `execute` function to block the profile
 *  await execute({
 *    profiles: [profileId],
 *  });
 * }
 * ```
 *
 * ## Block multiple profiles
 *
 * Block multiple profiles.
 *
 * ```tsx
 * const { execute, loading, error } = useBlockProfiles();
 *
 * const block = async (profileIds: ProfileId[]) => {
 *   // invoke the `execute` function to block the profiles
 *   await execute({
 *     profiles: profileIds,
 *   });
 * }
 * ```
 *
 * ## Failure scenarios
 *
 * You can handle possible failure scenarios by checking the `result` value.
 *
 * ```tsx
 * const block = async (profileId: ProfileId) => {
 *   // the first part is the same as in the initial example
 *
 *   // invoke the `execute` function
 *   const result = await execute({
 *     profiles: [profileId],
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
 * }
 * ```
 *
 * At this point the profile update is completed from an end-user perspective but,
 * in case of on-chain TX, this is not necessarily mined and indexed (yet). See the following section.
 *
 * ## Wait for completion
 *
 * In case of successful submission, the `result` value can be used to wait for the profile metadata to be fully processed.
 *
 * ```tsx
 * const block = async (profileId: ProfileId) => {
 *   // the first part is the same as in the initial example
 *
 *   // invoke the `execute` function
 *   const result = await execute({
 *     profiles: [profileId],
 *   });
 *
 *   if (result.isFailure()) {
 *     // handle failure scenarios
 *     return;
 *   }
 *
 *   // this might take a while depending the congestion of the network
 *   const completion = await result.value.waitForCompletion();
 *
 *   if (completion.isFailure()) {
 *     console.log('There was an processing the transaction', completion.error.message);
 *     return;
 *   }
 *
 *   // the transaction is fully processed
 * };
 * ```
 *
 * ## Self-funded approach
 *
 * It just takes a single parameter to disable the sponsorship of the transaction gas costs.
 *
 * ```ts
 * const block = async (profileId: ProfileId) => {
 *   // the first part is the same as in the initial example
 *
 *   // invoke the `execute` function
 *   const result = await execute({
 *     profiles: [profileId],
 *     sponsored: false // <--- this is the only difference
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
 *
 *   // ...
 * }
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
 * const block = async (profileId: ProfileId) => {
 *   // the first part is the same as in the initial example
 *
 *   // sponsored attempt
 *   const sponsoredResult = await execute({
 *     profiles: [profileId],
 *   });
 *
 *   if (sponsoredResult.isFailure()) {
 *     switch (sponsoredResult.error.name) {
 *       case 'BroadcastingError':
 *         if ([BroadcastingErrorReason.NOT_SPONSORED, BroadcastingErrorReason.RATE_LIMITED].includes(sponsoredResult.error.reason)) {
 *
 *           const selfFundedResult = await execute({
 *              profiles: [profileId],
 *              sponsored: false
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
export function useBlockProfiles(): BlockOperation {
  const { data: session } = useSession();
  const blockProfile = useBlockProfilesController();
  const configureRequest = useSponsoredConfig();

  return useDeferredTask(async ({ profiles, sponsored }: BlockProfileArgs) => {
    invariant(
      session?.type === SessionType.WithProfile,
      'You must be authenticated with a profile to block a profile. Use `useLogin` hook to authenticate.',
    );

    return blockProfile(
      configureRequest({
        profileIds: profiles.map((profile) => profile.id),
        kind: TransactionKind.BLOCK_PROFILE,
        signless: session.profile.signless,
        sponsored: sponsored ?? true,
      }),
    );
  });
}
