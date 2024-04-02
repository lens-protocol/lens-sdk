/* eslint-disable no-case-declarations */
import { Profile, TriStateValue, resolveFollowPolicy } from '@lens-protocol/api-bindings';
import {
  InsufficientGasError,
  PendingSigningRequestError,
  TransactionKind,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { FollowPolicyType, FollowRequest } from '@lens-protocol/domain/use-cases/profile';
import { BroadcastingError } from '@lens-protocol/domain/use-cases/transactions';
import {
  InsufficientAllowanceError,
  InsufficientFundsError,
} from '@lens-protocol/domain/use-cases/wallets';
import {
  Data,
  InvariantError,
  PromiseResult,
  failure,
  invariant,
  never,
} from '@lens-protocol/shared-kernel';

import { Session, SessionType, useSession } from '../authentication';
import { UseDeferredTask, useDeferredTask } from '../helpers/tasks';
import { AsyncTransactionResult } from './adapters/AsyncTransactionResult';
import { useFollowController } from './adapters/useFollowController';
import { useSponsoredConfig } from './shared/useSponsoredConfig';

export class PrematureFollowError extends Error {
  name = 'PrematureFollowError' as const;
}

function createFollowRequest(args: FollowArgs, session?: Session): FollowRequest {
  invariant(
    session?.authenticated,
    'You must be authenticated to use this operation. Use `useLogin` hook to authenticate.',
  );
  invariant(
    session.type === SessionType.WithProfile,
    'You must have a profile to use this operation.',
  );

  const followPolicy = resolveFollowPolicy(args.profile);

  switch (followPolicy.type) {
    case FollowPolicyType.CHARGE:
      return {
        kind: TransactionKind.FOLLOW_PROFILE,
        fee: {
          amount: followPolicy.amount,
          contractAddress: followPolicy.contractAddress,
          recipient: followPolicy.recipient,
        },
        profileId: args.profile.id,
        signless: false,
        sponsored: args.sponsored ?? true,
      };

    case FollowPolicyType.ANYONE:
      return {
        kind: TransactionKind.FOLLOW_PROFILE,
        profileId: args.profile.id,
        signless: session.profile.signless,
        sponsored: args.sponsored ?? true,
      };

    case FollowPolicyType.UNKNOWN:
      return {
        kind: TransactionKind.FOLLOW_PROFILE,
        profileId: args.profile.id,
        address: followPolicy.contractAddress,
        data:
          (args.data as Data) ??
          never(
            `Profile ${args.profile.id} is configured with Unknown Follow Module ${followPolicy.contractAddress}. ` +
              'You MUST provide `data` to execute Unknown Follow Modules. ' +
              'If a module does not require processing calldata just use `0x` string.',
          ),
        signless: session.profile.signless && followPolicy.signlessApproved,
        sponsored: (args.sponsored ?? true) && followPolicy.sponsoredApproved,
      };

    case FollowPolicyType.NO_ONE:
      throw new InvariantError(`The profile is configured so that nobody can follow it.`);
  }
}

/**
 * An object representing the result of a follow operation.
 *
 * It allows to wait for the transaction to be processed and indexed.
 */
export type FollowAsyncResult = AsyncTransactionResult<void>;

export type FollowArgs = {
  /**
   * The profile to follow
   */
  profile: Profile;
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
  /**
   * If the profile is configured with an Unknown Follow Module,
   * this is the calldata to be used to process the follow request.
   *
   * It's consumer responsibility to encode it correctly.
   */
  data?: string;
};

/**
 * `useFollow` allows you to follow another Profile.
 *
 * You MUST be authenticated via {@link useLogin} to use this hook.
 *
 * @example
 * ```ts
 * const { execute: follow, error, loading } = useFollow();
 * ```
 *
 * ## Follow a profile
 *
 * Given you have an instance of a {@link Profile} from fetched data, you can follow with:
 *
 * ```ts
 * const { execute, error, loading } = useFollow();
 *
 * const follow = async (profile: Profile) => {
 *   const result = await execute({ profile });
 *
 *   // ...
 * }
 * ```
 *
 * ## Failure scenarios
 *
 * You can handle possible failure scenarios by checking the `result` value.
 *
 * ```ts
 * const follow = async (profile: Profile) => {
 *   const result = await execute({ profile });
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
 *       case 'InsufficientAllowanceError':
 *         const requestedAmount = result.error.requestedAmount;
 *         console.log(
 *           'You must approve the contract to spend at least: '+
 *             `${requestedAmount.asset.symbol} ${requestedAmount.toSignificantDigits(6)}`
 *         );
 *         break;
 *
 *       case 'InsufficientFundsError':
 *         const requestedAmount = result.error.requestedAmount;
 *         console.log(
 *           'You do not have enough funds to pay for this follow fee: '+
 *             `${requestedAmount.asset.symbol} ${requestedAmount.toSignificantDigits(6)}`
 *         );
 *         break;
 *
 *       case 'WalletConnectionError':
 *         console.log('There was an error connecting to your wallet', error.message);
 *         break;
 *
 *       case 'PrematureFollowError':
 *         console.log('There is a pending unfollow request for this profile.');
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
 *
 * ## Wait for completion
 *
 * You can always wait the operation to be fully processed and indexed by Lens API.
 *
 * ```ts
 * const follow = async (profile: Profile) => {
 *   const result = await execute({ profile });
 *
 *   if (result.isFailure()) {
 *     // handle failure scenarios
 *     return;
 *   }
 *
 *   // this might take a while depending on the congestion of the network
 *   const completion = await result.value.waitForCompletion();
 *
 *   if (completion.isFailure()) {
 *     console.log('There was an processing the transaction', completion.error.message);
 *     return;
 *   }
 *
 *   console.log('Follow executed successfully');
 * };
 * ```
 *
 * ## Self-funded approach
 *
 * It just takes a single parameter to disable the sponsorship of the transaction gas costs.
 *
 * ```ts
 * const follow = async (profile: Profile) => {
 *   const result = await execute({
 *     profile,
 *     sponsored: false
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
 * const follow = async (profile: Profile) => {
 *   const sponsoredResult = await execute({ profile });
 *
 *   if (sponsoredResult.isFailure()) {
 *     switch (sponsoredResult.error.name) {
 *       case 'BroadcastingError':
 *         if ([BroadcastingErrorReason.NOT_SPONSORED, BroadcastingErrorReason.RATE_LIMITED].includes(sponsoredResult.error.reason)) {
 *
 *           const selfFundedResult = await execute({ profile, sponsored: false });
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
export function useFollow(): UseDeferredTask<
  FollowAsyncResult,
  | BroadcastingError
  | InsufficientAllowanceError
  | InsufficientFundsError
  | InsufficientGasError
  | PendingSigningRequestError
  | PrematureFollowError
  | UserRejectedError
  | WalletConnectionError,
  FollowArgs
> {
  const { data: session } = useSession();
  const followProfile = useFollowController();
  const configureRequest = useSponsoredConfig();

  return useDeferredTask(
    async (
      args,
    ): PromiseResult<
      FollowAsyncResult,
      | BroadcastingError
      | InsufficientAllowanceError
      | InsufficientFundsError
      | InsufficientGasError
      | PendingSigningRequestError
      | PrematureFollowError
      | UserRejectedError
      | WalletConnectionError
    > => {
      invariant(
        args.profile.operations.canFollow === TriStateValue.Yes,
        "You can't follow this profile. Check the `profile.operations.canFollow` beforehand.",
      );

      if (!args.profile.operations.isFollowedByMe.isFinalisedOnchain) {
        return failure(
          new PrematureFollowError(
            `A previous unfollow request for ${args.profile.id} is still pending.
          Check 'profile.operations.isFollowedByMe.isFinalisedOnchain' beforehand.`,
          ),
        );
      }

      const request = configureRequest(createFollowRequest(args, session));
      return followProfile(request);
    },
  );
}
